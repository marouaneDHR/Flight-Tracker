import { NavLink } from "react-router-dom";
import hero1 from "../assets/images/hero1.webp";
import hero2 from "../assets/images/hero2.webp";
import hero3 from "../assets/images/hero3.webp";
import hero4 from "../assets/images/hero4.webp";

const images = [hero1, hero2, hero3, hero4];
const Hero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="text-6xl font-bold max-w-4xl">
          We're changing the way people shop.
        </h1>
        <p className=" mt-8 tracking-tight">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          itaque dolore voluptatem fuga, libero illum iusto sed quidem soluta
          animi obcaecati dolorem optio eligendi quae inventore sint repudiandae
          ab temporibus doloremque tempora consectetur! Voluptates ipsa vitae
          dolore exercitationem totam dignissimos corporis, necessitatibus,
          officia rem perspiciatis temporibus similique adipisci delectus
          aliquid!
        </p>
        <div className="mt-8 ">
          <NavLink to={"/products"} className={" btn btn-primary"}>
            OUR PRODUCTS
          </NavLink>
        </div>
      </div>
      <div className="h-[28rem] carousel p-4 space-x-4 rounded-box">
        {images.map((image, index) => {
          return (
            <div className="carousel-item" key={index}>
              <img
                src={image}
                className="h-full w-90 object-cover rounded-box"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
