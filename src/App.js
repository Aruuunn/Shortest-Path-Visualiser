import React, { Component } from "react";

import Grid from "./grid";

export class App extends Component {
  state = {
    walls:[],
    height:20,
    width:30,
    start:[10,1],
    end:[10,29]
  }
  toggleWall = (y,x,type) => {
    console.log("hello")
    if(type===1){
      this.setState(state => ({walls : state.walls.filter(obj => !(obj[0]===y && obj[1]===x))}))
    }
    else{
      this.setState(state => ({walls:[...state.walls,[y,x]]}));
    }
  }
  render() {
    return (
    <div>
      <Grid height={this.state.height} start={this.state.start} end={this.state.end} width={this.state.width} walls={this.state.walls} toggleWall={this.toggleWall}/>
    </div>);
  }
}

export default App;


