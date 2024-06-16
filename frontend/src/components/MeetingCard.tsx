import styled from "styled-components";

const MeetingCard = ({ data }) => {
  return (
    <Container>
      <Section>
        <SectionInner>
          <Title> {data.title}</Title>
          <Row>
            <CommittedText>Chair</CommittedText>
            <MemberName> {data.member} </MemberName>
          </Row>
          <BigButton href={`/meeting/${data.id}`}> JOIN MEETING </BigButton>
          <BottmRow>
            <Button>Follow</Button>
            <XP>{data.xp} XP</XP>
            <Time>
              {data.start}-{data.end}
            </Time>
          </BottmRow>
        </SectionInner>
      </Section>
    </Container>
  );
};

const Container = styled.div`
    max-width: 30rem;
    width: 100%;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.secondary};
    border-radius: 8px;
    padding: 8px 8px;
    width: 100%;
    align-items: center;
    height: 90%;
`;

const SectionInner = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.primary};
  padding: 5px 5px;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 300;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap : 5px;
`;

const CommittedText = styled.div`
`;

const MemberName = styled.div`
    font-weight: 200;
    font-style: italic;
`;

const Button = styled.a`
    padding: .5rem 1rem .5rem 1rem;
    margin-bottom: .5rem;
    background-color: #EAEAEA;
    border-radius: 9999px;
    cursor: pointer;
    text-decoration: none;
    color: black;
`;
const BigButton = styled(Button)`
    padding: 15px 30px;
    margin: 1rem;
    font-size: 20px;
`;

const BottmRow = styled.div`\
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`;

const XP = styled.div`
    font-family: "Fira"
`;

const Time = styled.div`
    font-size: 1rem;
    padding: 5px 10px;
    font-family: "Fira";
`;

export default MeetingCard;
