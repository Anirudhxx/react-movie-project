import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/card'
import Modal from './components/modal'
import styled from "styled-components";
const Image = styled.img`
 padding: 0;
 width: 40%;
`;

const CardContainer = styled.div`
 width: 100vw;
   display: flex;
   flex-wrap: wrap;
   align-items: center;
   justify-content: center;
`;

const CardBox = styled.div`
  padding: 2em;
  width: 20%;
  border-style: solid;
  height: 20%;
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
    <div className='bodyStyle'>
      <h1 classname='heading1'>Most Recent Movies</h1>
      <hr
        style={{
          background: 'lime',
          color: 'black',
          borderColor: 'lime',
          height: '3px',
        }}
      />
      <input
      className='search1'
   type="text"
   placeholder="Search here"
   value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} />
      <CardContainer className='cardContainer1'>
        {movies.map((movie, i) => <CardBox onClick={() => {
          setCurrMovie(movie)
          setActive(true)
        }} style={{}}><Card key={i} data={movie}/></CardBox>)}
      </CardContainer>
      <Modal
        className='modal1'
        active={active}
        hideModal={() => setActive(false)}
        title={currMovie.title}
        release_date={currMovie.release_date}
        vote_average={currMovie.vote_average}
        vote_count={currMovie.vote_count}
      >
        <Image classname='modalImage'src={"https://image.tmdb.org/t/p/original"+currMovie["poster_path"]} />
        <div className='modalText'><b>Release Date: </b>{currMovie.release_date}
        {currMovie.overview}
        <br></br>
        <p><b>{currMovie.vote_average}</b>/10 ({currMovie.vote_count} total votes)</p></div>
      </Modal>
    </div>

  );
}

export default App;
