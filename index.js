import express from "express";

const app = express();
const port = 3000;

// we will accept the data coming in json format

app.use(express.json());

let teaData = []; //in memory database everytime the server restarts the added tea data is lost therefore we need to be careful
let nextID = 1;

// add new tea
app.post("/teas", (req, res) =>{
    const {name, price } = req.body;
    const newTea = {id: nextID++, name, price }
    teaData.push(newTea);
    res.status(201).send(newTea)
})

// get all tea from the server
app.get("/teas", (req, res) =>{
    res.status(200).send(teaData);
})


// get a tea with id from url
app.get("/teas/:id", (req, res) =>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }

    res.status(200).send(tea);
})

// update tea

app.put('/teas/:id', (req, res) =>{
    const tea = teaData.find( t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')

    }

    const {name, price} = req.body
    tea.name = name;
    tea.price = price;
    res.send(200).send(tea);
})

//delete tea

app.delete('/teas/:id', (req, res) =>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('Tea not found')

    }
    teaData.splice(index, 1)
    return res.status(201).send('deleted')
})

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}...`);
    
})


// we made a simple crud application which performed all the steps and we also checked it in the postman professionally





