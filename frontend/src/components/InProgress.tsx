import styled from "styled-components";

const InProgress = () => {

    return (
        <Container>
            <Title>PAGE UNDER CONSTRUCTION</Title>
            <SubText>Something goes there but isn't ready yet</SubText>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    text-align: center;
`

const Title = styled.div`
    font-size: 3vw;
`

const SubText = styled.div`
    font-size: 2vw;
`

export default InProgress;
