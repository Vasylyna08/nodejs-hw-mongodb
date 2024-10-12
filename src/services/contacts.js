import { ContactsCollection } from '../db/models/contacts.js';

export function getAllContacts() {
  return ContactsCollection.find();
}

export function getContactById(contactId) {
  return ContactsCollection.findById(contactId);
}

export function createContact(contactData) {
  return ContactsCollection.create(contactData);
}

export function deleteContact(contactId) {
  return ContactsCollection.findByIdAndDelete(contactId);
}

export function updateContact(contactId, contact) {
  return ContactsCollection.findByIdAndUpdate(contactId, contact, {
    new: true,
  });
}
