import axios from "axios";
import React, {useEffect, useState }from "react";
import { useCookies } from "react-cookie";
import { useSelector,useDispatch} from 'react-redux';

const Favourite =() => {
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState([])
  const { currentSongContent } = useSelector(state => state.currentSongData)
  const [cookie] = useCookies()
  console.log(currentSongContent)
  useEffect(()=>{
    // console.log(currentSongContent[currentSongContent.length-1]);
    if (currentSongContent.length === 0) {
      axios.post('/history', {username: cookie.username})
      .then(res => {
        setFavourite(res.data.reverse())
      })
    } else if (currentSongContent.length !== 0) {
        const senddata = setTimeout(()=>{
          axios.post('/history',{currentSong: currentSongContent[currentSongContent.length-1],username: cookie.username})
          .then((res)=>{
            console.info("from backend", res);
            setFavourite(res.data.reverse())
          })     

        }, 1000)
        return ()=> {
          clearTimeout(senddata);
        }
    }
  },[currentSongContent])

  return (
    <h1>Favourite list</h1>
    //select where username and favourite 
    //click search play, after select , insert into database

  )
}

export default Favourite;