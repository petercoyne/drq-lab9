import { Component } from "react"; // we just need Component
import axios from 'axios'; // axios for HTTP requests

export class Edit extends Component { // component for export

	constructor() {
		// call superclass (Component)
		super();

		// bindings
		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeMovieName = this.onChangeMovieName.bind(this);
		this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
		this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this);
		
		// set properties of state to empty strings
		this.state = {
			Title: ``,
			Year: ``,
			Poster: ``
		}
	}

	componentDidMount() { // fires when component is mounted
		console.log(this.props.match.params.id); //

		axios.get(`http://localhost:4000/api/movies/${this.props.match.params.id}`) // get individual movie from movies endpoint
		.then(res => {
			console.log(res.data.title); // log the title
			this.setState({ // set the state of th ecomponent to the response from the endpoint
				_id:res.data._id,
				Title:res.data.title,
				Year:res.data.year,
				Poster:res.data.poster
			})
		})
		.catch(err => console.log(err)) // log error if it fails
	}

	// onSubmit function
	onSubmit(e) {
		e.preventDefault(); // prevent browser default action
		alert(`Movie: ${this.state.Title} ${this.state.Year} ${this.state.Poster}`); // alert to confirm values
		const newMovie = { // values are updated dynamically by onChange in html, and onChangeMovie* functions
			title: this.state.Title,
			year: this.state.Year,
			poster: this.state.Poster,
			_id: this.state._id
		}
		// axios.post('http://localhost:4000/api/movies', newMovie) // post the new movie object to our backend
		// .then((res) => {console.log(res)}) // happy path
		// .catch((err) => {console.log(err)}); // sad path

		axios.put(`http://localhost:4000/api/movies/${this.state._id}`, newMovie)
		.then(res => console.log(res))
		.catch(err => console.log(err))
	}

	onChangeMovieName(e) { this.setState({ Title: e.target.value }) }; // triggered by onChange= in HTML
	onChangeMovieYear(e) { this.setState({ Year: e.target.value }) };
	onChangeMoviePoster(e) { this.setState({ Poster: e.target.value }) };

	render() {
		return ( // return some html
			<div className="App">
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Edit Movie Name: </label>
						<input type="text"
							className="form-control"
							value={this.state.Title}
							onChange={this.onChangeMovieName}
						/>
					</div>
					<div className="form-group">
						<label>Edit Movie Year: </label>
						<input type="text"
							className="form-control"
							value={this.state.Year}
							onChange={this.onChangeMovieYear}
						/>
					</div>
					<div className="form-group">
						<label>Edit Movie Poster URL: </label>
						<textarea
							type="text"
							className="form-control"
							value={this.state.Poster}
							onChange={this.onChangeMoviePoster}
						/>
					</div>
					<input type="submit" value="Edit Movie" />
				</form>
			</div>
		);
	}
}