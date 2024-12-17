import React from "react";

const FilterInput = ({ label, name, defaultValue }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        name={name}
        className="input input-bordered input-sm"
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FilterInput;
