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
  await new Promise(done => setTimeout(() => done(), 0.0000001));  

  let current = q[0];
  q.shift()
  this.setState({current});
  let grid = this.state.grid;
  grid[this.state.start[0]][this.state.start[1]] = 2;
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
for(let i=0;i<path[this.state.end[0]][this.state.end[1]].length;i++){
  await new Promise(done => setTimeout(() => done(), 0.0000001));  
  this.setState({path:path[this.state.end[0]][this.state.end[1]].slice(0,i+1)})
}
//this.setState({path:path[this.state.end[0]][this.state.end[1]]})
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
      <div className="navbar navbar-dark " style={{backgroundColor:'#424874',color:'white'}}>
 <div className="navbar-brand">
   Shortest Path Visualizer
 </div>
 <div>
 <button className=" btn mx-4" onClick={()=>this.visualize()} style={{backgroundColor:'#dcd6f7',color:''}}>
Find the Shortest Path
 </button>
 <button className=" btn mx-4" onClick={() => this.setState({grid:Array(20).fill().map(() => Array(40).fill(0)),path:[]})} style={{backgroundColor:'#dcd6f7',color:''}}>
 Clear Walls
 </button>
 </div>
      </div>
      
      <Grid height={this.state.height} grid={this.state.grid} path={this.state.path} current={this.state.current}  start={this.state.start} end={this.state.end} width={this.state.width}  toggleWall={this.toggleWall}/>
    
      
   </div>);
  }
}

export default App;


