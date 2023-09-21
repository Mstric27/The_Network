import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Homepage = () => {
  const [title] = useTypewriter({
    words: ["Welcome to The Network", "Its a small world."],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 80,
  });

  const notify = () => toast("Lets get started!!");

  return (
    <>
      <div className="drop-shadow-lg w-full h-screen flex flex-col gap-10 justify-center items-center text-offwhite bg-flat">
        <h1 className="text-6xl font-thin text-offwhite">
          {title} <Cursor />
        </h1>
        <Link
          className="hover:bg-turq rounded-lg hover:text-flat bg-flat border-2 border-turq text-turq p-4"
          to="/login"
        >
          Start Now!
        </Link>
      </div>
      <ToastContainer />
    </>
  );
};

export default Homepage;
