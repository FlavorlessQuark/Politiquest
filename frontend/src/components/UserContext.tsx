import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [level, setLevel] = useState(undefined);
  const [xp, setXP] = useState(undefined);
  const [achievements, setAchievemnts] = useState([]);

  const init = () => {
    const dummy_user = {
      name: "First Name",
      surname: "First Name",
      id: 0,
    };
    const dumm_ach = [0, 1];

    setLevel(10.33);
    setXP(10000);
    setUser(dummy_user);
    setAchievemnts(dumm_ach);
  };

  useEffect(() => {
    if (!user) {
      init();
    }
  });

  return (
    <UserContext.Provider
      value={{
        user,
        xp,
        level,
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
