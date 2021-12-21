import { Publisher, Subjects, TicketCreatedEvent } from '@kt-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}