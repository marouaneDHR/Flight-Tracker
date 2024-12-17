import React from "react";

const FilterSelect = ({ label, name, list, defaultValue }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label capitalize">
        <span className="label-text">{label}</span>
      </label>
      <select
        name={name}
        className="select select-bordered select-sm"
        defaultValue={defaultValue}
      >
        {list.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
