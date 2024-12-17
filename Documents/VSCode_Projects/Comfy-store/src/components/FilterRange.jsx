import React, { useState } from "react";

const FilterRange = ({ name, label, defaultValue }) => {
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(defaultValue || maxPrice);

  const handleSelectedPrice = (e) => {
    setSelectedPrice(e.target.value);
  };

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span className="font-semibold">${selectedPrice}</span>
      </label>
      <input
        type={"range"}
        className="range range-primary range-sm"
        min={0}
        max={maxPrice}
        name={name}
        onChange={(e) => handleSelectedPrice(e)}
        value={selectedPrice}
      />
      <div className="w-full flex mt-2 justify-between">
        <span className="font-semibold">{0}</span>
        <span className="font-semibold ml-0">${maxPrice}</span>
      </div>
    </div>
  );
};

export default FilterRange;
