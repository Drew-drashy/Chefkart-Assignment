const { faker } = require('@faker-js/faker');
const mysql = require('mysql2/promise');

(async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '@Shlok1234',
        database: 'micro_instagram',
    });

    // Insert fake users
    for (let i = 0; i < 100; i++) {
        const name = faker.person.fullName(); // Updated to faker.person
        const mobileNumber = faker.phone.number('9#########');
        const address = faker.location.streetAddress(); // Updated to faker.location
        const postCount = faker.number.int({ min: 0, max: 10 }); // Updated to faker.number

        await connection.execute(
            'INSERT INTO User (name, mobile_number, address, post_count) VALUES (?, ?, ?, ?)',
            [name, mobileNumber, address, postCount]
        );
    }

    // Insert fake posts
    for (let i = 0; i < 300; i++) {
        const title = faker.lorem.sentence();
        const description = faker.lorem.paragraph();
        const userId = faker.number.int({ min: 1, max: 100 }); // Updated to faker.number
        const images = JSON.stringify([faker.image.url()]); // Updated to faker.image

        await connection.execute(
            'INSERT INTO Post (title, description, user_id, images) VALUES (?, ?, ?, ?)',
            [title, description, userId, images]
        );
    }

    console.log('Fake data inserted successfully!');
    await connection.end();
})();
