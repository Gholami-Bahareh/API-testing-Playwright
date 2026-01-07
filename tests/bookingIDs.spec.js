const { test, expect } = require('@playwright/test');

test('should return 200 when getting all booking ids',async({request})=>{
    const response = await request.get('/booking');
    expect(response.status()).toBe(200)
});

test('should return a non-empty list of booking ids',async({request})=>{
    const response = await request.get('/booking');
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
});

test('should return json content type when getting booking ids',async({request})=>{
    const response = await request.get('/booking');
    const headers = response.headers();
    // console.log(header);
    // console.log(header['content-type']);
    expect(headers['content-type']).toContain('application/json');
});


