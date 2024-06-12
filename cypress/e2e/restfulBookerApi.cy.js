/// <reference types="cypress" />
describe('testing the api request to perform as expected', () => {
    before('should trigger the auth token', () => {
        cy.getAuthToken()
    })

    it('should make a createBooking request', () => {
        const authToken = Cypress.env('authToken')
        cy.request({
             method: 'POST',
             url:'https://restful-booker.herokuapp.com/booking',
             headers: {
                'Authorization': `Bearer ${authToken}`,
             },
             body: {
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2024-01-01",
                    "checkout" : "2025-01-01"
             }
            }
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body)
                
                const bookingid = response.body.bookingid;
                cy.log(`Booking ID: ${bookingid}`);

        cy.request({
            method: 'GET',
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            header: {
                'Authorizatiation': `Bearer ${authToken}`
            }
        }).then((getResponse) => {
            const checkinDate = getResponse.body.bookingdates.checkin
            const checkoutDate = getResponse.body.bookingdates.checkout
            expect(getResponse.status).to.eq(200);
            cy.log(getResponse.body)
            expect(getResponse.body).to.have.property('firstname', 'Jim')
            expect(getResponse.body).to.have.property('lastname', 'Brown')
            expect(getResponse.body).to.have.property('totalprice', 111)
            expect(getResponse.body).to.have.property('depositpaid', true)
            expect(checkinDate).to.eq('2024-01-01')
            expect(checkoutDate).to.eq('2025-01-01')
        })
        })
    })

    it.only('should get all the booking ids', () => {
        const authToken = Cypress.env('authToken')
        cy.request({
            method: 'GET',
            url: `https://restful-booker.herokuapp.com/booking`,
            header: {
                'Authorizatiation': `Bearer ${authToken}`
            }
        }).then((getResponse) => {
            expect(getResponse.status).to.eq(200);
            const bookingsArray = getResponse.body;
            cy.log('Bookings Array:', bookingsArray);
          });
    })
})