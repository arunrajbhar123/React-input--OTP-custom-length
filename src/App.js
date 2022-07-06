import React,{useState,useEffect} from 'react';
import './App.css';
import Pin from "./components/Pin.jsx";

function App() {
  const [otp, setOtp] = useState("");
  const [demoOTP, setDemoOTP] = useState('');
  const [boxLength, setBoxLength] = useState(4)

  useEffect(() => {
    document.title = "hello"

    }, [])
  return (
    <div className="App">
      <Pin length={Number(boxLength)} onChange={(value)=>{setOtp(value)}} demoOTP={demoOTP}/>

      <h1>Cart Number is :{otp}</h1>
      <p>
        Enter Dummy Cart Number:
        <input type="text" onChange={(e)=>setDemoOTP(e.target.value)} maxLength={boxLength} style={{width:"auto"}}/>
      </p>
      <p>Enter Box length Number:
        <input type="Number" onChange={(e)=>setBoxLength(e.target.value)}/>
      </p>
    </div>
  );
}

export default App;
