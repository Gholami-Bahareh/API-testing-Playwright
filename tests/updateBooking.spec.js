    const { test, expect } = require('@playwright/test');
    const { randomNumber , randomString , tokenGenerate } = require('../utils/reusableMethods');
    const { createValidBooking } = require('../test-data/test-data');

    test('should update booking successfully using valid token',async({request})=>{
        const postBody = createValidBooking();

        const postResponse = await request.post('/booking', {data: postBody}); 
        expect(postResponse.status()).toBe(200); 
        const postResponseBody = await postResponse.json();
        const id = postResponseBody.bookingid;

        const token =  await tokenGenerate(request);

        // const putResponse = await request.put('/booking', {headers:putHeader , data: putBody}); 
        const putResponse = await request.put(`/booking/${id}`, {
            headers:{  
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Cookie': `token=${token}`
             } ,
         data:{
                    firstname:'666',
                    lastname:'666',
                    totalprice:666,
                    depositpaid:true,
                    bookingdates:{
                        checkin:"2016-06-06",
                        checkout:"2016-06-16"
                    }
                }}
            );

        expect(putResponse.status()).toBe(200);
        const putBody = await putResponse.json();
        expect(putBody.firstname).toBe('666');
        expect(putBody.lastname).toBe('666');

        const getAfterPutResponse =await request.get(`/booking/${id}`);
        const putResponseBody = await getAfterPutResponse.json();
        expect(putResponseBody.firstname).toBe('666');
        console.log(putResponseBody);
    });




