const { randomString , randomNumber } = require('../utils/reusableMethods');

function createValidBooking(){
    return {
        firstname: randomString(5),
        lastname: randomString(7),
        totalprice: randomNumber(4),
        depositpaid: true,
        bookingdates: {
            checkin: "2023-01-01",
            checkout: "2023-01-10"
        },
        additionalneeds: randomString(7)
    };
};

function createIncompeleteBooking(){
    return {
        firstname: randomString(5),
        totalprice: randomNumber(4),
        depositpaid: true,
        bookingdates: {
            checkout: "2023-01-10"
    }};

};

module.exports = { createValidBooking, createIncompeleteBooking };