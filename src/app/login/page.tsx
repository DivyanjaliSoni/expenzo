"use client"; // Ensure this is needed for your environment
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
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
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="h-[80vh] flex justify-center items-center flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-72 px-4 py-2 border shadow-sm"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-72 px-4 py-2 border"
          required
        />
        <button
          type="submit"
          className={`${
            loading ? "bg-gray-500 cursor-none" : "bg-gray-800"
          } text-white w-56 p-2 font-normal flex justify-center items-center gap-5`}
        >
          {loading && (
            <div className="w-6 h-6 border-4 border-solid border-gray-300 rounded-full animate-spin border-t-transparent"></div>
          )}
          <span>SignIn / SignUp</span>
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
