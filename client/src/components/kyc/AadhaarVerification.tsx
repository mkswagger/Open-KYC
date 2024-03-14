import React from "react";
import { Button } from "../ui/button";

export default function AadhaarVerification({ onNextStep }) {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Add any validation logic here if needed

    // Call onNextStep function to proceed to the next step
    onNextStep();
  };

  return (
    <div className="text-center my-10">
      <h2>Here are the details we fetched from your Aadhaar card.</h2>
      {/* Add the onSubmit handler to the form */}
      <form onSubmit={handleSubmit}>
        <Button type="submit" className="my-2">
          Verify & Continue
        </Button>
      </form>
    </div>
  );
}
