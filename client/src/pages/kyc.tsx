import { useState } from "react";
import Form from "@/components/kyc/Form";
import CaptureFrame from "@/components/kyc/CaptureFrame";
import VerifyAndComplete from "@/components/kyc/VerifyAndComplete";
import AadhaarVerification from "@/components/kyc/AadhaarVerification";

export default function kyc() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="max-w-[1300px] mx-auto sm:p-10 py-10 px-5 min-h-screen">
      <div className="border-b border-gray-200 pb-5 mb-5">
        <h1 className="text-2xl font-bold">Welcome to Online KYC</h1>
        <p className="font-semibold">
          Follow the steps to complete your KYC Process
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
              Personal Details
            </span>
          </span>
        </li>
        <li
          className={`flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${currentStep === 2 ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span className="me-2">2</span>
            <span className="hidden sm:inline-flex sm:ms-2">
              Aadhaar Verification
            </span>
          </span>
        </li>
        <li
          className={`flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${currentStep === 2 ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span className="me-2">3</span>
            <span className="hidden sm:inline-flex sm:ms-2">
              Video Verification
            </span>
          </span>
        </li>
        <li
          className={`flex items-center ${currentStep === 3 ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
        >
          <span className="me-2">4</span>
          KYC Confirmation
        </li>
      </ol>

      {/* Render Form or VideoFeed based on currentStep */}
      {currentStep === 1 && <Form onNextStep={handleNextStep} />}
      {currentStep === 2 && <AadhaarVerification onNextStep={handleNextStep} />}
      {currentStep === 3 && <CaptureFrame onNextStep={handleNextStep} />}
      {currentStep === 4 && <VerifyAndComplete />}
    </div>
  );
}
