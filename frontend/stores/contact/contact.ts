import type {ContactApiResponse, ContactStore, Contact} from "~/stores/contact/types";
import {useApi} from "~/composables/useApi";

const defaultContact: ContactStore = {
    contacts: [],
};

const api = useApi();

export const contactStore = defineStore('contact', {
    state: () => defaultContact,
    actions: {
        async getContact(user: Contact) {

            const response = await api.post<ContactApiResponse>('/contacts', user)
            this.contacts = response.data.data;
        }
    }
})