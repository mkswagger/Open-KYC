import * as xml2js from "xml2js";

export const xmlToJson = (xml: string) => {
  let json = {};
  const data = xml2js.parseString(xml, (err: any, result: any) => {
    if (err) {
      console.error("Error parsing XML:", err);
      return;
    }

    const qr_json = {
      uid: result.PrintLetterBarcodeData.$.uid,
      name: result.PrintLetterBarcodeData.$.name,
      careOf: result.PrintLetterBarcodeData.$.careOf,
      building: result.PrintLetterBarcodeData.$.building,
      street: result.PrintLetterBarcodeData.$.street,
      landmark: result.PrintLetterBarcodeData.$.landmark,
      locality: result.PrintLetterBarcodeData.$.locality,
      vtcName: result.PrintLetterBarcodeData.$.vtcName,
      poName: result.PrintLetterBarcodeData.$.poName,
      districtName: result.PrintLetterBarcodeData.$.districtName,
      stateName: result.PrintLetterBarcodeData.$.stateName,
      pincode: result.PrintLetterBarcodeData.$.pincode,
    };
    json = qr_json;
  });
  return json;
};
