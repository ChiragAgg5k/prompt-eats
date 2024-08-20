import Fluvio, { Offset, TopicProducer } from "@fluvio/client";
import axios from "axios";
import express, { Request, Response } from "express";
import { WebSocketServer } from "ws";
import http from "http";
import cors from "cors";

const API_KEY = "5edaa254f9b942e38ffefd0e95ded630";
const FLUVIO_TOPIC = "recipe-stream";

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

let producer: TopicProducer;

const initializeFluvio = async () => {
	try {
		const fluvio = new Fluvio();
		await fluvio.connect();

		producer = await fluvio.topicProducer(FLUVIO_TOPIC);
		console.log("Fluvio initialized and producer ready");
	} catch (error) {
		console.error("Failed to initialize Fluvio:", error);
	}
};

app.get("/trending", async (req: Request, res: Response) => {
	try {
		const response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
			params: {
				apiKey: API_KEY,
				number: 4
			}
		});

		const recipes = response.data.recipes.map((recipe: any) => {
			const encodedTitle = encodeURIComponent(recipe.title);
			const encodedId = encodeURIComponent(recipe.id);

			return {
				id: recipe.id,
				title: recipe.title,
				description: recipe.summary.substring(0, 50),
				image: recipe.image,
				readyInMinutes: recipe.readyInMinutes,
				url: recipe.sourceUrl || `https://spoonacular.com/recipe/${encodedTitle}-${encodedId}`
			};
		});

		res.status(200).send(recipes);
	} catch (error) {
		console.error("Error fetching trending recipes:", error);
		res.status(500).send({ error: "Failed to fetch trending recipes." });
	}
});

app.get("/search", async (req: Request, res: Response) => {
	const { query } = req.query;

	if (!query) {
		return res.status(400).send({ error: "Query parameter is required." });
	}

	try {
		const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
			params: {
				apiKey: API_KEY,
				query: query,
				number: 5,
				addRecipeInformation: true
			}
		});

		const recipes = response.data.results.map((recipe: any) => {
			const encodedTitle = encodeURIComponent(recipe.title);
			const encodedId = encodeURIComponent(recipe.id);

			return {
				id: recipe.id,
				title: recipe.title.substring(0, 50),
				description: recipe.summary ? recipe.summary.substring(0, 50) : "",
				image: recipe.image,
				url: recipe.sourceUrl || `https://spoonacular.com/recipe/${encodedTitle}-${encodedId}`
			};
		});

		await producer.send("recipe", JSON.stringify(recipes[0]));

		res.status(200).send(recipes);
	} catch (error) {
		console.error("Error fetching recipes:", error);
		res.status(500).send({ error: "Failed to fetch recipes." });
	}
});

const wss = new WebSocketServer({ server }); // Attach the WebSocket server to the HTTP server

wss.on("connection", (ws: any) => {
	console.log("WebSocket client connected");

	const streamRecipes = async () => {
		try {
			const fluvio = new Fluvio();
			await fluvio.connect();

			const consumer = await fluvio.partitionConsumer("recipe-stream", 0);

			await consumer.stream(Offset.FromEnd(), (record: any) => {
				const value = record.valueString();
				ws.send(value);
			});
		} catch (error) {
			console.error("Error consuming recipes:", error);
		}
	};

	streamRecipes();
});

server.listen(8000, () => {
	console.log("Server running on port 8000");
});

const startServer = async () => {
	await initializeFluvio();
};

startServer();
