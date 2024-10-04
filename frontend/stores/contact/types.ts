export interface Contact {
    email: string;
    number?: number;
}

export interface ContactStore {
    contacts: Array<Contact>;
}

export interface ContactApiResponse {
    data: Array<Contact>
}