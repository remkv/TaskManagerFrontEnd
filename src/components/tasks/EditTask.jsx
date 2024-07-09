import React, { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../api";
import TasksCard from "./TasksCard";
import Footer from "../Footer";

export default function EditTask() {
 
  const { taskId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchSelectedData();
  }, []);
  const fetchSelectedData = async () => {
    const response = await axios.get(`${API}getselecteditems/${taskId}`);
    setData(response.data.selectedItems[0]);
  };
  return data ? <EditItems data={data} itemId={taskId} /> : "Loading...";
}

function EditItems({ data, taskId }) {
  const navigate = useNavigate();
  const [name, setName] = useState(data.name || "");
  const [completed, setCompleted] = useState(data.completed || false);

  const handleSave = async () => {
    const editedData = {
      name,
      completed
    };
    const response = await axios.put(`${API}edititems/${taskId}`, editedData);
    await navigate(`/items/${taskId}`);
  };
  return (
   
    <section className={"ml-16 mt-16  h-full overflow-y-auto"}>
      <div className="flex justify-between mr-5 md:mr-10 lg:mr-20">
        <h1 className="font-semibold text-xl">{name} </h1>
        <Link to={"/tasks"}>
          <HiMiniXMark className="mr-1 size-7 text-red-500" /> All Tasks
        </Link>
      </div>
      {/* First set of data */}
      <div className="flex flex-col lg:flex-row justify-start ">
        <div className="mt-5 w-[220px] md:w-[320px]">
          <div className="flex justify-between my-4">
            <h1 className="text-xs md:text-base">Name*</h1>
            <input
              type="text"
              className="text-xs md:text-base border-2 rounded-md px-2 h-5 md:h-8 w-[8.5rem]"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex justify-between my-4">
            <h1 className="text-xs md:text-base">Completed*</h1>
            <input
              type="checkbox"
              className="text-xs md:text-base border-2 rounded-md px-2 h-5 md:h-8 w-[8.5rem]"
              onChange={(e) => setCompleted(e.target.value)}
              value={completed}
            />
          </div>
        </div>
      </div>

      <div className="flex my-4">
        <button
          className="border rounded-lg bg-buttonColor text-white px-2 py-1 mr-3"
          onClick={() => handleSave()}
        >
          Save
        </button>
        <button
          className="border rounded-lg px-2 py-1"
          onClick={() => navigate("/items/itemname")}
        >
          Cancel
        </button>
      </div>
      <Footer />
    </section>
  );
}
