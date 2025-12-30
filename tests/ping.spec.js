const { test, expect } = require('@playwright/test');

test('API alive',async({request})=>{
    const response = await request.get("https://restful-booker.herokuapp.com/ping");
    expect(response.status()).toBe(201)
});