import axios from "axios";
import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../api";
import TasksCard from "./TasksCard";
import Footer from "../Footer";

export default function AddTask() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);
  const token = localStorage.getItem("token");
    if(token == null){
        console.log('user not login')
        navigate('/')
    }
    console.log(token)
  const handleSave = async () => {
  const token = localStorage.getItem("token");
      if(token == null){
          console.log('user not login')
          navigate('/')
      }
      console.log(token)
    try {
      const newData = {
        "title":name
      };

      const response = await axios({
                               method: 'post',
                               url: `${API}/tasks`,
                               data: newData,
                               headers: {
                               'Authorization': `Bearer ${token}`,
                               'Content-Type': 'application/json'
                               },
                             })
      await navigate(`/tasks`);
      setError(false);
    } catch (error) {
      console.log("Error", error.message);
      setError(true);
    }
  };
  return (
   
    <section className={"ml-16 mt-16  h-full overflow-y-auto"}>
      <div className="flex justify-between mr-5 md:mr-10 lg:mr-20">
        <h1 className="font-semibold text-xl">New Task </h1>
        <Link to={"/tasks"}>
          <HiMiniXMark className="mr-10 size-7 text-red-500" />All Tasks
        </Link>
      </div>
      {/* First set of data */}
      <div className="flex flex-col md:flex-row justify-start ">
        <div className="mt-5 w-[220px] md:w-[320px]">
          <div className="flex justify-between  my-4">
            <h1 className="text-xs md:text-base">Name*</h1>
            <input
              type="text"
              className="border-2 rounded-md px-2 h-5 md:h-8 w-[8.5rem]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error?<div className="flex my-4"><h1 className="text-xs md:text-base text-red-500">Kindly fill all the mandatory (*) fields </h1></div>:""}
      <div className="flex my-4">
        <button
          className="border rounded-lg bg-buttonColor text-white px-2 py-1 mr-3"
          onClick={() => handleSave()}
        >
          Save
        </button>
        <button
          className="border rounded-lg px-2 py-1"
          onClick={() => navigate("/tasks")}
        >
          Cancel
        </button>
      </div>
      <Footer />
    </section>
  );
}
