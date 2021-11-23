
import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

export class MovieItem extends Component {

    constructor() {
        super();

        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    DeleteMovie(e) {
        e.preventDefault();
        console.log("DeleteMovie method. " + this.props.movie._id);
        axios.delete("http://localhost:4000/api/movies/" + this.props.movie._id)
            .then(() => {
                this.props.ReloadData();
            })
            .catch()
    }

    render() {
        return (
            <div>
                <Card style={{ width: '18rem', float: 'left', margin: '1rem' }}>
                    <Card.Img variant="top" src={this.props.movie.poster} />
                    <Card.Body>
                        <Card.Title>{this.props.movie.title}</Card.Title>
                        <Card.Text>{this.props.movie.year}</Card.Text>
                        <Link to={"/edit/" + this.props.movie._id} className="btn btn-primary">Edit</Link>
                        <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}