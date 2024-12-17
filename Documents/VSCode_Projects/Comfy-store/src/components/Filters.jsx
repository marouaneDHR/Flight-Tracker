import React from "react";
import FilterInput from "./FilterInput";
import FilterSelect from "./FilterSelect";
import { Form, Link, useLoaderData } from "react-router-dom";
import FilterRange from "./FilterRange";
import FilterShipping from "./FilterShipping";

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { search, company, category, order, price, shipping } = params;
  return (
    <Form className="bg-base-200 p-8 gap-x-4 gap-y-8 rounded-bl-box grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 items-center mb-8">
      <FilterInput
        label="Search Product"
        name="search"
        type="search"
        defaultValue={search}
      />
      <FilterSelect
        label="select category"
        name={"category"}
        list={meta.categories}
        defaultValue={category}
      />

      <FilterSelect
        label="select company"
        name={"company"}
        list={meta.companies}
        defaultValue={company}
      />

      <FilterSelect
        label="sort by"
        name={"order"}
        list={["a-z", "z-a", "high", "low"]}
        defaultValue={order}
      />

      <FilterRange label={"select price"} name={"price"} defaultValue={price} />

      <FilterShipping
        label={"free shipping"}
        name={"shipping"}
        defaultValue={shipping}
      />

      <button type="submit" className="btn btn-accent btn-sm capitalize">
        search product
      </button>

      <Link to="/products" className="btn btn-warning btn-sm capitalize">
        reset
      </Link>
    </Form>
  );
};

export default Filters;
