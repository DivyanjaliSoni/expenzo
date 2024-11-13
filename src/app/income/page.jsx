"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";

const incomeSchema = Yup.object().shape({
  source: Yup.string().matches(/^[A-Za-z\s]+$/, "Source must only contain letters"),
  amount: Yup.number().required('amount is required').min(100),
});

const Income = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      source: "",
      amount: "",
    },
    validationSchema: incomeSchema,
    onSubmit: async ({ source, amount }) => {
      try {
        await axios.post("/api/income/create", {
          user: Cookies.get("authUserId"),
          source,
          amount,
        });
        router.push("/");
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const { handleChange, handleSubmit, touched, values, errors } = formik;
   
  return (
    <section className="dark:bg-gray-900 px-2 min-h-[88vh] text-white">
      <div className="px-5 py-10">
        <h1 className="text-2xl font-bold pb-5  text-gray-800 dark:text-gray-100">
          Add Income
        </h1>
        <div className="flex flex-col justify-center items-center">
          <div className="w-full md:w-[600px]">
            <form onSubmit={handleSubmit}>
              <div className="md:flex md:items-center mb-6">
                <div className="">
                  <label
                    className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    Source
                  </label>
                </div>
                <div className="w-full">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                    id="inline-full-name"
                    type="text"
                    name="source"
                    placeholder="e.g. Baap ka maal"
                    value={values.source}
                    onChange={handleChange}
                  />
                  {errors.source && touched.source && <span className="text-sm text-red-600">{errors.source}</span>}
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="">
                  <label
                    className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-password"
                  >
                    Amount
                  </label>
                </div>
                <div className="w-full">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                    id="inline-password"
                    name="amount"
                    type="text"
                    placeholder="e.g. 100"
                    value={values.amount}
                    onChange={handleChange}
                  />
                  {errors.amount && touched.amount && <span className="text-sm text-red-600">{errors.amount}</span>}
                </div>
              </div>
              <div className="md:flex md:items-center">
                <div className="w-full flex justify-between">
                  <button
                    onClick={() => router.push("/")}
                    className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Back
                  </button>
                  <button
                    className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Income;
