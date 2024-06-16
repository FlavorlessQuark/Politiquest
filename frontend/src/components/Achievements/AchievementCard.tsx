import { useEffect } from "react";
import styled from "styled-components";

const AchievementCard = ({ data }) => {

    return (
        <Container>
            <Title> {data.title}</Title>
            <TopSection>
                <Img> IMAGE HERE</Img>
                <Requirements>
                    <Desc> {data.desc}</Desc>
                    {data.progress >= 0 && <>{data.progress}</>}
                    {data.progress >= 0 && <ProgressBar/>}
                </Requirements>
            </TopSection>
            <RewardSection>
                <RewardText> Rewards :</RewardText>
                <RewardList>
                    {
                        data.rewards && Object.keys(data.rewards).map((key) => (
                            data.rewards[key] && <Reward key={key}> {" "}{data.rewards[key]} {key}</Reward>
                        ))
                    }
                </RewardList>
            </RewardSection>
        </Container>
    )
}

export default AchievementCard;

const Requirements = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
`
const ProgressBar = styled.div`
    height: 5px;
    border: 1px solid black;
    width: 100%;
`

const Container = styled.div`
    display: flex;
    height: 200px;
    width: 27%;
    border: 1px solid black;
    padding: 10px 10px;
    justify-content: space-around;
    flex-direction: column;
    text-align: center;
`

const TopSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 80%;
`

const Img = styled.div`
    width: 48%;
`;
const Text = styled.div`
    width: 48%;

`
const Title = styled.div`

`;
const Desc = styled.div`
    // width: 48%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`
const RewardSection = styled.div`
    display: flex;
    flex-direction: column;
`
const RewardText = styled.div`

`;
const RewardList = styled.div`
    display: flex;
    flex-direction: row;
`

const Reward = styled.div`
    display: flex;
`;
