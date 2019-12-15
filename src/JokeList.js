import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  handleVote(id, delta) {
    // need to create the function and event handlers to count and factor each vote using the up and down arrows
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
      // jokes.push(response.data.joke); -> ISSUE is we need to return an object in order to attach an id, votes, etc to it
      jokes.push({ text: response.data.joke, votes: 0 }); // inside of 'jokes,' I am pushing in an object with the values of text and votes
    }
    // console.log(jokes);
    this.setState({ jokes: jokes });
  }
  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h2 className="JokeList-title">
            <span>Christopher's</span> Classic Dad Jokes
          </h2>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="face icon"
          />
          <button className="JokeList-getmore">New Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map(j => (
            <div>
              {/* {j.text} - {j.votes} */}
              {/* already receiving the text and joke but the thinking is to add this as props, 
              and pass in a new component */}
              <Joke votes={j.votes} text={j.text} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;

/* 
// https://icanhazdadjoke.com/api

- GET https://icanhazdadjoke.com/ fetch a random dad joke.
*/
