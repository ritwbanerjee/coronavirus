module.exports = {

    jsonTransformer: function (arr) {
        return new Promise((resolve, reject) => {

            try {
                const headers = arr[0];
                arr.shift();
                var transposedArray = [];
                var obj = {};
                arr.forEach((elem) => {
                    elem.forEach((atom, index) => {
                        obj[headers[index]] = atom;
                    })
                    transposedArray.push(obj);
                    obj = {};
                });
                resolve(transposedArray);
            } catch(error) {
                reject(error);
            }
        });
    }
} 