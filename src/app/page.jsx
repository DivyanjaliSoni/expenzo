"use client";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Home() {
  const income = useSelector((state) => state.income);
  const budget = useSelector((state) => state.budget.items);
  const expense = useSelector((state) => state.expense.items);
  return (
    <section className="px-5 dark:bg-gray-900 min-h-[89vh] text-gray-800 dark:text-gray-100">
      <div className="py-10 flex flex-col gap-y-5 justify-center">
        <div className="text-center">
          <Link
            href="/income"
            className="bg-gray-800 dark:bg-gray-700 text-white py-2 w-36 block mx-auto"
          >
            {income.source ? `Income: ${income.amount}` : "Set Income"}
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
              <table className="w-full">
                <thead className="font-bold dark:bg-gray-400 bg-gray-500 text-white">
                  <tr>
                    <td>S.no</td>
                    <td>Product</td>
                    <td>Amount</td>
                    <td>Category</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {expense &&
                    expense.map((exp, index) => (
                      <tr className="my-2" key={index}>
                        <td>{index+1}.</td>
                        <td>{exp.label}</td>
                        <td>{exp.amount}</td>
                        <td>{exp.category}</td>
                        <td>
                          <div className="flex gap-4 text-2xl items-center">
                            <MdDeleteOutline className="text-red-700 cursor-pointer" />
                            <FaRegEdit className="text-gray-500 cursor-pointer" />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
