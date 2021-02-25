import {useState} from 'react'
import {useEffect} from 'react' 
import ClockDisplay from './clockDisplay'
import Dropdown from './dropdown/dropdown'
import Alarm from '../clock/alarm'

function Clock(){
    const [time, setTime]=useState(new Date());
    const [alarm, setAlarm]=useState({time: null, active: false})
    const [soundalarm, setSoundalarm]=useState(false)

    useEffect(() => {
    console.log("USEEFFECT CALLED")
       const interval = setInterval(increaseTime, 1000);
      return () => {console.log("CLEAN UP"); 
      clearInterval(interval) }
     }
    , [alarm]);

    function increaseTime(){
        console.log("TICK")
        const date = new Date();
        setTime(date);
        checkAlarm(date);
    }

    function saveAlarm(time, active){
        setAlarm({time:time, active: active});
    }

    function checkAlarm(date){
        if(alarm.active){
            if(date >= alarm.time && date <= new Date(date.getTime()+10)){
                setAlarm(prevState => { return  {time: prevState.time, active:false}})
                soundAlarm()
            }
        }
    }

    function soundAlarm(){
        setSoundalarm(true);
        setTimeout(()=> {setSoundalarm(false)}, 5000);
    }

    return(
        <div>
            {soundalarm && <div style={{backgroundColor: "red"}}>ALARM ALARM ALARM</div>}
            <Alarm updateAlarm={saveAlarm} active={alarm.active} />
            <ClockDisplay time={{hours: time.getHours(), minutes: time.getMinutes(), seconds: time.getSeconds()}} />
        </div>
    )
}

export default Clock;