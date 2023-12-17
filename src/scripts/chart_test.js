document.addEventListener('DOMContentLoaded', function () {
    // Replace 'YOUR_BASE_CURRENCY' and 'YOUR_DATE' with actual values
    const baseCurrency = 'KRW';
    const apiUrl = `https://api.currencybeacon.com/v1/historical?api_key=5o9Rnl7tRSWposKoP7WAr4hJsHjNEYC5base=${baseCurrency}&symbols=USD`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract data for the chart
            const labels = Object.keys(data.rates);
            const exchangeRates = Object.values(data.rates);

            // Create a Chart.js chart
            const ctx = document.getElementById('exchangeRateChart').getContext('2d');
            const exchangeRateChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `${baseCurrency} to USD Exchange Rate`,
                        data: exchangeRates,
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'year'
                            }
                        },
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});