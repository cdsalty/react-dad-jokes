import React, { Component } from "react";
import axios from "axios";

class JokeList extends Component {
  // make api request via axios
  async componentDidMount() {
    // the response is coming in the form of HTML so need to change the 'headers' setup
    let response = await axios.get("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" } // requesting the json version and not the html version
    });
    // console.log(response); // get an object data and it gives id, a joke and status
    console.log(response.data.joke); // returns ONE joke, issue: plan to render 10 on the page
  }
  render() {
    return <h2>Dad Jokes</h2>;
  }
}

export default JokeList;

/* 
// https://icanhazdadjoke.com/api

- GET https://icanhazdadjoke.com/ fetch a random dad joke.
*/
