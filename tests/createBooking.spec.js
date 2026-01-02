const { test, expect } = require('@playwright/test');
const { randomString , randomNumber } = require('../utils/reusableMethods');

test('CreateBooking_ShouldReturnBookingIdAndBookingDetails',async({request})=>{
    const body = {
                firstname:randomString(5),
                lastname:"ForTest",
                totalprice:randomNumber(4),
                depositpaid:true,
                bookingdates:{
                    checkin:"2018-01-01",
                    checkout:"2018-01-11"
                },
                additionalneeds:"Brunch"
            }
//  const response = await request.post(`${BASE_URL}/booking`, {data: requestBody});
    const response = await request.post('/booking', {data: body}); 
    expect(response.status()).toBe(200); 
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toBeInstanceOf(Object);  
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking.firstname');
    expect(responseBody).toHaveProperty('booking.lastname');
    expect(responseBody).toHaveProperty('booking.totalprice');
    expect(responseBody).toHaveProperty('booking.depositpaid');
    expect(responseBody).toHaveProperty('booking.bookingdates.checkin');
    expect(responseBody).toHaveProperty('booking.bookingdates.checkout');
    expect(responseBody).toHaveProperty('booking.additionalneeds');

});


test('CreateBooking_returns500ّorIncompleteRequestBody',async({request})=>{
    const body = {
                firstname:randomString(5),
                bookingdates:{
                    checkout:"2018-01-11"
                },
                additionalneeds:"Brunch"
            }
    const response = await request.post('/booking', {data: body}); 
    expect(response.status()).toBe(500); 

});