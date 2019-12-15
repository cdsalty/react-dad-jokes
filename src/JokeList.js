import React, { Component } from "react";
import axios from "axios";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }
  // make api request via axios
  async componentDidMount() {
    let jokes = []; // fill array and then setState in order to setting state 10 different times
    // while loop to prevent duplicates
    while (jokes.length < this.props.numJokesToGet) {
      let response = await axios.get("https://icanhazdadjoke.com/", {
        // response is coming back in the form of HTML, need to change the 'headers' setup
        headers: { Accept: "application/json" } // requesting the json version of the html format coming from response
      });
      // console.log(response); // get an object data and it gives id, a joke and status
      // console.log(response.data.joke); // returns ONE joke but need to render 10 on the page
      // take the response.data.joke and push it into jokes
      jokes.push(response.data.joke);
    }
    // console.log(jokes);
    this.setState({ jokes: jokes });
  }
  render() {
    return (
      <div>
        <h2>Dad Jokes</h2>
      </div>
    );
  }
}

export default JokeList;

/* 
// https://icanhazdadjoke.com/api

- GET https://icanhazdadjoke.com/ fetch a random dad joke.
*/
