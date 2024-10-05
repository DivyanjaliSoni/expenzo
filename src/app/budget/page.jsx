"use client";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addBudget } from "@/store/budgetSlice";

const budget = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const budget = useSelector((state) => state.budget.items);

  const handleSubmit = () => {
    setNewAmount("");
    setNewCategory("");
    setNewDesc("");
    dispatch(
      addBudget({
        amount: newAmount,
        description: newDesc,
        category: newCategory,
      })
    );
  };

  return (
    <>
      <section className=" min-h-[88.9vh] dark:bg-gray-900 text-white py-10 px-5 ">
        <div className="pb-5">
          <h1 className="text-2xl font-bold pb-5">Add Budget</h1>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
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
                placeholder="100"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
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
                placeholder="Grocery"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Label
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 text-gray-800 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
                id="inline-full-name"
                placeholder="e.g. Healthy diet"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3 flex justify-between">
              <button
              onClick={()=>router.push('/')}
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
        <div className="pt-5">
          <div className="border-b border-gray-500 dark:border-gray-200 mb-5">
            <h3 className="text-xl font-bold pb-2">Budget List</h3>
          </div>
          <div>
            <div>
              <table className="w-full">
                <thead className="font-bold dark:bg-gray-400 bg-gray-500 text-white">
                  <tr>
                    <td>S.no</td>
                    <td>Amount</td>
                    <td>Category</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {budget &&
                    budget.map((bud, index) => (
                      <tr className="my-2">
                        <td>{index+1}.</td>
                        <td>{bud.amount}</td>
                        <td>{bud.category}</td>
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
      </section>
    </>
  );
};

export default budget;
