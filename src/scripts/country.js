export class Country {
    constructor(feature) {
      this.feature = feature;
      this.name = this.feature.properties.name;
    }
  
    logCountryName() {
      console.log(this.feature.properties.name);
    }
  }