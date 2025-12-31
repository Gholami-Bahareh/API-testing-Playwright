const { test, expect } = require('@playwright/test');
const { BASE_URL  } = require('../config');

test('GetBookingIds_StatusCode',async({request})=>{
    const response = await request.get(`${BASE_URL}/booking`);
    expect(response.status()).toBe(200)
});

test('GetBookingIds_ResponseBodyStructure',async({request})=>{
    const response = await request.get(`${BASE_URL}/booking`);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
});

test('GetBookingIds_ResponseContent',async({request})=>{
    const response = await request.get(`${BASE_URL}/booking`);
    const headers = response.headers();
    // console.log(header);
    // console.log(header['content-type']);
    expect(headers['content-type']).toContain('application/json');
});


