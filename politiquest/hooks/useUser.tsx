import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ICalItem } from "../constants/interfaces";

const UserContext = createContext({});

axios.defaults.baseURL = "http://192.168.1.14:5000"

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState({
    name: "First Name",
    surname: "Last Name",
    id: 0,
  });
  const [isInit, setInit] = useState(false)
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(0);
  const [xp, setXP] = useState(0);
  const [meetingsId, setMeetingsId] = useState<Set<string>>(new Set());
  const [meetingsData, setMeetingsData] = useState([]);
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
  const init = async () => {

    axios.get("/user/get-user", {params: {id: 0}}).then((res) => {
        setLevel(res.data.level);
        setXP(res.data.xp);
        setMeetingsData(res.data.savedMeetings)
        setUser({name: res.data.name, surname: res.data.surname, id: res.data.id});
        setAchievemnts([]);
        setTitle('title');

        const ids = new Set<string>()
        res.data.savedMeetings.map((e:ICalItem) => {ids.add(e.uid)})
        setMeetingsId(ids)
        setInit(true)
        console.log("user data", res.data)
    })

  };

  const saveMeetings = (meeting:ICalItem) => {
    meetingsId.add(meeting.uid)
    console.log('Adding', meeting, meetingsId)
    axios.post("/user/star-meeting", {meetingid: meeting.uid, userid: user.id}).then((res) => {
        console.log("saved meetign res", res)
    })
    setMeetingsId(new Set(meetingsId))
  }

    const delMeetings = (meeting:ICalItem) => {
    meetingsId.delete(meeting.uid)
    console.log('Adding', meeting, meetingsId)
    axios.post("/user/unstar-meeting", {meetingid: meeting.uid, userid: user.id}).then((res) => {
        console.log("saved meetign res", res)
    })
    setMeetingsId(new Set(meetingsId))
  }


  useEffect(() => {
    if (!isInit) {
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
        meetingsId,
        meetingsData,
        setXP,
        setLevel,
        setAchievemnts,
        saveMeetings,
        delMeetings
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
