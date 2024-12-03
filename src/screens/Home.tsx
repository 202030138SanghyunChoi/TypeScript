import styled from "styled-components";
import InputPost from "../components/inputPost";
import TimeLine from "../components/TimeLine";

const Container = styled.div`
  padding: 10px;
    height: 90vh;
`;

const TimeLineBox = styled.div`
    display: flex;
    flex-direction: column-reverse;
    height: 88%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 10px;
        background-color: black;
    }
`;

const InputPostBox = styled.div`
    height: 15%;
`;

export default () => {
  return (
      <Container>
          <TimeLineBox className="scrollbar">
              <TimeLine/>
          </TimeLineBox>
          <hr/>
          <InputPostBox>
              <InputPost/>
          </InputPostBox>
      </Container>
  );
};
