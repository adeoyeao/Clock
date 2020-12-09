import Head from 'next/head'
import styles from '../styles/layouts/index.module.scss'
import { useState, useEffect } from "react"
import Button from "../components/Button"
import Quote from "../components/Quote"

const months = {
  0: "Jaunary", 1: "February", 2: "March", 3:"April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"
}

const suffix = {
  1: "st", 21: "st", 31: "st", 2: "nd", 22: "nd", 3: "rd", 23: "rd" 
}

const days = {
  0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"
}

const Index = () => {

  // Optimise Mobile Resize
  const [ viewHeight, setViewHeight ] = useState(`100vh`)
  
  const handleResize = () => setViewHeight(`${window.innerHeight}px`)

  const mainStyle = {
    minHeight: viewHeight,
    transition: "height 0.5s linear"
  }

  const overviewStyle = {
    minHeight: `calc(${viewHeight} - 4rem)`
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return(() => window.removeEventListener("resize", handleResize))
  })

  // Date Generator
  const [ date, setDate ] = useState(new Date())
  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000)
  }, [])

  // Time of Day State
  const [ time, setTime ] = useState()

  useEffect(() => {
    date.getHours() < 6 ? setTime("Night") :
    date.getHours() < 12 ? setTime("Morning") :
    date.getHours() < 18 ? setTime("Afternoon") : setTime("Evening")
  }, [date])

  // Expanded State
  const [ expanded, setExpanded ] = useState(false)
  const handleClick = () => setExpanded(!expanded)

  // Date Calculations
  const nyd = new Date()
  nyd.setFullYear(date.getFullYear())
  nyd.setDate(1)
  nyd.setMonth(0)

  const [ numdays, setNumdays ] = useState((date - nyd) / 86400000 + 1)

  return (
    <main style={mainStyle} className={[styles.Index, styles[`Index___${time}`]].join(" ")}>
      <section style={overviewStyle} className={styles.Index_overview}>
      { !expanded && <Quote /> }
      <div className={styles.Index_clock}>
        <div>
          <h3>Good {time}, it's currently</h3>
          <h1>{`${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`}</h1>
        </div>
        <Button 
          expanded={expanded} 
          handleClick={handleClick} />
      </div>
        { expanded && <article className={styles.Index_details}>
          <span>
            <h4>Today's Date</h4>
            <h2>{`${months[date.getMonth()]} ${date.getDate()}${suffix[date.getDate()] ? suffix[date.getDate()] : "th"} ${date.getFullYear()}`}</h2>
          </span>
          <span>
            <h4>Day of the Week</h4>
            <h2>{days[date.getDay()]}</h2>
          </span>
          <span>
            <h4>Day of the Year</h4>
            <h2>{ numdays }</h2>
          </span>
          <span>
            <h4>Week of the Year</h4>
            <h2>{Math.floor(numdays / 7)}</h2>
          </span>
        </article> }
      </section>
    </main>
  )
}

export default Index