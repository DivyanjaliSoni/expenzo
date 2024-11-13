"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { useFormik } from "formik";

const editBudgetSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("amount must be a number"),
  category: Yup.string(),
  label: Yup.string(),
});

const EditBudgetPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [editBudgetId, setEditBudgetId] = useState();
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editLabel, setEditLabel] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getEditedItem = async () => {
      try {
        await axios
          .post("/api/budget/getbyCategory", {
            id: id,
          })
          .then((res) => {
            console.log(res);
            setEditBudgetId(res.data.budget._id);
            setEditAmount(res.data.budget.amount);
            setEditCategory(res.data.budget.category);
            setEditLabel(res.data.budget.label);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getEditedItem();
  }, []);

  const formik = useFormik({
    initialValues: {
      amount: undefined,
      category: undefined,
      label: undefined,
    },
    validationSchema: editBudgetSchema,
    onSubmit: async ({ amount, category, label }) => {
      try {
        await axios
          .patch("/api/budget/edit", {
            id: editBudgetId,
            amount,
            category,
            label,
            user: Cookies.get("authUserId"),
          })
          .then((res) => {
            console.log(res);
            router.back();
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
    <section className=" min-h-[88.9vh] dark:bg-gray-900 py-10 px-5 ">
      <div className="pb-5">
        <h1 className="text-2xl font-bold pb-5  text-gray-800 dark:text-gray-100">
          Edit Budget
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Amount<span>*</span>
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                id="inline-password"
                type="text"
                name="amount"
                placeholder="100"
                value={values.amount ?? editAmount}
                onChange={handleChange}
              />
              {errors.amount && touched.amount && (
                <span className="text-sm text-red-600">{errors.amount}</span>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Category<span>*</span>
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                id="inline-password"
                type="text"
                name="category"
                placeholder="Grocery"
                value={values.category ?? editCategory}
                onChange={handleChange}
              />
              {errors.category && touched.category && (
                <span className="text-sm text-red-600">{errors.category}</span>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Label
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                id="inline-full-name"
                name="label"
                placeholder="e.g. Healthy diet"
                value={values.label ?? editLabel}
                onChange={handleChange}
              ></textarea>
              {errors.label && touched.label && (
                <span className="text-sm text-red-600">{errors.label}</span>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3 flex justify-between">
              <button
                onClick={() => router.back()}
                className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Back
              </button>
              <button
                className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const PageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBudgetPage />
    </Suspense>
  );
};

export default PageWrapper;
