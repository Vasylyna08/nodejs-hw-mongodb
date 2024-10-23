import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filter,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = ContactsCollection.find();

  if (typeof filter.type !== 'undefined') {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [total, contacts] = await Promise.all([
    ContactsCollection.countDocuments(contactsQuery),
    contactsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit),
  ]);

  const paginationData = calculatePaginationData(total, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

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
