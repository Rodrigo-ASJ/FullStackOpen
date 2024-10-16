import Part from './Part'

const Content = ({ exercises }) => {
	return (
		<div>
			{exercises.map((item, index) => {
				return <Part key={item.id} info={item} />;
			})}
		</div>
	);
};

export default Content;