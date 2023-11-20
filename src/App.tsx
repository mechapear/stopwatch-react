import './App.css'
import { useEffect, useRef, useState } from 'react'

export default function App() {
  const [isCounting, setIsCounting] = useState(false)
  const [timeDuration, setTimeDuration] = useState(0)
  // store intervalID
  const intervalIDRef = useRef<number | undefined>(undefined)

  // prevent memory leak
  // clear interval when component unmount
  useEffect(() => {
    console.log('useEffect')
    // clean up function
    return () => {
      clearInterval(intervalIDRef.current)
      console.log('cleanup')
    }
  }, [])

  function handleStart() {
    // clear interval before start
    clearInterval(intervalIDRef.current)

    setIsCounting(true)
    console.log('start')

    // creat new interval andd store in intervalIDRef
    // myInterval = setInterval(function, milliseconds)
    intervalIDRef.current = setInterval(() => {
      // Update setTimeDuration state multiple times in one event
      setTimeDuration((prevTimeDuration) => {
        console.log(`prevTimeDuration: `, prevTimeDuration)
        return prevTimeDuration + 1
      })
    }, 1000)
  }

  function handlePause() {
    setIsCounting(false)
    // cancel existing interval
    clearInterval(intervalIDRef.current)
    console.log('pause')
  }

  function handleReset() {
    setIsCounting(false)
    setTimeDuration(0)
    clearInterval(intervalIDRef.current)
    intervalIDRef.current = undefined
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
