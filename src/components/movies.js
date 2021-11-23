import { Component } from "react";
import { MovieItem } from "./movieitem";

export class Movies extends Component {
    render() {
        return this.props.movies.map((movie) => {
            return <MovieItem movie={movie} key={movie.imdbID} ReloadData={this.props.ReloadData}/>
        })
    }
}
export default Movies;