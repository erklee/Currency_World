export async function fetchExchangeRate(countryCode, date) {
    const apiKey = "5o9Rnl7tRSWposKoP7WAr4hJsHjNEYC5"; 
    const apiUrl = `https://api.currencybeacon.com/v1/historical?api_key=${apiKey}&base=USD&date=${date}&symbols=${countryCode}`;
    // console.log(apiUrl);
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const exchangeRate = Object.values(data.rates)[0];
      return exchangeRate;
    } catch (error) {
      console.error("Error fetching exchange rate data:", error.message);
      return null;
    }
  }