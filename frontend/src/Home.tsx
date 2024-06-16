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
        <UserBar />
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
    justify-content: space-around;
`;

const Container = styled.div`
    width: 100%;
    height: fit-content;
    background: ${props => props.theme.background};
    align-content: center;
    color: ${p => p.theme.text}
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
    ${(p) => p.active && "color: #FAFAFA;"}
    border-bottom: 3px solid ${(p) => (p.active ? p.theme.secondary : p.theme.primary)};
    background-color: ${(p) => (p.active ? p.theme.primary : p.theme.secondary)};
    padding: 10px 20px;
     &: hover {
        cursor: pointer;
        background: ${p => p.theme.button};
     }
`;
const MeetingList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;
