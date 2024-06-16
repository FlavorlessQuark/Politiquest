import { ProgressBar } from "react-progressbar-fancy";
import { styled } from "styled-components";
import { useUserConsumer } from "./UserContext";

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

const CitizenLayout = styled.div`
  display: flex;
  justify-content: space-between;
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
  "Citizen",
  "Meeting Attendee",
  "Voter",
  "Taxpayer",
  "Constituent",
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
    <section>
      <CitizenLayout>
        <CitizenJob>
          Advanced Citizen
          <CitizenTitle>
            {levelToPrefix(level)} {title}
          </CitizenTitle>
        </CitizenJob>
        <CitizenLvl>lvl.{levelBase}</CitizenLvl>
      </CitizenLayout>
      <ProgressBar score={level - levelBase} hideText="true" />
    </section>
  );
}

export function UserBar() {
  const props = useUserConsumer();
  return <CitizenBar {...props} />;
}
