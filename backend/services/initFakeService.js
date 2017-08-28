const mongoose = require('mongoose'),
    userRepository = require('../repositories/userRepository'),
    usersData = [
        {
            firstName: 'Scarlett',
            lastName: 'Johansson',
            email: 'johansson@msfn.com',
            password: 'aaaaaa',
            position: 11,
            gender: 'Female',
            height: 160,
            weight: 57,
            birthday: '1984-11-22',
            activateToken: '',
            settings:  {
                weight : "kg",
                trainingWeight : "kg",
                distance : "m",
                temperature : "°C",
                timeFormat : "24-hour clock",
                dateFormat : "European (day.month.year)",
                startWeek : "Monday",
                timeZone : "+2"
            },
            userPhoto: 'https://www.looktothestars.org/photo/192-scarlett-johansson/teaser-1379520673.jpg'
        },
        {
            firstName: 'Milla',
            lastName: 'Jovovich',
            email: 'jovovich@msfn.com',
            password: 'aaaaaa',
            position: 12,
            gender: 'Female',
            height: 174,
            weight: 67,
            birthday: '1975-12-17',
            activateToken: '',
            settings:  {
                weight : "kg",
                trainingWeight : "kg",
                distance : "m",
                temperature : "°C",
                timeFormat : "24-hour clock",
                dateFormat : "European (day.month.year)",
                startWeek : "Monday",
                timeZone : "+2"
            },
            userPhoto: 'http://www.hotstarz.info/wp-content/uploads/2015/06/3528213-milla-jovovich-051-929926108-150x150.jpg'
        },
        {
            firstName: 'Jackie',
            lastName: 'Chan',
            email: 'chan@msfn.com',
            password: 'aaaaaa',
            position: 4,
            gender: 'Male',
            height: 174,
            weight: 62,
            birthday: '1954-4-7',
            activateToken: '',
            settings:  {
                weight : "kg",
                trainingWeight : "kg",
                distance : "m",
                temperature : "°C",
                timeFormat : "24-hour clock",
                dateFormat : "European (day.month.year)",
                startWeek : "Monday",
                timeZone : "+2"
            },
            userPhoto: 'https://www.looktothestars.org/photo/4718-jackie-chan/teaser-1379520542.jpg'
        },
        {
            firstName: 'Jean-Claude',
            lastName: 'Van Damme',
            email: 'vandamme@msfn.com',
            password: 'aaaaaa',
            position: 4,
            gender: 'Male',
            height: 177,
            weight: 75,
            birthday: '1960-10-18',
            activateToken: '',
            settings:  {
                weight : "kg",
                trainingWeight : "kg",
                distance : "m",
                temperature : "°C",
                timeFormat : "24-hour clock",
                dateFormat : "European (day.month.year)",
                startWeek : "Monday",
                timeZone : "+2"
            },
            userPhoto: 'http://jarviscity.com/wp-content/uploads/2016/09/lionheart-jean-claude-van-damme-150x150.jpg'
        },
        {
            firstName: 'Chuck',
            lastName: 'Norris',
            email: 'norris@msfn.com',
            password: 'aaaaaa',
            position: 2,
            gender: 'Male',
            height: 178,
            weight: 75,
            birthday: '1940-3-10',
            activateToken: '',
            settings:  {
                weight : "kg",
                trainingWeight : "kg",
                distance : "m",
                temperature : "°C",
                timeFormat : "24-hour clock",
                dateFormat : "European (day.month.year)",
                startWeek : "Monday",
                timeZone : "+2"
            },
            userPhoto: 'https://www.looktothestars.org/photo/812-chuck-norris/teaser-1379525363.jpg'
        },
        {
            firstName: 'Jared',
            lastName: 'Leto',
            email: 'leto@msfn.com',
            password: 'aaaaaa',
            position: 25,
            gender: 'Male',
            height: 180,
            weight: 70,
            birthday: '1971-12-26',
            activateToken: '',
            settings:  {
                weight : "kg",
                trainingWeight : "kg",
                distance : "m",
                temperature : "°C",
                timeFormat : "24-hour clock",
                dateFormat : "European (day.month.year)",
                startWeek : "Monday",
                timeZone : "+2"
            },
            userPhoto: 'https://www.looktothestars.org/photo/392-jared-leto/teaser-1379522441.jpg'
        },
        {
            gender: 'Female',
            email: 'jolie@msfn.com',
            password: 'aaaaaa',
            firstName: 'Angelina',
            lastName: 'Jolie',
            position: 30,
            height: 169,
            weight: 58,
            birthday: '1975-6-4',
            activateToken: '',
            settings:  {
                weight : "kg",
                trainingWeight : "kg",
                distance : "m",
                temperature : "°C",
                timeFormat : "24-hour clock",
                dateFormat : "European (day.month.year)",
                startWeek : "Monday",
                timeZone : "+2"
            },
            userPhoto: 'https://www.looktothestars.org/photo/20-angelina-jolie/teaser-1379520759.jpg'
        },
        {
            gender: 'Male',
            email: 'depp@msfn.com',
            firstName: 'John',
            lastName: 'Depp',
            height: 181,
            weight: 76,
            password: 'aaaaaa',
            birthday: '1974-11-24',
            activateToken: '',
            settings:  {
                weight : "kg",
                trainingWeight : "kg",
                distance : "m",
                temperature : "°C",
                timeFormat : "24-hour clock",
                dateFormat : "European (day.month.year)",
                startWeek : "Monday",
                timeZone : "+2"
            },
            userPhoto: 'https://www.looktothestars.org/photo/68-johnny-depp/teaser-1379520640.jpg'
        },
        {
            gender: 'Male',
            email: 'carrey@msfn.com',
            firstName: 'Jim',
            lastName: 'Carrey',
            position: 31,
            height: 189,
            weight: 80,
            password: 'aaaaaa',
            birthday: '1964-1-17',
            activateToken: '',
            settings:  {
                weight : "kg",
                trainingWeight : "kg",
                distance : "m",
                temperature : "°C",
                timeFormat : "24-hour clock",
                dateFormat : "European (day.month.year)",
                startWeek : "Monday",
                timeZone : "+2"
            },
            userPhoto: 'https://www.looktothestars.org/photo/498-jim-carrey/teaser-1379527674.jpg'
        },
        {
            firstName: 'Hugh',
            lastName: 'Jackman',
            gender: 'Male',
            position: 27,
            height: 188,
            weight: 84,
            email: 'jackman@msfn.com',
            password: 'aaaaaa',
            activateToken: '',
            settings:  {
                weight : "kg",
                trainingWeight : "kg",
                distance : "m",
                temperature : "°C",
                timeFormat : "24-hour clock",
                dateFormat : "European (day.month.year)",
                startWeek : "Monday",
                timeZone : "+2"
            },
            birthday: '1968-10-12',
            userPhoto: 'https://www.looktothestars.org/photo/7594-hugh-jackman/teaser-1379521690.jpg'
        }
    ];

module.exports = {
    generate(callback) {
        userRepository.getUserByEmail(usersData[0].email, (err, data) => {
            if (err) {
                console.log('[InitService] - Error of initialize users:');
                console.log(err);
            } else if (data === null) {
                usersData.forEach(function(element) {
                    userRepository.add(element, (error, dataUser) => {
                        if (error) {
                            console.log('[InitService] - Error of adding user:');
                            console.log(error);
                        } else {
                            console.log('[InitService] - User added');
                        }
                    });
                });
            } else {
                console.log('[InitService] - Users are available');
            }
            return callback(null, null)
        });
    }

};

