import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function Home() {
    return (
        <main
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
            <Button>Click me</Button>
            Heisenberg
        </main>
    );
}
