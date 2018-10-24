require('dotenv/config')
const server = require('json-server')
const yelp = require('yelp-fusion')
const app = server.create()
const middleware = server.defaults()
const router = server.router('db.json')
const client = yelp.client('8Tlqjmp9Pgh0iewmK3vrv8rZ4h8ORn6mOwHWdSSe76WTehbIpdY_DdewsZY6gja0kGcvLOGGB4qVUJQkkaOp2-DCiJBMxAH_0Nk-pJ9WcS26UrMkbFsLae2FnsDKW3Yx')

app.use(middleware)

app.use('/api/position', (req, response, next) => {
  client.search({
    latitude: +req.query.lat,
    longitude: +req.query.lng,
    radius: 25000,
    categories: 'golf',
    sort_by: 'distance'
  })
    .then(res => {
      return response.json(res.jsonBody.businesses)
    }
    )
    .catch(e => {
      console.error(e)
    })
})
app.use(router)
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
