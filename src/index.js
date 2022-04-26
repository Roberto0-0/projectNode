const { app } = require('./app')
const routes = require('./routes')

app.use(routes)

app.listen(3000)
