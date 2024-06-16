import styled from "styled-components";
import { useUserConsumer } from "./components/UserContext";
import AchievementCard from "./components/Achievements/AchievementCard";
import AvatarSvg from "./assets/person.svg"; // NOTE: Import as react component doenst work for whatever reason
import { CitizenBar } from "./components/CitizenBar";

const Profile = () => {
  const { achievements } = useUserConsumer();

  const dummyachivments = [
    {
      id: 0,
      title: "Unlimited power!",
      desc: "Vote on a poll during a council meeting",
      progress: -1,
      done: true,
      rewards: { xp: 50, title: "My opinion matters", cosmetic: undefined },
    },
  ];

  return (
    <Container>
      <Row>
        <Empty />
        <Avatar src={AvatarSvg} />
        <Achievements>
          <AchText>Achievements</AchText>
          <AchList>
            {dummyachivments.map((e) => (
              <AchievementCard data={e} />
            ))}
          </AchList>
        </Achievements>
      </Row>
      <CitizenBar />
    </Container>
  );
};

export default Profile;

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    width: 90%;
    flex-direction: row;
`;

const Empty = styled.div`
    width: 10%;
`;

const Avatar = styled.img`
    width: 60%;
    max-height: 500px;
`;

const Achievements = styled.div`
    width: 30%;
`;

const AchText = styled.div`
    font-weight: bold;
    text-decoration: underline;
`;
const AchList = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;
