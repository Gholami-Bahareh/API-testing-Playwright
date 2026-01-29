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


  async updateBooking(request, id, body, token) {
    throw new Error('Not implemented yet');
  }

  async deleteBooking(request, id, token) {
    throw new Error('Not implemented yet');
  }

}

module.exports = BookingApi;
