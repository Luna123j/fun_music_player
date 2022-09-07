import React from "react";
import { useSelector,useDispatch } from 'react-redux';


const History = () => {
  const dispatch = useDispatch();
  const { currentSongContent } = useSelector(state => state.currentSongData)
  // const clickHandler=()=>{
  //   dispatch()
  // }

  return (
    <div>
      <h1>History</h1>
      <article>
        {currentSongContent.map((item) => {
          return (
            <p><button ><i className="fa-solid fa-play"></i></button><img src={item.cover}/>{item.title}{"            "}{item.artist}</p>
          );
        })}
      </article>
    </div>

  )
}

export default History;