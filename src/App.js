import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/card'
import Modal from './components/modal'
import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
`

const Line = styled.div`
  border: 1px solid #C0C4CC;
  width: 70vw;
`

const Search = styled.input`
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #C0C4CC;
border-radius: 2px;
padding: 5px;

float: right;
padding: 6px;
  margin-top: 8px;
  margin-right: 16px;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 22px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
`
const ModalContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0;
  padding: 10px;
`

const MovieOverview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  padding: 10px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.01em;
`

const Image = styled.img`
 width: 140%;
 padding: 10px 10px;
`;

const CardContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px;
`;

const CardBox = styled.div`
  width: 20%;
  box-sizing: border-box;
  overflow: hidden;
  background: #FFFFFF;
  border: 1px solid #E1E3E6;
  box-shadow: 1px 2px 8px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  &:hover {
    box-shadow: 2px 4px 8px 5px rgba(0, 0, 0, 0.2);
    transition: 0.15s ease;
  }
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [active, setActive] = useState(false);
  const [currMovie, setCurrMovie] = useState({})
  const [searchTerm, setSearchTerm] = useState("")

  const getMovieRequest = async () => {
    const url = "https://api.themoviedb.org/3/movie/popular?api_key=631b7166eed5d810f84a4892bee4307b&language=en-US&page=1"
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.page) {
      setMovies(responseJson.results)
    }
  }

  const searchMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=631b7166eed5d810f84a4892bee4307b&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.page) {
      setMovies(responseJson.results)
    }
  }

  useEffect(() => {
    getMovieRequest()
  }, [])

  useEffect(() => {
    searchMovies()
  }, [searchTerm])


  return (
    <Container>
      <Nav>
        <img src="./logo.png" alt="logo" />
        <Search
          type="text"
          placeholder="Search here"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} />
      </Nav>
      <Line/>
      <h1>Most Recent Movies</h1>
      <CardContainer>
        {movies.map((movie, i) => <CardBox onClick={() => {
          setCurrMovie(movie)
          setActive(true)
        }} style={{}}><Card key={i} data={movie} /></CardBox>)}
      </CardContainer>
      <Modal
        active={active}
        hideModal={() => setActive(false)}
        title={currMovie.title}
      >
        <ModalContainer>
          <Image src={"https://image.tmdb.org/t/p/original" + currMovie["poster_path"]} />
          <MovieOverview>
            <div>
              <b>Release Date: </b>{currMovie.release_date}
              <br></br>
              <br></br>
              {currMovie.overview}
              <br></br>
              <p><b>{currMovie.vote_average}</b>/10 ({currMovie.vote_count} total votes)</p>
            </div>
          </MovieOverview>
        </ModalContainer>
      </Modal>
    </Container>


  );
}

export default App;
