const validator = (data) => {
    const required_fields = ['PORT', 'HOST'];

    for(const field of required_fields) {
        if(!(field in data)) {
            throw new Error(`required field ${field} is missing`);
        }
    }
    return true;
}

module.exports = validator;