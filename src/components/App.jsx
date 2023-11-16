import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactsForm/ContactsForm';
import { ContactList } from './ContactsList/ContactsList';
import { Filter } from './ContactsFilter/ContactsFilter';
import { Div, Title, TitleContact } from './App.styled';

const LOCAL_STORAGE_KEY = 'key-filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) ?? 
    [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    contacts.filter(contact =>
      contact.name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
      contact.number.trim() === newContact.number.trim()
    ).length
      ? alert(`${newContact.name}: is already in contacts`)
      : setContacts([newContact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filterContacts = event => {
    setFilter(event.currentTarget.value.toLowerCase());
  };

  const visibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Div>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />
      <TitleContact>Contacts</TitleContact>
      <Filter value={filter} changeFilter={filterContacts} />   
      <ContactList 
      contacts={visibleContacts()}
      deleteContact={deleteContact} />
    </Div>
  );
}
