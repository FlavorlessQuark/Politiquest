import styled from "styled-components";

const AchievementCard = (data) => {

    return (
        <Container>
            <TopSection>
                <Img> IMAGE HERE</Img>
                <Text>
                    <Title> {data.title}</Title>
                    <Desc></Desc>
                </Text>
            </TopSection>
            <RewardSection>
                <RewardText> Rewards :</RewardText>
                <RewardList>

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
`

const TopSection = styled.div`

`

const Img = styled.div`

`
const Text = styled.div`

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
