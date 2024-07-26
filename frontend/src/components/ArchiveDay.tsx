import styled from "styled-components";
import { ICalItem } from "../Imeetings";
import { useState } from "react";

const ArchiveDay = ({data}) => {
    const [active, setActive] = useState(-1)

    console.log("Yo this is data", data)
    return (
        <Container>
            {
                data && Object.keys(data).map((e, i) => (
                    // {e}
                    <Caldays  onMouseOver={() => setActive(i)} onMouseLeave={() => setActive(-1)} >

                        {data[e][0].date}
                        <DropContainer onMouseOver={() => setActive(i)} onMouseLeave={() => setActive(-1)} active={active == i} className="dropcontainer">
                            {
                                data[e].map((day, i) => (
                                    <DropItem href={`/meeting/${day._id}`}> {day.category} </DropItem>
                                ))
                            }
                        </DropContainer>
                    </Caldays>
                ))
            }
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    // align-items: center;
    justify-content: center;
    witdh: 100%;

`
const Caldays = styled.div`
    display: flex;
    flex-direction: column;
    position:relative;
    justify-content: center;
    padding: 12px;
    border: 1px solid black;
    width: 40px;
    height: 40px;

`
const DropContainer = styled.div`
    display: ${props => props.active ? "flex" : "none"};
    position: absolute;
    top: 25px;
    width: fit-content;
    flex-direction: column;
    left: 0px;
    z-index: 5;
    white-space: nowrap;
    &:hover {
        cursor: pointer;
    }
`
const DropItem = styled.a`
color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  background: grey;
  &:hover {
    cursor: pointer;
    background: red;
  }
`

export default ArchiveDay;
