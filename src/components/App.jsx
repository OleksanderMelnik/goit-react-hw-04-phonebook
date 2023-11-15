import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactsForm/ContactsForm';
import { ContactList } from './ContactsList/ContactsList';
import { Filter } from './ContactsFilter/ContactsFilter';
import { Div, Title, TitleContact } from './App.styled';

const LOCAL_STORAGE_KEY = 'key-filter';

export class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
   filter: '',
  };


  componentDidMount() {
    const savedLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedLocalStorage !== null) {
      this.setState({
        contacts: JSON.parse(savedLocalStorage)
      })     
    };
  }
  
  componentDidUpdate( prevProps, prevState ) {

    if (prevState.contacts !== this.state.contacts) {
    localStorage.setItem(LOCAL_STORAGE_KEY , JSON.stringify(this.state.contacts));
    }
    }

  addContact = contact => {
    const isFilterContact = this.state.contacts.some(
      ({name}) => name.toLowerCase() === contact.name.toLowerCase()
    )
    if (isFilterContact) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
     
    }));
  };

  getContacts = () => {  
    const { filter, contacts } = this.state;
    const lowerContact = filter.toLowerCase()     
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerContact)
    );
  };

  filterContacts = e => {
    this.setState({ filter: e.target.value});
  }

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    
    const visibleContacts = this.getContacts(); 
    const { filter } = this.state;

    return (
      <Div>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />
        <TitleContact>Contacts</TitleContact>
        <Filter value={filter} changeFilter={this.filterContacts} />   
        <ContactList 
        contacts={visibleContacts}
        deleteContact={this.deleteContact} />
      </Div>
    );
  }
}