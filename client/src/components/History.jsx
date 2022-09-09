import axios from "axios";
import React, {useEffect, useState }from "react";
import { useCookies } from "react-cookie";
import { useSelector,useDispatch} from 'react-redux';


const History = () => {
  const dispatch = useDispatch();
  const [historyList, setHistoryList] = useState([])
  const { currentSongContent } = useSelector(state => state.currentSongData)
  const [cookie] = useCookies()
  // const clickHandler=()=>{
  //   dispatch()
  // }
    console.log(currentSongContent)
  useEffect(()=>{
    // console.log(currentSongContent[currentSongContent.length-1]);
    if (currentSongContent.length === 0) {
      const senddata = setTimeout(()=> {
        axios.post('/history', {username: cookie.username})
      .then(res => {
        setHistoryList(res.data.reverse())
      })
    }, 1000)
    return () => {
      clearTimeout(senddata)
    }
    } else if (currentSongContent.length !== 0) {
        const senddata = setTimeout(()=>{
          axios.post('/history',{currentSong: currentSongContent[currentSongContent.length-1],username: cookie.username})
          .then((res)=>{
            console.info("from backend", res);
           setHistoryList(res.data.reverse())
          })     

        }, 1000)
        return ()=> {
          clearTimeout(senddata);
        }
    }
  },[currentSongContent])
  
  console.log(historyList)
  return (
    <div>
      <h1>History</h1>
      { (historyList.length !== 0) &&
        historyList.map((item, index)=>{
          return (<div key={index}><button> <i  className="fa-solid fa-play"></i></button><img src={item.cover} alt={item.title} />{item.title}{item.artist}</div>)
        })
      }
    
    </div>

  )
}

export default History;