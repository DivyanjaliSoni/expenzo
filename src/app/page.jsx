"use client";
import { FaPlus, FaMinus } from "react-icons/fa";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import HomeLoading from "./Components/homeLoading/page";
import PieChart from "./Components/PieChart/page";
import { LuTable } from "react-icons/lu";
import { FaChartPie } from "react-icons/fa6";
import Expense from "./expense/expense";

export default function Home() {
  const [income, setInome] = useState("");
  const [expenses, setExpenses] = useState();
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [addExpense, setAddExpense] = useState(false);
  const [createRes, setCreateRes] = useState();
  useEffect(() => {
    const fetchIncome = async () => {
      await axios
        .post("/api/income/getincome", {
          id: Cookies.get("authUserId"),
        })
        .then((res) => {
          setInome(res.data.income[0].amount);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchIncome();
    const fetchBudget = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/api/budget/getall", {
          id: Cookies.get("authUserId"),
        });
        if (response && response.data) {
          setLoading(false);
          const expensesArray = response.data.budgets.flatMap((budget) =>
            budget.expenses.map((expense) => ({
              ...expense, // Expense ki properties
              category: budget.category, // Budget ka category add karna
            }))
          );
          setExpenses(expensesArray);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchBudget();
  }, [createRes]);

  return (
    <section className="px-5 dark:bg-gray-900 min-h-[89vh] text-gray-800 dark:text-gray-100">
      <div className="py-10 flex flex-col gap-y-5 justify-center">
        <div className="text-center">
          <Link
            href="/income"
            className="bg-gray-800 dark:bg-gray-700 text-white py-2 w-36 block mx-auto"
          >
            {income ? `Income: ${income}` : "Set Income"}
          </Link>
        </div>
        <div className="text-center">
          <Link
            href="/budget"
            className="bg-gray-800 dark:bg-gray-700 text-white py-2 w-36 block mx-auto"
          >
            Set Budget
          </Link>
        </div>
        <div className="text-center">
          <button
            onClick={() => setAddExpense(!addExpense)}
            className="bg-gray-800 dark:bg-gray-700 text-white py-2 w-36 flex justify-center items-center gap-2 mx-auto"
          >
            {addExpense ? (
              <span>
                <FaMinus />
              </span>
            ) : (
              <span>
                <FaPlus />
              </span>
            )}
            <span>Add Expense</span>
          </button>
        </div>
        {addExpense && (
          <Expense setAddExpense={setAddExpense} setCreateRes={setCreateRes} />
        )}
      </div>
      <div>
        <div className="flex justify-between items-center border-b border-gray-500 dark:border-gray-200 mb-5">
          <div className="">
            <h3 className="text-xl font-bold pb-2">Transaction History</h3>
          </div>
          <div className="text-2xl gap-3 items-center flex md:hidden">
            <LuTable
              onClick={() => setShowChart(false)}
              className="cursor-pointer"
            />
            <FaChartPie
              onClick={() => setShowChart(true)}
              className="cursor-pointer"
            />
          </div>
        </div>
        {showChart ? (
          <div className="block md:hidden">
            <PieChart />
          </div>
        ) : (
          <div className="pb-5 grid grid-cols-2 items-start">
            {!loading ? (
              <>
                <table className="md:col-span-1 col-span-2">
                  <thead className="font-bold dark:bg-gray-400 bg-gray-500 text-white">
                    <tr>
                      <td>Product</td>
                      <td>Category</td>
                      <td>Amount</td>
                      <td>Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses &&
                      expenses.map((exp, index) => (
                        <tr className="my-2" key={index}>
                          <td>{exp.product}</td>
                          <td>{exp.category}</td>
                          <td className="text-red-400 font-bold">
                            - &#x20B9;{exp.amount}
                          </td>
                          <td>
                            {new Date().toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="hidden md:flex justify-center items-center">
                  <PieChart />
                </div>
              </>
            ) : (
              <HomeLoading />
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
}
