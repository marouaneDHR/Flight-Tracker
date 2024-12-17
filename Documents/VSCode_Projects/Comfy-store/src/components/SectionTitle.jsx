import React from "react";

const SectionTitle = ({ text }) => {
  return (
    <div className="border-b pb-4">
      <h1 className="text-3xl font-bold capitalize">{text}</h1>
    </div>
  );
};

export default SectionTitle;
