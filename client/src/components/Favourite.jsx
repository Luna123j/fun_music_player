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
   
    const senddata = setTimeout(() => {
      axios.post('/users/favourite', {username: cookie.username})
      .then(res => {
        console.log(res)
        if (res.data.error === "No favourite record") {
          setFavourite(res.data.error)
        } else {
          setFavourite(res.data.reverse())

        }
      })
    }, 1000)
      return ()=> {
        clearTimeout(senddata);
        }
    
  },[currentSongContent])

  return (
    <div>
      <h1>Favourite list</h1>
      { favourite === "No favourite record" && "There is no favourite record "}
    </div>
    
    //select where username and favourite 
    //click search play, after select , insert into database
  )
  
}

export default Favourite;