"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function Home() {
  return (
    <main className="px-5 dark:bg-gray-500 min-h-[89vh] text-gray-800 dark:text-gray-100">
      <section className="py-10 flex flex-col gap-y-5 justify-center">
        <div className="text-center">
          <a
            href="/income"
            className="bg-gray-800 dark:bg-gray-700 text-white py-2 w-36 block mx-auto"
          >
            Set Income
          </a>
        </div>
        <div className="text-center">
          <a
            href="/budget"
            className="bg-gray-800 dark:bg-gray-700 text-white py-2 w-36 block mx-auto"
          >
            Set Budget
          </a>
        </div>
        <div className="text-center">
          <a
            href="/expense"
            className="bg-gray-800 dark:bg-gray-700 text-white py-2 w-36 flex justify-center items-center gap-2 mx-auto"
          >
            <span>
              <FaPlus />
            </span>
            <span>Add Expense</span>
          </a>
        </div>
      </section>
      <section>
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
                  <tr className="my-2">
                    <td>1.</td>
                    <td>Milk</td>
                    <td>10</td>
                    <td>Grocery</td>
                    <td>
                      <div className="flex gap-4 text-2xl items-center">
                        <MdDeleteOutline className="text-red-700 cursor-pointer" />
                        <FaRegEdit className="text-gray-700 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                  <tr className="my-2">
                    <td>2.</td>
                    <td>Vegeis</td>
                    <td>150</td>
                    <td>Food</td>
                    <td>
                      <div className="flex gap-4 text-2xl items-center">
                        <MdDeleteOutline className="text-red-700 cursor-pointer" />
                        <FaRegEdit className="text-gray-700 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
