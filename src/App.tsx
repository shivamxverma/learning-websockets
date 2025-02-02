import './App.css';
import { useState,useEffect } from 'react';

function App() {
  const [Socket,setSocket] = useState<null | WebSocket>(null);
  const [latestmessage , setlatestmessage] = useState("");
  const [currentmessage , setcurrentmessage] = useState("");
  useEffect(()=>{
    const Socket = new WebSocket('ws://localhost:8080');
    Socket.onopen = () => {
      console.log('Connected');
      setSocket(Socket);
    }
    Socket.onmessage = (message)=> {
          console.log('Received message :',message.data);
          setlatestmessage(message.data);
    }
    return () => {
      Socket.close();
    }

  },[])

  if(!Socket){
    return (
      <>
        Server is loading....
      </>
    )
  }
  return (
    <>
      <input type="text" 
       onChange={(e)=>{
        setcurrentmessage(e.target.value);
       }}
      />
      <br/><br/><br/><br/>
      <button onClick={()=>{
        Socket.send(currentmessage);
      }}>Send</button>
      <div>
        {latestmessage}
      </div>
    </>
  )
}

export default App
