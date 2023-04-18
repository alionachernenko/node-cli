const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");
const contactId = nanoid();

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const data = contacts.find((contact) => contact.id === contactId);
  console.table(data || null);
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: contactId,
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.table(newContact);
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.table(result);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
