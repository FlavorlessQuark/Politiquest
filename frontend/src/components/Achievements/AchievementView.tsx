import { useEffect } from "react";
import styled from "styled-components";
import AchievementCard from "./AchievementCard";

const AchievementsView = () => {
  const dummyachivments = [
    {
      id: 0,
      title: "Unlimited power!",
      desc: "Vote on a poll during a council meeting",
      progress: -1,
      done: true,
      rewards: { xp: 50, title: "My opinion matters", cosmetic: undefined },
    },
    {
      id: 1,
      title: "Touch some grass",
      desc: "Participate in a meeting in person",
      progress: -1,
      done: false,
      rewards: { xp: 200, title: "People person", cosmetic: "Cool Hat" },
    },
    {
      id: 2,
      title: "Touch some grass",
      desc: "Participate in 3 meetings",
      progress: 1,
      done: false,
      rewards: { xp: 200, title: "Local legend", cosmetic: "Righteous Cape" },
    },
  ];

  return (
    <DisplaySection>

      <DisplayInner>
        {dummyachivments.map((e) => (
          <AchievementCard key={e.id} data={e} />
        ))}
      </DisplayInner>
    </DisplaySection>
  );
};

export default AchievementsView;

const DisplaySection = styled.div`
    width: 100%;
    display: flex;
    flex-firection: row;
    gap: 30px;
    flex-wrap: wrap;
    min-height: 500px;
    height: fit-content;
    border: 1px solid black;
    padding: 5px 5px;
    box-sizing: border-box;
    background: ${props => props.theme.secondary};
    border-radius: 4px;
`

const DisplayInner = styled.div`
width: 100%;
display: flex;
flex-firection: row;
gap: 30px;
flex-wrap: wrap;
min-height: 500px;
height: fit-content;
padding: 20px 20px;
box-sizing: border-box;
background: ${props => props.theme.primary};
`;

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
