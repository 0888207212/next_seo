"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type FormSchema = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function HomePage() {
  const schema: ZodType<FormSchema> = z
    .object({
      email: z.string().email({ message: "Email wrong format" }),
      password: z.string().min(6, "PassWord must be at least 6 characters"),
      confirmPassword: z
        .string()
        .min(6, "ConfirmPassWord must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password must match",
      path: ["confirmPassword"],
    });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    await new Promise((res) => setTimeout(res, 1000));
    setCookie("userForm", data);
    router.push("/product");

    reset();
  };

  return (
    <div className="p-6 flex justify-center items-center">
      <form
        className="flex flex-col gap-y-2 w-[30%] bg-[#eeeded] py-10 px-6 rounded-md shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded outline-none"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <label>PassWord</label>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded outline-none"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <label> Confirm Password</label>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm password"
          className="px-4 py-2 rounded outline-none"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}

        <input
          value="Submit"
          disabled={isSubmitting}
          type="submit"
          className="bg-[#93c593] py-2 rounded hover:bg-[#59aa59] disabled:bg-[#cec5c5] hover:text-white transition ease-in-out duration-500 mt-10"
        />
      </form>
    </div>
  );
}
