const errorHandler = (err, req, res, next) => {
    console.error(err);

	if( err.name === "CastError"){
		res.status(400).send({ error: 'malformatted id' }).end();
	}

	res.status(500).end();

}

module.exports = errorHandler;