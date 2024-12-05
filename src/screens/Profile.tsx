import styled from "styled-components"
import {auth, firestore} from "../firebaseConfig";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    background: #000000;
    background: -webkit-linear-gradient(to left, #434343, #000000);
    background: linear-gradient(to left, #434343, #000000);
    flex: 1;
    max-height: 90%;
    padding: 10px;
    margin: 20px;
    border-radius:30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const LeftContainer = styled.div`
    flex: 1;
    max-width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 80%;
    padding: 10px;
    margin: 30px;

    p {
        font-size: 30px;
        margin-bottom: 20px;
        color: aliceblue
    }
`

const RightContainer = styled.div`
    flex: 1;
    max-width:70%;
    max-height: 40%;
    padding: 10px;
    margin: 20px;

    table {
        font-size: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 280px;
        border-collapse: collapse;
    }

    td {
        padding: 10px;
        border: none;
        border-radius: 20px;
        color: white;
    }

    td:first-child {
        font-weight: bold;
    }
`

const ProfileImage = styled.img`
    width: 200px;
    height: 200px;
    max-width: 200px;
    border-radius: 50%;
    margin: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export default () => {
    const user = auth.currentUser;

    return <Container>
        <LeftContainer>
            <ProfileImage src={`${process.env.PUBLIC_URL}/DaelimLogo.png`} />
            <p>{user?.displayName}</p>
            <p>컴퓨터 정보학부</p>
        </LeftContainer>
        <RightContainer>
            <table>
                <tr>
                    <td>이름 :</td>
                    <td>{user?.displayName}</td>
                </tr>
                <tr>
                    <td>Email :</td>
                    <td>{user?.email}</td>
                </tr>
            </table>
        </RightContainer>
    </Container>
}