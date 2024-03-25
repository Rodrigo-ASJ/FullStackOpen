import { useState } from 'react';

function App() {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.',
	];

	const [selected, setSelected] = useState(0);

	//votar por anecdota
	const INITIAL_VOTES = { 0: 0 };
	const [votes, setVotes] = useState(INITIAL_VOTES);

	const voting = () => {
		// Copia el objeto anterior y añade la puntuación al atributo
		const newVote = { ...votes, [selected]: votes[selected] ? votes[selected] + 1 : 1 };

		return setVotes(newVote);
	};

	// Renderizar el total de votos por anecdotas
	const totalVote = votes[selected] ? votes[selected] : 0;

	// Muestra la anécdota con el mayor número de votos
	let MOST_VOTED = [];
	const votados = Object.values(votes);
	const numeroMasAlto = Math.max(...votados);

  //recorremos el objeto para relacionar clave y valor al más votado
	for (const [key, value] of Object.entries(votes)) {
		if (value === numeroMasAlto) {
			MOST_VOTED = MOST_VOTED.concat(key);
		}
	}

  //Renderiza las anecdotas más votadas, si hay mas de una
	const anecdoteMostVotes = MOST_VOTED.map( a => {
    return <p key={a}>"{anecdotes[a]}"</p>
  });


	const nextAnecdote = () => {
		// Generar un número aleatorio entre 0 y el maximo de elementos de una array
		const numeroAleatorio = Math.random() * anecdotes.length;
		const entero = Math.floor(numeroAleatorio);
		return setSelected(entero);
	};

	return (
		<main>
			<section>
				<h1>Anecdote of the day</h1>
				<p>"{anecdotes[selected]}"</p>
				<p>Has {totalVote} votes</p>
				<button onClick={voting}>Vote</button>
				<button onClick={nextAnecdote}>Next anecdote</button>
			</section>
			<section>
				<h2>Anecdote with most votes</h2>
        {anecdoteMostVotes}
			</section>
		</main>
	);
}

export default App;
