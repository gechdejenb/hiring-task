/** @format */

import { SentimentResponse } from "@/types"; 
const { SentimentAnalyzer } = require("vader-sentiment");

interface SentimentResult {
  score: number;
  comparative: number;
  tokens: string[];
  words: string[];
  positive: string[];
  negative: string[];
}

export const calculateSentiment = (text: string): string => {
  const analyzer = new SentimentAnalyzer();
  const result: SentimentResult = analyzer.polarityScores(text);
  
  // Customize these thresholds as needed
  if (result.comparative >= 0.05) return "Positive";
  if (result.comparative <= -0.05) return "Negative";
  return "Neutral";
};