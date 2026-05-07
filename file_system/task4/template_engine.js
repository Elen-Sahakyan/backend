const template_filler = (content, variables) => {
    for(const [key, value] of Object.entries(variables)) {
        content = content.replace(`{{${key}}}`, value);
    }
    return content;
};

module.exports = template_filler;



