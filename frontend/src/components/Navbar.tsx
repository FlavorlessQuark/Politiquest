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
        <Tab selected={window.location.pathname === elem.ref} key={elem.ref} href={elem.ref}>
          {elem.name}
        </Tab>
      ))}
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;

    width: 100%;
    height: 5%;
    max-height: 100px;
    min-height: 60px;
    border-top: 1px solid black;
    justify-content: space-around;
`;

const Tab = styled.a`
    display: flex;
    // border-left: 1px solid black;
    // border-right: 1px solid black;
    padding: 5px 20px;
    align-items: center;
    text-underline-offset: 10px;
    color: ${props => props.selected ? "#00b8ff" : "black"};
    text-decoration:  ${props => props.selected ? "underline" : "none"};

    &:hover {
        cursor : pointer;
    }
`;

export default Navbar;
