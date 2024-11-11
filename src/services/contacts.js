import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filter,
  userId,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = ContactsCollection.find({ userId });

  if (typeof filter.type !== 'undefined') {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactsQuery.where('userId').equals(userId);

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

export function getContactById(contactId, userId) {
  return ContactsCollection.findOne({ _id: contactId, userId });
}

export function createContact(contactData) {
  return ContactsCollection.create(contactData);
}

export function deleteContact(contactId, userId) {
  return ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
}

export function updateContact(contactId, userId, contact) {
  return ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    contact,
    {
      new: true,
      runValidators: true,
    },
  );
}
