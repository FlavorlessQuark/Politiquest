import styled from "styled-components";
import { useState } from "react";
import RepCard from "./components/RepCard";

const Reps = () => {
  const [activeTab, setActiveTab] = useState(0);

  const meetData = {
    title: "Test Council Meeting",
    date: "01/01/2024",
    start: "09:00AM",
    end: "10:30AM",
  };

  const Tabs = [
    {
      name: "District 1",
      members: [
        {
          name: "Some Member",
          chair: "Some committee",
          vicechair: "Some committee",
          member: ["Committee 1", "committee 2"],
          info: "Some link",
        },
        {
          name: "Some Member",
          vicechair: "Some committee",
          member: ["Committee 1"],
          info: "Some link",
        },
      ],
    },
    {
      name: "District 2",
      members: [
        {
          name: "Some Member",
          chair: "Some committee",
          vicechair: "Some committee",
          member: ["Committee 1", "committee 2"],
          info: "Some link",
        },
      ],
    },
    {
      name: "District 3",
      members: [
        {
          name: "Some Member",
          chair: "Some committee",
          member: ["Committee 1", "committee 2", "committee 33"],
          info: "Some link",
        },
      ],
    },
  ];

  return (
    <Container>
      <RepTabContainer>
        {Tabs.map((e, i) => (
          <RepTab
            onClick={() => setActiveTab(i)}
            {...(activeTab === i ? { $active: "true" } : {})}
            key={e.name}
          >
            {e.name}
          </RepTab>
        ))}
      </RepTabContainer>
      <RepRect>
        {Tabs[activeTab].members.map((e) => [<RepCard data={e} />])}
      </RepRect>
    </Container>
  );
};

export default Reps;

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 2rem 2rem;
    box-sizing: border-box;
`;

const RepRect = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  height: 100%;
  width: 90%;
   border: 4px solid ${props => props.theme.secondary};
   gap: 20px;
   flex-wrap: wrap;
   background: ${props => props.theme.primary};

`;
const RepTabContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0px;
`;

const RepTab = styled.div<{ $active?: boolean }>`
    padding: 10px 20px;
    border: 1px solid black;
    z-index: 2;
    background: ${props => (props.$active ? props.theme.primary : props.theme.highlight) };
    right:  ${(props) => (props.$active ? "-4px" : "-0px;")};
    border: 4px solid ${props => props.theme.secondary};
    border-right: 0px;
    position: relative;

    &:hover {
        cusor:pointer;
    }
`;
