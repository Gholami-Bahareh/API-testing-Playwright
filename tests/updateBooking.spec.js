    const { test, expect } = require('@playwright/test');
    const { randomNumber , randomString , tokenGenerate } = require('../utils/reusableMethods');

    test('Update booking: POST -> PUT -> GET flow with token',async({request})=>{
        const postBody = {
                    firstname:randomString(5),
                    lastname:"ForTest",
                    totalprice:randomNumber(4),
                    depositpaid:true,
                    bookingdates:{
                        checkin:"2018-01-01",
                        checkout:"2018-01-11"
                    }}

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
        console.log(putResponseBody);
    });




