// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { DM_Sans } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Link from "next/link";
import { FaGithub, FaGlobe } from "react-icons/fa";

const fontHeading = DM_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-heading"
});

const fontBody = Space_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-body",
	weight: ["400", "700"]
});

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<html lang="en">
			<body className={cn("antialiased", fontHeading.variable, fontBody.variable)}>
				<header className="bg-primary text-primary-foreground py-6 px-4 md:px-8">
					<div className="max-w-5xl mx-auto flex items-center justify-between">
						<Link href="/" className="text-2xl font-bold" prefetch={false}>
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
							<Link
								target="_blank"
								href="/live-recipes"
								className="hover:text-primary-foreground/80 flex items-center">
								<FaGlobe className="mr-2" />
								Live Recipes
							</Link>
						</nav>
					</div>
				</header>
				{children}
			</body>
		</html>
	);
}
