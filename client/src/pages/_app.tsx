import CrispChat from "@/components/CrispChat";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
      <CrispChat websiteId="fdd574d2-7cd3-4841-b41d-030f50ad3aeb" />
    </div>
  );
}
