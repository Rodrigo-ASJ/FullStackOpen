const Part = ({ info }) => {
	const { name, exercises } = info;
	return (
		<p>
			{name} {exercises}
		</p>
	);
};

export default Part