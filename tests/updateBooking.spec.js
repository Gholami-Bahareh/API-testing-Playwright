    const { test, expect } = require('@playwright/test');
    const { randomNumber , randomString , tokenGenerate } = require('../utils/reusableMethods');
    const { createValidBooking } = require('../test-data/test-data');
    const BookingApi = require('../api/booking.api');

    test.only('should update booking successfully using valid token',async({request})=>{
        const postBody = createValidBooking();
        const bookingApi = new BookingApi();
        

        const postResponse = await bookingApi.createBooking(request , postBody)
        expect(postResponse.status()).toBe(200); 
        const postResponseBody = await postResponse.json();
        const id = postResponseBody.bookingid;

        const token =  await tokenGenerate(request);

        const updatebody = {
                    firstname:randomString(5),
                    lastname:randomString(5),
                    totalprice:randomNumber(5),
                    depositpaid:true,
                    bookingdates:{
                        checkin:"2016-06-06",
                        checkout:"2016-06-16"
                    }
                }; 

        // const putResponse = await request.put('/booking', {headers:putHeader , data: putBody}); 
        const putResponse = await bookingApi.updateBooking(request, id, updatebody, token);
        
        expect(putResponse.status()).toBe(200);
        const putBody = await putResponse.json();
        expect(putBody.firstname).toBe(updatebody.firstname);
        expect(putBody.lastname).toBe(updatebody.lastname);

        
        const getAfterPutResponse = await bookingApi.getBookingById(request, id);

        const putResponseBody = await getAfterPutResponse.json();
        expect(putResponseBody.firstname).toBe(updatebody.firstname);
        console.log(putResponseBody);
    });




