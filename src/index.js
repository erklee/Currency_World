import Globe from 'globe.gl';
const Country = require('./scripts/country')



// import Example from "./scripts/test"
// document.addEventListener("DOMContentLoaded", function(){
//     const main = document.querySelector("#main")
//     const h1 = document.createElement("h1")
//     h1.innerText = "its alive"
//     main.appendChild(h1)

//     new Example(main)
// })
document.addEventListener("DOMContentLoaded", () =>{ 
    const context = document.getElementById("globe")
    const myGlobe = Globe();
    myGlobe(context)
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
//   .pointAltitude('size')
//   .pointColor('color')

//   .pointsData(gData);
})



// const apiKey = "a26252416cef469baa473faa678e8f98"
// async function main() {
//     const response = await fetch("https://api.currencyfreaks.com/v2.0/supported-currencies")
//     // console.log(response.json())
    
//     // const resBody = await response.json()
//     // console.log(resBody.supportedCurrenciesMap.BOB)
    


    // const N = 300;
    // const gData = [...Array(N).keys()].map(() => ({
    //   lat: (Math.random() - 0.5) * 180,
    //   lng: (Math.random() - 0.5) * 360,
    //   size: Math.random() / 3,
    //   color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    // }));

    // Globe()
    //   .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    //   .pointsData(gData)
    //   .pointAltitude('size')
    //   .pointColor('color')
    // (document.getElementById('globe'))
    // .globeImageUrl(myImageUrl)
    // .pointsData(myData);
// }
// main()

const apiKey = "a26252416cef469baa473faa678e8f98"; 

document.addEventListener("DOMContentLoaded", async () => {
  const apiUrl = "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=a26252416cef469baa473faa678e8f98";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Exchange Rates:", data.rates);
    console.log("Base Currency:", data.base);
    console.log("Date:", data.date);


    for (const currency in data.rates) {
      console.log(`${currency}: ${data.rates[currency]}`);
    }

  } catch (error) {
    console.error("Error fetching data:", error.message);
  }

  
});