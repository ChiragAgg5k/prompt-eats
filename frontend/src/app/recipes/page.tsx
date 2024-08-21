"use client";

import { SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Recipe } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecipesPage() {
	const searchParams = useSearchParams();
	const query = searchParams.get("query");

	const [searchQuery, setSearchQuery] = useState(query || "");
	const [inputValue, setInputValue] = useState(query || "");
	const [recipes, setRecipes] = useState<Recipe[] | { error: string }>([]);

	useEffect(() => {
		try {
			fetch(
				`${process.env.NODE_ENV === "development" ? "http" : "https"}://${
					process.env.NEXT_PUBLIC_BACKEND_URL
				}/search?query=${searchQuery}`
			)
				.then((res) => res.json())
				.then((data: Recipe[]) => {
					setRecipes(data);
				});
		} catch (error) {
			console.error(error);
		}
	}, [searchQuery]);

	return (
		<main>
			<div className="p-8">
				<form
					className="relative w-full"
					onSubmit={(e) => {
						e.preventDefault();
						setSearchQuery(inputValue);
					}}>
					<Input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						type="text"
						placeholder="What would you like to eat?"
						className="w-full rounded-full bg-primary-foreground/10 px-4 py-2 pr-12 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2"
					/>
					<Button
						type="submit"
						variant="ghost"
						size="icon"
						className="absolute right-2 top-1/2 -translate-y-1/2">
						<SearchIcon className="w-5 h-5 text-primary-foreground" />
					</Button>
				</form>
			</div>
			<div className="grid px-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{Object.prototype.hasOwnProperty.call(recipes, "error") && (
					<div className="text-center col-span-4 text-red-500">
						Failed to fetch recipes. Please try again later.
					</div>
				)}
				{Array.isArray(recipes) &&
					recipes.map((recipe) => (
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
								<div className="text-sm font-medium text-muted-foreground">
									{recipe.readyInMinutes} min
								</div>
								<Link
									href={recipe.url || "#"}
									target="_blank"
									className="text-primary"
									prefetch={false}>
									View Recipe
								</Link>
							</CardFooter>
						</Card>
					))}
			</div>
		</main>
	);
}
