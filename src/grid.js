import React from "react";
import start from './play-solid.svg';
import end from './times-circle-solid.svg'
const is_wall = (walls,y,x) => {
  //console.log(walls)
  return walls.reduce((t,c)=>{
    if(c[0]===y && c[1]=== x){
      return true
    }
    return t;
  },false)
}
function Grid(props) {
  
  const height = props.height ||20 ;
  const width = props.width || 30;
  let list = [];
  const walls = props.walls;
  for(let i =0;i<height;i++){
    let temp = []
      for(let j=0;j<width;j++){
        if(i===props.start[0] && j===props.start[1]){
          temp.push(<div  key={i+j} style={{width:'30px',height:'30px',border:'1px solid lightblue',webkitUserSelect: 'none'}}><img src={start} alt="start" style={{width:'25px',height:'25px'}}/></div>)
        }
        else if(i===props.end[0] && j===props.end[1]){
          temp.push(<div  key={i+j} style={{width:'30px',height:'30px',border:'1px solid lightblue',webkitUserSelect: 'none'}}><img src={end} alt="start" style={{width:'25px',height:'25px'}}/></div>)
        }
        else if(is_wall(walls,i,j)){
          temp.push(<div key={i+j} className="animate_animated animate__heartBeat" style={{width:'30px',height:'30px',backgroundColor:'#202060',webkitUserSelect: 'none'}}    onMouseOver={(e)=> {if(window.event.buttons===1){props.toggleWall(i,j,1)};}} onClick={(e)=> {props.toggleWall(i,j,1);}} ></div>)
        }
        else{
          temp.push(<div  key={i+j}  style={{width:'30px',height:'30px',border:'1px solid lightblue',webkitUserSelect: 'none'}}   onMouseOver={(e)=> {if(window.event.buttons===1){props.toggleWall(i,j,0)}}} onClick={(e)=> {props.toggleWall(i,j,1);}}></div>)
        }
  
      }
   
  list.push(temp)
  }

 // console.log(list)
  return (
  <div className="p-4">
 
   {list.map((obj,ind) => {
//console.log(obj)
   return <div className="row justify-content-center" key={ind}>{obj}</div>
   })}
  </div>
  );
}

export default Grid;