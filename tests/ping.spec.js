const { test, expect } = require('@playwright/test');

test('API alive',async({request})=>{
    const response = await request.get('/ping');
    expect(response.status()).toBe(201)
});