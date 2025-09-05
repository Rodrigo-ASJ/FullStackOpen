const app = require('./app.js');

const { PORT } = require('./utils/config.js');
const { info } = require('./utils/loggers.js');

app.listen( PORT, () => {
  info(`Server running on port ${PORT}`)
})
