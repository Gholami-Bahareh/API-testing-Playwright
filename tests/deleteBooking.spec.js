    const { test, expect } = require('@playwright/test');
    const { randomNumber , randomString , tokenGenerate } = require('../utils/reusableMethods');
    const { createValidBooking } = require('../test-data/test-data');
    const BookingApi = require('../api/booking.api');

    test('should delete booking when token is valid',async({request})=>{
        const postBody = createValidBooking();

        const bookingApi = new BookingApi();

        const postResponse = await bookingApi.createBooking(request, postBody);
        expect(postResponse.status()).toBe(200); 
        const postResponseBody = await postResponse.json();
        const id = postResponseBody.bookingid;

        const token =  await tokenGenerate(request);

        const deleteResponse = await bookingApi.deleteBooking(request, id , token);
        expect(deleteResponse.status()).toBe(201);

        const getResponse = await bookingApi.getBookingById(request, id);
        expect(getResponse.status()).toBe(404) 

    });

    test('should return 403 when deleting booking with invalid token',async({request})=>{
        const postBody = createValidBooking();
        const bookingApi = new BookingApi();

        const postResponse = await bookingApi.createBooking(request, postBody);
        
        expect(postResponse.status()).toBe(200); 
        const postResponseBody = await postResponse.json();
        const id = postResponseBody.bookingid;

        const token =  123;

        const deleteResponse = await bookingApi.deleteBooking(request, id , token);
        expect(deleteResponse.status()).toBe(403);


    });

    test('should return 405 when deleting an already deleted booking',async({request})=>{
        const postBody = createValidBooking();
        const bookingApi = new BookingApi();

        const postResponse =  await bookingApi.createBooking(request, postBody);


        expect(postResponse.status()).toBe(200); 
        const postResponseBody = await postResponse.json();
        const id = postResponseBody.bookingid;

        const token =  await tokenGenerate(request);

        const deleteResponse = await bookingApi.deleteBooking(request, id , token);
        expect(deleteResponse.status()).toBe(201);

        const deleteResponse2 = await bookingApi.deleteBooking(request, id , token);
        expect(deleteResponse2.status()).toBe(405);
    });

 


