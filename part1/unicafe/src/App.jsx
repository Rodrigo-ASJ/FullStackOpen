import { useState } from 'react';


const Button = ({ text, onClick}) =>{
  return(
    <button onClick={onClick}>
			{text}
		</button>
  )
}

const StatisticLine = ({text, value}) =>{
  return(
    <tr>
      <td>
        {text} : {value}
      </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
	
  //número total de comentarios recopilados
	const totalComments = good + neutral + bad;

	//puntuación promedio (buena: 1, neutral: 0, mala: -1)
	const averageComments = (good - bad) / totalComments;

	//porcentaje de comentarios positivos.
	const positiveComents = `${(good / totalComments) * 100} %` ; 

  return (
  <section>
  <h2>Statistics</h2>
  { totalComments > 0 ? 
    <table>
      <tbody>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Bad" value={bad}/>
        <StatisticLine text="All" value={totalComments}/>
        <StatisticLine text="Average" value={averageComments}/>
        <StatisticLine text="Positive" value={positiveComents}/>
      </tbody>
		</table> : 
    <h3>No feedback given</h3> 
    }
  </section>
	);
};

function App() {
	// guarda los clics de cada botón en su propio estado
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<main>
			<h1>Give Feedback</h1>

			<section>
				<Button
          text="Good" 
          onClick={() => {setGood((g) => g + 1);}}
				/>
				<Button
          text="Neutral" 
					onClick={() => {setNeutral((n) => n + 1);}}
				/>
				<Button
          text="Bad" 
					onClick={() => {setBad((b) => b + 1);}}
				/>
			</section>

			<Statistics 
        good={good}
        bad={bad}
        neutral={neutral}
      />

		</main>
	);
}

export default App;
