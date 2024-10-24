"use client";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import HomeLoading from "./Components/homeLoading/page";

export default function Home() {
  const [income, setInome] = useState("");
  const [expenses, setExpenses] = useState();
  const [loading, setLoading] = useState(false);
  const budget = useSelector((state) => state.budget.items);
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
      setLoading(true)
      try {
        const response = await axios.post("/api/budget/getall", {
          id: Cookies.get("authUserId"),
        });
        if (response && response.data) {
          setLoading(false)
          const expensesArray = response.data.budgets.flatMap((budget) =>
            budget.expenses.map((expense) => ({
              ...expense,        // Expense ki properties
              category: budget.category // Budget ka category add karna
            }))
          );
          setExpenses(expensesArray);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchBudget();
  }, []);

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
            {budget.length !== 0 ? "Show Budget" : "Set Budget"}
          </Link>
        </div>
        <div className="text-center">
          <Link
            href="/expense"
            className="bg-gray-800 dark:bg-gray-700 text-white py-2 w-36 flex justify-center items-center gap-2 mx-auto"
          >
            <span>
              <FaPlus />
            </span>
            <span>Add Expense</span>
          </Link>
        </div>
      </div>
      <div>
        <div>
          <div className="border-b border-gray-500 dark:border-gray-200 mb-5">
            <h3 className="text-xl font-bold pb-2">Transaction History</h3>
          </div>
          <div>
            <div>
              {!loading ? (
                <table className="w-full">
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
                          <td>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) }</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <HomeLoading />
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
