import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import axios from "axios";

export default function InputFile() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/pan-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data); // Handle successful response
      alert("PAN Card uploaded successfully");
    } catch (error) {
      console.error("Error uploading PAN card:", error);
      alert("Failed to upload PAN card");
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <form onSubmit={handleSubmit}>
        <Label htmlFor="picture">Upload your PAN Card</Label>
        <Input id="picture" type="file" onChange={handleFileChange} />
        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
}
