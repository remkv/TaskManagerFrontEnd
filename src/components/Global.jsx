import React from "react";
import Login from "./Login"
import Signup from "./Signup"
import TaskList from "./tasks/TaskList"
import AddTask from "./tasks/AddTask"
import Topbar from "./Topbar"
import { Routes, Route, useLocation } from "react-router-dom";

export default function Global() {
  const location = useLocation();
 const isLoginPage = location.pathname === "/login";
 const isMainPage = location.pathname === "/";
  const isSignupPage = location.pathname === "/signup";
  return (
       <section className="app ">
             {!isLoginPage &&
             !isMainPage &&
               !isSignupPage && <Topbar />}
             <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/tasks" element={<TaskList />} />
               <Route path="/tasks/addtasks" element={<AddTask />} />
            </Routes>
       </section>
    )
    };