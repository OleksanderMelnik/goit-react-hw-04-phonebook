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
  
  const addContact = contact => {
    const isFilterContact = contacts.some(
      ({ name }) => name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );
        if (isFilterContact) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...contact },
    ]);
  };

  const filterContacts = event => {
    setFilter(event.target.value.trim());
  };

  const visibleContacts = () => {
    const lowerContact = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerContact)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
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
