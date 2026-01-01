const { test, expect } = require('@playwright/test');
const { BASE_URL  } = require('../config');

test('GetBooking_StatusCode',async({request})=>{
    const response = await request.get(`${BASE_URL}/booking/1`); ///asd how to have different ids
    expect(response.status()).toBe(200) 
});

test('GetBooking_ResponseContent',async({request})=>{
    const response = await request.get(`${BASE_URL}/booking/1`);
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
});

test('GetBooking_ResponseBodyStructure',async({request})=>{
    const id = 1
    const response = await request.get(`${BASE_URL}/booking/${id}`);  
    const body = await response.json();
    // console.log(body);
    expect(body).toBeInstanceOf(Object);  //better than below one for API 
    //expect(typeof body).toBe('object')
    expect(body).toHaveProperty('firstname');
    expect(body).toHaveProperty('lastname');
    expect(body).toHaveProperty('totalprice');
    expect(body).toHaveProperty('depositpaid');
    expect(body).toHaveProperty('bookingdates');
    expect(body).toHaveProperty('bookingdates.checkin');
    expect(body).toHaveProperty('bookingdates.checkout');
});

test.only('GetBooking_InvalidId_ShouldReturn404',async({request})=>{
    const response = await request.get(`${BASE_URL}/booking/5689423`); 
    const responseBody = await response.text();
    expect(response.status()).toBe(404) 
    //console.log(responseBody);
    expect(responseBody).toContain('Not Found');

});