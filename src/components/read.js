import { Component } from "react";
import { Movies } from "./movies";
import axios from 'axios';

export class Read extends Component {

	constructor() {
		super();
		this.ReloadData = this.ReloadData.bind(this);
	}

	state = {
		movies: [] // set this.state.movies to blank array
	};

	ReloadData() {
		axios.get('http://localhost:4000/api/movies') // request movies from our backend
		.then((res) => { // happy path
			this.setState({ movies: res.data }); // set state to response from backend
		})
		.catch((err) => {
			console.log(err); // else log error
		});
	}

	componentDidMount() { // on mount function
		this.ReloadData();
	}

	render() {
		return ( // return movies component in a div, also passing down ReloadData method
			<div>
				<Movies movies={this.state.movies} ReloadData={this.ReloadData} />
			</div>
		);
	}
}
export default Read;