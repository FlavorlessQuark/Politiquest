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
        <Tab
          key={elem.ref}
          href={elem.ref}
          {...(document.location.pathname === elem.ref
            ? { $active: "true" }
            : {})}
        >
          {elem.name}
        </Tab>
      ))}
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    position: fixed;
    bottom: 0;

    width: 100%;
    height: 5%;
    max-height: 100px;
    min-height: 40px;
    border-top: 1px solid black;
    justify-content: space-around;
    background: white;
`;

const Tab = styled.a<{ $active?: boolean }>`
    padding: .5rem 1rem;
    margin-bottom: .5rem;
    display: inline-block;
    text-decoration: none;
    transition: all .3s ease-in-out;
    font: 1.1rem sans-serif;
    font-weight: 300;
    color: #000;
    text-transform: capitalize;
    // border-bottom: solid 1px;
    // border-color: ${(props) => (props.$active ? "black" : "white")};

    text-underline-offset: 10px;
    color: ${(props) => (props.$active ? "#00b8ff" : "black")};
    text-decoration:  ${(props) => (props.$active ? "underline" : "none")};
    &:hover {
        background-color: #EAEAEA;
        cursor : pointer;
    }
`;

export default Navbar;
