import React from "react";

const FilterShipping = ({ label, name, defaultValue }) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label">
        <span className="label-text mb-2 capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        className="checkbox checkbox-primary checkbox-sm"
        name={name}
        defaultChecked ={defaultValue}
      />
    </div>
  );
};

export default FilterShipping;
