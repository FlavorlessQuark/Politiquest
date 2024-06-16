import { useEffect } from "react";
import styled from "styled-components";

const AchievementCard = ({data}) => {

    useEffect(() => {
    console.log("rewards", data.rewards, data.desc)

    }, [data, data.rewards])


    return (
        <Container>
            <TopSection>
                <Img> IMAGE HERE</Img>
                <Text>
                    <Title> {data.title}</Title>
                    <Desc> {data.desc}</Desc>
                </Text>
            </TopSection>
            <RewardSection>
                <RewardText> Rewards :</RewardText>
                <RewardList>
                    {
                        data.rewards && Object.keys(data.rewards).map((key) => (
                            <Reward> {data.rewards[key]} : {key}</Reward>
                        ))
                    }
                </RewardList>
            </RewardSection>
        </Container>
    )
}

export default AchievementCard;

const Container = styled.div`
    height: 30%;
    width: 25%;
    border: 1px solid black;
<<<<<<< HEAD
    padding: 10px 10px;
`

const TopSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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

`
const RewardSection = styled.div`

`
const RewardText = styled.div`

`
const RewardList = styled.div`

`

const Reward = styled.div`

`
=======
`;

const TopSection = styled.div`

`;

const Img = styled.div`

`;
const Text = styled.div`

`;
const Title = styled.div`

`;
const Desc = styled.div`

`;
const RewardSection = styled.div`

`;
const RewardText = styled.div`

`;
const RewardList = styled.div`

`;
>>>>>>> 4ff81969bbea877c16b7d452ede2c0735f14a16b
