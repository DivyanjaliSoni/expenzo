"use client"; // Ensure this is needed for your environment
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>(""); // Specify type for clarity
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signin", {
        user: Cookies.get("authUserId"),
        email,
        password,
      });
      Cookies.set("authToken", response.data.token, { expires: 1, path: "/" });
      Cookies.set("authUserId", response.data.user._id, {
        expires: 1,
        path: "/",
      });
      router.push("/");
    } catch (error) {
      console.log(error)
      toast.error("Invalid credentials")
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="h-[88vh] flex justify-center items-center flex-col gap-4 dark:bg-gray-800"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-72 px-4 py-2 border bg-gray-100 dark:bg-gray-500 dark:placeholder:text-gray-50 dark:border-0"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-72 px-4 py-2 border bg-gray-100 dark:bg-gray-500 dark:placeholder:text-gray-50 dark:border-0"
          required
        />
        <button
          type="submit"
          className={`${
            loading ? "bg-gray-500 dark:bg-gray-300 cursor-none" : "bg-gray-800 dark:bg-gray-50"
          } text-white dark:text-gray-800 w-56 p-2 font-semibold flex justify-center items-center gap-5`}
        >
          {loading && (
            <div className="w-6 h-6 border-4 border-solid border-gray-300 dark:border-gray-700 rounded-full animate-spin border-t-transparent"></div>
          )}
          <span>SignIn / SignUp</span>
        </button>
      </form>
      <ToastContainer theme="dark" />
    </>
  );
};

export default Login;
