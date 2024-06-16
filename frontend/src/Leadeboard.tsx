import styled from "styled-components";
import { CitizenBar, randomTitle } from "./components/CitizenBar";

const Leaderboard = () => {
  const data = [
    { name: "Ada Lovelace", level: 10.22, id: 0, xp: 3458 },
    { name: "Donald Knuth", level: 8.89, id: 1, xp: 3458 },
    { name: "Alan Turing", level: 7.8, id: 2, xp: 3458 },
    { name: "Grace Hopper", level: 6.23, id: 3, xp: 3458 },
    { name: "Jimi Hendrix", level: 5.3, id: 4, xp: 3458 },
    { name: "Bob", level: 2.76, id: 5, xp: 3458 },
    { name: "Samantha", level: 1.34, id: 6, xp: 3458 },
  ];

  return (
    <Container>
      <Table>
        <Title>Leader Board</Title>
        {data.map((e, i) => (
          <Position key={e.id} href={`/user/${e.id}`}>
            <Rank>{i + 1}.</Rank>
            <CitizenBar
              level={e.level}
              username={e.name}
              title={randomTitle()}
            />
          </Position>
        ))}
      </Table>
      <Padder/>
    </Container>
  );
};

export default Leaderboard;

const Padder = styled.div`
    display: flex;

    width: 100%;
    height: 5%;
    max-height: 100px;
    min-height: 60px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    font-family: "FiraMono";
`;

const Table = styled.div`
    width: 100%;
    max-width: 40rem;
`;

const Title = styled.div`
    font-family: "SynNova";
    font-size: 1.6rem;
    width: 100%;
    text-align: center;
`;

const Position = styled.a`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
     &:hover {
        background-color: #EAEAEA;
        cursor : pointer;
    }
    border-bottom: 1px solid black;
    padding: 20px 0px;
    color: black;
    text-decoration: none;
`;

const Rank = styled.div`
    display: flex;
    justify-content: center;
    width: 10%;
`;
