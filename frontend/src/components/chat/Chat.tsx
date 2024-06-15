import InProgress from "../InProgress";
import styled from "styled-components";


const Chat = () => {
    return (
        <ChatBoxContainer>
            <ChatBox/>
            <ChatSend> Send </ChatSend>
        </ChatBoxContainer>
    )
}


const ChatMessage = styled.div`

`

const ChatBoxContainer = styled.div`
    display: flex;
    position: absolute;
    bottom:0;
    flex-direction: row;
    width: 100%;
    height: 10%;
    max-height: 100px;
    gap: 20px;
    align-items: center;
    justify-content: center;
    padding: 0px 10px;
    box-sizing: border-box;
`

const ChatBox = styled.textarea`
    flex: 1;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 20px;
  }
  &::-webkit-slider-thumb {
    background-color: #f01f77ff;
    border-radius: 20px;
    border: 6px solid #f01f77ff;
    z-index: 42;
  }
  width: 60%;
  color: black;
  border-radius: 10px;
  border: solid 1px #f01f77;
  overflow-y: scroll;
  text-align: left;
  word-break: break-word;
  resize: none;
  max-height: 30px;
  text-wrap:wrap;
  padding: 10px 20px;
`

const ChatSend = styled.div`
    display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: fit-content;
  padding: 10px 10px;
  border: solid 1px black;
  border-radius: 10px;
  font-size: 20px;
  text-align: center;
  color: black;
  &:hover {
    cursor: pointer;
    background-color: "#00b8ff";
  }

  transition: all .2s ease-in-out;
`

export default Chat;
