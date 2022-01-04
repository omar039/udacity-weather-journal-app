/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
let apiKey = ',us&appid=8277b3d12b6e121e02edbd9a62640323&units=metric';
// Create a new date instance dynamically with JS
let d = new Date().toDateString();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', ()=>{
    const newZip = document.getElementById('zip').value;
    const newFeelings = document.getElementById('feelings').value;
    getWeatherData(newZip).then( data => 
      postData('/add', extractData(data, newFeelings))).then(() => updateUI());
    
});

/* Function to GET Web API Data*/
const getWeatherData = async (zip) =>{
    const res = await fetch(baseURL+zip+apiKey);
    try {
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

// Function to extract needed data
const extractData =  (data, feelings) =>{
  const savedData =  {
    "city": data.name,
    "icon": data.weather[0].icon,
    "desc": data.weather[0].description,
    "temp": data.main.temp,
    "feelings": feelings,
  };
  console.log("------------saved---------------")
  console.log(savedData);
  return savedData;
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
      console.log("-------postdata------")
      console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log('------------------');
        console.log(newData);
        return newData;
      }catch(error) {
      
      console.log("error", error);
      }
  }

//function to update UI
const updateUI = async () =>{
  const req = await fetch('/all');
  try {
      const data = await req.json();
      console.log(data);
      document.getElementById('city').innerText = `Weather in ${data.city}`;
      document.getElementById('date').innerHTML = d;
      document.getElementById('temp').innerHTML = `${Math.round(data.temp)}°C`;
      document.getElementById('icon').style.display = "block";
      document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.icon}.png`;
      document.getElementById('desc').innerText = `${data.desc}`;
      document.getElementById('content').innerHTML= `Today I feel ${data.feelings}`;
      
  } catch (error) {

    console.log("error", error);
  }
}

//postData('/add', {answer:42});