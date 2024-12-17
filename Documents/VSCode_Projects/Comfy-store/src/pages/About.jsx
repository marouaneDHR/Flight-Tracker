import React from "react";

const About = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6">
      <h1 className="text-6xl font-bold tracking-tight">We love</h1>
      <div className="stats  bg-primary ">
        <div className="stat ">
          <div className="stat-title text-primary-content  font-bold tracking-widest text-4xl">
            Comfy
          </div>
        </div>
      </div>
      <p className="text-lg mt-6 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae corporis
        veniam architecto quam, sequi ipsum officiis consequatur odit officia
        quis placeat adipisci voluptatum ducimus doloremque reprehenderit
        aperiam nobis aut labore assumenda possimus est dolore laborum.
        Recusandae deserunt voluptatem pariatur architecto, soluta dignissimos
        ratione exercitationem voluptatum amet libero quisquam sit consectetur?
      </p>
    </div>
  );
};

export default About;
