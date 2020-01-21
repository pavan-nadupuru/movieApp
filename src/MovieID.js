import React from 'react'
import axios from 'axios'
import { trackPromise } from 'react-promise-tracker';
import download from './download.png'

class MovieCard extends React.Component {
    state = {
        movieData: {},
        first : true
    };
    
    
    componentDidMount() {
        trackPromise(
        axios
            .get(
                `https://www.omdbapi.com/?apikey=ca6bbc53&i=${
                    this.props.movieID
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                this.setState({ movieData: res });
            }));       
    }


    render() {
        const {
            Title,
            movieID,
            Released,
            Genre,
            Plot,
            Poster,
            imdbRating
        } = this.state.movieData;

        if (!Poster || Poster === 'N/A') {
            return !(Title) ? null  : <div className="movie-card-container">
                                        <div className="image-container" >
                                            {/* <h3><center>Data corrupt... <br/>Hence could not show image... <br/>Sorry for the trouble</center></h3> */}
                                            <img src={("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4FFQp_sZ7jDRAXRoOmbLc57Z0Toe7E88_BufjSPLDsDEuJ9df")} alt="NOT APPLICABLE"  />

                                        </div>
                                        <div className="movie-info">
                                            <h2>Movie Details</h2>
                                            <div>
                                                <h1>{Title}</h1>
                                                <small>Released Date: {Released}</small>
                                            </div>
                                            <h4>Rating: {imdbRating} / 10</h4>
                                            <p>{Plot && Plot.substr(0, 350)}</p>
                                            <div className="tags-container">
                                                {Genre && Genre.split(', ').map(g => <span >{g}</span>)}
                                            </div>
                                        </div>
                                    </div>
        }

        return (
            <div className="movie-card-container">
                <div className="image-container">
                    <div
                        className="bg-image"
                        style={{ backgroundImage: `url(${Poster})` }}
                    />
                </div>
                <div className="movie-info">
                    <h2>Movie Details</h2>
                    <div>
                        <h1>{Title}</h1>
                        <small>Released Date: {Released}</small>
                    </div>
                    <h4>Rating: {imdbRating} / 10</h4>
                    <p>{Plot && Plot.substr(0, 350)}</p>
                    <div className="tags-container">
                        {Genre && Genre.split(', ').map(g => <span key={movieID}>{g}</span>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieCard