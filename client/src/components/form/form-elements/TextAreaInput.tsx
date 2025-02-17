import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";

interface TextAreaInputProps {
  value?: string;
  onChange?: (value: string) => void; 
  placeholder?: string;
}

export default function TextAreaInput({
  value: propValue = "",
  onChange: propOnChange,
  placeholder = "Enter your description here...",
}: TextAreaInputProps) {
  const [message, setMessage] = useState(propValue);

  const handleChange = (value: string) => {
    setMessage(value);
    if (propOnChange) {
      propOnChange(value); // Pass the value directly
    }
  };

  return (
    <ComponentCard title="TextArea Input">
      <div className="space-y-6">
        {/* Default TextArea */}
        <div>
          <Label>Description</Label>
          <TextArea
            value={message}
            onChange={handleChange} // Pass the value directly
            rows={6}
            placeholder={placeholder}
          />
        </div>

        

      
      </div>
    </ComponentCard>
  );
}