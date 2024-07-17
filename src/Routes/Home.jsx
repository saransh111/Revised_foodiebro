import { useEffect, useState } from "react"
import axios from 'axios'
import TopBar from "../Components/Topbar";
import Content from "../Components/Content";
import Footer from "../Components/Footer";

function Home() {
  const [isauthenticated,setisauthenticated] = useState('False');
  useEffect(()=>{
    const a =localStorage.getItem('token');
    if(a){
      setisauthenticated('True');
    }
  },[])
  return (
    <div>
      <TopBar LoggedIn = {isauthenticated}/>
      <Content/>
      <Footer/>
    </div>
  )
}

export default Home
