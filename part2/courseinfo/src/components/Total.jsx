const Total = ({ array }) => {

	// valores
	const values = array.map((value) => {
		const { exercises } = value;
		return exercises;
	});

	//sumar el total
	const sum = values.reduce( ( sum, value) => {
		return sum + value;
	}, 0 )

	return <p><strong> Number of exercises {sum}</strong></p>;
};

export default Total;