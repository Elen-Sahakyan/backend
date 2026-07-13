const userService = require('../src/services/user.service');
const {
    ORGANIZER_EMAIL,
    ORGANIZER_PASSWORD
} = require('../config/env');

const createDefaultOrganizer = async () => {
    const organizer = await userService.findOrganizer();

    if(organizer) return;

    const superOrganizerData = {
        name: 'Organizer',
        email: ORGANIZER_EMAIL,
        password: ORGANIZER_PASSWORD,
        role: 'organizer'
    }

    await userService.registerUser(superOrganizerData);
}

module.exports = createDefaultOrganizer;