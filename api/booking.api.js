const { test } = require('@playwright/test');

class BookingApi {

  async createBooking(request, body) {
    const response = await request.post('/booking', {data: body}); 
    return response;
  }

  async getBookingById(request, id) {
    const response = await request.get(`/booking/${id}`);
    return response;
  }

  async updateBooking(request, id, body , token ) {
    const response = await request.put(`/booking/${id}`, {
            headers:{  
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Cookie': `token=${token}`
             } , data: body
            });
    return response;
  }

  async deleteBooking(request, id, token) {
    const response = await request.delete(`/booking/${id}`,{headers:
      {
        'Cookie': `token=${token}`
      }});
    return response;
  }

}

module.exports = BookingApi;
