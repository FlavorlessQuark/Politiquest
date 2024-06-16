import { useEffect } from "react";
import styled from "styled-components";

const QuestCard = ({ data }) => {
  // console.log(data, data.progress)
  return (
    <Container>
      <TopSection>
        <Img> IMAGE HERE</Img>
        <Requirements>
          <Title> {data.title} </Title>
          <Desc> {data.desc} </Desc>
          {data.progress.map((e, i) => {
            i;
          })}
        </Requirements>
      </TopSection>
      <RewardSection>
        <Row>
          <RewardText> Rewards :</RewardText>
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
        </Row>
        {data.completed && !data.claimed && <Claim> Complete </Claim>}
      </RewardSection>
    </Container>
  );
};

export default QuestCard;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;
const Requirements = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
`;
const Claim = styled.div`
    display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 5px 5px;
  border: solid 1px black;
  border-radius: 5px;
  font-size: 15px;
  text-align: center;
  color: black;
  &:hover {
    cursor: pointer;
    background-color: "#00b8ff";
  }

  transition: all .2s ease-in-out;
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

const TopSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 80%;
`;

const Img = styled.div`
    width: 20%;
`;
const List = styled.ul`
    width: 100%;

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
    flex-direction: row;
    justify-content: space-evenly;
`;
const RewardText = styled.div`

`;
const RewardList = styled.div`
    display: flex;
    flex-direction: row;
`;

const Reward = styled.div`
    display: flex;
`;
