import { useEffect } from "react";
import styled from "styled-components";
import Progress from "../../assets/QuestProgress.svg";

const QuestCard = ({ data }) => {
  // console.log(data, data.progress);
  return (
    <Container>
      <TopSection>
        <Img src={Progress} />
        <Requirements>
          <Title> {data.title} </Title>
          <Desc> {data.desc} </Desc>
          {data.progress.map((e, i) => {
            <>{i}</>;
          })}
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
                    {data.rewards[key]} {key}
                  </Reward>
                ),
            )}
        </RewardList>
        {data.completed && !data.claimed && <Claim> Complete </Claim>}
      </RewardSection>
    </Container>
  );
};

export default QuestCard;

const Requirements = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
`;
const Claim = styled.div`
  height: fit-content;
  padding: 10px;
  border-radius: 9999px;
  font-size: 15px;
  text-align: center;
  color: black;
  background-color: ${(p) => p.theme.secondary};
  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.button};
  }
  transition: all .2s ease-in-out;
`;

const Container = styled.div`
    display: flex;
    height: 200px;
    min-width: 350px;
    width: 30%;
    background-color: ${(p) => p.theme.background};
    border-radius: 8px;
    padding: 10px 10px;
    justify-content: space-around;
    flex-direction: column;
    text-align: center;
`;

const TopSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 80%;
`;

const Img = styled.img`
    width: 20%;
    height: 70%;
`;
const List = styled.ul`
    width: 100%;

`;
const Title = styled.div`
    font-size: 20px;
    font-weight: 400;
`;
const Desc = styled.div`
    // width: 48%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
`;
const RewardSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;
const RewardText = styled.div`

`;
const RewardList = styled.div`
    display: flex;
`;

const Reward = styled.div`
    font-family: "Fira";
    font-weight: 600;
`;
