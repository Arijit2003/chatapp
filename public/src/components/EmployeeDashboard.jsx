import React,{useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/AuthProvider";
import Header from "./Header";
import { userTaskRoute } from "../utils/APIRoutes";
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import TaskListNumbers from "./TaskListNumbers";
import TaskList from './TaskList'

const EmployeeDashboard = () => {
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false)
  const [userTask, setUserTask] = useState(null)
  const apiURL = userTaskRoute+`?_id=${loggedInUser._id}`
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  useEffect(()=>{
    async function fetch(){
      const {data} = await axios.get(apiURL)
      if(data.status){
        setIsLoaded(true)
        setUserTask(data.taskData)
      }else{
        setIsLoaded(false)
        toast.error(data.msg,toastOptions)
      }
    }
    fetch()
  },[])

  return (
    <>
      <Header />
      <TaskListNumbers isLoaded={isLoaded} userTask={userTask}/>
      <TaskList isLoaded={isLoaded} userTask={userTask}/>
    </>
  );
};

export default EmployeeDashboard;
