module.exports = {

    filterCountry: function(arr, country) {
        const filteredData = arr.filter((obj) => {   
            return obj['Country/Region'].toLowerCase() === country.toLowerCase();
        })
        return filteredData;
    }
}