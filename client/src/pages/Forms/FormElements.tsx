import React, { useState } from "react";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import InputStates from "../../components/form/form-elements/InputStates";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { useSubmitFeedbackMutation } from "../../services/feedback-api"; 

export default function FormElements() {
  const [feedbackText, setFeedbackText] = useState(""); 

  // RTK Query mutation hook
  const [submitFeedback, { isLoading, isError, error }] = useSubmitFeedbackMutation();

  const imageUrl = "https://images.unsplash.com/photo-1583947581279-4eec08383c38?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const imageUrl1 = "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      alert("Please enter feedback before submitting.");
      return;
    }

    try {
      const response = await submitFeedback({ text: feedbackText }).unwrap();
      alert("Feedback submitted successfully!");
      setFeedbackText(""); 
    } catch (err) {
      console.error("Failed to submit feedback:", err); 
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <PageMeta
        title="Hiring Task"
        description="Sentiment Analysis App"
      />

      {/* Landing Page Section */}
      <div className="max-w-6xl w-full px-4 mb-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">
              Premium Hand Sanitizer
            </h1>
            <p className="text-lg text-gray-600">
              Protect yourself and others with our advanced alcohol-based formula. 
              Kills 99.9% of germs without drying your hands.
            </p>
            <Button
              children="Shop Now"
              size="md"
              variant="primary"
              className="w-fit px-8"
            />
          </div>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              src={imageUrl1}
              alt="Hand Sanitizer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Kills 99.9% Germs</h3>
            <p className="text-gray-600">Clinically proven effectiveness</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Moisturizing</h3>
            <p className="text-gray-600">Aloe vera enriched formula</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Portable</h3>
            <p className="text-gray-600">Perfect for on-the-go use</p>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="grid grid-cols-1 gap-9 xl:grid-cols-2 max-w-4xl w-full px-4">
        <div className="space-y-6">
          {/* Product Image Preview */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Description</label>
            <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700">
              This hand sanitizer is a fast-acting, alcohol-based formula that kills 99.9% of germs. 
              It is perfect for on-the-go use and leaves your hands feeling clean and refreshed.
            </div>
          </div>

          <InputStates />

          {/* Feedback Text Area */}
          <TextAreaInput
            value={feedbackText}
            onChange={(value) => setFeedbackText(value)} // Pass the value directly
            placeholder="Enter your feedback here..."
          />

          {/* Submit Button */}
          <Button
            children="Submit Feedback"
            size="md"
            variant="primary"
            disabled={isLoading}
            className="w-full"
            onClick={handleSubmit}
          />

          {/* Error Message */}
          {isError && (
            <div className="mt-5 text-center text-error-500">
              {error && "data" in error
                ? (error.data as { message: string }).message
                : "An error occurred while submitting feedback."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}