const { test, expect } = require('@playwright/test');
const { BASE_URL  } = require('../config');

test('API alive',async({request})=>{
const response = await request.get(`${BASE_URL}/ping`);
    expect(response.status()).toBe(201)
});