import useSWR from "swr"
import styles from "../styles/components/quote.module.scss"

const Quote = () => {
      const url = `https://api.quotable.io/random`
      const fetcher = async (...args) => {
            const results = await fetch(...args)
            return await results.json()
      }

      const {data: quote, mutate} = useSWR(url, fetcher)
      console.log(quote)
      const handleClick = () => mutate()

      return (
            <div className={styles.Quote}>
                  <h4>"{ quote && quote.content }"</h4>
                  <p>{ quote && quote.author }</p>
                  <button onClick={handleClick}/>
            </div>
      )
}

export default Quote