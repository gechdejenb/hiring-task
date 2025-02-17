import React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import { useGetAllFeedbacksQuery } from "../../services/feedback-api";

export default function EcommerceMetrics() {
  const { data: feedbacks, isLoading, isError, error } = useGetAllFeedbacksQuery();


  if (isLoading) {
    return <div>Loading feedback data...</div>;
  }

  if (isError) {
    console.error('Error fetching feedback data:', error);
    return <div>Error fetching feedback data: {(error as any)?.message}</div>;
  }

  const uniqueEmails = new Set(feedbacks?.map(feedback => feedback.email));
  const numberOfCustomers = uniqueEmails.size;
  const totalFeedbacks = feedbacks?.length || 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Metric Item Start */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {numberOfCustomers}
            </h4>
          </div>
        
        </div>
      </div>
      

      {/* Display Feedback Data */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Feedbacks
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalFeedbacks}
            </h4>
          </div>
        
        </div>
      </div>
    </div>
  );
}