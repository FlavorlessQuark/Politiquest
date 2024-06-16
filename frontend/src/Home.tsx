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
      start: "9AM",
      end: "10:30am",
      xp: "50",
      member: "Berj Alister",
    },
    {
      title: "Test Council Meeting",
      id: 1,
      date: "01/01/2024",
      start: "9am",
      end: "10:30am",
      xp: "100",
      member: "Sally Brewer",
    },
    {
      title: "Test Council Meeting",
      id: 2,
      date: "01/01/2024",
      start: "9am",
      end: "10:30am",
      xp: "60",
      member: "Omar Hendricks",
    },
  ];

  return (
    <Container>
      <TopBar>
        <CityName>Foster City</CityName>
        <Fixer>
          <UserBar />
        </Fixer>
      </TopBar>
      <MeetingSection>
        <ButtonList>
          <WeekButton>Last Week</WeekButton>
          <WeekButton active="true">This Week</WeekButton>
          <WeekButton>Next Week</WeekButton>
        </ButtonList>
        <MeetingList>
          {dummyMettings.map((e) => (
            <MeetingCard key={e.id} data={e} />
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
    font-weight: 200;
    font-family: "SynNova";
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
    width: 100%;
    // justify-content: space-between;
`;
const WeekButton = styled.div<{ $active?: boolean }>`
    ${(p) => p.active && "color: #FAFAFA;"}
    border-bottom: 1px solid ${(p) => (p.active ? "#FFF" : "#191919")};
    background-color: ${(p) => (p.active ? "#191919" : "#FFF")};
    padding: 10px 20px;
     &: hover {
        cursor: pointer;
        background: aliceblue;
     }
`;
const MeetingList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;
