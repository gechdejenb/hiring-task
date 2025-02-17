import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useGetAllFeedbacksQuery } from "../../services/feedback-api";

interface FeedbackData {
  id: string;
  text: string;
  email: string;
  sentiment: string;
  createdAt: string;
  image: string;
  productName: string;
}

const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1583947581279-4eec08383c38?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export default function RecentFeedbacks() {
  const { data: feedbacks, isLoading, isError, error } = useGetAllFeedbacksQuery();
  const [filteredData, setFilteredData] = useState<FeedbackData[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    if (feedbacks) {
      const formattedFeedbacks = feedbacks.map((feedback) => ({
        id: feedback.uuid,
        text: feedback.text,
        email: feedback.email || "Anonymous",
        sentiment: feedback.sentiment,
        createdAt: new Date(feedback.createdAt).toLocaleDateString(),
        image: DEFAULT_IMAGE_URL,
        productName: "Hand Sanitizer",
      }));
      
      // Set the original formatted data and apply the active filter
      setFilteredData(activeFilter 
        ? formattedFeedbacks.filter(item => item.sentiment === activeFilter) 
        : formattedFeedbacks
      );
    }
  }, [feedbacks, activeFilter]);

  if (isLoading) {
    return <div>Loading feedback data...</div>;
  }

  if (isError) {
    console.error('Error fetching feedback data:', error);
    return (
      <div>Error fetching feedback data: {(error as Error)?.message}</div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Recent Feedbacks
        </h3>
        <div className="flex items-center gap-3">
          {/* Filter buttons with click handlers */}
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200" onClick={() => setActiveFilter('positive')}>
            Filter Positive
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200" onClick={() => setActiveFilter('negative')}>
            Filter Negative
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200" onClick={() => setActiveFilter(null)}>
            Clear Filters
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader>Product Name</TableCell>
              <TableCell isHeader>Product Image</TableCell>
              <TableCell isHeader>Feedback</TableCell>
              <TableCell isHeader>Email</TableCell>
              <TableCell isHeader>Sentiment</TableCell>
              <TableCell isHeader>Created At</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredData.map((feedback) => (
              <TableRow key={feedback.id} className="">
                <TableCell className="py-3">{feedback.productName}</TableCell>
                <TableCell className="py-3">
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                    <img
                      src={feedback.image}
                      className="h-[50px] w-[50px]"
                      alt="Product"
                    />
                  </div>
                </TableCell>
                <TableCell className="py-3">{feedback.text}</TableCell>
                <TableCell className="py-3">{feedback.email}</TableCell>
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={
                      feedback.sentiment === "positive"
                        ? "success"
                        : feedback.sentiment === "negative"
                        ? "error"
                        : "warning"
                    }
                  >
                    {feedback.sentiment}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">{feedback.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}