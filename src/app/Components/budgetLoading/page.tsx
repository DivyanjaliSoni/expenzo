import React from "react";

const HomeLoading = () => {
  return (
    <table className="w-full">
      <thead className="font-bold dark:bg-gray-400 bg-gray-500 text-white">
        <tr>
          <td>Category</td>
          <td>Budget</td>
          <td>Balance</td>
        </tr>
      </thead>
      <tbody>
        <tr className="my-2">
          <td className="border-r-2 border-gray-100 dark:border-gray-800">
            <div className="bg-gray-300 dark:bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="border-r-2 border-gray-100 dark:border-gray-800">
            <div className="bg-gray-300 dark:bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="border-r-2 border-gray-100 dark:border-gray-800">
            <div className="bg-gray-300 dark:bg-gray-500 min-h-8 w-full"></div>
          </td>
        </tr>
        <tr className="my-2">
          <td className="border-r-2 border-gray-100 dark:border-gray-800">
            <div className="bg-gray-300 dark:bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="border-r-2 border-gray-100 dark:border-gray-800">
            <div className="bg-gray-300 dark:bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="border-r-2 border-gray-100 dark:border-gray-800">
            <div className="bg-gray-300 dark:bg-gray-500 min-h-8 w-full"></div>
          </td>
        </tr>
        <tr className="my-2">
          <td className="border-r-2 border-gray-100 dark:border-gray-800">
            <div className="bg-gray-300 dark:bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="border-r-2 border-gray-100 dark:border-gray-800">
            <div className="bg-gray-300 dark:bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="border-r-2 border-gray-100 dark:border-gray-800">
            <div className="bg-gray-300 dark:bg-gray-500 min-h-8 w-full"></div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default HomeLoading;
