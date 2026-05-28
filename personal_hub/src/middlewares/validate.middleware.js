const path = require('node:path');

exports.validateRegister = (req, res, next) => {
    const { username, password } = req.body;

    if(!username) {
        return res.status(400).json({
            message: 'username required'
        });
    }

    if(!password || password.length < 9) {
        return res.status(400).json({
            message: 'password must contain over 9 characters'
        });
    }

    next();
}

exports.validateNoteAdd = (req, res, next) => {
    const { title, body, tags } = req.body;

    if(!title || typeof title !== 'string' || title.length < 1 || title.length > 100) {
        return res.status(400).json({
            message: 'title must be string consisting of 1-100'
        });
    }

    if(!body || typeof body !== 'string' || body.length < 1 || body.length > 2000) {
       return res.status(400).json({
            message: 'body must be string consisting of 1-100'
        });
    }

    if(tags) {
        if(!Array.isArray(tags)) {
            return res.status(400).json({
                message: 'tags must be an array'
            });
        }

        for(const tag of tags) {
            if(typeof tag !== 'string' || tags.length < 1 || tags.length > 20) {
                return res.status(400).json({
                    message: 'tag/s must be string/s consisting of 1-10 characters'
                });
            }
        }

    }

    next();
}

exports.validateNoteUpdate = (req, res, next) => {
    const { title, body, tags } = req.body;

    if(!title && !body && !tags?.length) {
        return res.status(400).json({
            message: 'title/body/tags required'
        });
    }

    if(title && typeof title !== 'stirng' || title.length < 1 || title?.length > 100) {
        return res.status(400).json({
            message: 'title must be string consisting of 1-100'
        });
    }

    if(body && typeof body !== 'string' || body.length < 1 || body.length > 2000) {
       return res.status(400).json({
            message: 'body must be string consisting of 1-100'
        });
    }

    if(tags) {
        if(!Array.isArray(tags)) {
            return res.status(400).json({
                message: 'tags must be an array'
            });
        }

        for(const tag of tags) {
            if(typeof tag !== 'string' || tags.length < 1 || tags.length > 20) {
                return res.status(400).json({
                    message: 'tag/s must be string/s consisting of 1-10 characters'
                });
            }
        }

    }

    next();
}

exports.validateBookAdd = (req, res, next) => {
    const { title, author, status, rating } = req.body;

    if(!title || typeof title !== 'string' || title.length < 1 || title.length > 200) {
        return res.status(400).json({
            message: 'title must be a string consisting of 1-200 characters'
        });
    }

    if(!author || typeof author !== 'string' || author.length < 1 || author.length > 100) {
        return res.status(400).json({
            message: 'author must be a string consisting of 1-100 characters'
        });
    }
    
    if(status && status !== 'TO-READ' && status !== 'READING' && status !== 'FINISHED') {
        return res.status(400).json({
            message: 'status must be TO-READ/READING/FINISHED'
        });
    }

    if(rating !== undefined && (!Number.isFinite(rating) || rating < 1 || rating > 5)) {
        return res.status(400).json({
            message: 'rating must be an integer 1-5'
        });
    }

    next();
}

exports.validateBookUpdate = (req, res, next) => {
    const { title, author, status, rating } = req.body;

    if(!title && !author && !status && !rating) {
        return res.status(400).json({
            message: 'title/author/status/rating required'
        });  
    }

    if(title && typeof title !== 'string' || title.length < 1 || title.length > 200) {
        return res.status(400).json({
            message: 'title must be a string consisting of 1-200 characters'
        });
    }

    if(author && typeof author !== 'string' || author.length < 1 || author.length > 100) {
        return res.status(400).json({
            message: 'author must be a string consisting of 1-100 characters'
        });
    }
    
    if(status && status !== 'TO-READ' && status !== 'READING' && status !== 'FINISHED') {
        return res.status(400).json({
            message: 'status must be TO-READ/READING/FINISHED'
        });
    }

    if(rating !== undefined && (!Number.isFinite(rating) || rating < 1 || rating > 5)) {
        return res.status(400).json({
            message: 'rating can be an integer 1-5'
        });
    }

    next();
}

exports.validateHabitAdd = (req, res, next) => {
    const { name, frequency } = req.body;

    if(!name || typeof name !== 'string' || name.length < 1 || name.length > 60) {
        return res.status(400).json({
            message: 'name must be a string consisiting of 1-60 characters'
        });
    }

    if(frequency && frequency !== 'daily' && frequency !== 'weekly' && frequency !== 'monthly') {
        return res.status(400).json({
            message: 'frequency must be dayly/weekly/monthly'
        });
    }

    next();
}

exports.validateHabitUpdate = (req, res, next) => {
    const { name, frequency } = req.body;

    if(!name && !frequency) {
        return res.status(400).json({
            message: 'name/frequency required'
        });
    }

    if(name !== undefined
        && (typeof name !== 'string' 
        || name.length < 1 
        || name.length > 60)) {
        return res.status(400).json({
            message: 'name must be a string consisiting of 1-60 characters'
        });
    }

    if(frequency !== undefined 
        && (frequency !== 'daily' 
        && frequency !== 'weekly' 
        && frequency !== 'monthly')) {
        return res.status(400).json({
            message: 'frequency must be dayly/weekly/monthly'
        });
    }

    next();
}