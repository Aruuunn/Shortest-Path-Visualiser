import React, { Component } from "react";

import Grid from "./grid";

export class App extends Component {
  state = {
  
    height:20,
    width:30,
    start:[10,1],
    end:[10,29],
    visited :[],
    path:[],
    current:null,
    grid:Array(20).fill().map(() => Array(30).fill(0))
  }
  visualize =  async () => {
    let path = Array(20).fill().map(() => Array(30).fill([]));
    let q = [[10,1]]
    let flag = 1;
while(q.length!==0 && flag){
  await new Promise(done => setTimeout(() => done(), 1));  
  let current = q[0];
  q.shift()
  this.setState({current});
  let grid = this.state.grid;

  if(current[0]===this.state.end[0] && current[1]===this.state.end[1]){
    
    console.log(current)
    flag=0;
   
  }
  else{
 
  let list = [];

  if(current[0]!==this.state.height-1&&grid[current[0]+1][current[1]]===0){
    list.push([current[0]+1,current[1]]);
    path[current[0]+1][current[1]] = [...path[current[0]][current[1]],current];

 path[current[0]+1][current[1]].push(current);
  }
  if(current[0]!==0 && grid[current[0]-1][current[1]]===0){
    list.push([current[0]-1,current[1]]);
    path[current[0]-1][current[1]] = [...path[current[0]][current[1]],current];

  }
  if(current[1]!==0 && grid[current[0]][current[1]-1]===0){
    list.push([current[0],current[1]-1]);
    path[current[0]][current[1]-1] = [ ...path[current[0]][current[1]],current];

  }
  if(current[1]!==this.state.width-1 && grid[current[0]][current[1]+1]===0){
    list.push([current[0],current[1]+1]);
    path[current[0]][current[1]+1] = [...path[current[0]][current[1]],current];

   
  }
  console.log("list",list);

  for(let i=0;i<list.length;i++){
    grid[list[i][0]][list[i][1]] = 2;
  }
  grid[current[0]][current[1]] = 3;

  this.setState({grid});
    q = q.concat(list);}
  
}
//console.log(path[this.state.end[0]][this.state.end[1]].length)
this.setState({path:path[this.state.end[0]][this.state.end[1]]})
  }
  toggleWall = (y,x,type) => {
    
    if(type===1){
     
      this.setState(state => {
        let grid = state.grid;
        grid[y][x] = 0;
        return {grid}
      })
    }
    else{
     
      this.setState(state => {
        let grid = state.grid;
        grid[y][x] = 1;
        return {grid}
      })
    }
  }
  render() {
    return (
    <div>
      <div className="navbar navbar-light">
 <div className="navbar-brand">
   Shortest Path Finder
 </div>
 <button className="nav-item btn" onClick={()=>this.visualize()}>
find The path
 </button>
 <button className="nav-item btn" onClick={() => this.setState({grid:Array(20).fill().map(() => Array(40).fill(0)),path:[]})}>
 Clear Walls
 </button>
      </div>
      <Grid height={this.state.height} grid={this.state.grid} path={this.state.path} current={this.state.current}  start={this.state.start} end={this.state.end} width={this.state.width}  toggleWall={this.toggleWall}/>
    </div>);
  }
}

export default App;


