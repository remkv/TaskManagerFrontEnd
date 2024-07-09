import React, { useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdTask , MdLogout} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const handleLogout = () => {
      try {
        localStorage.setItem("login", "false");
        localStorage.removeItem("token");
        localStorage.setItem("email", "");
        navigate("/");
      } catch (err) {
        console.log("Error", err.message);
      }
    };
  return (
    <section className="fixed top-0 w-full z-10 ">
      <div className="h-12 text-white flex justify-between items-center bg-red-800 ">
        <div className="flex justify-between items-center  md:w-[500px]">
           <h1 className=" flex  items-center h-12 text-xs md:text-xl px-1 md:mx-3">
            <MdTask className="md:mr-2" />
            Task Manager App
          </h1>
         </div>
        <div className="flex items-center md:mr-14">
          <IoPersonCircleSharp className="md:size-10 cursor-pointer mx-1  md:mx-3 relative" />{email}
          <MdLogout className="md:size-10 cursor-pointer mx-1  md:mx-3 relative" onClick={()=>handleLogout()}/>
        </div>
      </div>
    </section>
  );
}
