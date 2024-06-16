import { ProgressBar } from "react-progressbar-fancy";
import { styled } from "styled-components";
import { useUserConsumer } from "./UserContext";

const CitizenJob = styled.div`
  font: 1rem "SynNova";
  font-weight: 200;
  display: inline-block;
  margin-left: 1rem;
`;

const CitizenLvl = styled.div`
  font: 1rem "Monoid", monospace;
  font-weight: 200;
  display: inline-block;
  margin-right: 1rem;
`;

const CitizenTitle = styled.div`
  font: .8rem "SynNova";
  font-weight: 600;
  padding-bottom: 0.5rem;
`;

const CitizenLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TMP = styled.section`
    width: 100%;
`;

const prefixes = [
  "Novice",
  "Student",
  "Intermediate",
  "Advanced",
  "Enlightened",
  "Honorable",
  "Master",
  "Glorious",
];

const titles = [
  "Meeting Attendee",
  "Voter",
  "Taxpayer",
  "Constituent",
  "Community Stakeholder",
  "Interested Party",
  "Oversight Overlord",
];

function randomTitle() {
  return titles[Math.floor(Math.random() * titles.length)];
}

function levelToPrefix(level: number): string {
  return prefixes[level % prefixes.length];
}

export function CitizenBar({ level = 0, title = randomTitle() }) {
  const levelBase = Math.trunc(level);
  return (
    <TMP>
      <CitizenLayout>
        <CitizenJob>
          Advanced Citizen
          <CitizenTitle>
            {levelToPrefix(levelBase)} {title}
          </CitizenTitle>
        </CitizenJob>
        <CitizenLvl>lvl {level}</CitizenLvl>
      </CitizenLayout>
      <ProgressBar score={(level - levelBase) * 100.0} hideText="true" />
    </TMP>
  );
}

export function UserBar() {
  const props = useUserConsumer();
  return <CitizenBar {...props} />;
}
