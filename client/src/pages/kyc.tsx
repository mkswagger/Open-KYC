import { useState, useEffect } from "react";
import Form from "@/components/kyc/Form";
import CaptureFrame from "@/components/kyc/CaptureFrame";
import VerifyAndComplete from "@/components/kyc/VerifyAndComplete";
import AadhaarVerification from "@/components/kyc/AadhaarVerification";
import TranslateButton from "@/components/translations/TranslateButton";
import "@/components/translations/Translations";
import { useTranslation } from "react-i18next";

export default function KYC() {
  const [currentStep, setCurrentStep] = useState(1);
  const { t } = useTranslation();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // useEffect(() => {
  //   if (currentStep === 1) {
  //     speakMessage("Fill your personal details and upload your documents");
  //   }
  // }, [currentStep]);

  // const speakMessage = (message) => {
  //   if (typeof window !== "undefined" && window.speechSynthesis) {
  //     const speech = new SpeechSynthesisUtterance();
  //     speech.text = message;
  //     speech.volume = 1;
  //     speech.rate = 1;
  //     speech.pitch = 1;
  //     window.speechSynthesis.speak(speech);
  //   }
  // };

  // const startVoice = () => {
  //   // Manually start the voice synthesis
  //   speakMessage("Fill your personal details and upload your documents");
  // };

  return (
    <div className="max-w-[1300px] mx-auto sm:p-10 py-10 px-5 min-h-screen">
      <TranslateButton />
      <div className="border-b border-gray-200 pb-5 mb-5">
        <h1 className="text-2xl font-bold">{t("Welcome to Online KYC")}</h1>
        <p className="font-semibold">
          {t("Follow the steps to complete your KYC Process")}
        </p>
      </div>
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        <li
          className={`flex md:w-full items-center ${currentStep === 1 ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="hidden sm:inline-flex sm:ms-2">
              {t("Personal Details")}
            </span>
          </span>
        </li>
        <li
          className={`flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${currentStep === 2 ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span className="me-2">2</span>
            <span className="hidden sm:inline-flex sm:ms-2">
              {t("Aadhaar Verification")}
            </span>
          </span>
        </li>
        <li
          className={`flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${currentStep === 2 ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span className="me-2">3</span>
            <span className="hidden sm:inline-flex sm:ms-2">
              {t("Video Verification")}
            </span>
          </span>
        </li>
        <li
          className={`flex items-center ${currentStep === 3 ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
        >
          <span className="me-2">4</span>
          {t("KYC Confirmation")}
        </li>
      </ol>

      {currentStep === 1 && <Form onNextStep={handleNextStep} />}
      {currentStep === 2 && <AadhaarVerification onNextStep={handleNextStep} />}
      {currentStep === 3 && <CaptureFrame onNextStep={handleNextStep} />}
      {currentStep === 4 && <VerifyAndComplete />}
      {/* <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={startVoice}
      >
        Start Voice
      </button> */}
    </div>
  );
}
