import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

it('returns an error if ticket does not exist', async () => {
    const ticketId = mongoose.Types.ObjectId();

    await request(app)
        .post('api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId })
        .expect(404);
});

it('returns an error if ticket is already reserved', async () => {

});

it('returns a ticket', async () => {

});



