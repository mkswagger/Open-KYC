import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function Home() {
    return <main>Heisenberg</main>;
}
