import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { customFetch } from "../utils";

export const action = async ({ request }) => {
  const form = await request.formData();
  const data = Object.fromEntries(form);
  try {
    const resp = await customFetch.post("/auth/local/register", data);
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your credentials";
    console.log(errorMessage);
    return null;
  }
};
const Register = () => {
  return (
    <section className="grid place-items-center h-screen">
      <Form
        method="POST"
        className=" card mt-4 p-8 shadow-lg flex flex-col gap-y-4 bg-base-100"
      >
        <h4 className="font-bold text-center text-3xl capitalize">register</h4>
        <FormInput
          label="username"
          name="username"
          type="text"
          defaultValue=""
        ></FormInput>
        <FormInput
          label="email"
          name="email"
          type="email"
          defaultValue=""
        ></FormInput>
        <FormInput
          label="password"
          name="password"
          type="password"
          defaultValue=""
        ></FormInput>
        <SubmitBtn text="REGISTER"></SubmitBtn>
        <p className="text-center">
          Already a member ?{" "}
          <Link
            to={"/login"}
            className="link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
