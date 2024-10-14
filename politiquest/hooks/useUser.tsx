import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ICalItem } from "../constants/interfaces";
import { get_month_week } from "@/utils";

export const UserContext = createContext({});

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
  const [meetingsData, setMeetingsData] = useState<{[month:number] : Array<Array<ICalItem>>}>({});
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


  const formatSavedMeetings = (meetings: any) => {

    for (let meeting of meetings) {
        const date = new Date(meeting.date);

        const {month, week} = get_month_week(meeting.date)

        meeting["_date"] = meeting.date;
        meeting.date =  date.toLocaleDateString();
        meeting.time =  date.toLocaleTimeString();

        if (!meetingsData[month])
            meetingsData[month] = [[], [], [], []]

        meetingsData[month][week].push(meeting)
    }


    for (let month of Object.keys(meetingsData)) {
        for (let week of meetingsData[month]){
            week.sort((a, b) => new Date(a._date).getDate() - new Date(b._date).getDate())
        }
    }

    console.log("data", meetingsData)
    setMeetingsData({...meetingsData})
  }

  const init = async () => {

    axios.get("/user/get-user", {params: {id: 0}}).then((res) => {
        setLevel(res.data.level);
        setXP(res.data.xp);
        formatSavedMeetings(res.data.savedMeetings);
        setUser({name: res.data.name, surname: res.data.surname, id: res.data.id});
        setAchievemnts([]);
        setTitle('title');

        const ids = new Set<string>()
        res.data.savedMeetings.map((e:ICalItem) => {ids.add(e.uid)})
        setMeetingsId(ids)
        setInit(true)
    })

  };

  const saveMeetings = (meeting:ICalItem) => {
    const {month, week} = get_month_week(meeting._date)

    meetingsId.add(meeting.uid)
    if (!meetingsData[month])
        meetingsData[month] = [[], [], [], []]
    console.log("Pushing", meeting._date, month, week)
    meetingsData[month][week].push(meeting)
    meetingsData[month][week].sort((a, b) => new Date(a._date).getDate() - new Date(b._date).getDate())


    axios.post("/user/star-meeting", {meetingid: meeting.uid, userid: user.id}).then((res) => {
        })
        setMeetingsId(new Set(meetingsId))
        setMeetingsData({...meetingsData})
    }

    const delMeetings = (meeting:ICalItem) => {
        const {month, week} = get_month_week(meeting._date)

        let match = -1;

        console.log("???", meeting._date, new Date(meeting._date))
        console.log("Deleting meeting month, week", month, week)
        console.log("searching", meetingsData[month][week])
        for (let idx in meetingsData[month][week]) {
            if (meetingsData[month][week][idx]._id == meeting._id)
                match = parseInt(idx)
        }

        if (match != -1) {
            console.log("Found to unstar")
            meetingsData[month][week].splice(match, 1);
        }

        setMeetingsData({...meetingsData})
        meetingsId.delete(meeting.uid)
        axios.post("/user/unstar-meeting", {meetingid: meeting.uid, userid: user.id}).then((res) => {})
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
