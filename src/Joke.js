import React, { Component } from "react";

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up"></i>
          <span>{this.props.votes}</span>
          <i className="fas fa-arrow-down"></i>
        </div>
        <div className="Joke-text">{this.props.text}</div>
      </div>
    );
  }
}

export default Joke;
/* 
after creating basic outline, import this component, 'Joke.js' into JokeList. 
  - map through the jokes and for each joke, create this 'Joke' component instead of the standard text
    it's getting now. 
  - when passing in the component, assign votes and text in order to pass down as props


*/
