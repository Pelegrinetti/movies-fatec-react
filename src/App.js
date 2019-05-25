import React, { Component } from 'react';
import { PacmanLoader } from 'react-spinners'

import Movie from './components/Movie'

export default class App extends Component {

  state = {
    movies: [],
    query: '',
    loading: false
  }

  handleSetQuery = e => {
    const query = e.target.value
    console.log(query)
    this.setState({ query })
  }

  handleSubmit = async () => {
    this.setState({ movies: [], loading: true })

    const response = await fetch(`https://www.omdbapi.com/?s=${this.state.query}&apikey=1c889ae`)
    const data = await response.json()
    this.setState({ movies: data.Response ? data.Search : [], loading: false })
  }

  render(){
    return (
      <div className="container">
        <div className="search">
          <input className="input" placeholder="Procurar filme..." type="text" onChange={this.handleSetQuery} />
          <button className="btn" onClick={this.handleSubmit}>Go</button>
        </div>
        <section className="movies">
          <div className="results">
          { this.state.movies ? (
            <>
              <PacmanLoader
                sizeUnit={"px"}
                size={50}
                color={'#fff'}
                loading={this.state.loading}
              />
              { this.state.movies.map(movie => (
                <Movie key={movie.imdbID} cover={movie.Poster} />
              )) }
            </>
          ) : <p>Não há filmes aqui...</p> }
          </div>
          <div className="favorites"></div>
        </section>
      </div>
    )
  }
}