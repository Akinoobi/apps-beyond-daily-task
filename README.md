const express = require('express')
const app = express()

const PLACES = 7;

// no db - so global var to keep track of count
let counter = 0

function getCountImage(count) {
   ...
}

// get the image
app.get('/count.svg', (req, res) => {
  counter++;

  // This helps with GitHub's image cache 
  //   see more: https://rushter.com/counter.svg
  res.set({
  'content-type': 'image/svg+xml',
  'cache-control': 'max-age=0, no-cache, no-store, must-revalidate'
  })

  // Send the generated SVG as the result
  res.send(getCountImage(counter));
})

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
