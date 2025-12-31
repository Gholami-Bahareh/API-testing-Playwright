const { test, expect } = require('@playwright/test');
const { BASE_URL  } = require('../config');

test('Status Code',async({request})=>{
    const response = await request.get(`${BASE_URL}/booking/1`);
    expect(response.status()).toBe(200)
    
});