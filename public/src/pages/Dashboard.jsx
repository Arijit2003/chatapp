import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import EmployeeDashboard from "../components/EmployeeDashboard";
import AdminDashboard from "../components/AdminDashboard";
import styled from "styled-components";
const Dashboard =  () => {
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  const [isLoaded, setisLoaded] = useState(false)
  useEffect(()=>{
    if(loggedInUser!=null)setisLoaded(true)
    else setisLoaded(false)
  console.log(loggedInUser)
  },[loggedInUser])
  return (
    <>
      {isLoaded && (
        <Container> 
          {loggedInUser.usertype === "employee" ? (
            <EmployeeDashboard />
          ) : (
            <AdminDashboard />
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  height: 90vh;
  width: 90vw;
  background-color: #00000076;
  padding: 10px;
  
`;
export default Dashboard;
