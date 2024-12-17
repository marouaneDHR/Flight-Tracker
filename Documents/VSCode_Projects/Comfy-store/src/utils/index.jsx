import axios from "axios";

const productionURL = "https://strapi-store-server.onrender.com/api";
export const customFetch = axios.create({
  baseURL: productionURL,
});

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option value={amount} key={amount}>
        {amount}
      </option>
    );
  });
};
