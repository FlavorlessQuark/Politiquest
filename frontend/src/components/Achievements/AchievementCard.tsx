import { useEffect } from "react";
import styled from "styled-components";

import Token from "../../assets/Token.svg";

const AchievementCard = ({ data }) => {
  return (
    <Outer>

    <Inner>
      <Title> {data.title}</Title>
      <TopSection>
        <ImgOuter>
          <Img src={Token} />
        </ImgOuter>
        <Requirements>
          <Desc> {data.desc}</Desc>
          {data.progress >= 0 && data.progress}
          {data.progress >= 0 && <ProgressBar />}
        </Requirements>
      </TopSection>
      <RewardSection>
        <RewardText>Rewards</RewardText>
        <RewardList>
          {data.rewards &&
            Object.keys(data.rewards).map(
              (key) =>
                data.rewards[key] && (
                  <Reward key={key}>
                    {" "}
                    {data.rewards[key]} {key},
                  </Reward>
                ),
            )}
        </RewardList>
      </RewardSection>
    </Inner>
    </Outer>
  );
};

export default AchievementCard;

const Requirements = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
`;
const ProgressBar = styled.div`
    height: 5px;
    border: 1px solid black;
    width: 100%;
`;

const Outer = styled.div`
    display: flex;
    height: 250px;
    min-width: 350px;
    width: 30%;
    border: 2px solid ${props => props.theme.highlight};
    background: ${props => props.theme.secondary};
    padding: 2px 2px;

`;

const Inner = styled.div`
    display: flex;
    width: 100%;
    border: 1px solid black;

    justify-content: space-around;
    flex-direction: column;
    text-align: center;
    background: ${props => props.theme.background};
    padding: 5px 5px;
    border-radius: 4px;
    box-shadow: -0px -0px 3px 3px inset #230b0457

`;

const ImgOuter = styled.div`
    width: 30%;
    border: 2px solid ${props => props.theme.secondary};
    padding: 10px 16px;
    background: #673d25;
    border-radius: 4px;
    box-shadow: 4px 4px 1px #2c070742;
`;

const TopSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 80%;
`;

const Img = styled.img`
    width: 100%;
    height: 70%;
`;
const Text = styled.div`
    width: 48%;

`;
const Title = styled.div`
    font-size: 1.3rem;
    font-family: "SynNova";
`;
const Desc = styled.div`
    // width: 48%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
const RewardSection = styled.div`
    display: flex;
    flex-direction: column;
`;
const RewardText = styled.div`
    font-size: 1rem;
    font-family: "SynNova";
`;
const RewardList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
    font-size: 0.8rem;
    font-family: "Fira";
`;

const Reward = styled.div`
    display: flex;
    flex-direction: row;
`;
