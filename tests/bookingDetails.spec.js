const { test, expect } = require('@playwright/test');
const { createValidBooking } = require('../test-data/test-data');

test    ('should return 200 when getting an existing booking by id',async({request})=>{
    const body = createValidBooking();
    const postResponse = await request.post('/booking', {data: body});
    const postResponseBody = await postResponse.json();
    const id = postResponseBody.bookingid;
    console.log(id);
    const response = await request.get(`/booking/${id}`); 
    expect(response.status()).toBe(200) 
});

test('should return json content type when getting a booking',async({request})=>{
    const body = createValidBooking();
    const postResponse = await request.post('/booking', {data: body});
    const postResponseBody = await postResponse.json();
    const id = postResponseBody.bookingid;
    const response = await request.get(`/booking/${id}`); 
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
});

test('should return booking details with correct structure when booking exists',async({request})=>{
    const id = 11
    const response = await request.get(`/booking/${id}`);  //the best, scalable
    // const response = await request.get('/booking/'+id); //ok but kind of old
    // const response = await request.get('/booking/'+`${id}`); //the worst!
    const body = await response.json();
    expect(body).toBeInstanceOf(Object);  //better than below one for API 
    //expect(typeof body).toBe('object')
    expect(body).toHaveProperty('firstname');
    expect(body).toHaveProperty('lastname');
    expect(body).toHaveProperty('totalprice');
    expect(body).toHaveProperty('depositpaid');
    expect(body).toHaveProperty('bookingdates');
    expect(body).toHaveProperty('bookingdates.checkin');
    expect(body).toHaveProperty('bookingdates.checkout');
});

test('should return 404 when booking id does not exist',async({request})=>{
    const response = await request.get('/booking/5689423'); 
    const responseBody = await response.text();
    expect(response.status()).toBe(404) 
    //console.log(responseBody);
    expect(responseBody).toContain('Not Found');

});