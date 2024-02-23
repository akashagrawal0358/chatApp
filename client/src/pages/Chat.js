import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import WelcomeChat from "../components/WelcomeChat";
import ChatContainer from "../components/ChatContainer";



function Chat() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-user-app")) {
        navigate('/login')
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem("chat-user-app"))
        );
      }
    }
    checkUser()
  }, [])


  useEffect(() => {
    const currentUserExist = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    currentUserExist();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />

        {
          currentChat === undefined ? (
            <WelcomeChat currentUser={currentUser} />
          ) : (
             <ChatContainer currentUser={currentUser} />
          )
        }

      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat