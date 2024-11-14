"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import BudgetLoading from "../Components/budgetLoading/page";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";

const budgetSchema = Yup.object().shape({
  amount: Yup.number().typeError("Amount must be a number").required(),
  category: Yup.string().required(),
  label: Yup.string(),
});

const Budget = () => {
  const router = useRouter();
  const [budget, setBudget] = useState();
  const [totalBudget, setTotalBudget] = useState();
  const [totalRemainingBudget, setTotalRemainingBudget] = useState();
  const [deleteBudgetId, setdeleteBudgetId] = useState();
  const [loading, setLoading] = useState(false);
  const [showDelConfirmationPopUp, setShowDelConfirmationPopUp] =
    useState(false);

  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      label: "",
    },

    validationSchema: budgetSchema,

    onSubmit: async ({ amount, category, label }, { resetForm }) => {
      try {
        await axios
          .post("/api/budget/create", {
            user: Cookies.get("authUserId"),
            category,
            label,
            amount,
          })
          .then((res) => {
            toast.success("Budget added successfully")
            setBudget((prevItems) => [
              ...prevItems,
              {
                ...res.data.budget,
                remainingAmount: amount,
              },
            ]);
          })
          .catch((err) => {
            if (err.status === 409) {
              toast.error("Budget already created");
            }
            console.log(err);
          });
      } catch (error) {
        toast.error(error);
      }
      resetForm();
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;
  const fetchBudget = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/budget/getall", {
        id: Cookies.get("authUserId"),
      });

      if (response && response.data) {
        const updatedBudgets = response.data.budgets.map((budget) => {
          const totalExpenses = budget.expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
          );
          const remainingAmount = budget.amount - totalExpenses;

          return {
            ...budget,
            remainingAmount,
          };
        });
        setLoading(false);
        setBudget(updatedBudgets);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchBudget();
  }, []);

  useEffect(() => {
    const totalBudget = budget?.reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );
    const totalRemainingBudget = budget?.reduce(
      (acc, item) => acc + Number(item.remainingAmount),
      0
    );
    setTotalBudget(totalBudget);
    setTotalRemainingBudget(totalRemainingBudget);
  }, [budget]);

  const deleteBudget = async () => {
      try {
        await axios
          .post("/api/budget/delete", {
            budgetId:deleteBudgetId,
          })
          .then((res) => {
            fetchBudget()
            console.log(res.data.remainingBudgets);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    toast.success("Budget deleted");
  };

  return (
    <>
      <section
        className={` dark:bg-gray-900 py-10 px-5 relative ${
          showDelConfirmationPopUp
            ? "h-[88.9vh] overflow-hidden"
            : "min-h-[88.9vh]"
        }`}
      >
        <div className="pb-5">
          <h1 className="text-2xl font-bold pb-5  text-gray-800 dark:text-gray-100">
            Add Budget
          </h1>

          <form
            onSubmit={handleSubmit}
            className="md:px-5 pb-7 grid grid-cols-2 gap-x-2 max-w-[600px] mx-auto"
          >
            <div className="md:flex md:items-center mb-6 col-span-2 md:col-span-1">
              <div className="">
                <label
                  className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Amount<span>*</span>
                </label>
              </div>
              <div className="w-full">
                <input
                  className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                  id="inline-password"
                  type="text"
                  name="amount"
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
              <div className="">
                <label
                  className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Category<span>*</span>
                </label>
              </div>
              <div className="w-full">
                <input
                  className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                  id="inline-password"
                  type="text"
                  name="category"
                  placeholder="Grocery"
                  value={values.category}
                  onChange={handleChange}
                />
                {errors.category && touched.category && (
                  <span className="text-sm text-red-600">
                    {errors.category}
                  </span>
                )}
              </div>
            </div>
            <div className="md:flex md:items-center mb-6 col-span-2">
              <div className="">
                <label
                  className="block dark:text-gray-200 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Label
                </label>
              </div>
              <div className="w-full">
                <textarea
                  className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                  id="inline-full-name"
                  placeholder="e.g. Healthy diet"
                  name="label"
                  value={values.label}
                  onChange={handleChange}
                ></textarea>
                {errors.label && touched.label && (
                  <span className="text-sm text-red-600">{errors.label}</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end col-span-2">
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
        {showDelConfirmationPopUp && (
          <div className="delete-confirmation-popup min-h-screen fixed top-0 left-0 w-full flex justify-center items-center  ">
            <div className="py-5 px-3 w-80 bg-white shadow-[0_0_12px_5px_rgba(0,0,0,0.1)] mx-auto rounded-md dark:bg-gray-600">
              <div className="mb-3 text-center text-gray-600 dark:text-white">
                <p>Are You sure you want to delete the Budget?</p>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowDelConfirmationPopUp(false)}
                  className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded dark:bg-gray-500"
                >
                  Cancel
                </button>
                <button onClick={()=>{
                  setShowDelConfirmationPopUp(false)
                  deleteBudget()
                }} className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded dark:bg-gray-500">
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="pt-5">
          <div className="border-b border-gray-500 dark:border-gray-200 mb-5">
            <h3 className="text-xl font-bold pb-2">Budget List</h3>
          </div>
          <div>
            <div>
              {loading ? (
                <BudgetLoading />
              ) : (
                <table className="w-full">
                  <thead className="font-bold dark:bg-gray-400 bg-gray-500 text-white">
                    <tr>
                      <td>Category</td>
                      <td>Budget</td>
                      <td>Balance</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody className="dark:text-white text-gray-800">
                    {budget &&
                      budget.map((bud, index) => (
                        <tr className="my-2" key={index}>
                          <td>{bud.category}</td>
                          <td
                            className={` ${
                              bud.amount < 1 ? "text-red-600" : "text-green-400"
                            }  font-bold`}
                          >
                            &#x20B9;{bud.amount}
                          </td>
                          <td
                            className={` ${
                              bud.remainingAmount < 1
                                ? "text-red-600"
                                : "text-green-400"
                            }  font-bold`}
                          >
                            &#x20B9;{bud.remainingAmount ?? bud.remainingAmount}
                          </td>
                          <td>
                            <div className="flex gap-1 justify-center items-center">
                              <Link
                                href={{
                                  pathname: "/budget/edit",
                                  query: { id: bud._id },
                                }}
                                state={bud}
                              >
                                <AiTwotoneEdit className="text-2xl" />
                              </Link>
                              <MdDeleteOutline
                                onClick={() => {
                                  setdeleteBudgetId(bud._id)
                                  setShowDelConfirmationPopUp(true);
                                }}
                                className="text-2xl"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    {budget && (
                      <tr className="border-t border-t-gray-700 font-bold">
                        <td>Total</td>
                        <td>{totalBudget}</td>
                        <td>{totalRemainingBudget}</td>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default Budget;
