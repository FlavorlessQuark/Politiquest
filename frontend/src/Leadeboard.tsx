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

  // NOTE : THIS SHOULD REALLY BE A GIRD OR LIST BUT NO TIME FOR THAT
  return (
    <Container>
      LeaderBoard
      <Table>
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
    </Container>
  );
};

export default Leaderboard;

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
    display: flex;;
    flex-direction: column;
    width: 80%;
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
