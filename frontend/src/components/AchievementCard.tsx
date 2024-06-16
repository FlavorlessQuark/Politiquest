import { useEffect } from "react";
import styled from "styled-components";

const AchievementCard = ({data}) => {

    useEffect(() => {
    console.log("rewards", data.rewards, data.desc)

    }, [data, data.rewards])


    return (
        <Container>
            <Title> {data.title}</Title>
            <TopSection>
                <Img> IMAGE HERE</Img>
                <Desc> {data.desc}</Desc>
            </TopSection>
            <RewardSection>
                <RewardText> Rewards :</RewardText>
                <RewardList>
                    {
                        data.rewards && Object.keys(data.rewards).map((key) => (
                            data.rewards[key] && <> {data.rewards[key]} {key} |</>
                        ))
                    }
                </RewardList>
            </RewardSection>
        </Container>
    )
}

export default AchievementCard;

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
    height: 80%;
`

const Img = styled.div`
    width: 48%;
`
const Text = styled.div`
    width: 48%;

`
const Title = styled.div`

`
const Desc = styled.div`
    width: 48%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const RewardSection = styled.div`
    display: flex;
    flex-direction: column;
`
const RewardText = styled.div`

`
const RewardList = styled.div`
    display: flex;
    flex-direction: row;
`

const Reward = styled.div`

`
