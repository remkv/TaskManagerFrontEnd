import React , { useState }from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../api";


export default function TasksCard({ data }) {
const navigate = useNavigate();
const [title, setTitle] = useState(data.title);
  const [completed, setCompleted] = useState(data.completed);
   const token = localStorage.getItem("token");
    if(token == null){
      console.log('user not login')
      navigate('/login')
    }
    console.log(token)

  const handleUpdate = async () => {
    const editedData = {
      title,
      completed
    };
     const response = await axios({
                                   method: 'put',
                                   url: `${API}/tasks/${data._id}`,
                                   data: editedData,
                                   headers: {
                                   'Authorization': `Bearer ${token}`,
                                   'Content-Type': 'application/json'
                                   },
                                 })
                                 console.log(response.status)
    if(response.status == '200'){
        alert('Task Updated.')
    }
     window.location.reload();
  };


  const handleDelete = async () => {

     const response = await axios({
                                   method: 'delete',
                                   url: `${API}/tasks/${data._id}`,
                                   headers: {
                                   'Authorization': `Bearer ${token}`,
                                   'Content-Type': 'application/json'
                                   },
                                 })
                                 console.log(response.status)
    if(response.status == '200'){
        alert('Task Deleted.')
    }
    window.location.reload();
  };

  return (
    <section>

      <div className="flex flex-col justify-center items-left border size-[250px] my-4 shadow-md cursor-pointer">
        <div className="ml-5">
        <p className="mt-1 px-1"><span className="font-medium">Task Title : </span>
        <input type="text"
            value = {title}
             className="border-2 rounded-md px-2 h-5 md:h-8 w-[8.5rem]"
             onChange={(e) => setTitle(e.target.value)}
           /></p>
        <p className="mt-1 px-1"><span className="font-medium">Completed Status : </span>
        <input type="checkbox" checked={completed} onChange={(e) => setCompleted(!completed)} /></p>
        <div className="flex my-4">
        <button
        className="border rounded-lg bg-buttonColor text-white px-2 py-1 mr-3"
        onClick={() => handleUpdate()}
        >
        Update
        </button>
        <button className="border rounded-lg px-2 py-1"
        onClick={() => handleDelete()}>
        Delete
        </button>
                    </div>
                    </div>
      </div>
    </section>
  );
}
