import { useEffect, useState } from "react";
import styled from "styled-components";
import Ask from "./components/chat/Ask";
import Poll from "./components/chat/Poll";
import Chat from "./components/chat/Chat";

import axios from "axios";
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

const Meeting = () => {
  const [activeTab, setActiveTab] = useState(0);

    const client = ZoomMtgEmbedded.createClient();


  const meetData = {
    title: "Test Council Meeting",
    date: "01/01/2024",
    start: "09:00AM",
    end: "10:30AM",
  };

  const Tabs = [
    { name: "Chat", component: <Chat /> },
    { name: "Ask", component: <Ask /> },
    { name: "Polls", component: <Poll /> },
  ];


    const  getSignature = async (meetnumber:string) => {
        // NEED SERVER
         axios.defaults.baseURL = "http://localhost:5000"

        let res = await

        console.log(res.data)

        return res
    }

//   useEffect(() => {

//     const data = {
//         signature: "signature",
//         sdkKey: "",
//         meetingNumber: "82592136594",
//         password: "",
//         userName: "userName",
//         userEmail: "mahthaki@gmail.com",
//         tk: "",
//         zak: ""
//     }

//     let meetingSDkElem = document.getElementById('meetingSDKElement');
//     if (!meetingSDkElem)
//     {
//         console.log("no elem");
//         return
//     }
//     axios.defaults.baseURL = "http://localhost:5000"
//     axios.post("/zoom/get-signature",{meetNumber:data.meetingNumber, role:0}).then((res) => {
//         data.signature = res.data.signature;
//         console.log("Signature :", data.signature)
//         client.init({zoomAppRoot: meetingSDkElem, language: "en-US", patchJsMedia:true, leaveOnPageUnload:true}).then(() =>
//         {
//             client.join(data).then(() => {
//                 console.log("success")
//             }).catch((error)=> {
//                 console.log("fai9led to join", error)
//             })
//         }).catch((error) => {
//             console.log("failed to init", error)
//         })
//     })
//   })

  return (
    <Container>
      <VidCol>
        <VidPlaceHolder id="meetingSDKElement">
        </VidPlaceHolder>
        <VidInfo>
          <Title> {meetData.title} </Title>
          <Time>
            {" "}
            {meetData.date} | {meetData.start} - {meetData.end}
          </Time>
        </VidInfo>
      </VidCol>
      <ChatCol>
        <ChatTabContainer>
          {Tabs.map((e, i) => (
            <ChatTab
              onClick={() => setActiveTab(i)}
              {...(activeTab === i ? { $active: "true" } : {})}
              key={e.name}
            >
              {e.name}
            </ChatTab>
          ))}
        </ChatTabContainer>
        <ChatRect>{Tabs[activeTab].component}</ChatRect>
      </ChatCol>
    </Container>
  );
};

export default Meeting;

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem 2rem;
    box-sizing: border-box;
    background: ${(props) => props.theme.background};
`;

const VidCol = styled.div`
    padding: 2rem, 1rem;
    width: 65%;
    height: 70%;
`;

const VidPlaceHolder = styled.div`
    display: flex;
    width: 100%;
    height: 90%;
    border: 1px solid black;
    background: grey;
    justify-content: center;
    align-items: center;
`;
const TextPlaceHolder = styled.div`
    font-weight: bold;
    font-size: 2vw;
`;

const VidInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Title = styled.div`
    text-decoration: underline;

`;
const Time = styled.div`

`;

const ChatCol = styled.div`
    width: 30%;
    height: 90%;

`;
const ChatRect = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: ${props => props.theme.primary};
  height: 90%;
   border: 1px solid black;

`;
const ChatTabContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0px 20px;
`;

const ChatTab = styled.div<{ $active?: boolean }>`
    padding: 10px 20px;
    padding-bottom: 0px;
    border: 1px solid black;
    z-index: 2;
    background:  ${props => (props.$active ? props.theme.primary : props.theme.secondary)};;
    bottom:  ${(props) => (props.$active ? "-1px" : "-0px;")};
    border-bottom: 0px;
    position: relative;

    &:hover {
        cusor:pointer;
    }
`;
