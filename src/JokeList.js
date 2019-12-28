import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import uuid from "uuid/v4";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
    super(props);
    // this.state = { jokes: [] };  // we need to get the data from local storage(.parse()) and set it to state
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false
    };
    this.seenJokes = new Set(this.state.jokes.map(joke => joke.text)); // set of text jokes, not the object
    console.log(this.seenJokes);
    this.handleClick = this.handleClick.bind(this);
  }

  // make api request via axios
  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes(); // prevents overriding local storage every time the page is refreshed
  }
  async getJokes() {
    try {
      let jokes = []; // fill array and then setState in order to setting state 10 different times
      // while loop to prevent duplicates
      while (jokes.length < this.props.numJokesToGet) {
        let response = await axios.get("https://icanhazdadjoke.com/", {
          // response is coming back in the form of HTML, need to change the 'headers' setup
          headers: { Accept: "application/json" } // requesting the json version of the html format coming from response
        });
        let newJoke = response.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          // if it doesn't have a particular joke, push it in...

          // console.log(response); // get an object data and it gives id, a joke and status
          // console.log(response.data.joke); // returns ONE joke but need to render 10 on the page
          // take the response.data.joke and push it into jokes
          // jokes.push(response.data.joke); -> ISSUE is we need to return an object in order to attach an id, votes, etc to it
          jokes.push({ id: uuid(), text: response.data.joke, votes: 0 }); // inside of 'jokes,' I am pushing in an object with the values of text and votes
        } else {
          console.log("FOUND A DUPLICATE");
          console.log(newJoke);
        }
      } // jokes.push is pushing an 'object' so we can add keys to it.
      // console.log(jokes);
      this.setState(state => ({
        loading: false,
        jokes: [...state.jokes, ...jokes]
      }));
      // use local storage
      window.localStorage.setItem("jokes", JSON.stringify(jokes));
    } catch (error) {
      alert(error);
      this.setState({ loading: false });
    }
  }

  // create a function and event handler to count and factor each vote using the up and down arrows
  handleVote(id, delta) {
    this.setState(
      state => ({
        jokes: state.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        )
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    // this.getJokes();
    this.setState({ loading: true }, this.getJokes); // using getJokes as a callback to run after this.getJokes after setting state to true
  }

  render() {
    // if loading is true, add spinner
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h3 className="JokeList-title">
            connecting some wires, hold one second...
          </h3>
        </div>
      );
    }
    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes); // a.votes - b.votes would have negatives at the top
    // will map this array below
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
          <button className="JokeList-getmore" onClick={this.handleClick}>
            New Jokes
          </button>
        </div>
        <div className="JokeList-jokes">
          {/* {this.state.jokes.map(j => ( */}
          {jokes.map(j => (
            <div>
              <Joke
                key={j.id}
                votes={j.votes}
                text={j.text}
                upvote={() => this.handleVote(j.id, 1)}
                downvote={() => this.handleVote(j.id, -1)}
              />
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
