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

    &::-webkit-scrollbar{
        width: 4px;
    }
    &::-webkit-scrollbar-thumb{
        background: linear-gradient(40deg, #ff8a8a 20%, #f771d1 40%, #a18aff 60%, #4cd2ff 80%, #6afc82 100%);
    }
    &::-webkit-scrollbar-track{
        background-color: transparent;
    }
`;

const InputPostBox = styled.div`
    height: 15%;
`;

// 외부 css 사용(이쁘니깐)
const Line = styled.b`
    width: 100%;
    height: 2px;
    display: block;
    position: relative;
    padding: 5px 0;
    
    &:after, &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 50%;
        left: 0;
    }
    
    &:after{
        transition: opacity 0.3s ease, -webkit-animation 0.3s ease;
        transition: opacity 0.3s ease, animation 0.3s ease;
        transition: opacity 0.3s ease, animation 0.3s ease, -webkit-animation 0.3s ease;
        background: linear-gradient(to right, #62efab 5%, #F2EA7D 15%, #F2EA7D 25%, #FF8797 35%, #FF8797 45%, #e1a4f4 55%, #e1a4f4 65%, #82fff4 75%, #82fff4 85%, #62efab 95%);
        background-size: 200%;
        background-position: 0%;
        -webkit-animation: bar 15s linear infinite;
        animation: bar 15s linear infinite;
    }
`;

export default () => {
  return (
      <Container>
          <TimeLineBox className="scrollbar">
              <TimeLine/>
          </TimeLineBox>
          <Line />
          <InputPostBox>
              <InputPost/>
          </InputPostBox>
      </Container>
  );
};
