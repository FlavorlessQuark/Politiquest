import { Children, PropsWithChildren } from "react";
import { Text, View, Platform } from "react-native";
import styled from "styled-components/native";


const Button = ({children, state} : PropsWithChildren & {state: Boolean}) => {

    return (
        <Container state={state} >
            <StyledText numberOfLines={1} adjustsFontSizeToFit>
                {children}
            </StyledText>
        </Container>
    )

}

const Container = styled.View`
    display: flex;
    justify-content:center;
    align-items: center;
    color:black;
    height:  ${props => props.state == true? "100" : "90"}%;;
    border-radius: 3px;
    background-color: ${props => props.state == true? "#86E1CB" : "#778A84"};
    padding: 5px 10px;
    shadowColor: black;
    elevation: 10;
`
const StyledText = styled.Text`
        font-family: 'Jura-Medium';
        color: black;
        font-size: 17px;

    `


export default Button
