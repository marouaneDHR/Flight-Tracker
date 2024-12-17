import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "/about", text: "about" },
  { id: 3, url: "/products", text: "products" },
  { id: 4, url: "/cart", text: "cart" },
  { id: 5, url: "/checkout", text: "checkout" },
  { id: 6, url: "/orders", text: "orders" },
];

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);
  const filteredLinks = user
    ? links
    : links.filter(
        (link) => link.text !== "checkout" && link.text !== "orders"
      );
  return (
    <>
      {filteredLinks.map((link) => {
        return (
          <li key={link.id}>
            <NavLink to={link.url} className="capitalize">
              {link.text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
