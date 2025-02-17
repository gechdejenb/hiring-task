import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";

interface InputStatesProps {
  onEmailChange: (email: string) => void; 
}

export default function InputStates({ onEmailChange }: InputStatesProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  // Simulate a validation check
  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
    onEmailChange(value); 
  };

  return (
    <ComponentCard
      title="Product feedback"
      desc="Write feedback about our product"
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Error Input */}
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            error={error}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            hint={error ? "This is an invalid email address." : ""}
          />
        </div>
      </div>
    </ComponentCard>
  );
}