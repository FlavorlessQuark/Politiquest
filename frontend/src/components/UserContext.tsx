import { createContext, useContext, useEffect, useState } from "react";
import { randomTitle } from "./CitizenBar";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "First Name",
    surname: "Last Name",
    id: 0,
  });
  const [title, setTitle] = useState(undefined);
  const [level, setLevel] = useState(undefined);
  const [xp, setXP] = useState(undefined);
  const [achievements, setAchievemnts] = useState([
    {
      id: 0,
      title: "Unlimited power!",
      desc: "Vote on a poll during a council meeting",
      progress: -1,
      done: true,
      rewards: { xp: 50, title: "My opinion matters", cosmetic: undefined },
    },
  ]);
  const init = () => {
    const dummy_user = {
      name: "First Name",
      surname: "Last Name",
      id: 0,
    };
    const dumm_ach = [
      {
        id: 0,
        title: "Unlimited power!",
        desc: "Vote on a poll during a council meeting",
        progress: -1,
        done: true,
        rewards: { xp: 50, title: "My opinion matters", cosmetic: undefined },
      },
    ];

    setLevel(10.33);
    setXP(10000);
    setUser(dummy_user);
    setAchievemnts(dumm_ach);
    setTitle(randomTitle());
  };

  useEffect(() => {
    if (!xp) {
      console.log("init user");
      init();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        xp,
        level,
        title,
        achievements,
        setXP,
        setLevel,
        setAchievemnts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserConsumer() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("no context");
  }

  return context;
}
