import Fluvio, { Offset, TopicProducer } from "@fluvio/client";
import axios from "axios";
import express, { Request, Response } from "express";
import { WebSocketServer } from "ws";
import http from "http";

const API_KEY = "5edaa254f9b942e38ffefd0e95ded630";
const FLUVIO_TOPIC = "recipe-stream";

const app = express();
app.use(express.json());

const server = http.createServer(app); // Create the HTTP server

let producer: TopicProducer;

const initializeFluvio = async () => {
	try {
		// Create Fluvio instance and connect to the cluster
		const fluvio = new Fluvio();
		await fluvio.connect(); // Explicitly connect to Fluvio cluster

		// Initialize the producer
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
				title: recipe.title.substring(0, 20),
				description: recipe.summary.substring(0, 25),
				image: recipe.image,
				readyInMinutes: recipe.readyInMinutes,
				url: recipe.sourceUrl || `https://spoonacular.com/recipe/${encodedTitle}-${encodedId}`
			};
		});

		for (const recipe of recipes) {
			await producer.send("recipe", JSON.stringify(recipe));
		}

		res.status(200).send(recipes);
	} catch (error) {
		console.error("Error fetching trending recipes:", error);
		res.status(500).send({ error: "Failed to fetch trending recipes." });
	}
});

app.post("/search", async (req: Request, res: Response) => {
	const { prompt } = req.body;

	if (!prompt) {
		return res.status(400).send({ error: "Prompt is required" });
	}

	try {
		const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
			params: {
				apiKey: API_KEY,
				query: prompt,
				number: 5
			}
		});

		const recipes = response.data.results;

		for (const recipe of recipes) {
			await producer.send("recipe", JSON.stringify(recipe));
		}

		res.status(200).send({ message: "Recipes have been sent to Fluvio." });
	} catch (error) {
		console.error("Error fetching recipes:", error);
		res.status(500).send({ error: "Failed to fetch recipes." });
	}
});

const consumeRecipes = async () => {
	try {
		const fluvio = new Fluvio();
		await fluvio.connect(); // Explicitly connect to Fluvio cluster

		const consumer = await fluvio.partitionConsumer(FLUVIO_TOPIC, 0);

		await consumer.stream(Offset.FromBeginning(), (record: any) => {
			const value = record.valueString();
			const recipe = JSON.parse(value);

			const encodedTitle = encodeURIComponent(recipe.title);
			const encodedId = encodeURIComponent(recipe.id);

			const recipeUrl = `https://spoonacular.com/recipe/${encodedTitle}-${encodedId}`;

			console.log(`Recipe: ${recipe.title}`);
			console.log(`Link: ${recipeUrl}`);
			console.log("--------------------------------------------------");
		});
	} catch (error) {
		console.error("Error consuming recipes:", error);
	}
};
const wss = new WebSocketServer({ server }); // Attach the WebSocket server to the HTTP server

wss.on("connection", (ws: any) => {
	console.log("WebSocket client connected");

	const streamRecipes = async () => {
		try {
			const fluvio = new Fluvio();
			await fluvio.connect();

			const consumer = await fluvio.partitionConsumer("recipe-stream", 0);

			await consumer.stream(Offset.FromBeginning(), (record: any) => {
				const value = record.valueString();
				ws.send(value); // Send the recipe data to the WebSocket client
			});
		} catch (error) {
			console.error("Error consuming recipes:", error);
		}
	};

	streamRecipes();
});

server.listen(3000, () => {
	console.log("Server running on port 3000");
});

const startServer = async () => {
	await initializeFluvio();
};

startServer();
