import './App.css'
import { useEffect, useRef, useState } from 'react'

export default function App() {
  const [isSCounting, setIsCounting] = useState(false)
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

  return (
    <>
      <div>
        <span>00:</span>
        <span>00:</span>
        <span>{timeDuration}</span>
      </div>
      {isSCounting ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </>
  )
}
