/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = ',us&appid=8277b3d12b6e121e02edbd9a62640323&units=metric';
// Create a new date instance dynamically with JS
const date = new Date().toDateString();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', ()=>{
  const newZip = document.getElementById('zip').value;
  const newFeelings = document.getElementById('feelings').value;
  getWeatherData(newZip).then( data => 
    postData('/add', extractData(data, newFeelings)))
    .then(() => updateUI());
});

/* Function to GET Web API Data*/
const getWeatherData = async (zip) =>{
  try {
    const {data} = await axios.get(baseURL+zip+apiKey);
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

// Function to extract needed data
const extractData =  (data, feelings) =>{
  console.log(data);
  const savedData =  {
    "city": data.name,
    "icon": data.weather[0].icon,
    "desc": data.weather[0].description,
    "temp": data.main.temp,
    "feelings": feelings,
  };
  console.log(savedData);
  return savedData;
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  console.log(data);
  try {
    const newData = await axios.post(url, data);
    console.log(newData);
    return newData;
  }catch(error) {
  console.log("error", error);
  }
}

//function to update UI
const updateUI = async () =>{
  try {
    const {data} = await axios.get('/all');
    console.log(data);
    document.getElementById('city').innerText = `Weather in ${data.city}`;
    document.getElementById('date').innerText = date;
    document.getElementById('temp').innerText = `${Math.round(data.temp)}°C`;
    document.getElementById('icon').style.display = "block";
    document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.icon}.png`;
    document.getElementById('desc').innerText = `${data.desc}`;
    document.getElementById('content').innerText= `Today I feel ${data.feelings}`;  
  } catch (error) {
    console.log("error", error);
  }
}
