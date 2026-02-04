import { useState } from 'react'

const Statisticline = ({text, value}) =>{
  
  return(
    
      
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good,neutral,bad,total}) => {
  if (total==0){
    return(
      <div>
        <br />
        No feedback given
      </div>
    )
  }
  else{
    return(
      <div>
        
        <h1>statistics</h1>
        <table>
          <tbody>
          <Statisticline text="good" value={good} />
          <Statisticline text="neutral" value={neutral} />
          <Statisticline text="bad" value={bad} />
          <Statisticline text="all" value={total} />
          <Statisticline text="average" value={(good-bad)/total} />
          <Statisticline text="positive" value={(good/total)*100+ '%'}/>
          </tbody>
        </table>  
      
      </div>
    )
  }
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] =useState(0)
  

  const handleGood = () =>{
    const updatedGood = good + 1;
    setGood(updatedGood)
    setTotal(updatedGood+neutral+bad)
  }  
   

  const handleneutral = () =>{
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(good+updatedNeutral+bad);
  }

  const handlebad = () =>{
    const updatedBad = bad + 1;
    setBad(updatedBad)
    setTotal(good+neutral+updatedBad)
  }
  return (
    <div>
      <h1>give feedback</h1><br />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleneutral} text="neutral" />
      <Button handleClick={handlebad} text="bad" />
      
      <Statistics good ={good} bad={bad} neutral={neutral} total={total} />
    </div>
  )
}

export default App