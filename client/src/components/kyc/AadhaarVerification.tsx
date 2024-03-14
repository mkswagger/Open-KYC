import React from "react";
import styled from "styled-components";
import { Button } from "../ui/button";

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

export default function AadhaarVerification({ onNextStep }: { onNextStep: () => void }) {
  const onSubmit = () => {
    onNextStep();
  };

  const data = JSON.parse(localStorage.getItem('aadhar-data') || '{}');

  return (
    <AadhaarContainer>
      <h2>Here are the details we fetched from your Aadhaar card:</h2>
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
      <Button className="my-10" onClick={onSubmit}>Verify & Continue</Button>
    </AadhaarContainer>
  );
}
