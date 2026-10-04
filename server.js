// import Express library and activate it
import express from "express";
const app = express();


// Serve static files from /public folder (useful when running Node locally, optional on Vercel).
app.use(express.static('public'))
// Define index.html as the root explicitly (useful on Vercel, optional when running Node locally).
app.get('/', (req, res) => { res.redirect('/index.html') })

// app.get("/test", (req, res) => {
   // res.send("The new server is working!");
// });

// listen for requests from the frontend
app.get("/games", (req, res) => {
    // assemble a url for Rapid API
    const url = 'https://mmo-games.p.rapidapi.com/games';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
        }
    };
    // Relay the results back to the frontend
    fetch(url, options)
        .then(response => response.json())
        .then(json => res.send(json))
        .catch(error => console.error(error));
});



const port = 3000
// app.listen(...): starts the web server and prints a message when it's ready.
// You can then open the URL in your browser to use the app locally.
app.listen(port, () => {
    console.log(`Express is live at http://localhost:${port}`)
})
