import { useState } from 'react'


const Button = props => {
  return <button onClick={props.onClickFx}>{props.text}</button>
}

const StatisticLine = props => {
  return <tr><td>{props.text}</td><td>{props.value}</td></tr>
}

const Statistics = props => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const total = good + neutral + bad;

  if (total === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={(good + (neutral * 0) + (bad * -1)) / total} />
            <StatisticLine text="positive" value={(good / total * 100) + "%"} />
          </tbody>
        </table>
      </>
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
      <Button onClickFx={() => setGood(good + 1)} text="good"/>
      <Button onClickFx={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClickFx={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App