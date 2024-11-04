// src/app/expense/page.jsx
"use client"; // Necessary for using hooks
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

// ExpenseForm component to handle the form submission
const ExpenseForm = ({ setCreateRes, allBudget }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post("/api/expense/create", {
        budget: selectedCategory?._id, // Use optional chaining for safety
        product,
        amount: Number(amount),
      });
      setCreateRes(response.data); // Pass the response data back
      setCategory('');
      setAmount('');
      setProduct('');
      setSelectedCategory(null); // Reset selected category
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const getCategoryInfo = (categoryName) => {
    setSelectedCategory(
      allBudget.find((category) => category.category === categoryName)
    );
  };

  return (
    <section className="dark:bg-gray-900 px-2 text-white">
      <form onSubmit={handleSubmit} className="px-5 pt-10 pb-7">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="amount"
            >
              Amount <span>*</span>
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              id="amount"
              type="text"
              placeholder="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="product"
            >
              Product <span>*</span>
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              id="product"
              type="text"
              placeholder="e.g. Healthy diet"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="category"
            >
              Select Category <span>*</span>
            </label>
          </div>
          <div className="md:w-2/3">
            <select
              id="category"
              value={category || ""}
              onChange={(e) => {
                getCategoryInfo(e.target.value);
                setCategory(e.target.value);
              }}
              className="block appearance-none w-full text-gray-800 font-bold bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>
                Select Category...
              </option>
              {allBudget?.map((budget) => (
                <option key={budget._id} value={budget.category}>
                  {budget.category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3 flex justify-end">
            <button
              className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

// Main Expense component that handles budget fetching and renders the form
const Expense = ({ setCreateRes }) => {
  const [allBudget, setAllBudget] = useState(null);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.post("/api/budget/getall", {
          id: Cookies.get("authUserId"),
        });
        if (response && response.data) {
          setAllBudget(response.data.budgets);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchBudget();
  }, []);

  return <ExpenseForm setCreateRes={setCreateRes} allBudget={allBudget} />;
};

export default Expense;
