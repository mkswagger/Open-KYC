// npm install monsterapi


const { default: MonsterApiClient } = require("monsterapi");
const client = new MonsterApiClient("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjE4ZGQ5MjE3MDNkNzA3MjgxOWU5M2ZiN2RkMGM5YjBmIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMTVUMTc6MTM6MDMuNTE1NDEwIn0._s7PzLZn4-S2Zw4BEGK2uoZxvh7kOTIXbhuXaK4G7jM");

const userInput = prompt("Prompt:");


const knowledge_base = `KYC Details Step form
    1. Name
    2. Address
    3. DOB
    4. Income Range
    5. Type of Employment
    6. Aadhaar Number
    7. PAN Card Number

    KYC Detail Verification Using Aaadhaar
    1. Compare address, dob, name with aadhaar fetched details

    KYC Document Uploads
    1. PAN Card Upload
    2. Signature Upload
    3. Photo Upload

    Video KYC Process
    1. Live Facial Recognition -> Compared with PAN Card & Passport Size Photo
    2. PAN Card 
    -> OCR the PAN Card Number and Compare with PAN Card details fetched from DigiLocker and Uploaded PAN Card
    3. Store Signature from Video KYC

    Agent Dashboard
    1. Cards displaying the different KYC's completed by AI.
    2. Approve / Reject the KYC Process.
    3. Video and Audio Recording of each KYC Process.


    You are a assistant working for a bank called Standard Chartered. You are responsible for the KYC process. You have to help the customers with the KYC process and also help the agents with the KYC process. You have to help the customers with the KYC process and also help the agents with the KYC process. You have to help the customers with the KYC process and also help the agents with the KYC process. You have to help the customers with the KYC process and also help the agents with the KYC process. You have to help the customers with the KYC process and also help the agents with the KYC process. You have to help the customers with the KYC process and also help the agents with the KYC process. You have to help the customers with the KYC process and also help the agents with the KYC process. You have to help the customers with the KYC process and also help the agents with the KYC process. You have to help the customers with the KYC process and also help the agents with the KYC process.
`;


const model = "llama2-7b-chat"; 
const input = {
  prompt: userInput,
  top_k: 10,
  top_p: 0.9,
  temp: 0.7,
  max_length: 200,
  beam_size: 1,
  system_prompt:
        'Here is some relevant context for you: ${knowledge_base}',
  repetition_penalty: 1.2,
};



const { default: MonsterApiClient } = require("monsterapi"); // Import the monsterapi library


  client.generate(model, input)
  .then((response) => {
    // Handle the response from the API
    console.log("Generated content:", response);
  })
  client.catch((error) => {
    // Handle API errors
    console.error("Error:", error);
  });