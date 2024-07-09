import React, {  useEffect, useState } from "react";
import { MdTask } from "react-icons/md";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {API} from "../api"


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [datas, setDatas] = useState([]);
  const navigate=useNavigate()

    const token = localStorage.getItem("token");
     if(token != null){
       console.log('user is login')
       navigate('/tasks')
     }
     console.log(token)
 const handleLogin = async () => {

    try {
      const loginData = {
        username: email,
        password,
      };
      console.log(loginData);
      const response = await  axios.post(`${API}/auth/login`, loginData);
      await setDatas([...datas, loginData]);
      localStorage.setItem("login", "true");
      response.data.token &&
        localStorage.setItem("token", response.data.token || "");
        localStorage.setItem("email",email)
        setError(false)
        if( localStorage.getItem("login", "true")){
          navigate('/tasks')
        }

    } catch (err) {
      console.log("Error", err.message);
      setError(true)
    }
  };

  const handleEmailadress = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className="login ">
      <div className="flex  flex-col justify-center items-center  h-screen">
        <div className="flex justify-center items-center bg-white rounded-md mb-10 ">
          <div className="flex flex-col  m-10 ">
            <div className="flex justify-center items-center">
              <MdTask className="size-12 my-3" />

              <h1 className="text-xl font-semibold">Task Manager App</h1>
            </div>

            <h1 className="text-2xl font-semibold px-2 items-center">Sign in</h1>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => handleEmailadress(e)}
              className="m-2 px-2 py-1 border bg-slate-100 rounded-md"
            />
            <input
              type="text"
              placeholder="Password"
              onChange={(e) => handlePassword(e)}
              className="m-2 px-2 py-1 border bg-slate-100 rounded-md"
            />
             {error? <p className="text-xs font-bold px-2 text-red-500">Invalid Username or Password</p>:""}

            <button
              className="m-2 p-2 border rounded-lg bg-buttonColor text-white font-semibold cursor-pointer"
              onClick={() => handleLogin()}
            >
              Login
            </button>
            <p className="text-base font-light px-2 my-1">
              Don't have an account?{" "}
              <span className="text-buttonColor font-semibold cursor-pointer">
                <Link to={"/signup"}> Sign up now</Link>
              </span>
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
