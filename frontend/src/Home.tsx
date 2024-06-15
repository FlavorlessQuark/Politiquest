import {ProgressBar} from "react-progressbar-fancy";
import { styled } from "styled-components";

const FancyLabel = styled.div`
  font: 1rem sans-serif;
  font-weight: 200;
  display: inline-block;
  margin-left: 1rem;
`;

const CitizenTitle = styled.div`
  font: 1rem sans-serif;
  font-weight: 800;
`;

const CitizenBar = styled.section`
  display: flex;
  justify-content: space-between;
`;

const Home = () => {
  return <div>
    <CitizenBar>
      <FancyLabel>
        Advanced Citizen
        <CitizenTitle>Master Meeting Attendee</CitizenTitle>
      </FancyLabel>
      <FancyLabel>lvl 11</FancyLabel>
    </CitizenBar>
    <ProgressBar score={25} hideText="true" />
  </div>;
};

export default Home;
