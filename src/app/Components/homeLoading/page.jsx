import React from "react";

const HomeLoading = () => {
  return (
    <table className="w-full">
      <thead className="font-bold dark:bg-gray-400 bg-gray-500 text-white">
        <tr>
          <td>Product</td>
          <td>Category</td>
          <td>Amount</td>
          <td>Date</td>
        </tr>
      </thead>
      <tbody>
        <tr className="my-2">
          <td>
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td>
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="text-red-400 font-bold">
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="text-red-400 font-bold">
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
        </tr>
        <tr className="my-2">
          <td>
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td>
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="text-red-400 font-bold">
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="text-red-400 font-bold">
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
        </tr>
        <tr className="my-2">
          <td>
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td>
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="text-red-400 font-bold">
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
          <td className="text-red-400 font-bold">
            <div className="bg-gray-500 min-h-8 w-full"></div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default HomeLoading;
