import styled from "styled-components";
import { UserBar } from "./components/CitizenBar";
import MeetingCard from "./components/MeetingCard";
import { useEffect, useState } from "react";
import axios from "axios"

const Home = () => {
  const [month, setMonth] = useState("")
  const [activeWeek, setActiveWeek] = useState(0)
  const [meetData, setmeetData] = useState({})

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:5000"
    // ADD : Month param
    const today = new Date();
    const _month = today.toLocaleString('default', {month:'long'});
    setMonth(_month)
    setActiveWeek( Math.ceil(today.getDate() / 7) - 1)

    axios.get("/meetings/get-all", {params : {from: "FCSM"}}).then((res):any => {
        const data = { [_month] : {weeks: [[], [], [], []]}};

        for (let meeting of res.data){
            const date = new Date(meeting.date);
            const day = Math.ceil(date.getDate() / 7)
                console.log("date ", date, "week", Math.ceil(date.getDate() / 7))

            meeting["_date"] = meeting.date
            meeting.date =  date.toLocaleDateString() + "  " +  date.toLocaleTimeString();
            data[_month].weeks[day - 1].push(meeting);
        }
        for (let week of data[_month].weeks) {
            week.sort((a, b) => new Date(a._date).getDate() - new Date(b._date).getDate())
        }

     console.log(data)
        setmeetData(data)
    })
  }, [])

  return (
    <Container>
      <TopBar>
        <CityName>Foster City</CityName>
        <UserBar />
      </TopBar>
      <MeetingSection>
        {month}
        <ButtonList>
            {
                meetData[month] && meetData[month].weeks.map((_, i) =>
                    <WeekButton $active={i == activeWeek}
                        onClick={() => setActiveWeek(i)}
                        key={i}
                    > Week {i + 1} </WeekButton>
                )
            }
        </ButtonList>
        <MeetingList>
          {meetData[month] && meetData[month].weeks[activeWeek].map((e) => (
            <MeetingCard key={e.uid} data={e} />
          ))}
        </MeetingList>
      </MeetingSection>
      <Padder />
    </Container>
  );
};

export default Home;

const Padder = styled.div`
    display: flex;
    position: relative;
    bottom: 0;

    width: 100%;
    height: 5%;
    max-height: 100px;
    min-height: 40px;
    justify-content: space-around;
`;

const Container = styled.div`
    width: 100%;
    height: fit-content;
    background: ${(props) => props.theme.background};
    align-content: center;
    color: ${(p) => p.theme.text}
`;

const TopBar = styled.section`
    display: flex;
    justify-content: center;
`;

const CityName = styled.div`
    font-size: 26px;
    font-weight: 200;
    font-family: "SynNova";
`;
const MeetingSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-content: center;
`;

const ButtonList = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
const WeekButton = styled.div<{ $active?: boolean }>`
    ${(p) => p.$active && "color: #FAFAFA;"}
    border-bottom: 3px solid ${(p) => (p.$active ? p.theme.secondary : p.theme.primary)};
    background-color: ${(p) => (p.$active ? "#8e823e": "#cab74f")};
    padding: 10px 20px;
     &: hover {
        cursor: pointer;
        background: ${(p) => p.theme.button};
     }
`;
const MeetingList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;
