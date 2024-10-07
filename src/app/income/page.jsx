"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateIncome } from "../../store/incomeSlice";
import { useRouter } from "next/navigation";

const Income = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [newSource, setNewSource] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleUpdateIncome = () => {
    dispatch(updateIncome({ source: newSource, amount: newAmount }));
    router.push("/");
  };
  return (
    <section className="dark:bg-gray-900 px-2 min-h-[88vh] text-white">
      <div className="px-5 py-10">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Source
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
              id="inline-full-name"
              type="text"
              placeholder="e.g. Baap ka maal"
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Amount
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
              id="inline-password"
              type="text"
              placeholder="e.g. 100"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3 flex justify-between">
            <button
              onClick={() => router.push("/")}
              className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Back
            </button>
            <button
              onClick={handleUpdateIncome}
              className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Income;
