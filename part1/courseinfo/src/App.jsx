const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Content = ({ exercises }) => {
	return (
		<div>
			{exercises.map((item, index) => {
				return <Part key={index} info={item} />;
			})}
		</div>
	);
};

const Part = ({ info }) => {
	const { name, exercises } = info;
	return (
		<p>
			{name} {exercises}
		</p>
	);
};

const Total = ({ array }) => {

	const values = array.map((value) => {
		const { exercises } = value;
		return exercises;
	});

	return <p>Number of exercises {values[0] + values[1] + values[2]}</p>;
};


const App = () => {
	const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

	return (
		<div>
			<Header course={course.name} />
			<Content exercises={course.parts} />
			<Total array={course.parts} />
		</div>
	);
};

export default App;
