"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { useFormik } from "formik";

const expenseSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("amount must be a number")
    .required("amount is required"),
  product: Yup.string().required("product is required"),
  category: Yup.string().required("category is required"),
});

const Expense = ({ setCreateRes }) => {
  const [allBudget, setAllBudget] = useState(null);
  const [selectedCategory, setSelectedCatgeory] = useState(null);

  const formik = useFormik({
    initialValues: {
      amount: "",
      product: "",
      category: "",
    },
    validationSchema: expenseSchema,

    onSubmit: async ({ amount, product },{resetForm}) => {
      try {
        const response = await axios.post("/api/expense/create", {
          budget: selectedCategory._id,
          product,
          amount: Number(amount),
        });
        setCreateRes(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
      resetForm()
    },
  });

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
  const handleCategoryChange = (e) => {
    formik.handleChange(e);
    getCategoryInfo(e.target.value);
  };
  const { values, errors, touched, handleChange, handleSubmit } = formik;
  return (
    <section className="dark:bg-gray-900 px-2 text-white md:flex justify-center">
        <form onSubmit={handleSubmit} className="px-5 pt-10 pb-7 grid grid-cols-2 gap-x-2">
          <div className="md:flex md:items-center mb-6 col-span-2 md:col-span-1">
            <div className="max-w-36 flex-shrink-0">
              <label
                className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Amount <span>*</span>
              </label>
            </div>
            <div className="">
              <input
                className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                id="inline-password"
                name="amount"
                type="text"
                placeholder="100"
                value={values.amount}
                onChange={handleChange}
              />
              {errors.amount && touched.amount && (
                <span className="text-sm text-red-600">{errors.amount}</span>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6 col-span-2 md:col-span-1">
            <div className="max-w-36 flex-shrink-0">
              <label
                className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="product"
              >
                Product<span>*</span>
              </label>
            </div>
            <div className="">
              <input
                className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                id="product"
                type="text"
                name="product"
                placeholder="e.g. Healthy diet"
                value={values.product}
                onChange={handleChange}
              />
              {errors.product && touched.product && (
                <span className="text-sm text-red-600">{errors.product}</span>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6 col-span-2">
            <div className="max-w-36 flex-shrink-0">
              <label
                className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Select Category<span>*</span>
              </label>
            </div>
            <div className="w-full">
              <select
                value={values.category} // Ensure the initial value is controlled
                name="category"
                onChange={handleCategoryChange}
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
              {errors.category && touched.category && (
                <span className="text-sm text-red-600">{errors.category}</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end col-span-2">
            <button
              className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
    </section>
  );
};

export default Expense;
