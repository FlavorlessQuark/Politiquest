import { useEffect } from "react";
import styled from "styled-components";

import Token from "../../assets/Token.svg"

const AchievementCard = ({ data }) => {
  return (
    <Container>
      <Title> {data.title}</Title>
      <TopSection>
        <ImgOuter>
            <Img src={Token}/>
        </ImgOuter>
        <Requirements>
          <Desc> {data.desc}</Desc>
          {data.progress >= 0 && data.progress}
          {data.progress >= 0 && <ProgressBar />}
        </Requirements>
      </TopSection>
      <RewardSection>
        <RewardText> Rewards :</RewardText>
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
    </Container>
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

const Container = styled.div`
    display: flex;
    height: 200px;
    min-width: 350px;
    width: 30%;
    border: 1px solid black;
    padding: 10px 10px;
    justify-content: space-around;
    flex-direction: column;
    text-align: center;
`;

const ImgOuter = styled.div`
    width: 30%;
    border: 2px solid #a38615;
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
    font-size: 20px;
    font-weight: bold;
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
    font-weight: bold;
    text-decoration: underline;
    font-size: 15px;
`;
const RewardList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
    font-size: 11px;
`;

const Reward = styled.div`
    display: flex;
    flex-direction: row;
`;
