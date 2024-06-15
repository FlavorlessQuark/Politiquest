import { styled } from "styled-components";

const Navbar = () => {
  const pages = [
    { name: "City Meetings", ref: "/home" },
    { name: "Achievements", ref: "/achievements" },
    { name: "Representatives", ref: "/reps" },
    { name: "Leaderboard", ref: "/leaderboard" },
  ];

  return (
    <Container>
      {pages.map((elem) => (
        <Tab key={elem.ref} href={elem.ref}>
          {elem.name}
        </Tab>
      ))}
    </Container>
  );
};

const Container = styled.div`
    width: 100%;
    height: 10%;
    max-height: 100px;
    min-height: 60px;
`;

const Tab = styled.a`
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    margin-bottom: .5rem;
    display: inline-block;
    text-decoration: none;
    transition: all .3s ease-in-out;
    font: 1.1rem sans-serif;
    font-weight: 300;
    color: #000;
    border-radius: .2rem;
    text-transform: uppercase;

    &:hover {
        background-color: #EAEAEA;
        cursor : pointer;
    }
`;

export default Navbar;
