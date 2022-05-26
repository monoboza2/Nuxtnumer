const jsonServer = require('json-server')
const auth = require('json-server-auth')
const app = jsonServer.create()
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults({noCors:true})
var cors = require("cors");
const rules = auth.rewriter({
  "Bisection":660,
  "False":660,
  "Onepoint":660,
  "Newton":660
})
app.db = router.db
app.use(cors())
app.use(rules)
app.use(auth)
app.use(middlewares);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./monoboza2-first-0.1-resolved.json');
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router)
app.listen(3004,()=>
{
    console.log("JSON SERVER is running!!");
})
