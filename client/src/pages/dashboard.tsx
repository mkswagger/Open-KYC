import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="max-w-[1300px] mx-auto sm:p-10 py-10 px-5 min-h-screen">
      <Navbar />
      <main>
        <div>
          <h2>KYC Process Explained</h2>
          <section>
            <div></div>
            <Button asChild>
              <Link href="/kyc">Start your KYC</Link>
            </Button>
          </section>
        </div>
        <div>
          <h2 className="text-xl font-bold border-b border-gray-200">
            KYC Status
          </h2>
        </div>
      </main>
      <Footer />
    </div>
  );
}
