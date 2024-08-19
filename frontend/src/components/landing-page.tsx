/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lsAJWDcw5Bm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

export default function LandingPage() {
	const [prompt, setPrompt] = useState("");
	const [recipes, setRecipes] = useState([
		{
			id: 1,
			title: "Grilled Salmon with Lemon Dill Sauce",
			description:
				"Tender salmon fillets grilled to perfection and topped with a bright, creamy lemon dill sauce.",
			image: "/placeholder.svg",
			readyInMinutes: 25
		},
		{
			id: 2,
			title: "Vegetable Stir-Fry with Tofu",
			description: "A colorful and flavorful stir-fry with fresh vegetables and crispy tofu in a savory sauce.",
			image: "/placeholder.svg",
			readyInMinutes: 30
		},
		{
			id: 3,
			title: "Classic Beef Lasagna",
			description:
				"Layers of pasta, ground beef, ricotta, and melted cheese make this lasagna a family favorite.",
			image: "/placeholder.svg",
			readyInMinutes: 60
		},
		{
			id: 4,
			title: "Roasted Chicken with Rosemary and Garlic",
			description: "Juicy, tender chicken seasoned with fragrant rosemary and garlic, roasted to perfection.",
			image: "/placeholder.svg",
			readyInMinutes: 45
		}
	]);
	const handleSearch = async () => {
		try {
			const response = await fetch("YOUR_API_URL");
			const data = await response.json();
			setRecipes(data);
		} catch (error) {
			console.error("Error fetching recipes:", error);
		}
	};
	return (
		<div className="flex flex-col min-h-screen bg-background">
			<header className="bg-primary text-primary-foreground py-6 px-4 md:px-8">
				<div className="max-w-5xl mx-auto flex items-center justify-between">
					<Link href="#" className="text-2xl font-bold" prefetch={false}>
						Prompt Eats
					</Link>
					<nav className="flex items-center gap-4 text-sm font-medium">
						<Link href="#" className="hover:text-primary-foreground/80" prefetch={false}>
							Recipes
						</Link>
						<Link href="#" className="hover:text-primary-foreground/80" prefetch={false}>
							About
						</Link>
						<Link href="#" className="hover:text-primary-foreground/80" prefetch={false}>
							Contact
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
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleSearch();
									}
								}}
							/>
							<Button
								variant="ghost"
								size="icon"
								className="absolute right-2 top-1/2 -translate-y-1/2"
								onClick={handleSearch}>
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
										src="/placeholder.svg"
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
										<Link href="#" className="text-primary" prefetch={false}>
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

function AlarmClockIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<circle cx="12" cy="13" r="8" />
			<path d="M12 9v4l2 2" />
			<path d="M5 3 2 6" />
			<path d="m22 6-3-3" />
			<path d="M6.38 18.7 4 21" />
			<path d="M17.64 18.67 20 21" />
		</svg>
	);
}

function BeerIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M17 11h1a3 3 0 0 1 0 6h-1" />
			<path d="M9 12v6" />
			<path d="M13 12v6" />
			<path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z" />
			<path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
		</svg>
	);
}

function DessertIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<circle cx="12" cy="4" r="2" />
			<path d="M10.2 3.2C5.5 4 2 8.1 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4 0c0-4.9-3.5-9-8.2-9.8" />
			<path d="M3.2 14.8a9 9 0 0 0 17.6 0" />
		</svg>
	);
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	);
}

function PopcornIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" />
			<path d="M10 22 9 8" />
			<path d="m14 22 1-14" />
			<path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z" />
		</svg>
	);
}

function SandwichIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3" />
			<path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83" />
			<path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z" />
			<path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z" />
		</svg>
	);
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}
