import React, { useState, useEffect } from "react";
import Header from "./Header";
import CreateTask from "./CreateTask";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allTaskRoute } from "../utils/APIRoutes";
import AllTask from '../components/AllTask'

const AdminDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [taskData, setTaskData] = useState(null)
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(()=>{
    async function fetchAllTasks(){
      const {data} = await axios.get(allTaskRoute)
      if(data.status){
        setTaskData(data.alltasks)
        setIsLoaded(true)
      }else{
        setIsLoaded(false)
        toast.error("Not able to load the employees data. Kindly refresh to reload the data")
      }
    }
    fetchAllTasks()
  },[])
  return (
    <>
      <Header />
      <CreateTask/>
      <AllTask isLoaded={isLoaded} taskData={taskData}/>
      <ToastContainer />
    </>
  );
};

export default AdminDashboard;
