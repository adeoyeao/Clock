import styles from "../styles/components/button.module.scss"
import { useState, useEffect } from "react"

const Button = (props) => {
      const [ content, setContent ] = useState("more")

      useEffect(() => {
            props.expanded ? setContent("less") : setContent("more")
      }, [props])
      
      return (
            <button onClick={() => props.handleClick()} className={styles.Button}>
                  <p>{ content }</p>
                  <div className={styles[`Button_arrow___${content}`]}/>
            </button>
      )
}

export default Button