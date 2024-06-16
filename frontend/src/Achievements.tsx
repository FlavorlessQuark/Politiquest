import { useState } from "react";
import styled from "styled-components";
import InProgress from "./components/InProgress";
import AchievementCard from "./components/AchievementCard";

const Achievements = () => {
  const [selected, setSelected] = useState(0);
  const dummyachivments = [
    {
      id: 0,
      title: "Unlimited power!",
      desc: "Vote on a poll during a council meeting",
      rewards: { xp: 50, title: "My opinion matters", cosmetic: undefined },
    },
    {
      id: 1,
      title: "Touch some grass",
      desc: "Participate in a meeting in person",
      rewards: { xp: 200, title: "People person", cosmetic: "Cool Hat" },
    },
  ];

  const A_Cards = (id) => {
    return <AchievementCard data={dummyachivments[id]} />;
  };
  const sections = [
    { name: "Achievements", component: A_Cards, data: dummyachivments },
    { name: "Quests", component: <InProgress />, data: [] },
  ];

  return (
    <Container>
      <UserInfo />
      <SectionBar>
        {sections.map((e, i) => (
          <SectionTitle
            key={e.name}
            onClick={() => setSelected(i)}
            {...(selected === i ? { $active: "true" } : {})}
          >
            {" "}
            {e.name}{" "}
          </SectionTitle>
        ))}
      </SectionBar>
      <DisplaySection>
        {sections[selected].data.map((e, i) => sections[selected].component(i))}
      </DisplaySection>
    </Container>
  );
};

export default Achievements;

const Container = styled.div`
    height: 100%;
    padding: 10px 10px;
`;

const UserInfo = styled.div`
    width: 100%;
    height: 20%;
`;

const SectionBar = styled.div`
    display: flex;
    flex-direction:
    height: 5%;
`;

const SectionTitle = styled.div`
    padding: 10px 10px;
    text-underline-offset: 3px;
    font-weight: ${(props) => (props.$active ? "bold" : "normal")};
    text-decoration:  ${(props) => (props.$active ? "underline" : "none")};
    &:hover {
        cursor : pointer;
    }
`;

const DisplaySection = styled.div`
    width: 100%;
    display: flex;
    flex-firection: row;
    gap: 30px;
    flex-wrap: wrap;
    min-height: 100px;
    height: fit-content;
    border: 1px solid black;
`;

const QuestCard = styled.div`

`;
