import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translationJSON = {
  en: {
    translation: {
      "Welcome to Online KYC": "Welcome to Online KYC",
      "Follow the steps to complete your KYC Process":
        "Follow the steps to complete your KYC Process",
      "Personal Details": "Personal Details",
      "Fill your personal details and upload your documents.":
        "Fill your personal details and upload your documents.",
      "After completing the form, say next to proceed to the next step.":
        "After completing the form, say next to proceed to the next step.",
      "Full Name": "Full Name",
      Address: "Address",
      "Email Address": "Email Address",
      "Income Range": "Income Range",
      "Employment Type": "Employment Type",
      "Aadhaar Number": "Aadhaar Number",
      "PAN Card Number": "PAN Card Number",
      "Save & Continue": "Save & Continue",
      "Aadhar Card": "Aadhar Card",
      "Pan Card": "Pan Card",
      "Upload Aadhaar": "Upload Aadhaar",
      "Upload PAN Card": "Upload PAN Card",
      "Upload Passport Size Photo": "Upload Passport Size Photo",
      "Upload Signature": "Upload Signature",
      "Here are the details we fetched from your Aadhaar card:":
        "Here are the details we fetched from your Aadhaar card:",
      Next: "Next",
      "Verify & Continue": "Verify & Continue",
      "Take a Live Photograph": "Take a Live Photograph",
      "Position your face inside the rectangle":
        "Position your face inside the rectangle",
      "Capture Frame": "Capture Frame",
      Retake: "Retake",
      "Save and Continue": "Save and Continue",
      "Image Captured": "Image Captured",
      "Take a PAN Card Photograph": "Take a PAN Card Photograph",
      "Position your PAN Card inside the rectangle for photo":
        "Position your PAN Card inside the rectangle for photo",
      "Take a Aadhaar Photograph": "Take a Aadhaar Photograph",
      "Position your Aadhaar inside the rectangle for photo":
        "Position your Aadhaar inside the rectangle for photo",
      "KYC Process Completed!": "KYC Process Completed!",
      "Congrats your KYC Process has been completed.":
        "Congrats your KYC Process has been completed.",
      "Your KYC Status will be updated after inspection.":
        "Your KYC Status will be updated after inspection.",
      "Return to Dashboard": "Return to Dashboard",
      "Aadhaar Verification": "Aadhaar Verification",
      "Video Verification": "Video Verification",
      "KYC Confirmation": "KYC Confirmation",
      "File uploaded successfully": "File uploaded successfully",
      Submit: "Submit",
    },
  },
  hi: {
    translation: {
      "Welcome to Online KYC": "ऑनलाइन KYC में आपका स्वागत है",
      "Follow the steps to complete your KYC Process":
        "अपनी KYC प्रक्रिया को पूरा करने के लिए चरणों का पालन करें",
      "Personal Details": "व्यक्तिगत विवरण",
      "Fill your personal details and upload your documents.":
        "अपना व्यक्तिगत विवरण भरें और अपने दस्तावेज़ अपलोड करें।",
      "After completing the form, say next to proceed to the next step.":
        "फ़ॉर्म पूरा करने के बाद, अगले कदम के लिए अगला बोलें।",
      "Full Name": "पूरा नाम",
      Address: "पता",
      "Email Address": "ईमेल पता",
      "Income Range": "आय सीमा",
      "Employment Type": "रोजगार प्रकार",
      "Aadhaar Number": "आधार संख्या",
      "PAN Card Number": "पैन संख्या",
      "Save & Continue": "सहेजें और जारी रखें",
      "Aadhar Card": "आधार कार्ड",
      "Pan Card": "पैन कार्ड",
      "Upload Aadhaar": "आधार अपलोड करें",
      "Upload PAN Card": "पैन कार्ड अपलोड करें",
      "Upload Passport Size Photo": "पासपोर्ट साइज़ फोटो अपलोड करें",
      "Upload Signature": "हस्ताक्षर अपलोड करें",
      "Here are the details we fetched from your Aadhaar card:":
        "यहाँ वह विवरण हैं जो हमने आपके आधार कार्ड से प्राप्त किए हैं:",
      Next: "आगे",
      "Verify & Continue": "सत्यापित करें और जारी रखें",
      "Take a Live Photograph": "लाइव फोटो लें",
      "Position your face inside the rectangle":
        "आपका चेहरा आयत में स्थित करें",
      "Capture Frame": "फ्रेम कैप्चर करें",
      Retake: "पुनः लें",
      "Save and continue": "सहेजें और जारी रखें",
      "Image Captured": "छवि सफलतापूर्वक मेल खाती है",
      "Take a PAN Card Photograph": "पैन कार्ड की फोटो लें",
      "Position your PAN Card inside the rectangle for photo":
        "फोटो के लिए आपका पैन कार्ड आयत में स्थित करें",
      "Take a Aadhaar Photograph": "आधार कार्ड की फोटो लें",
      "Position your Aadhaar inside the rectangle for photo":
        "फोटो के लिए आपका आधार आयत में स्थित करें",
      "KYC Process Completed!": "KYC प्रक्रिया पूरी हो गई!",
      "Congrats your KYC Process has been completed.":
        "बधाई हो! आपकी KYC प्रक्रिया पूरी हो गई है।",
      "Your KYC Status will be updated after inspection.":
        "आपकी KYC स्थिति जाँच के बाद अपडेट की जाएगी।",
      "Return to Dashboard": "डैशबोर्ड पर वापस जाएं",
      "Aadhaar Verification": "आधार सत्यापन",
      "Video Verification": "वीडियो सत्यापन",
      "KYC Confirmation": "KYC पुष्टि",
      "File uploaded successfully": "फ़ाइल सफलतापूर्वक अपलोड की गई",
      Submit: "प्रस्तुत करें",
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: translationJSON,
  lng: "en",
});

export default i18n;
