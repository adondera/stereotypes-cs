import React from "react";
import SignatureField from "react-signature-canvas";

const Footer = () => {
  return (
    <div className="Footer">
      <label>Name of minor</label>
      <input type="text" placeholder="Joe Doe"></input>
      <label>Name of guardian</label>
      <input type="text" placeholder="Joe Doe's father"></input>
      <SignatureField
        penColor="green"
        canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
      ></SignatureField>
    </div>
  );
};

export default Footer;
