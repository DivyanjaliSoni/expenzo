"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

const Expense = ({setAddExpense}) => {
  const [allBudget, setAllBudget] = useState();
  const [selectedCategory, setSelectedCatgeory] = useState();
  const [Category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const handleSubmit = async () => {
    try {
       await axios.post("/api/expense/create", {
        budget: selectedCategory._id,
        product,
        amount: Number(amount),
      })
      toast.success("Expense added")
        setCategory('')
        setAmount('')
        setProduct('')
        setAddExpense(false)
    } catch (error) {
      setAddExpense(false)
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

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

  const getCategoryInfo = (categoryName) => {
    setSelectedCatgeory(
      allBudget.find((category) => category.category === categoryName)
    );
  };
  return (
    <section className="dark:bg-gray-900 px-2  text-white">
      <div className="px-5 pt-10 pb-7">
        {/* <h1 className="text-2xl font-bold pb-5  text-gray-800 dark:text-gray-100">
          Add Expenses
        </h1> */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="product"
            >
              Product<span>*</span>
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
              id="product"
              type="text"
              placeholder="e.g. Healthy diet"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Select Category<span>*</span>
            </label>
          </div>
          <div className="md:w-2/3">
            <select
              value={Category || ""} // Ensure the initial value is controlled
              onChange={(e) => {
                getCategoryInfo(e.target.value);
                setCategory(e.target.value);
              }}
              className="block appearance-none w-full text-gray-800 font-bold bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>
                Select Category...
              </option>
              {/* <option value="other">Other</option> */}
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
          <div className="md:w-2/3 flex justify-between">
            <button
              onClick={() => setAddExpense(false)}
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
      <ToastContainer theme="dark"/>
    </section>
  );
};

export default Expense;
