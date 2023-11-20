import './App.css'
import { useEffect, useState } from 'react'

export default function App() {
  const [isCounting, setIsCounting] = useState(false)
  const [timeDuration, setTimeDuration] = useState(0)

  useEffect(() => {
    console.log('useEffect')
    let interval: number | undefined = undefined

    if (isCounting) {
      // creat new interval andd store in intervalIDRef
      // myInterval = setInterval(function, milliseconds)
      interval = setInterval(() => {
        setTimeDuration((prevTimeDuration) => {
          console.log(`prevTimeDuration: `, prevTimeDuration)
          return prevTimeDuration + 1
        })
      }, 1000)
    } else {
      clearInterval(interval)
    }

    // prevent memory leak
    // clear interval when component unmount
    return () => {
      clearInterval(interval)
      console.log('cleanup')
    }
  }, [isCounting]) // only run when isCounting state change

  function handleStart() {
    setIsCounting(true)
    console.log('start')
  }

  function handlePause() {
    setIsCounting(false)
    console.log('pause')
  }

  function handleReset() {
    setIsCounting(false)
    setTimeDuration(0)
    console.log('stop')
  }

  const { hours, minutes, seconds } = getTimeUnit(timeDuration)

  return (
    <>
      <div>
        <span>{addLeadingZero(hours)}:</span>
        <span>{addLeadingZero(minutes)}:</span>
        <span>{addLeadingZero(seconds)}</span>
      </div>
      {isCounting ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </>
  )
}

function getTimeUnit(time: number) {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time - hours * 3600) / 60)
  const seconds = time - hours * 3600 - minutes * 60

  return { hours, minutes, seconds }
}

function addLeadingZero(numTime: number): string {
  return numTime.toString().padStart(2, '0')
}
