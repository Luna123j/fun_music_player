import axios from "axios";
import React, {useEffect }from "react";
import { useSelector,useDispatch} from 'react-redux';


const History = () => {
  const dispatch = useDispatch();
  const { currentSongContent } = useSelector(state => state.currentSongData)
  const {username} = useSelector(state => state.user)
  // const clickHandler=()=>{
  //   dispatch()
  // }

  useEffect(()=>{
    console.log(currentSongContent[currentSongContent.length-1]);
    axios.post('/history',{currentSong: currentSongContent[currentSongContent.length-1],username: username.payload})
    .then((res)=>{
      console.log(res);
    })
  },[])
  
  
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