import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { AlarmClockIcon } from "@/components/icons/index";
import SearchInput from "@/components/search-input";

const popularCategories = [
	{
		name: "Breakfast",
		key: "breakfast"
	},
	{
		name: "Lunch",
		key: "lunch"
	},
	{
		name: "Dinner",
		key: "dinner"
	},
	{
		name: "Dessert",
		key: "dessert"
	},
	{
		name: "Snacks",
		key: "snacks"
	},
	{
		name: "Drinks",
		key: "drinks"
	}
];

export default async function Home() {
	let recipes = [];
	try {
		recipes = (await fetch(
			`
			${process.env.NODE_ENV === "development" ? "http://" : "https://"}
			${process.env.NEXT_PUBLIC_BACKEND_URL}/trending`,
			{
				cache: "no-cache"
			}
		).then((res) => res.json())) as any[];
	} catch (error) {
		console.error(error);
	}

	return (
		<div className="flex flex-col min-h-screen bg-background">
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 bg-primary flex items-center justify-center text-primary-foreground">
					<div className="container px-4 md:px-6 space-y-4 text-center">
						<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
							Find the perfect recipe for your next meal
						</h1>
						<p className="max-w-[600px] mx-auto text-lg md:text-xl">
							Search for recipes based on your preferences and dietary needs.
						</p>
						<SearchInput />
					</div>
				</section>
				<section className="py-8 px-4 md:px-8">
					<div className="max-w-5xl mx-auto">
						<h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
							{popularCategories.map((category) => (
								<Link
									key={category.key}
									href={`/recipes?query=${category.key}`}
									className="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors"
									prefetch={false}>
									<AlarmClockIcon className="w-8 h-8 mb-2" />
									<span className="text-sm font-medium">{category.name}</span>
								</Link>
							))}
						</div>
					</div>
				</section>
				<section className="py-8 px-4 md:px-8">
					<div className="max-w-5xl mx-auto">
						<h2 className="text-2xl font-bold mb-6">Trending Recipes</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{Object.prototype.hasOwnProperty.call(recipes, "error") && (
								<div className="w-full flex-col h-48 col-span-4 flex items-center justify-center">
									<p className="text-lg font-medium text-muted-foreground">No recipes found</p>
									<p className="text-sm mt-3">Is the backend server running?</p>
								</div>
							)}
							{Array.isArray(recipes) &&
								recipes.slice(0, 4).map((recipe) => (
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
											<p className="text-muted-foreground text-sm line-clamp-2">
												{recipe.description}
											</p>
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
