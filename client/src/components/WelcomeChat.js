import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robo from "../assets/hi-robot.gif";


const WelcomeChat = ({ currentUser }) => {
    if (!currentUser || !currentUser.username) {
        // Return null or some default content if currentUser is not defined or lacks the expected properties
        return null;
    }


    return (
        <Container>
            <img src={Robo} alt="" />
            <h1>
                <br />
                Welcome, <span>{currentUser.username} !</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default WelcomeChat