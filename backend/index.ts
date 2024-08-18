import Fluvio, { Offset, TopicProducer } from '@fluvio/client';
import axios from 'axios';
import express, { Request, Response } from 'express';

const API_KEY = '5edaa254f9b942e38ffefd0e95ded630';
const FLUVIO_TOPIC = 'recipe-stream';

const app = express();
app.use(express.json());

let producer: TopicProducer;

const initializeFluvio = async () => {
    try {
        // Create Fluvio instance and connect to the cluster
        const fluvio = new Fluvio();
        await fluvio.connect();  // Explicitly connect to Fluvio cluster

        // Initialize the producer
        producer = await fluvio.topicProducer(FLUVIO_TOPIC);
        console.log('Fluvio initialized and producer ready');
    } catch (error) {
        console.error('Failed to initialize Fluvio:', error);
    }
};

app.post('/search', async (req: Request, res: Response) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).send({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
            params: {
                apiKey: API_KEY,
                query: prompt,
                number: 5,
            },
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
        await fluvio.connect();  // Explicitly connect to Fluvio cluster

        const consumer = await fluvio.partitionConsumer(FLUVIO_TOPIC, 0);

        await consumer.stream(Offset.FromBeginning(), (record : any) => {
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
        console.error('Error consuming recipes:', error);
    }
};

// Start the Fluvio consumer and the Express server
const startServer = async () => {
    await initializeFluvio();
    consumeRecipes();

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
};

startServer();
