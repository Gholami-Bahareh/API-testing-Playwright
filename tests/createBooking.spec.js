const { test, expect } = require('@playwright/test');
const { randomString , randomNumber } = require('../utils/reusableMethods');
const { createValidBooking , createIncompeleteBooking } = require('../test-data/test-data');
const BookingApi = require('../api/booking.api');

test('should create booking and return booking id and details',async({request})=>{
    const body = createValidBooking();
//  const response = await request.post(`${BASE_URL}/booking`, {data: requestBody});
    const bookingApi = new BookingApi();
    const response = await bookingApi.createBooking(request, body);
    expect(response.status()).toBe(200); 
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toBeInstanceOf(Object);
    expect(typeof responseBody).toBe('object');
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking.firstname');
    expect(responseBody).toHaveProperty('booking.lastname');
    expect(responseBody).toHaveProperty('booking.totalprice');
    expect(responseBody).toHaveProperty('booking.depositpaid');
    expect(responseBody).toHaveProperty('booking.bookingdates.checkin');
    expect(responseBody).toHaveProperty('booking.bookingdates.checkout');
    expect(responseBody).toHaveProperty('booking.additionalneeds');
    expect(responseBody.booking.firstname).toBe(body.firstname);
    expect(responseBody.booking.totalprice).toBe(body.totalprice);
    expect(responseBody.booking.bookingdates.checkout).toBe(body.bookingdates.checkout);
    expect(typeof responseBody.booking.totalprice).toBe('number');
    expect(typeof responseBody.booking.depositpaid).toBe('boolean');
    expect(typeof responseBody.booking.firstname).toBe('string');

});


test('should return 500 when creating booking with incomplete request body',async({request})=>{
    const body = createIncompeleteBooking();
    const bookingApi = new BookingApi();
    const response = await bookingApi.createBooking(request, body);
    expect(response.status()).toBe(500); 

});