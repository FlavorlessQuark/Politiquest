import Button from "@/components/Button";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { ICalItem } from "../constants/interfaces";
import { useUserConsumer } from "../hooks/useUser";

const MeetingCard = ({data} : {data: ICalItem}) => {

    return (
        <Container>
            <Row >
                <StyledTitle ellipsizeMode="tail" numberOfLines={2} >
                    {data.category}
                </StyledTitle>
                <MaterialPositon>
                    <MaterialIcons name={false == false ? "star" :"star-border"} size={32} style={{color:"#ffb300"}} />
                </MaterialPositon>
            </Row>
            <Row>
                 <ButtonBox>
                    <Button state={true}> Join Meeting </Button>
                </ButtonBox>
            </Row>
            <Row style={{justifyContent: "space-between"}}>
                <StyledText >
                    {data.date}
                </StyledText>
                <StyledText>
                    {data.time}
                </StyledText>
            </Row>
        </Container>
    )

}
export default MeetingCard;
    const Container = styled.View`
        display: flex;
        flex-direction: column;
        padding: 20px 20px;
        height: 250px;
        width: 100%;
        border-radius: 11px;
        shadowColor: black;
        background-color: #6C8A94;
        elevation: 10;
        margin: 10px 0px;
        gap: 10px;
        justify-content: center;
    `
    const Row = styled.View`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
        align-items: center;
    `

    const MaterialPositon = styled.View`
        position: absolute;
        right: 0;
        top : 0;
    `
    const ButtonBox = styled.View`
        height: 60%;
        width: 70%;
    `

    const StyledText = styled.Text`
        font-family: 'Jura-Medium';
        color: white;
        font-size: 15px;
        text-align:center;
    `
    const StyledTitle = styled.Text`
        font-family: 'Jura-Medium';
        color: white;
        font-size: 23px;
        width: 80%;
        text-align: center;
    `
