import { useEffect } from "react";
import styled from "styled-components";
import Progress from "../../assets/QuestProgress.svg";
import Done from "../../assets/QuestOver.svg";

const QuestCard = ({ data }) => {
  console.log(data, data.progress);
  return (
    <Outer>
        <Inner>

      <TopSection>
        <Img src={data.completed ? Done : Progress} />
        <Requirements>
          <Title> {data.title} </Title>
          <Desc> {data.desc} </Desc>
          {data.progress.map((e, i) => {
            <>{i}</>;
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
        </Inner>

    </Outer>
  );
};

export default QuestCard;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    white-space: pre-line;
    align-items: center;
    gap: 10px;
`;
const Requirements = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 60%;
    justify-content: space-evenly;
`;

const ImgOuter = styled.div`
    width: 30%;
    border: 2px solid ${props => props.theme.secondary};
    padding: 10px 16px;
    background: #673d25;
    border-radius: 4px;
    box-shadow: 4px 4px ${props => props.theme.background};
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


const Outer = styled.div`
    display: flex;
    height: 200px;
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
    padding: 15px 15px;
    border-radius: 4px;
    box-shadow: -0px -0px 3px 3px inset #230b0457

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
    font-weight: bold;
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
    text-decoration: underline;
    font-weight: bold;
`;
const RewardList = styled.div`
    display: flex;
    flex-direction: row;
    aling-items: center;
`;

const Reward = styled.div`
    display: flex;
`;
