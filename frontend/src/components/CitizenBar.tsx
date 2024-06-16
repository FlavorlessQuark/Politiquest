import { ProgressBar } from "react-progressbar-fancy";
import { styled } from "styled-components";
import { useUserConsumer } from "./UserContext";

const CitizenJob = styled.div`
  font: 1rem "SynNova";
  font-weight: 200;
  margin-left: 1rem;
`;

const CitizenLvl = styled.div`
  font: 1rem "Fira", monospace;
  font-weight: 200;
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
    flex-grow: 1;
    max-width: 40rem;
    margin-top: .5rem;
    margin-bottom: 1rem;
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

export function randomTitle() {
  return titles[Math.floor(Math.random() * titles.length)];
}

function levelToPrefix(level: number): string {
  return prefixes[level % prefixes.length];
}

export function CitizenBar({
  level = 0,
  title = "Citizen",
  username = "Advanced Citizen",
}) {
  const levelBase = Math.trunc(level);
  return (
    <TMP>
      <CitizenLayout>
        <CitizenJob>
          {username}
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
  const { title, user, level } = useUserConsumer();
  const props = {
    level,
    title,
    username: `${user.name}, ${user.surname}`,
  };
  return <CitizenBar {...props} />;
}
