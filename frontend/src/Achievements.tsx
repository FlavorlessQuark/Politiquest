import { useState } from "react";
import styled from "styled-components";
import { CitizenBar } from "./components/CitizenBar";
import AchievementsView from "./components/Achievements/AchievementView";
import InProgress from "./components/InProgress";
import QuestView from "./components/Quests/QuestView";

const Achievements = () =>
{
    const [selected, setSelected] = useState(0);

    const dummyquest = [
        {id: 0},
    ]


    const sections = [
        {name: "Achievements", component: <AchievementsView/> },
        {name: "Quests", component: <QuestView/>, data: dummyquest},
        {name: "Feats", component: <InProgress/>, data: dummyquest},
    ]

  return (
    <Container>
      <UserInfo>
        <CitizenBar/>
      </UserInfo>
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
        {sections[selected].component}
    </Container>
  );
};

export default Achievements;

const Container = styled.div`
    height: 100%;
    padding: 10px 10px;
    gap: 20px;
    display: flex;
    flex-direction: column;
`;

const UserInfo = styled.div`
    width: 100%;
    height: 10%;
`;

const SectionBar = styled.div`
    display: flex;
    flex-direction: row;
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



const QuestCard = styled.div`

`;
