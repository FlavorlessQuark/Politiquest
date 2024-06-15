import {ProgressBar} from "react-progressbar-fancy";
import { styled } from "styled-components";

const CitizenJob = styled.div`
  font: 1rem sans-serif;
  font-weight: 200;
  display: inline-block;
  margin-left: 1rem;
`;

const CitizenLvl = styled.div`
  font: 1rem monospace;
  font-weight: 200;
  display: inline-block;
  margin-right: 1rem;
`;

const CitizenTitle = styled.div`
  font: .9rem sans-serif;
  font-weight: 600;
  padding-bottom: 0.1rem;
`;

const CitizenBar = styled.section`
  display: flex;
  justify-content: space-between;
`;

const Home = () => {
  return <div>
    <CitizenBar>
      <CitizenJob>
        Advanced Citizen
        <CitizenTitle>Master Meeting Attendee</CitizenTitle>
      </CitizenJob>
      <CitizenLvl>lvl.11</CitizenLvl>
    </CitizenBar>
    <ProgressBar score={25} hideText="true" />
  </div>;
};

export default Home;
