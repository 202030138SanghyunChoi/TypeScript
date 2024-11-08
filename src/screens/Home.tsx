import styled from "styled-components";
import InputPost from "../components/inputPost";
import TimeLine from "../components/TimeLine";

const Container = styled.div`
  padding: 10px;
`;

export default () => {
  return (
    <Container>
      <InputPost />
      <TimeLine />
    </Container>
  );
};
