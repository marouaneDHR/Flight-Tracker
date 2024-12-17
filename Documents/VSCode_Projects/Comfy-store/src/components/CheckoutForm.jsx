import React from "react";
import { Form } from "react-router-dom";
import SubmitBtn from "./SubmitBtn";
import FormInput from "./FormInput";

const CheckoutForm = () => {
  return (
    <div className="mr-0">
      <h3 className="text-xl text-neutral-content">Shipping Information</h3>
      <Form method="POST" className="form-control mt-6">
        <FormInput label={"first name"} name={"name"} type={"text"} />
        <FormInput label={"address"} name={"address"} type={"text"} />
        <div className="mt-4">
          <SubmitBtn text={"PLACE YOUR ORDER"} />
        </div>
      </Form>
    </div>
  );
};

export default CheckoutForm;
