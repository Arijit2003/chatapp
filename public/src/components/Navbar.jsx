import React, { useState } from "react";
import styled from "styled-components";
import { IoIosChatbubbles } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

const Navbar = ({ component, setComponent }) => {
  const changeComponent = (componetName) => {
    setComponent(componetName);
  };
  return (
    <Container>
      <button
        className={component === "chat" ? "active" : ""}
        onClick={() => changeComponent("chat")}>
        <IoIosChatbubbles />
      </button>

      <button
        className={component === "dashboard" ? "active" : ""}
        onClick={() => changeComponent("dashboard")}>
        <MdDashboard />
      </button>
    </Container>
  );
};

const Container = styled.div`
  button {
    padding: 0.5rem 0.5rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    margin-bottom: 5px;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.5rem 0.5rem;
      svg {
        font-size: 1rem;
      }
    }
    svg {
      font-size: 2rem;
      color: white;
    }
  }
  .active {
    background-color: #0b5394;
  }
`;

export default Navbar;
