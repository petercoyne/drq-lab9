import { Component } from "react";

export class Content extends Component {
    render() {
        return(
            <div>
                <h1>Hello World</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
    }
}