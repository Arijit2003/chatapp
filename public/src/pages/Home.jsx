import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";
import Dashboard from "./Dashboard";

const Home = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [component, setComponent] = useState("chat");
  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function getAllContacts() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    getAllContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <Navbar component={component} setComponent={setComponent} />
      <div>
        {component == "chat" ? (
          <Chat
            contacts={contacts}
            currentUser={currentUser}
            handleChatChange={handleChatChange}
            isLoaded={isLoaded}
            currentChat={currentChat}
            socket={socket}
          />
        ) : (
          <Dashboard/>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
`;
export default Home;
