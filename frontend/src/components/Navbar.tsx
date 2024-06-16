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
    height: max-content;
    border-top: 1px solid black;
    justify-content: space-around;
    background: #bd9e84;
`;

const Tab = styled.a<{ $active?: boolean }>`
    padding: .7rem;
    margin-bottom: .5rem;
    display: inline-block;
    background: #bd9e84;
    text-decoration: none;
    transition: all .3s ease-in-out;
    font: 1.1rem "SynNova";
    font-weight: 300;
    color: #ffffff;
    text-transform: capitalize;
    text-underline-offset: 10px;
    color: ${(props) => (props.$active ? "#000000" : "#ffffff")};
    text-decoration:  ${(props) => (props.$active ? "underline" : "none")};
    &:hover {
        background-color: #ad8e74;
        cursor : pointer;
    }
`;

export default Navbar;
