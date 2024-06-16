import styled from "styled-components"

const MeetingCard = ({data}) =>
{
    return (
        <Container>
            <Sidebar/>
            <Section>
                <Title> {data.title}</Title>
                <Row>
                    <CommittedText>Committee Chair: </CommittedText>
                    <MemberName> {data.member} </MemberName>
                </Row>
                <BigButton href={"/meeting/" + data.id}> JOIN MEETING </BigButton>
                <BottmRow>
                    <Button> + Follow</Button>
                    <XP> 50 XP</XP>
                    <Time> {data.start}</Time>
                </BottmRow>
            </Section>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

const Sidebar = styled.div`
    width: 2px;
    border: 1px solid black;
    background: green;
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 8px;
    padding: 20px 20px;
    width: 90%;
    align-items: center;
    gap:30px;
    height: 90%;
    margin: 10px 0px;
`

const Title= styled.div`
    font-size: 30px;
    font-weight: bold;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap : 5px;
`
const CommittedText = styled.div`
    text-decoration: underline;
`
const MemberName = styled.div`
`

const Button = styled.a`
    display: flex;
    border: 1px solid black;
    border-radius: 8px;
    padding: 5px 5px;
    cursor: pointer;
    text-decoration: none;
    color: black;
`
const BigButton = styled(Button)`
    display: flex;
    border: 1px solid black;
    border-radius: 8px;
    padding: 15px 30px;
    font-size: 20px;
`

const BottmRow = styled.div`\
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`
const XP = styled.div`
text-underline-offset: 5px;
text-decoration: underline;
`
const Time = styled.div`
    padding: 5px 10px;
     border: 1px solid black;
    border-radius: 8px;
`


export default MeetingCard;
