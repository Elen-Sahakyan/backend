const data_modifier = (data) => {
    const obj = {};
    
    for(const key in data) {
        let res = key.split('_');
        
        for(let i = 1; i < res.length; ++i) {
            const str = res[i];
            res[i] = str.charAt(0).toUpperCase() + str.slice(1);
        }

        res = res.join('');
        obj[res] = data[key];
    }

    return obj;
}

module.exports = data_modifier;