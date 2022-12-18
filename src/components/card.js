import styled from "styled-components";

const Container = styled.div`
  position: relative;
  height: 40vh;
  width: auto;
  background: url(${props => props.image});
  background-size: cover;
  background-repeat:no-repeat;
  background-position: center center;
`;

const Rating = styled.div`
  box-sizing: border-box;
  border-radius: 50%;
  position: absolute;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  width: 34px;
  height: 34px;
  left: 15px;
  top: 15px;
  padding: 6px;
  background: #FFFFFF;
  border: 1px solid #000000;
  color: #000;
`;

const Title = styled.div`
 font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  display: block;
  text-align: center;
  padding: 15px 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #FFF;
`;

const Card = ({ data }) => {
  console.log(data)
  return (
    <Container image={"https://image.tmdb.org/t/p/original" + data["poster_path"]}>
      <Title>{data.title}</Title>
      <Rating>{data["vote_average"]}</Rating>
    </Container>
  );
}

export default Card;