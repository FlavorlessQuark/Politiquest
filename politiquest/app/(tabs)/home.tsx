import Button from "@/components/Button";
import MeetingCard from "@/components/MeetingCard";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components/native";
import axios from "axios"
import { MaterialIcons } from "@expo/vector-icons";
import { ICalItem } from "@/constants/interfaces";
import { useUserConsumer , UserProvider} from "@/hooks/useUser";
import { get_month_week } from "@/utils";

export default function Home() {
    const [active, setActive] = useState(1)
    const [month, setMonth] = useState(0)
    const [activeWeek, setActiveWeek] = useState(0)
    const [meetData, setmeetData] = useState<{[month:number] : Array<Array<ICalItem>>}>({})
    const {meetingsData} = useUserConsumer()
    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // axios.defaults.baseURL = "198.162.1.13:5000"

  const get_month_meetings = async(month: number) => {
    if (!Object.keys(meetData).includes(month.toString()))
    {

        axios.get("http://192.168.1.14:5000/meetings/get-month", {params : {from: "FCSM", month:month, year: 2024}})
        .then((res):any => {
            const data = meetData;
            data[month] = [[], [], [], []];

            // console.log("Got  meetings", res.data)
            for (let meeting of res.data){
                const date = new Date(meeting.date);
                const {week} = get_month_week(meeting.date)

                meeting["_date"] = meeting.date
                meeting.date =  date.toLocaleDateString();
                meeting.time =  date.toLocaleTimeString();

                data[month][week].push(meeting);
            }
            for (let week of data[month]) {
                week.sort((a, b) => new Date(a._date).getDate() - new Date(b._date).getDate())
            }

            setmeetData({...data})
        })
        .catch((error) => {
            console.log("Eerror fecthing meetings", error)
        })
    }
    console.log(meetData)

  }

  const setCurrentMonth = async (next:number) => {

    const newMonth = Math.max(1, (month + next) % 12);
    await get_month_meetings(newMonth)
    setMonth(newMonth);
  }

  useEffect(() => {
    // ADD : Month param
    const today = new Date();
    const date = get_month_week(today.toISOString());
    console.log("week is", date.week)
    console.log("month is ", date.month)

    setMonth(date.month)
    setActiveWeek(date.week)
    get_month_meetings(date.month).then((res) => console.log("setting up"))
    // axios.get("/user/get-user", {params: {id: 0}}).then((res) => console.log("got user", res.data))

  }, [])

  return (

    <Container>
    <Tabs>
        <ButtonBox onPress={() => setActive(0)}>
            <Button state={active == 0}> City Calendar </Button>
        </ButtonBox>
        <ButtonBox onPress={() => {setActive(1)}}>
            <Button state={active == 1}> My Calendar </Button>
        </ButtonBox>
        <ButtonBox onPress={() => setActive(2)}>
            <Button state={active == 2}> Archive </Button>
        </ButtonBox>
    </Tabs>
    <HeaderContainer>
        <MonthSelecContainer>
            <MonthSelecButton onPress={async () => {await setCurrentMonth(-1)}}>
                <MaterialIcons name={"arrow-left"} size={46} style={{color:"#667984"}} />
            </MonthSelecButton>
            <MonthSelecCurrent>
                <StyledText>{months[month]} </StyledText>
            </MonthSelecCurrent>
            <MonthSelecButton onPress={async () => {await setCurrentMonth(+1)}}>
                    <MaterialIcons name={"arrow-right"} size={46} style={{color:"#667984"}} />
            </MonthSelecButton>
        </MonthSelecContainer>
        <WeekSelecContainer>
        {
            meetData[month] && meetData[month].map((_, i) =>
            <TextWrapper key={i}  active={i == activeWeek} onPress={() => setActiveWeek(i)}>
                <StyledText> Week {i + 1} </StyledText>
                {i == activeWeek && <Border/>}

            </TextWrapper>
            )
        }
    </WeekSelecContainer>
    </HeaderContainer>
        { meetData[month] &&
            <FlatList
                contentContainerStyle={{alignItems:"center", width: "100%"}}
                data={
                    active == 0 ?
                        meetData[month][activeWeek] ? meetData[month][activeWeek] : []
                        :
                        meetingsData[month.toString()]  &&  meetingsData[month.toString()][activeWeek] ? meetingsData[month][activeWeek] : []
                    }
                renderItem={(item) => <MeetingCard data={item.item} key={item.index}/>}
            />
        }
    </Container>
  );
}

const Container = styled.SafeAreaView`
    display:flex;
    flex-direction: column;
    justify-content:start;
    align-items: center;
    gap: 20px;
    padding-top: 50px;
    margin-bottom: 70px;
`

const StyledText = styled.Text`
    font-family: 'Jura-Medium';
    color: black;
    font-size: 20px;
`
const TextWrapper = styled.Pressable`
`

const Border = styled.View`
    width: 100%;
    height: 2px;
    background: #86E1CB;
`

const HeaderContainer = styled.View`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`
const WeekSelecContainer = styled.View`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`
const MonthSelecContainer = styled.View`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`
const MonthSelecButton = styled.Pressable`
    font-size:20px;
    font-weight: bold;
    padding: 0px 5px;
    &:hover {
        cursor:pointer;
        background: #79ffcd4a;
    }
`

const MonthSelecCurrent = styled.View`
    font-size:20px;
    font-weight: bold;
`

const Tabs = styled.View`
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    width: 95%;
    height: 50px;
    gap: 5px;
`
const ButtonBox = styled.Pressable`
    display:flex;
    flex-direction: column;
    height: 100%;
    width: 33%;
    justify-content: flex-end;
`

