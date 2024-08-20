import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import {
	AlarmClockIcon,
	SandwichIcon,
	MenuIcon,
	DessertIcon,
	PopcornIcon,
	BeerIcon,
	SearchIcon
} from "@/components/icons/index";
import { FaGithub } from "react-icons/fa";

export default async function Home() {
	// const [recipes, setRecipes] = useState([
	// 	{
	// 		id: 1,
	// 		title: "Grilled Salmon with Lemon Dill Sauce",
	// 		description:
	// 			"Tender salmon fillets grilled to perfection and topped with a bright, creamy lemon dill sauce.",
	// 		image: "/placeholder.svg",
	// 		readyInMinutes: 25
	// 	},
	// 	{
	// 		id: 2,
	// 		title: "Vegetable Stir-Fry with Tofu",
	// 		description: "A colorful and flavorful stir-fry with fresh vegetables and crispy tofu in a savory sauce.",
	// 		image: "/placeholder.svg",
	// 		readyInMinutes: 30
	// 	},
	// 	{
	// 		id: 3,
	// 		title: "Classic Beef Lasagna",
	// 		description:
	// 			"Layers of pasta, ground beef, ricotta, and melted cheese make this lasagna a family favorite.",
	// 		image: "/placeholder.svg",
	// 		readyInMinutes: 60
	// 	},
	// 	{
	// 		id: 4,
	// 		title: "Roasted Chicken with Rosemary and Garlic",
	// 		description: "Juicy, tender chicken seasoned with fragrant rosemary and garlic, roasted to perfection.",
	// 		image: "/placeholder.svg",
	// 		readyInMinutes: 45
	// 	}
	// ]);

	const recipes = (await fetch("http://localhost:3000/trending", {
		cache: "no-cache"
	}).then((res) => res.json())) as any[];
	console.log(recipes);

	return (
		<div className="flex flex-col min-h-screen bg-background">
			<header className="bg-primary text-primary-foreground py-6 px-4 md:px-8">
				<div className="max-w-5xl mx-auto flex items-center justify-between">
					<Link href="#" className="text-2xl font-bold" prefetch={false}>
						Prompt Eats
					</Link>
					<nav className="flex items-center gap-4 text-sm font-medium">
						<Link
							target="_blank"
							href="https://github.com/ChiragAgg5k/prompt-eats"
							className="hover:text-primary-foreground/80 flex items-center">
							<FaGithub className="mr-2" />
							Github
						</Link>
					</nav>
				</div>
			</header>
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 bg-primary flex items-center justify-center text-primary-foreground">
					<div className="container px-4 md:px-6 space-y-4 text-center">
						<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
							Find the perfect recipe for your next meal
						</h1>
						<p className="max-w-[600px] mx-auto text-lg md:text-xl">
							Search for recipes based on your preferences and dietary needs.
						</p>
						<div className="relative w-full max-w-md mx-auto">
							<Input
								type="text"
								placeholder="What would you like to eat?"
								className="w-full rounded-full bg-primary-foreground/10 px-4 py-2 pr-12 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2"
							/>
							<Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
								<SearchIcon className="w-5 h-5 text-primary-foreground" />
							</Button>
						</div>
					</div>
				</section>
				<section className="py-8 px-4 md:px-8">
					<div className="max-w-5xl mx-auto">
						<h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
							<Link
								href="#"
								className="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors"
								prefetch={false}>
								<AlarmClockIcon className="w-8 h-8 mb-2" />
								<span className="text-sm font-medium">Breakfast</span>
							</Link>
							<Link
								href="#"
								className="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors"
								prefetch={false}>
								<SandwichIcon className="w-8 h-8 mb-2" />
								<span className="text-sm font-medium">Lunch</span>
							</Link>
							<Link
								href="#"
								className="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors"
								prefetch={false}>
								<MenuIcon className="w-8 h-8 mb-2" />
								<span className="text-sm font-medium">Dinner</span>
							</Link>
							<Link
								href="#"
								className="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors"
								prefetch={false}>
								<DessertIcon className="w-8 h-8 mb-2" />
								<span className="text-sm font-medium">Dessert</span>
							</Link>
							<Link
								href="#"
								className="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors"
								prefetch={false}>
								<PopcornIcon className="w-8 h-8 mb-2" />
								<span className="text-sm font-medium">Snacks</span>
							</Link>
							<Link
								href="#"
								className="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors"
								prefetch={false}>
								<BeerIcon className="w-8 h-8 mb-2" />
								<span className="text-sm font-medium">Drinks</span>
							</Link>
						</div>
					</div>
				</section>
				<section className="py-8 px-4 md:px-8">
					<div className="max-w-5xl mx-auto">
						<h2 className="text-2xl font-bold mb-6">Trending Recipes</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{recipes.slice(0, 4).map((recipe) => (
								<Card key={recipe.id} className="overflow-hidden rounded-lg shadow-lg">
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
										<p className="text-muted-foreground line-clamp-2">{recipe.description}</p>
									</CardContent>
									<CardFooter className="bg-muted/20 px-4 py-2 flex justify-between items-center">
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
					</div>
				</section>
			</main>
			<footer className="bg-muted text-muted-foreground py-4 px-4 md:px-8">
				<div className="max-w-5xl mx-auto text-center text-sm">
					&copy; 2024 Prompt Eats. All rights reserved.
				</div>
			</footer>
		</div>
	);
}
