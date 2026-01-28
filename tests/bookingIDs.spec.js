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
    expect(typeof headers).toBe('object');
    console.log(headers);
    expect(headers['content-type']).toContain('application/json'); 
    //I verify that the API response is returned as JSON.
    //«این endpoint قول داده جوابش JSON باشه یا نه؟» 
});


