import styled from "styled-components";
import ButtonImg from "../assets/button.png"
import BGImg from "../assets/bg.png"

import { ICalItem } from "../Imeetings";
import { useEffect, useState } from "react";

export const MeetingCard = ({ data }: { data: ICalItem}) => {
    const [datetime, setDateTime] = useState("");

    useEffect(()=> {
        const date = new Date(data.date);

        const dt = date.toLocaleDateString() + "  " +  date.toLocaleTimeString()
        setDateTime(dt);
    }, [])

  return (
    <Container>
      <Section>
        <SectionInner>
          <Title> {data.category}</Title>
          <Row>
            <CommittedText>Chair</CommittedText>
            <MemberName> "Test" </MemberName>
          </Row>
          <BigButton href={`/meeting/${data.id}`}> { data.cancelled ? "CANCELLED" : 'JOIN MEETING'} </BigButton>
          <BottmRow>
            <Button>Follow</Button>
            <XP> 50 XP</XP>
            <Time>
              {data.date}
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
    // background-color: ${(props) => props.theme.secondary};
    border-radius: 4px;
    padding: 4px 4px;
    width: 100%;
    align-items: center;
    height: 90%;
`;

const SectionInner = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.primary};
    // background-image: url(${BGImg});
  padding: 5px 5px;
  width: 100%;
  height: 100%;
  border-radius: 6px;
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
    background: url(${ButtonImg});
    cursor: pointer;
    text-decoration: none;
    color: black;
    transition: all .2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.button};
  }
    font-weight: 402;
  background-size: 100% 95%;
  background-repeat: no-repeat;
`;
const BigButton = styled(Button)`
    padding: 15px 30px;
    margin: 1rem;
    font-size: 20px;
    // background-color: orange;

`;

const BottmRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`;

const XP = styled.div`
    font-family: "FiraMono"
`;

const Time = styled.div`
    font-size: 1rem;
    padding: 5px 10px;
    font-family: "FiraMono";
`;

