import { styled } from "styled-components";

const Navbar = () => {
  const pages = [
    { name: "City Meetings", ref: "/home" },
    { name: "Achievments", ref: "/achievments" },
    { name: "Representatives", ref: "/reps" },
    { name: "Leaderboard", ref: "/leaderboard" },
  ];

  return (
    <Container>
      {pages.map((elem) => (
        <Tab href={elem.ref}> {elem.name}</Tab>
      ))}
    </Container>
  );
};

const Container = styled.div`
    width: 100%;
    height: 10%;
    max-height: 100px;
    min-height: 60px;
    border-top: 1px solid black;
`;

const Tab = styled.a`
    width: 20%;
    height: 100%;
    border-left: 1px solid black;
    border-right: 1px solid black;

    &:hover {
        cursor : pointer;
    }
`;

export default Navbar;
