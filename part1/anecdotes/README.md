### 1.12\*: anecdotes, paso 1

El mundo de la ingeniería de software está lleno de anécdotas que destilan verdades atemporales de nuestro campo en breves frases.

Expande la siguiente aplicación agregando un botón en el que se pueda hacer clic para mostrar una anécdota aleatoria del campo de la ingeniería de software:

```javascript
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
```

Tu aplicación finalizada podría verse así

![view](https://fullstackopen.com/static/8577fa00fc4d946e2322de9b2707c89c/5a190/18a.png)

### 1.13\*: anecdotes, paso 2
Expande tu aplicación para que puedas votar por la anécdota mostrada.

![example](https://fullstackopen.com/static/06f95cb43a18bd6429174200a8d17cff/5a190/19a.png)

Nota: almacena los votos de cada anécdota en una matriz u objeto en el estado del componente. Recuerda que la forma correcta de actualizar el estado almacenado en estructuras de datos complejas como objetos y matrices es hacer una copia del estado.

### 1.14\*: anecdotes, paso 3
Ahora implementa la versión final de la aplicación que muestra la anécdota con el mayor número de votos

![referencia](https://fullstackopen.com/static/3e8638efbbbbcabac7bb79466ab3a5f6/5a190/20a.png)

Si se empatan varias anécdotas en el primer lugar, es suficiente con solo mostrar una de ellas.