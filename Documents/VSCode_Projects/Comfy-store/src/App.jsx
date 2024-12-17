import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Cart,
  Checkout,
  Error,
  Home,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";
import { loader as ProductsLoader } from "./pages/Landing";
import { loader as SingleProductLoader } from "./pages/SingleProduct";
import { loader as AllProductsLoader } from "./pages/Products";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as PlaceOrderAction } from "./pages/Checkout";
import { loader as OrdersLoader } from "./pages/Orders";
import store from "./store";

const root = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      { index: true, loader: ProductsLoader, element: <Landing /> },
      { path: "/about", element: <About /> },
      { path: "/products", loader: AllProductsLoader, element: <Products /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/Checkout",
        action: PlaceOrderAction(store),
        element: <Checkout />,
      },
      { path: "/orders", loader: OrdersLoader(store), element: <Orders /> },
      {
        path: "/products/:id",
        loader: SingleProductLoader,
        element: <SingleProduct />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction(store),
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);
const App = () => {
  return <RouterProvider router={root}></RouterProvider>;
};
export default App;
