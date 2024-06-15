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
        <Tab key={elem.ref} href={elem.ref}
          {...document.location.pathname === elem.ref ? {$active: "true"} : {}} >
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

const Tab = styled.a<{ $active?: boolean; }>`
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
    text-transform: capitalize;
    border-bottom: solid 1px;
    border-color: ${props => props.$active ? "black" : "white" };

    &:hover {
        background-color: #EAEAEA;
        cursor : pointer;
    }
`;

export default Navbar;
