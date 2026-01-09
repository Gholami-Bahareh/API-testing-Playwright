    const { test, expect } = require('@playwright/test');
    const { randomNumber , randomString , tokenGenerate } = require('../utils/reusableMethods');
    const { createValidBooking } = require('../test-data/test-data');

    test.only('should delete booking when token is valid',async({request})=>{
        const postBody = createValidBooking();

        const postResponse = await request.post('/booking', {data: postBody}); 
        expect(postResponse.status()).toBe(200); 
        const postResponseBody = await postResponse.json();
        const id = postResponseBody.bookingid;

        const token =  await tokenGenerate(request);

        const deleteResponse = await request.delete(`/booking/${id}`, {headers: 
            {
                // 'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }}
        );
        expect(deleteResponse.status()).toBe(201);

        const getResponse = await request.get(`/booking/${id}`);
        expect(getResponse.status()).toBe(404) 

    });

    test.only('should return 403 when deleting booking with invalid token',async({request})=>{
        const postBody = createValidBooking();
        const postResponse = await request.post('/booking', {data: postBody}); 
        expect(postResponse.status()).toBe(200); 
        const postResponseBody = await postResponse.json();
        const id = postResponseBody.bookingid;

        const token =  123;

        const deleteResponse = await request.delete(`/booking/${id}`, {headers: 
            {
                // 'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }}
        );
        expect(deleteResponse.status()).toBe(403);


    });

    test.only('should return 405 when deleting an already deleted booking',async({request})=>{
        const postBody = createValidBooking();

        const postResponse = await request.post('/booking', {data: postBody}); 
        expect(postResponse.status()).toBe(200); 
        const postResponseBody = await postResponse.json();
        const id = postResponseBody.bookingid;

        const token =  await tokenGenerate(request);

        const deleteResponse = await request.delete(`/booking/${id}`, {headers: 
            {
                // 'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }}
        );
        expect(deleteResponse.status()).toBe(201);

        const deleteResponse2 = await request.delete(`/booking/${id}`, {headers: 
            {
                // 'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }}
        );
        expect(deleteResponse2.status()).toBe(405);


    });

 


