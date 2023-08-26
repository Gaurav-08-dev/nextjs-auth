"use client";
import React, { useEffect, useState } from "react";
import brcryptjs from "bcryptjs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  const onPasswordChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    try {
      if (
        password &&
        confirmPassword &&
        password === confirmPassword &&
        token.length > 0
      ) {
        const salt = await brcryptjs.genSalt(10);
        const hashedPassword = await brcryptjs.hash(password, salt);

        const response = await axios.post("/api/users/resetpassword", {
          hashedPassword,
          token,
        });

        toast.success("Password has been reset");
        setTimeout(()=> router.push("/login"), 1000);
      }
    } catch (error: any) {
      console.log("Password Reset Failed!", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="password">New Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
      />

      <label htmlFor="confirm_password">Confirm Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="confirm_password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button
        type="button"
        className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600"
        onClick={onPasswordChange}
      >
        Reset Password
      </button>
      <Toaster/>
    </div>
  );
};

export default ResetPasswordPage;
