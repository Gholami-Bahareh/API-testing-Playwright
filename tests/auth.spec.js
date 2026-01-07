const { test, expect } = require('@playwright/test');

test('should return auth token when credentials are valid',async({request})=>{
    const body = {
    "username" : "admin",
    "password" : "password123"
    }
    const response = await request.post('/auth', {data: body}); 
    expect(response.status()).toBe(200); 
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toBeInstanceOf(Object);  
    expect(responseBody).toHaveProperty('token');
});


