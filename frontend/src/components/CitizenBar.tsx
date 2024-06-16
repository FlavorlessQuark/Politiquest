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
`

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



function levelToPrefix(level: number): string {
  return prefixes[level % prefixes.length];
}

export function CitizenBar({ level = 0}) {
  const {title , user} = useUserConsumer();

    console.log("user", user)

  const levelBase = Math.trunc(level);
  return (
    <TMP>
      <CitizenLayout>
        <CitizenJob>
            {user.name}, {user.surname}
          {/* {user.name && user.name}, {user.surname && user.surname} */}
          <CitizenTitle>
            {levelToPrefix(levelBase)} {title}
          </CitizenTitle>
        </CitizenJob>
        <CitizenLvl>lvl.{levelBase}</CitizenLvl>
      </CitizenLayout>
      <ProgressBar score={level - levelBase} hideText="true" />
    </TMP>
  );
}

// export function UserBar() {
//   return <CitizenBar {...props} />;
// }
