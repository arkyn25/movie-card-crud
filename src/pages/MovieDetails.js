import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      loading: true,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    movieAPI.getMovie(id).then((movie) => {
      this.setState({
        movie,
        loading: false,
      });
    });
  }

  async deleteMovie(movieID) {
    await movieAPI.deleteMovie(movieID);
  }

  render() {
    const { movie, loading } = this.state;
    const { match: { params: { id } } } = this.props;
    const { title, storyline, imagePath, genre, rating, subtitle } = movie;
    return (
      <div data-testid="movie-details">
        {!loading ? (
          <div>
            <img alt="Movie Cover" src={ `../${imagePath}` } />
            <p>{ `Title: ${title}` }</p>
            <p>{ `Subtitle: ${subtitle}` }</p>
            <p>{ `Storyline: ${storyline}` }</p>
            <p>{ `Genre: ${genre}` }</p>
            <p>{ `Rating: ${rating}` }</p>
            <div>
              <Link to="/">VOLTAR</Link>
              <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
            </div>
            <div>
              <Link to="/" onClick={ () => this.deleteMovie(id) }>DELETAR</Link>
            </div>
          </div>
        ) : <Loading />}
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default MovieDetails;
