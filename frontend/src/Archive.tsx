import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios"
import { ICalItem } from "./Imeetings";
import ArchiveDay from "./components/ArchiveDay";


const Archive = () => {
    const [year, setYear] = useState(0)
    const [meetData, setmeetData] = useState<{[year:number] : Object}>({})
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



    const get_month_meetings = async(month: number) => {
        axios.defaults.baseURL = "http://localhost:5000"

        try {
            // console.log(Object.keys(meetData), month.toString(),Object.keys(meetData).includes(month.toString()) )
            if (!Object.keys(meetData).includes(month.toString()))
            {
                console.log("trying");

                axios.get("/meetings/get-all", {params : {from: "FCSM", month:7, year: 2024}}).then((res):any => {
                    const data = meetData;

                    data[month] = {}

                    console.log("here1");
                    for (let meeting of res.data){
                        const date = new Date(meeting.date);

                        meeting["_date"] = meeting.date
                        meeting.date =  date.getDate();
                        if (!(meeting.date in data[month]))
                            data[month][meeting.date] = []
                        data[month][meeting.date].push(meeting);
                    }

                    console.log("here2", res.data);
                    console.log(data)
                    setmeetData({...data})
                })
            }
            console.log(meetData)
        } catch(err) {
            console.log("errorfecthing data", err)
    }

  }


  useEffect(() => {
    const today = new Date();
    const _month = parseInt(today.toLocaleString('default', {month: "numeric"}));

    get_month_meetings(_month).then((res) => console.log("setting up"))

  }, [])

    return (
        <Container>
            <Title> Archive </Title>
            <YearContainer>
                <YearArrow> {"<"} </YearArrow>
                <YearText> 2024 </YearText>
                <YearArrow> {">"} </YearArrow>
            </YearContainer>
            <CalendarContainer>
            {
                months.map((e, i) =>
                <CalCell>
                    <CalMonth> {e} {i}</CalMonth>
                    <ArchiveDay data = { meetData[i + 1]}>
                    </ArchiveDay>
                </CalCell>
                )
            }

            </CalendarContainer>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;
    gap: 20px;
`
const Title = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 38px;
    align-items: center;
    justify-content: center;
    width: 60%;
    text-align: center;
`

const YearContainer = styled.div`
     display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 25px;
`

const YearArrow = styled.div`

`

const YearText = styled.div`

`

const CalendarContainer = styled.div`
    display: flex;
    border : 1px solid black;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-evenly;
    padding: 10px;
`

const CalCell = styled.div`
    display: flex;
    flex-direction: column;
    border : 1px solid black;
    height: 280px;
    width: 280px;
    padding: 10px;
    gap: 10px;
    align-items: center;

`
const CalMonth = styled.div`
    display: flex;
`
const Caldays = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    // align-items: center;
    justify-content: center;
    witdh: 100%;

`
const Calday = styled.div`
    padding: 5px;
    width: 35px;
    height: 35px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid black;
`



export default Archive;
