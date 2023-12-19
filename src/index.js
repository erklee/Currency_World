
import * as d3 from 'd3';
import { drawMap } from './scripts/map';
import { createTooltip, showTooltip, hideTooltip } from './scripts/tooltip';
import { Country } from './scripts/country';
import { fetchExchangeRate } from './scripts/currencyapi';
import currencyHash from "./scripts/currencyhash";
// import * as chartJS from "chart.js";

document.addEventListener('DOMContentLoaded', () => {
    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const tooltip = createTooltip();
    let selectedCountryPath = null;

    const dates = ["2023-01-01","2023-02-01","2023-03-01","2023-04-01","2023-05-01","2023-06-01","2023-07-01","2023-08-01","2023-09-01","2023-10-01","2023-11-01","2023-12-01"];
  
    const projection = d3.geoMercator().scale(130).center([0, 50]).translate([width / 2, height / 2]);

    const dropdown = document.getElementById("country-dropdown");

    Object.keys(currencyHash).forEach((country) => {
        var option = document.createElement('option');
        option.value = country;
        option.innerHTML = country;
        dropdown.appendChild(option);
    })

    dropdown.addEventListener('change', async function(){
        let country = dropdown.value;
        if (country === "" || selectedCountryPath) {
            selectedCountryPath.attr('fill', '#69b3a2');
            selectedCountryPath = null
        }
        
        selectedCountryPath = d3.select(`path.${country}`);
        // console.log(selectedCountryPath)
        selectedCountryPath.attr('fill', '#898C78');
        
        let currency = currencyHash[country];
        try {
            let data = await Promise.all(dates.map(async date => {
            let result = await fetchExchangeRate(currency, date);
            return result;
            }));


            
            const chartCanvas = document.getElementById('currency_exchange_rate_chart');
            let existingChart = null;
            chartCanvas.width = 400; 
            chartCanvas.height = 300; 
            
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
                labels: dates, //labels for your x
                datasets: [{
                    label: `Historical Currency Exchange Rate - ${currency}`, //title of graph
                    data: data,
                    fill: false,
                    borderColor: "rgb(44,64,30)",
                    tension: 0.1
                    //maintain aspect ration options
                }],
                },
                options: {
                    responsive: true, 
                    maintainAspectRatio: false, 
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Exchange Rate vs USD' // y axis label
                            }
                        }
                    },
                    x: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Date',
                        },
                    },
                    plugins: { 
                        title: {
                            display: true,
                            text: `Historical Currency Exchange Rate - ${country} ${currency} `,
                            font: {
                                family: 'Georgia',
                                size: 18,
                                weight: 'bold',
                            }
                        },
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
                }
                
            }
            );

        } catch (error) {
            console.error("Error fetching exchange rate data:", error.message);
        }
    
    });
  
    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then(async function (data) {
    drawMap(svg, data, projection, tooltip);

    data.features.forEach(async function (feature) {
    const country = new Country(feature);

    const countryPath = svg
        .append('path')
        .datum(feature)
        .attr('fill', '#69b3a2')
        .attr('d', d3.geoPath().projection(projection))
        .style('stroke', '#fff')
        .attr('class', (d) =>  d.properties.name);

    countryPath
    .on('mouseover', function (event, d) {
        // if (selectedCountryPath) {
        //     selectedCountryPath.attr('fill', 'orange');
        // }
        d3.select(this).attr('fill', '#898C78');
        showTooltip(tooltip, event, feature.properties.name);
        })
    .on('mouseout', function (d) {
        d3.select(this).attr('fill', '#69b3a2');
        if(selectedCountryPath){
            selectedCountryPath.attr('fill', '#898C78');
        }
        // hideTooltip(tooltip);
        })
    .on('click', async function(event){
        let newCountryPath = d3.select(this);
        console.log(this)
        // console.log('clicked country:', feature.properties.name);
        if (selectedCountryPath) {
            // console.log('previous:', selectedCountryPath.datum().properties.name); 
            selectedCountryPath.attr('fill', '#69b3a2');
            // if (newCountryPath === selectedCountryPath){
            //     selectedCountryPath.attr('fill', '#69b3a2');
            // } else { 
            //     selectedCountryPath.attr('fill', 'orange');
            // }
        }
        newCountryPath.attr('fill', '#898C78');
        selectedCountryPath = newCountryPath;
        // console.log('new country', selectedCountryPath.datum().properties.name);
        let country = new Country(feature);
        let oldCurrency = "USD";
    
        let newCurrency = currencyHash[country.name];
        

        try {
            let data = await Promise.all(dates.map(async date => {
            let result = await fetchExchangeRate(newCurrency, date);
            return result;
            }));

            // console.log("data before chart:", data);
            
            const chartCanvas = document.getElementById('currency_exchange_rate_chart');
            let existingChart = null;
            chartCanvas.width = 400; 
            chartCanvas.height = 300; 
            
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
                labels: dates, //labels for your x
                datasets: [{
                    label: `Historical Currency Exchange Rate - ${newCurrency}`, //title of graph
                    data: data,
                    fill: false,
                    borderColor: "rgb(44,64,30)",
                    tension: 0.1
                    //maintain aspect ration options
                }],
                },
                options: {
                    responsive: true, 
                    maintainAspectRatio: false, 
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Exchange Rate vs USD' // y axis label
                            }
                        }
                    },
                    plugins: { 
                        title: {
                            display: true,
                            text: `Historical Currency Exchange Rate - ${country.name} ${newCurrency} `,
                            font: {
                                family: 'Georgia',
                                size: 18,
                                weight: 'bold',
                            }
                        },
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
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
  


