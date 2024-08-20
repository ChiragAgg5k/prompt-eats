"use client";

import { useState } from "react";
import { SearchIcon } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function SearchInput() {
	const [search, setSearch] = useState("");
	const router = useRouter();

	return (
		<form
			className="relative w-full max-w-md mx-auto"
			onSubmit={(e) => {
				e.preventDefault();

				if (search.trim() === "") return;

				router.push(`/recipes?query=${search}`);
			}}>
			<Input
				onChange={(e) => setSearch(e.target.value)}
				type="text"
				placeholder="What would you like to eat?"
				className="w-full rounded-full bg-primary-foreground/10 px-4 py-2 pr-12 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2"
			/>
			<Button type="submit" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
				<SearchIcon className="w-5 h-5 text-primary-foreground" />
			</Button>
		</form>
	);
}
