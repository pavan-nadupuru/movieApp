import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import MovieCard from './MovieID'
import LoadingIndicator from './LoadingIndicator'
import { trackPromise } from 'react-promise-tracker';



class MoviesList extends React.Component {

    constructor(){
        super()
        this.state = {
            // isLoading : false,
            moviesList: [''],
            searchKey: ''
        };


        this.search=this.search.bind(this)
        this.handleChange=this.handleChange.bind(this)

    }

    

    search(event){
        event.preventDefault();
        trackPromise(
        axios
            .get(
                `https://www.omdbapi.com/?apikey=ca6bbc53&s=${
                    this.state.searchKey
                }`
            )
            .then(res => res.data)
            .then(res => {

                console.log(res)

                if (!res.Search) {
                    this.setState({ moviesList: [] });
                    return;
                }

                const moviesList = res.Search.map(movie => movie.imdbID);
                this.setState({
                    moviesList
                
                });
            }));
    };

    handleChange(event){

        this.setState({
            searchKey: event.target.value
        });

    };

    render() {
        const { moviesList } = this.state;

        return (
            <div>
                <form onSubmit={this.search}>
                    <input
                        placeholder="Search. . ."
                        onChange={this.handleChange}
                    />
                    <button type="submit">
                        SEARCH
                    </button>
                </form>
                <br/>

                <LoadingIndicator/>

                
                {moviesList.length > 0 ? (

                    moviesList.map(movie => (
                        <MovieCard movieID={movie} key={movie} />
                    ))

                ) : (

                    <p>
                        <h3>	Can't find any such movies, please try another name.	</h3>
                    </p>

                )}

            </div>
        );
    }
}

ReactDOM.render(<MoviesList  />, document.getElementById('root'));
