import { useState } from 'react'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const total = good + neutral + bad;

  if(total === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {(good + (neutral * 0) + (bad * -1)) / total}</p>
        <p>positive {good / total * 100} %</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App