import styled from "styled-components";
import { UserBar } from "./components/CitizenBar";
import {MeetingCard} from "./components/MeetingCard";
import { useEffect, useState } from "react";
import axios from "axios"
import { useUserConsumer } from "./components/UserContext";

const Home = () => {
  const [month, setMonth] = useState(0)
  const [activeWeek, setActiveWeek] = useState(0)
  const [meetData, setmeetData] = useState<{[month:number] : Object}>({})
  const {savedMeetings} = useUserConsumer()
  const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



  const get_month_meetings = async(month: number) => {
    if (!Object.keys(meetData).includes(month.toString()))
    {

        axios.get("/meetings/get-month", {params : {from: "FCSM", month:month, year: 2024}})
        .then((res):any => {
            const data = meetData;

            data[month] = {weeks: [[], [], [], []]};

            for (let meeting of res.data){
                const date = new Date(meeting.date);
                const day = Math.min(4, Math.max(1, Math.ceil(date.getDate() / 7)))

                meeting["_date"] = meeting.date
                meeting.date =  date.toLocaleDateString() + "  " +  date.toLocaleTimeString();
                data[month].weeks[day - 1].push(meeting);
            }
            for (let week of data[month].weeks) {
                week.sort((a, b) => new Date(a._date).getDate() - new Date(b._date).getDate())
            }

            setmeetData({...data})
        })
        .catch((error) => {
            console.log("Eerror fecthing meetings", error)
        })
    }
    console.log(meetData)

  }

  const setCurrentMonth = async (next:number) => {

    const newMonth = Math.max(1, (month + next) % 12);
    await get_month_meetings(newMonth)
    setMonth(newMonth);
  }

  useEffect(() => {
    // ADD : Month param
    const today = new Date();
    const _month = parseInt(today.toLocaleString('default', {month: "numeric"}));
    setMonth(_month)
    setActiveWeek(Math.min(3, Math.ceil(today.getDate() / 7) - 1))
    console.log("week is", Math.ceil(today.getDate() / 7) - 1)

    get_month_meetings(_month).then((res) => console.log("setting up"))
    axios.get("/user/get-user", {params: {id: 0}}).then((res) => console.log("got user", res.data))

  }, [])

  return (
    <Container>
      <TopBar>
        <CityName>Foster City</CityName>
        <UserBar />
      </TopBar>
      <MeetingSection>
        <MonthSelecContainer>
            <MonthSelecButton onClick={async () => {await setCurrentMonth(-1)}}> {"<"} </MonthSelecButton>
            <MonthSelecCurrent>{months[month]}</MonthSelecCurrent>
            <MonthSelecButton onClick={async () => {await setCurrentMonth(+1)}}> {">"}</MonthSelecButton>
        </MonthSelecContainer>
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

const MonthSelecContainer = styled.div`
    margin: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`
const MonthSelecButton = styled.div`
    font-size:20px;
    font-weight: bold;
    padding: 0px 5px;
    &:hover {
        cursor:pointer;
        background: #79ffcd4a;
    }
`

const MonthSelecCurrent = styled.div`
    font-size:20px;
    font-weight: bold;
`

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
