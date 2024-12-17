import React from "react";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { login } from "../Features/user/userSlice";
import { customFetch } from "../utils";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const resp = await customFetch.post("/auth/local", data);
      store.dispatch(login(resp.data));
      return redirect("/");
    } catch (error) {
      console.log(error);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAsGuestUser = async () => {
    try {
      const resp = await customFetch.post("auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(login(resp.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="h-screen place-items-center grid">
      <Form
        method="POST"
        className="card mt-4 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center font-bold text-3xl">Login</h4>
        <FormInput
          label="email"
          name="identifier"
          type="email"
          defaultValue="test@test.com"
        />
        <FormInput
          label="password"
          name="password"
          type="password"
          defaultValue="secret"
        />
        <SubmitBtn text="LOGIN" />
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          {" "}
          GUEST USER
        </button>
        <p className="text-center">
          Not member yet !{" "}
          <Link
            to={"/register"}
            className="link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
