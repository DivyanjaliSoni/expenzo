"use client";
import { addExpense } from "@/store/expenseSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Expense = () => {
  const dispatch = useDispatch();
  const budget = useSelector((state) => state.budget.items);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    setNewAmount("");
    setNewCategory("");
    setNewLabel("");
    dispatch(
      addExpense({
        amount: newAmount,
        label: newLabel,
        category: newCategory,
      })
    );
    router.push("/");
  };
  return (
    <section className="dark:bg-gray-900 px-2 min-h-[88vh] text-white">
      <div className="px-5 py-10">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Label<span>*</span>
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
              id="inline-full-name"
              type="text"
              placeholder="e.g. Healthy diet"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Amount <span>*</span>
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
              id="inline-password"
              type="text"
              placeholder="100"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Select Category<span>*</span>
            </label>
          </div>
          <div className="md:w-2/3">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="block appearance-none w-full text-gray-800 font-bold bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              {budget &&
                budget.map((bud, index) => (
                  <option key={index}>{bud.category}</option>
                ))}
              <option value="">option1</option>
              <option>Other</option>
            </select>
          </div>
          {/* {newCategory == "Other" && (
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Define Category <span>*</span>
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                  id="inline-password"
                  type="text"
                  placeholder="100"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
            </div>
          )} */}
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
              onClick={handleSubmit}
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

export default Expense;