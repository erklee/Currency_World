// import * as d3 from "d3";
// // import Globe from 'globe.gl';
// // const Country = require('./scripts/country');

// import * as d3 from 'd3';
// import { drawMap } from './scripts/map';
// import { createTooltip, showTooltip, hideTooltip } from './scripts/tooltip';
// import { fetchExchangeRate } from './scripts/currencyapi';
// import { fetchCountryCurrencyMapping, getCurrencyCode } from './scripts/countrycurrencymapping';
import * as d3 from 'd3';
import { drawMap } from './scripts/map';
import { createTooltip, showTooltip, hideTooltip } from './scripts/tooltip';
import { Country } from './scripts/country';
import { fetchExchangeRate } from './scripts/currencyapi';
// import * as chartJS from "chart.js";

document.addEventListener('DOMContentLoaded', () => {
    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const tooltip = createTooltip();
  
    const projection = d3.geoMercator().scale(70).center([0, 50]).translate([width / 2, height / 2]);
  
    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then(async function (data) {
    drawMap(svg, data, projection, tooltip);

    data.features.forEach(async function (feature) {
    const country = new Country(feature);

    const countryPath = svg
        .append('path')
        .datum(feature)
        .attr('fill', '#69b3a2')
        .attr('d', d3.geoPath().projection(projection))
        .style('stroke', '#fff');

    countryPath
        .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', 'orange');
        showTooltip(tooltip, event, feature.properties.name);
        })
        .on('mouseout', function (d) {
        d3.select(this).attr('fill', '#69b3a2');
        hideTooltip(tooltip);
        })
        .on('click', async function(event){
        let country = new Country(feature);
        let oldCurrency = "USD";
        let currencyHash = {
            "USA" : "USD",
            "South Korea" : "KRW",
            "Canada" : "CAD",
            "China" : "CNY",
            "Brazil" : "BRL",
        };
        let newCurrency = currencyHash[country.name];
        let dates = ["2023-06-01","2023-07-01","2023-08-01","2023-09-01","2023-10-01","2023-11-01"];

        try {
            let data = await Promise.all(dates.map(async date => {
            let result = await fetchExchangeRate(newCurrency, date);
            return result;
            }));

            console.log("Data before Chart:", data);

            const chartCanvas = document.getElementById('currency_exchange_rate_chart');
            let existingChart = null;

            // check if chart instance exists
            if (chartCanvas) {
                const ctx = chartCanvas.getContext('2d');
                existingChart = Chart.getChart(ctx);
                
                // destroy if chart is there
                if (existingChart) {
                existingChart.destroy();
                }
            }

            new Chart(
            document.getElementById("currency_exchange_rate_chart"),
            {
                type: 'line',
                data: {
                labels: dates, //labels for your x and y axes
                datasets: [{
                    label: 'My First Dataset', //title of graph
                    data: data,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1
                }],
                }
            }
            );
        } catch (error) {
            console.error("Error fetching exchange rate data:", error.message);
        }
        });
    });
});
});
  



// // import Example from "./scripts/test"
// // document.addEventListener("DOMContentLoaded", function(){
// //     const main = document.querySelector("#main")
// //     const h1 = document.createElement("h1")
// //     h1.innerText = "its alive"
// //     main.appendChild(h1)

// //     new Example(main)
// // })
// // document.addEventListener("DOMContentLoaded", () =>{ 
// //     const context = document.getElementById("globe")
// //     const myGlobe = Globe();
// //     myGlobe(context)
// //   .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
// //   .pointAltitude('size')
// //   .pointColor('color')

// //   .pointsData(gData);
// // })

// document.addEventListener("DOMContentLoaded", () => {
//     const svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");

// // Map and projection

// const projection = d3.geoMercator()
//   .scale(70)
//   .center([0,50])
//   .translate([width / 2, height / 2]);

// // Load external data and boot
// d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data){

//     // Draw the map
//     svg.append("g")
//         .selectAll("path")
//         .data(data.features)
//         .enter().append("path")
//             .attr("fill", "#69b3a2")
//             .attr("d", d3.geoPath()
//                 .projection(projection)
//             )
//             .style("stroke", "#fff")
// })



// d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data) {
//     data.features.forEach(function(feature) {
//         // Access the coordinates of each country
//         const coordinates = feature.geometry.coordinates;

//         // The coordinates can be a multi-dimensional array for complex geometries
//         // For simplicity, let's assume it's a single polygon (array of coordinates)
//         // console.log("Country:", feature.properties.name);
//         // console.log("Coordinates:", coordinates);

//         // Draw a path for each country on the map
//         const countryPath = svg.append("path")
//             .datum(feature)
//             .attr("fill", "#69b3a2")
//             .attr("d", d3.geoPath().projection(projection))
//             .style("stroke", "#fff");

//         // Add a mouseover event listener
//         countryPath.on("mouseover", function(event, d) {
//             // Highlight the country on mouseover (e.g., change fill color)
//             d3.select(this)
//                 .attr("fill", "orange");

//             // Display additional information (e.g., country name)
//             tooltip.transition()
//                 .duration(200)
//                 .style("opacity", .9);
//             tooltip.html(feature.properties.name)
//                 .style("left", (event.pageX) + "px")
//                 .style("top", (event.pageY - 28) + "px");
//         })
//         // Add a mouseout event listener
//         .on("mouseout", function(d) {
//             // Restore original styles on mouseout
//             d3.select(this)
//                 .attr("fill", "#69b3a2");

//             // Hide the tooltip
//             tooltip.transition()
//                 .duration(500)
//                 .style("opacity", 0);
//         });
//     });

//     // Create a tooltip div for additional information
//     const tooltip = d3.select("body").append("div")
//         .attr("class", "tooltip")
//         .style("opacity", 0);
// });


// });



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