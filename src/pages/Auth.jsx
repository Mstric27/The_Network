import React from "react";
import { auth, googleProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; //to check for invalid logins
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   this is the function that is called when signing in
  //   it sets the username and password equal to the sign-in
  //   NOTE: this might be helpful for setting other variables equal to each other
  const SignIn = async () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      alert("Password should be 6 characters");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigate to the next page ONLY if authentication is successful
      navigate("/chatroom");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  //   sign in with Google
  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/chatroom");
    } catch (err) {
      console.log(err);
    }
  };

  //   sign out
  const SignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  const [title] = useTypewriter({
    words: ["Welcome to SafeMe", "Safety is SafeMe"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 80,
  });

  return (
    <div className="h-screen bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-flat via-turq to-blue-500 text-flat flex justify-center items-center font-thin">
      <div className="border-4 border-turq h-2/3 w-1/3 flex flex-col p-10 rounded-lg bg-offwhite">
        <div className="flex justify-center">
          <h2 className="text-2xl">Sign In</h2>
        </div>
        <div className="flex flex-col mt-10">
          <div className="flex flex-col gap-5 mb-5">
            <input
              type="text"
              placeholder="Enter Email"
              // NOTE: this is how you assign the contents of an input into a variable
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 bg-transparent border-b-2 border-flat hover:none pb-1"
            />
            <input
              type="password"
              placeholder="Enter Password"
              // NOTE: this is how you assign the contents of an input into a variable
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 bg-transparent border-b-2 border-flat hover:none pb-1"
            />
          </div>
          <div className="gap-2 flex flex-col">
            <button
              onClick={SignIn}
              className="bg-turq rounded-lg text-offwhite hover:bg-flat hover:border-2 hover:border-turq hover:text-turq p-4 hover:drop-shadow-xl"
            >
              Log In
            </button>
            <button
              onClick={SignInWithGoogle}
              className="bg-gray rounded-lg text-offwhite hover:bg-flat hover:border-2 hover:border-turq hover:text-turq p-4 hover:drop-shadow-xl"
            >
              Sign In With Google
            </button>
          </div>
        </div>
        <div className="flex flex-col h-full justify-end">
          <button onClick={SignOut} className="hover:text-blue-600">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
