import styled from "styled-components";

const Leaderboard = () => {
  const data = [
    { name: "user 1", level: 10, id: 2, xp: 3458 },
    { name: "user 3", level: 10, id: 2, xp: 3458 },
  ];

  // NOTE : THIS SHOULD REALLY BE A GIRD OR LIST BUT NO TIME FOR THAT
  return (
    <Container>
      <Table>
        <Position style={{ backgroundColor: "#EAEAEA" }}>
          <Rank>RANK</Rank>
          <Name>NAME</Name>
          <Level>LEVEL</Level>
          <XP>XP</XP>
        </Position>
        {data.map((e, i) => (
          <Position href={"/user/" + e.id}>
            <Rank>{i + 1}.</Rank>
            <Name> {e.name}</Name>
            <Level> {e.level} </Level>
            <XP> {e.xp} </XP>
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
`;
const Table = styled.div`
    display: flex;;
    flex-direction: column;
    border: 1px solid black;
    width: 80%;
`;
const Divider = styled.div`

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
const Name = styled.div`
      display: flex;
    justify-content: center;
    width: 40%;
`;
const Level = styled.div`
  display: flex;
    justify-content: center;
    width: 20%;
`;
const XP = styled.div`
  display: flex;
    justify-content: center;
    width: 20%;
`;
