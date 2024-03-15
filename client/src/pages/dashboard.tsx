import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const services = [
    {
      heading: "Fill your Personal Details",
      description:
        "Provide your personal information such as name, address, and contact details.",
    },
    {
      heading: "Upload your Documents",
      description:
        "Upload necessary documents such as aadhaar card, pan card, and any other required documents.",
    },
    {
      heading: "Verify Aadhaar Details",
      description: "Verify your Aadhaar details to confirm your identity.",
    },
    {
      heading: "Video KYC Document Verification",
      description:
        "Undergo a video KYC (Know Your Customer) process for document verification.",
    },
  ];

  const speakMessage = (message) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = message;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  const startVoice = () => {
    // Manually start the voice synthesis
    speakMessage("Fill your personal details and upload your documents");
    speakMessage(
      "After completing the form, say next to proceed to the next step"
    );
  };

  return (
    <div className="max-w-[1300px] mx-auto sm:p-10 py-10 px-5 min-h-screen">
      <Navbar />
      <main>
        <div className="flex flex-col items-center my-40">
          <h2 className="text-2xl font-semibold mb-4">KYC Process Explained</h2>
          <div className="flex flex-wrap justify-between mb-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="max-w-[280px] border border-accent-2 bg-accent-2/10 hover:bg-accent-2/20 hover:border-accent-2 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 rounded-lg p-5 mx-2 "
              >
                <h4 className="text-xl font-bold mb-1">{service.heading}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
          <section>
            <div></div>
            <Button asChild onClick={startVoice}>
              <Link href="/kyc">Start your KYC</Link>
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
