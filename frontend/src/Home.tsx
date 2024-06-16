import styled from "styled-components";
import { UserBar } from "./components/CitizenBar";
import MeetingCard from "./components/MeetingCard";
import Navbar from "./components/Navbar";

const Home = () => {
  const dummyMettings = [
    {
      title: "Test Council Meeting",
      id: 0,
      date: "01/01/2024",
      start: "09:00AM",
      end: "10:30AM",
      xp: "50",
      member: "Some Member",
    },
    {
      title: "Test Council Meeting",
      id: 1,
      date: "01/01/2024",
      start: "09:00AM",
      end: "10:30AM",
      xp: "100",
      member: "Some Member",
    },
    {
      title: "Test Council Meeting",
      id: 2,
      date: "01/01/2024",
      start: "09:00AM",
      end: "10:30AM",
      xp: "60",
      member: "Some Member",
    },
  ];

  return (
    <Container>
      <TopBar>
        <CityName> Foster City </CityName>
        <Fixer>
          <UserBar />
        </Fixer>
      </TopBar>
      <MeetingSection>
        <ButtonList>
          <WeekButton> Last Week</WeekButton>
          <WeekButton> This Week</WeekButton>
          <WeekButton> Next Week</WeekButton>
        </ButtonList>
        <MettingList>
          {dummyMettings.map((e) => (
            <MeetingCard key={e.id} data={e} />
          ))}
        </MettingList>
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
    border-top: 1px solid black;
    justify-content: space-around;
    background: white;
`;

const Container = styled.div`
    width: 100%;
    height: fit-content;
`;

const TopBar = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 10px;
    align-items: center;
`;

const Fixer = styled.div`
    display: flex;
    align-content: stretch;
    width: 80%;
`;

const CityName = styled.div`
    width: 20%;
    font-size: 26px;
    font-weight: bold;
    text-decoration: underline;
`;
const MeetingSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 10px;
    padding: 0px 20px;

`;

const ButtonList = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;
const WeekButton = styled.div`
    display: flex;
    border: 1px solid black;
    border-radius: 8px;
    padding: 10px 20px;
     &: hover {
        cursor: pointer;
        background: aliceblue;
     }
`;
const MettingList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;
