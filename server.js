const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World! from Node.js inside Minikube *******************');
    console.log(`Server is running on port ${PORT}`);
});

app.get('/welcome', (req, res) => {
    res.send('welcome, Greeting! from Node.js inside Minikube');
    console.log(`welcome, Greeting! from Node.js inside Minikube`);
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
