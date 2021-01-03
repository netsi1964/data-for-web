const brain = require("brain.js");
const data = require("../Deaths_over_time.json");

let deaths = 0;
const trainData = data.map((day) => {
  let key = Object.keys(day)[0];
  let temp = key.split("-");
  let date = new Date(temp[0], temp[1] - 1, temp[2]);
  let deathsToday = parseInt(day[key]);
  let rise = deathsToday > deaths ? 1 : 0;
  deaths = deathsToday;
  return {
    input: getInput(date),
    output: [rise],
  };
});

const net = new brain.NeuralNetwork();
net.train(trainData);

let day = 24 * 60 * 60 * 1000;
let today = new Date();
let lastObj = data[data.length - 2];
let lastDeaths = parseInt(lastObj[Object.keys(lastObj)[0]]);
for (var i = 0; i < 30; i++) {
  const prediction = net.run(getInput(today));
  let mul = (prediction[0] - 0.5) * 2 + 1;
  lastDeaths = mul * lastDeaths;
  console.log(today.toLocaleDateString(), parseInt(lastDeaths + 0.5));

  today = new Date(today.getTime() + day);
}

function getInput(date) {
  const input = [date.getDay()];
  return input;
}
