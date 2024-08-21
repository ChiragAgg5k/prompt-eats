"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Recipe {
	id: number;
	title: string;
	description: string;
	image: string;
	readyInMinutes: number;
	url: string;
}

export default function RecipesPage() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		const ws = new WebSocket(
			`${process.env.NODE_ENV === "development" ? "ws" : "wss"}://${process.env.NEXT_PUBLIC_BACKEND_URL}`
		);

		ws.onmessage = (event) => {
			const recipe: Recipe = JSON.parse(event.data);

			setRecipes((prevRecipes) => [...prevRecipes, recipe]);
		};

		ws.onclose = () => {
			console.log("WebSocket connection closed");
		};

		return () => {
			ws.close();
		};
	}, []);

	return (
		<div style={{ padding: "20px" }}>
			<h1 className="text-3xl font-bold text-center mt-4">Live Recipes</h1>
			<p className="text-center text-muted-foreground text-lg mt-2">
				Here are some recipes that users are currently searching for, in real-time!
			</p>
			<div className="grid p-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{recipes.map((recipe) => (
					<Card
						key={recipe.id}
						className="overflow-hidden flex flex-col items-center justify-between rounded-lg shadow-lg">
						<Image
							src={recipe.image || "/placeholder.svg"}
							alt={recipe.title}
							width={400}
							height={300}
							className="w-full h-48 object-cover"
							style={{ aspectRatio: "400/300", objectFit: "cover" }}
						/>
						<CardContent className="p-4">
							<h3 className="text-lg font-bold">{recipe.title}</h3>
							<p className="text-muted-foreground text-sm line-clamp-2">{recipe.description}</p>
						</CardContent>
						<CardFooter className="bg-muted/20 w-full px-4 py-2 flex justify-between items-center">
							<div className="text-sm font-medium text-muted-foreground">{recipe.readyInMinutes} min</div>
							<Link href={recipe.url || "#"} target="_blank" className="text-primary" prefetch={false}>
								View Recipe
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
