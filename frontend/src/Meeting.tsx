import { useState } from "react";
import styled from "styled-components";
import Ask from "./components/chat/Ask";
import Poll from "./components/chat/Poll";
import Chat from "./components/chat/Chat";

const Meeting = () =>
{
    const [activeTab, setActiveTab] = useState(0)

    const meetData = {
        title : "Test Council Meeting",
        date: "01/01/2024",
        start: "09:00AM",
        end: "10:30AM"
    }

    const Tabs = [
        {name:"Chat", component: <Chat/>},
        {name:"Ask", component: <Ask/>},
        {name:"Polls", component: <Poll/>},
    ]

    return (
        <Container>
            <VidCol>
                <VidPlaceHolder>
                    <TextPlaceHolder> PLACEHOLDER FOR STREAM </TextPlaceHolder>
                </VidPlaceHolder>
                <VidInfo>
                    <Title> {meetData.title} </Title>
                    <Time> {meetData.date} | {meetData.start} - {meetData.end}</Time>
                </VidInfo>
            </VidCol>
            <ChatCol>
                <ChatTabContainer>
                    {Tabs.map((e, i) => (
                        <ChatTab
                            onClick={() => setActiveTab(i)}
                            {...activeTab == i ? {$active: "true"} : {}} key={e.name}>{e.name}</ChatTab>
                    ))}
                </ChatTabContainer>
                <ChatRect>
                    {Tabs[activeTab].component}
                </ChatRect>
            </ChatCol>
        </Container>
    )
}

export default Meeting;

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem 2rem;
    box-sizing: border-box;
`

const VidCol = styled.div`
    padding: 2rem, 1rem;
    width: 65%;
    height: 70%;
`

const VidPlaceHolder = styled.div`
    display: flex;
    width: 100%;
    height: 90%;
    border: 1px solid black;
    background: grey;
    justify-content: center;
    align-items: center;
`
const TextPlaceHolder = styled.div`
    font-weight: bold;
    font-size: 2vw;
`

const VidInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Title = styled.div`
    text-decoration: underline;

`
const Time = styled.div`

`

const ChatCol = styled.div`
    width: 30%;
    height: 90%;

`
const ChatRect = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 90%;
   border: 1px solid black;

`
const ChatTabContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
    padding: 0px 20px;
`

const ChatTab = styled.div<{ $active?: boolean; }>`
    padding: 10px 20px;
    padding-bottom: 0px;
    border: 1px solid black;
    z-index: 2;
    background: white;
    bottom:  ${props => props.$active ? "-1px" : "-0px;"};
    border-bottom: 0px;
    position: relative;

    &:hover {
        cusor:pointer;
    }
`
