import Button from "@/components/Button";
import MeetingCard from "@/components/MeetingCard";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components/native";
import axios from "axios"
import { MaterialIcons } from "@expo/vector-icons";
import { ICalItem } from "@/constants/interfaces";

export default function Home() {
    const [active, setActive] = useState(1)
    const [month, setMonth] = useState(0)
    const [activeWeek, setActiveWeek] = useState(0)
    const [meetData, setmeetData] = useState<{[month:number] : Array<Array<ICalItem>>}>({})
    // const {savedMeetings} = useUserConsumer()
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
                const day = Math.min(4, Math.max(1, Math.ceil(date.getDate() / 7)))

                meeting["_date"] = meeting.date
                meeting.date =  date.toLocaleDateString();
                meeting.time =  date.toLocaleTimeString();

                data[month][day - 1].push(meeting);
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
    const _month = parseInt(today.toLocaleString('default', {month: "numeric"}));
    setMonth(_month)
    setActiveWeek(Math.min(3, Math.ceil(today.getDate() / 7) - 1))
    console.log("week is", Math.ceil(today.getDate() / 7) - 1)

    get_month_meetings(_month).then((res) => console.log("setting up"))
    // axios.get("/user/get-user", {params: {id: 0}}).then((res) => console.log("got user", res.data))

  }, [])


  return (
    <Container>
    <Tabs>
        <ButtonBox onPress={() => setActive(0)}>
            <Button state={active == 0}> City Calendar </Button>
        </ButtonBox>
        <ButtonBox onPress={() => setActive(1)}>
            <Button state={active == 1}> My Calendar </Button>
        </ButtonBox>
        <ButtonBox onPress={() => setActive(2)}>
            <Button state={active == 2}> Archive </Button>
        </ButtonBox>
    </Tabs>
   { meetData[month] && <FlatList
            contentContainerStyle={{alignItems:"center"}}
            data={meetData[month][activeWeek] ? meetData[month][activeWeek] : []}
            renderItem={(item) => <MeetingCard data={item.item} key={item.index}/>}
            ListHeaderComponent={() => {
                return(
                    <HeaderContainer>
                        <MonthSelecContainer>
                            <MonthSelecButton onPress={async () => {await setCurrentMonth(-1)}}>
                                <MaterialIcons name={"arrow-left"} size={46} style={{color:"#667984"}} />
                            </MonthSelecButton>
                            <MonthSelecCurrent>
                                <StyledText>{months[month]} </StyledText>
                            </MonthSelecCurrent>
                            <MonthSelecButton onPress={async () => {await setCurrentMonth(-1)}}>
                                    <MaterialIcons name={"arrow-right"} size={46} style={{color:"#667984"}} />
                            </MonthSelecButton>
                        </MonthSelecContainer>
                            <WeekSelecContainer>
                            {
                                meetData[month] && meetData[month].map((_, i) =>
                                    <StyledText active={i == activeWeek}
                                        onClick={() => setActiveWeek(i)}
                                        key={i}
                                    > Week {i + 1} </StyledText>
                                )
                            }
                        </WeekSelecContainer>
                    </HeaderContainer>
                )
            }}

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
const StyledArrow = styled.Text`
    font-family: 'Jura-Bold';
    color: black;
    font-size: 30px;
`

const HeaderContainer = styled.View`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid red;
    gap: 20px;
`
const WeekSelecContainer = styled.View`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid red;
    gap: 20px;
`
const MonthSelecContainer = styled.View`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid red;
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

