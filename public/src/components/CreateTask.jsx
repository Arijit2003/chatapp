import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {addTaskRoute} from '../utils/APIRoutes'
import axios from "axios";

const CreateTask = () => {
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  const [values, setValues] = useState({
    tasktitle: "",
    taskdate: "",
    assignto: "",
    category: "",
    taskdescription: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const {tasktitle,taskdate,assignto,category,taskdescription} = values
      const {data} = await axios.post(addTaskRoute,{tasktitle,taskdate,assignto,category,taskdescription})
      if(data.status === false){
        toast.error(data.msg, toastOptions)
      }else{
        toast.success(data.msg,toastOptions)
      }
    }
  };

  const handleValidation = () => {
    const { tasktitle, taskdate, assignto, category, taskdescription } = values;
    if (tasktitle === "" ||taskdate === "" ||assignto === "" ||category === "" ||taskdescription === "") {
      toast.error("All fields are required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="p-5 bg-[#1c1c1c] mt-5 rounded">
        <form
          onSubmit={(e) => submitHandler(e)}
          className="flex flex-wrap w-full   items-start justify-between"
        >
          <div className="w-1/2 text-white">
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
              <input
                name="tasktitle"
                onChange={(e) => handleChange(e)}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                type="text"
                placeholder="Make a UI design"
              />
            </div>
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
              <input
                name="taskdate"
                onChange={(e) => handleChange(e)}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                type="date"
              />
            </div>
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
              <input
                name="assignto"
                onChange={(e) => handleChange(e)}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                type="text"
                placeholder="employee name"
              />
            </div>
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
              <input
                name="category"
                onChange={(e) => handleChange(e)}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                type="text"
                placeholder="design, dev etc"
              />
            </div>
          </div>
          <div className="w-2/5 flex flex-col items-start">
            <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
            <textarea
              name="taskdescription"
              onChange={(e) => handleChange(e)}
              className="text-white w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400"
            ></textarea>

            <button className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">
              Create Task
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateTask;
