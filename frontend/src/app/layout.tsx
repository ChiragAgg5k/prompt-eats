// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { DM_Sans } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

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
			<body className={cn("antialiased", fontHeading.variable, fontBody.variable)}>{children}</body>
		</html>
	);
}
