const { test, expect } = require('@playwright/test');

test('should return 201 when api health check is called',async({request})=>{
    const response = await request.get('/ping');
    expect(response.status()).toBe(201)
});