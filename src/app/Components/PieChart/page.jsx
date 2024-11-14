"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import axios from "axios";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const [pieTitle, setPieTitle] = useState("Balance Proportion");
  const [budgetCategory, setBudgetCategory] = useState([]);
  const [budgetCategoryTotalExpense, setBudgetCategoryTotalExpense] = useState([]);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.post("/api/budget/getall", {
          id: Cookies.get("authUserId"),
        });

        if (response && response.data) {
          const categories = [];
          const totalExpenses = [];

          response.data.budgets.forEach((budget) => {
            categories.push(budget.category);
            const totalExpensesForBudget = budget.expenses.reduce(
              (sum, expense) => sum + expense.amount,
              0
            );
            const remainingAmount = budget.amount - totalExpensesForBudget;
            totalExpenses.push(remainingAmount);
          });

          setBudgetCategory(categories);
          setBudgetCategoryTotalExpense(totalExpenses);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchBudget();
  }, []);

  const generateLightColors = (count) => {
    const backgroundColor = [];
    const borderColor = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 128 + 128);
      const g = Math.floor(Math.random() * 128 + 128);
      const b = Math.floor(Math.random() * 128 + 128);
      backgroundColor.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
      borderColor.push(`rgba(${r}, ${g}, ${b}, 1)`);
    }
    return { backgroundColor, borderColor };
  };

  const { backgroundColor, borderColor } = generateLightColors(budgetCategory.length);

  const dataForPieChart = {
    labels: budgetCategory,
    datasets: [
      {
        label: "Total Expenses",
        data: budgetCategoryTotalExpense,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: pieTitle,
      },
    },
  };

  useEffect(()=>{
    if(budgetCategoryTotalExpense.length === 1 && budgetCategoryTotalExpense[0] === 0){
        setPieTitle('No Balance')
        console.log(options.plugins.title.text)
    }
  },[budgetCategoryTotalExpense])

  return (
    <>
      <Pie data={dataForPieChart} options={options} className="pb-5 max-w-96 max-h-96" />
    </>
  );
};

export default PieChart;
