import React from "react";
import styled from "styled-components";
import { Button } from "../ui/button";
import "@/components/translations/Translations";
import { useTranslation } from "react-i18next";

const AadhaarContainer = styled.div`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const AadhaarDetails = styled.div`
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Field = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  margin-left: 10px;
`;

export default function AadhaarVerification({
  onNextStep,
}: {
  onNextStep: () => void;
}) {
  const { t } = useTranslation();
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

  const onSubmit = () => {
    onNextStep();
    speakMessage(
      "Position your face in the center of the frame and click the capture button to take a picture of your face. After capturing the picture, proceed to the next step.",
    );
  };

  const data = JSON.parse(localStorage.getItem("aadhar-data") || "{}");

  return (
    <AadhaarContainer>
      <h2 className="text-lg font-semibold mb-4">
        {t("Here are the details we fetched from your Aadhaar card:")}
      </h2>
      <AadhaarDetails>
        <Field>
          <Label>UID:</Label>
          <Value>{data.uid}</Value>
        </Field>
        <Field>
          <Label>Name:</Label>
          <Value>{data.name}</Value>
        </Field>
        <Field>
          <Label>Care Of:</Label>
          <Value>{data.careOf}</Value>
        </Field>
        <Field>
          <Label>Building:</Label>
          <Value>{data.building}</Value>
        </Field>
        <Field>
          <Label>Street:</Label>
          <Value>{data.street}</Value>
        </Field>
        <Field>
          <Label>Landmark:</Label>
          <Value>{data.landmark}</Value>
        </Field>
        <Field>
          <Label>Locality:</Label>
          <Value>{data.locality}</Value>
        </Field>
        <Field>
          <Label>VTC Name:</Label>
          <Value>{data.vtcName}</Value>
        </Field>
        <Field>
          <Label>PO Name:</Label>
          <Value>{data.poName}</Value>
        </Field>
        <Field>
          <Label>District Name:</Label>
          <Value>{data.districtName}</Value>
        </Field>
        <Field>
          <Label>State Name:</Label>
          <Value>{data.stateName}</Value>
        </Field>
        <Field>
          <Label>Pincode:</Label>
          <Value>{data.pincode}</Value>
        </Field>
      </AadhaarDetails>
      <Button className="my-10 bg-blue-600" onClick={onSubmit}>
        {t("Verify & Continue")}
      </Button>
    </AadhaarContainer>
  );
}
