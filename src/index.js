
// import Example from "./scripts/test"
// document.addEventListener("DOMContentLoaded", function(){
//     const main = document.querySelector("#main")
//     const h1 = document.createElement("h1")
//     h1.innerText = "its alive"
//     main.appendChild(h1)

//     new Example(main)
// })


const apiKey = "a26252416cef469baa473faa678e8f98"
async function main() {
    const response = await fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=a26252416cef469baa473faa678e8f98&symbols=PKR,GBP,EUR,USD")
    console.log(response.json())

    const N = 300;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));

    Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .pointsData(gData)
      .pointAltitude('size')
      .pointColor('color')
    (document.getElementById('globe'))
    // .globeImageUrl(myImageUrl)
    // .pointsData(myData);
}
main()