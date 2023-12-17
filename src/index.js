import * as d3 from "d3";
// import Globe from 'globe.gl';
// const Country = require('./scripts/country');




// import Example from "./scripts/test"
// document.addEventListener("DOMContentLoaded", function(){
//     const main = document.querySelector("#main")
//     const h1 = document.createElement("h1")
//     h1.innerText = "its alive"
//     main.appendChild(h1)

//     new Example(main)
// })
// document.addEventListener("DOMContentLoaded", () =>{ 
//     const context = document.getElementById("globe")
//     const myGlobe = Globe();
//     myGlobe(context)
//   .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
//   .pointAltitude('size')
//   .pointColor('color')

//   .pointsData(gData);
// })

document.addEventListener("DOMContentLoaded", () => {
    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection

var projection = d3.geoMercator()
  .scale(70)
  .center([0,50])
  .translate([width / 2, height / 2]);

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data){

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "#fff")
})

});

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

// const apiKey = "a26252416cef469baa473faa678e8f98"; 

// document.addEventListener("DOMContentLoaded", async () => {
//   const apiUrl = "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=a26252416cef469baa473faa678e8f98";

//   try {
//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();

//     console.log("Exchange Rates:", data.rates);
//     console.log("Base Currency:", data.base);
//     console.log("Date:", data.date);


//     for (const currency in data.rates) {
//       console.log(`${currency}: ${data.rates[currency]}`);
//     }

//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//   }
  
// });