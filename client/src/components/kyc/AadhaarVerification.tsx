import React from "react";
import { Button } from "../ui/button";

export default function AadhaarVerification() {
  return (
    <div className="text-center my-10">
      <h2>Here are the details we fetched from your aadhaar card.</h2>
      {}
      <Button className="my-2">Verify & Continue</Button>
    </div>
  );
}
