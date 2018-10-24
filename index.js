require('dotenv/config')
const server = require('json-server')
const yelp = require('yelp-fusion')
const app = server.create()
const middleware = server.defaults()
const router = server.router('db.json')
const client = yelp.client(process.env.YELPKEY)
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
