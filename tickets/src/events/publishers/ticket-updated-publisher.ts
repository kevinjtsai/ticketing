import { Publisher, Subjects, TicketUpdatedEvent } from '@kt-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}