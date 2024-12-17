import React from "react";

const FormInput = ({ label, name, type, defaultValue }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label capitalize">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered rounded-xl"
      />
    </div>
  );
};

export default FormInput;
