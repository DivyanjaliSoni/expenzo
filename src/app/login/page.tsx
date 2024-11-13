"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(7),
});

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: async ({ email, password }) => {
      setLoading(true);
      try {
        const response = await axios.post("/api/auth/signin", {
          user: Cookies.get("authUserId"),
          email,
          password,
        });
        Cookies.set("authToken", response.data.token, {
          expires: 1,
          path: "/",
        });
        Cookies.set("authUserId", response.data.user._id, {
          expires: 1,
          path: "/",
        });
        router.push("/");
      } catch (error) {
        console.log(error);
        toast.error("Invalid credentials");
        setLoading(false);
      }
    },
  });

  
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="h-[88vh] flex justify-center items-center flex-col gap-4 dark:bg-gray-800"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className="w-72 px-4 py-2 border bg-gray-100 dark:bg-gray-500 dark:placeholder:text-gray-50 dark:border-0"
          required
        />
        {errors.email && touched.email && <span className="text-sm text-red-600">{errors.email}</span>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          className="w-72 px-4 py-2 border bg-gray-100 dark:bg-gray-500 dark:placeholder:text-gray-50 dark:border-0"
          required
        />
        {errors.password && touched.password && <span className="text-sm text-red-600">{errors.password}</span>}
        <button
          type="submit"
          className={`${
            loading
              ? "bg-gray-500 dark:bg-gray-300 cursor-none"
              : "bg-gray-800 dark:bg-gray-50"
          } text-white dark:text-gray-800 w-56 p-2 font-semibold flex justify-center items-center gap-5`}
        >
          {loading && (
            <div className="w-6 h-6 border-4 border-solid border-gray-300 dark:border-gray-700 rounded-full animate-spin border-t-transparent"></div>
          )}
          <span>SignIn / SignUp</span>
        </button>
      </form>
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default Login;
