"use client";

import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const onResetPassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Password Reset Email Sent");
    } catch (error: any) {
      console.log("Reset Password Failed", error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="py-4">Enter your registered email</h1>

      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button
        type="button"
        className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600"
        onClick={onResetPassword}
      >
        Reset Password
      </button>
      <Toaster />
    </div>
  );
};

export default ForgotPasswordPage;
