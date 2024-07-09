import React, { useState } from "react";
import { MdInventory } from "react-icons/md";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {API} from "../api"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();

  const handleEmailAddress = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async () => {
    if(email == "" || password ==""){
        setError("Please fill username and password.")
        return;
    }
    try {
      const signupData = {
        "username":email,
        password,
      };
      console.log(signupData);
      const response = await axios.post(`${API}/auth/register`, signupData);
      await setDatas([...datas, signupData]);
      if (response) {
        alert('Account created successfully. Please login to continue.')
        navigate("/");
      }
    } catch (err) {
      console.log("Error", err);
      setError("Try different username, if issue persists retry after sometime.")
    }
  };  

  return (
    <main className="login ">
      <div className="flex  flex-col justify-center items-center  h-screen">
        <div className="flex justify-center items-center bg-white rounded-md mb-10 ">
          <div className="flex flex-col  m-10 ">
            <div className="flex justify-center items-center">
              <MdInventory className="size-12 my-3" />

              <h1 className="text-xl font-semibold">Task Manager App</h1>
            </div>

            <h1 className="text-2xl font-semibold px-2">Sign Up</h1>
            <p className="text-base font-light px-2">to manage Tasks</p>

            <input
              type="text"
              placeholder="User name"
              onChange={(e) => handleEmailAddress(e)}
              className="m-2 px-2 py-1 border bg-slate-100 rounded-md"
            />
            <input
              type="text"
              placeholder="Password"
              onChange={(e) => handlePassword(e)}
              className="m-2 px-2 py-1 border bg-slate-100 rounded-md"
            />
            {error != "" ? <p className="text-xs font-bold px-2 text-red-500">{error}</p>:""}
            <button
              className="m-2 p-2 border rounded-lg bg-buttonColor text-white font-semibold cursor-pointer"
              onClick={() => handleSignUp()}
            >
              Signup
            </button>
            <p className="text-base font-light px-2 my-1">
              Already have an account?{" "}
              <span className="text-buttonColor font-semibold cursor-pointer">
                <Link to={"/"}> Sign In</Link>
              </span>
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
