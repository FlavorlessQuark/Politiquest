import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios"
import { ICalItem } from "./Imeetings";
import ArchiveDay from "./components/ArchiveDay";


const Archive = () => {
    const [currYear, setYear] = useState(0)
    const [meetData, setmeetData] = useState<{[year:number] : Object}>({})
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



    const get_meetings = async(year: number) => {
        axios.defaults.baseURL = "http://localhost:5000"

            if (!Object.keys(meetData).includes(year.toString()))
            {
                axios.get("/meetings/get-year", {params : {from: "FCSM", year: year}}).then((res):any => {
                    const data = [{},{},{},{},{},{},{},{},{},{},{},{}]
                    for (const key of Object.keys(res.data)){
                        for (const meeting of res.data[key])
                        {
                            const date = new Date(meeting.date);
                            meeting["_date"] = meeting.date
                            meeting.date =  date.getDate();
                            if (!(meeting.date in data[date.getMonth()])) {
                                data[date.getMonth()][meeting.date] = []
                            }
                            data[date.getMonth()][meeting.date].push(meeting);
                        }
                    }
                    setmeetData({...data})
                }).catch((err) => {
                console.log("error fecthing data", err)
            })
        }
    }


  useEffect(() => {
    const today = new Date();
    const _year = today.getFullYear();
    get_meetings(_year).then((_) => console.log("setting up"))
    setYear(_year)
  }, [])

    return (
        <Container>
            <Title> Archive </Title>
            <YearContainer>
                <YearArrow onClick={async () => {await get_meetings(currYear - 1); setYear( currYear - 1); }}> {"<"} </YearArrow>
                <YearText> {currYear} </YearText>
                <YearArrow onClick={async () => {await get_meetings(currYear + 1); setYear( currYear + 1); }}> {">"} </YearArrow>
            </YearContainer>
            <CalendarContainer>
            {
                months.map((e, i) =>
                <CalCell>
                    <CalMonth> {e} {i}</CalMonth>
                    <ArchiveDay data = { meetData[i]}>
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
    &:hover {
        cursor: pointer;
    }
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
