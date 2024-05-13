import React,{useState, useEffect} from "react";

function Timer(){

  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [time]);


  return (
    <div className="timer">
      <p>
        {`${Math.floor(time / 60)}`.padStart(2, 0)}:
        {`${time % 60}`.padStart(2, 0)}
      </p>
    </div>
  );
}

export default Timer;
