let countryCurrencyMap = {};

export async function fetchCountryCurrencyMapping() {
  const apiUrl = 'https://currencybeacon.com/supported-currencies';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    countryCurrencyMap = data.supportedCurrenciesMap;
  } catch (error) {
    console.error("Error fetching country currency mapping:", error.message);
  }
}

export function getCurrencyCode(countryCode) {
  return countryCurrencyMap[countryCode];
}