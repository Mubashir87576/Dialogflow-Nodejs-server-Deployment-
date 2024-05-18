const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });
    
    //functions are intents
    function hi(agent) {
        console.log(`Default Welcome Intent  =>  intent`);
        agent.add("Welcome to Restaurant! please tell me how can I help you!");
      }
      

    function fallback(agent) {
        console.log(`Default Fallback Intent => intent`);
        // const { number , date , email} = agent.parameters;
       agent.add("Fallback from the server!")
    }

    function order(agent) {
        console.log(`order => intent`);
        // const { number , date , email} = agent.parameters;
       agent.add("ok, Sir we offer multiple dishes! [Chicken Biryani, Beef Biryani, Matan Kahrai, Chicken cheese kahrai ]")
    }

    function placed(agent) {
        console.log(`order placed => intent`);
        // const { number , date , email} = agent.parameters;
       agent.add("Sir/Mam your order is recieved! can you tell me your address and phone no for Drop off(food)!")
    }

    function addr(agent) {
        console.log(`Address => intent`);
        // const { number , date , email} = agent.parameters;
       agent.add("Thanks for order! we will deliver it in 30 minutes.")
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', hi); 
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('order', order);
    intentMap.set('order placed', placed);
    intentMap.set('Address', addr);
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});