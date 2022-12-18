import styled from "styled-components";

const Image = styled.img`
  padding: 0;
  width: 100%;
`;
const Heading = styled.div`
  font-size: 1.5em;
  font-weight: bolder;
  display: block;
  text-align: center;
  padding: 0.2em 0 0.4em;
`;

const Card = ({ data}) => {
    console.log(data)
    return (
        <>
        <Image src={"https://image.tmdb.org/t/p/original"+data["poster_path"]} />
        <Heading>{data.title}</Heading>
        </>
    );
}

export default Card;