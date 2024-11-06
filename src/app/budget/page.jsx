"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import BudgetLoading from "../Components/budgetLoading/page";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";

const Budget = () => {
  const router = useRouter();
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [remainingBalance, setRemainingBalance] = useState();
  const [budget, setBudget] = useState();
  const [totalBudget, setTotalBudget] = useState();
  const [totalRemainingBudget, setTotalRemainingBudget] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
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

  const handleSubmit = async () => {
    try {
      await axios
        .post("/api/budget/create", {
          user: Cookies.get("authUserId"),
          category: newCategory,
          label: newDesc,
          amount: newAmount,
        })
        .then((res) => {
          setBudget((prevItems) => [
            ...prevItems,
            {
              ...res.data.budget,
              remainingAmount: newAmount,
            },
          ]);
          setNewAmount("");
          setNewCategory("");
          setNewDesc("");
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
  };

  return (
    <>
      <section className=" min-h-[88.9vh] dark:bg-gray-900 py-10 px-5 ">
        <div className="pb-5">
          <h1 className="text-2xl font-bold pb-5  text-gray-800 dark:text-gray-100">
            Add Budget
          </h1>

          <div className="md:px-5 pt-10 pb-7 grid grid-cols-2 gap-x-2 max-w-[600px] mx-auto">
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
                  placeholder="100"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
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
                  placeholder="Grocery"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
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
                  value={newDesc}
                  onChange={(e) => {
                    setNewDesc(e.target.value);
                    setRemainingBalance(e.target.value);
                  }}
                ></textarea>
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
                  onClick={handleSubmit}
                  className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
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
                            &#x20B9;{bud.remainingAmount ?? remainingBalance}
                          </td>
                          <td>
                            <Link
                              href={{
                                pathname: "/budget/edit",
                                query: { id: bud._id },
                              }}
                              state={bud}
                            >
                              <CiEdit className="text-3xl mx-auto" />
                            </Link>
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
      <ToastContainer />
    </>
  );
};

export default Budget;
