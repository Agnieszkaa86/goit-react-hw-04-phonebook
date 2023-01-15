import {Component} from "react";
import { nanoid } from "nanoid";
import ContactForm  from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";
import { Container } from './ContactForm/ContactForm.styled'

export const INITIAL_STATE = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
};

export class App extends Component {
 
  componentDidMount = () => {
    let contactsFromStorage = JSON.parse(localStorage.getItem('contacts'));
    if (contactsFromStorage === null) {
      this.setState({
        contacts: [],
      });
    } else {
      this.setState({
        contacts: contactsFromStorage,
      });
    }
  };

   componentDidUpdate = (prevProps) => {
    try {
      const contacts = JSON.stringify(this.state.contacts);
      if (prevProps.contacts !== contacts.length) {
        
      } localStorage.setItem('contacts', contacts);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };

  state = {
   ...INITIAL_STATE,
  };
  searchByName = (event) => {
    this.setState({ filter: event.target.value.toLowerCase() });
  };
   addNewContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (contacts.find(cont => cont.name === name)){
      alert(`${name} is already in contacts`)
    } else {
      this.setState({
        contacts: [...contacts, { name, number, id: nanoid() }],
      });
    }
  };
   viewContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(cont => cont.name.toLowerCase().includes(filter));
  };

  deleteContact = (id) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(cont => cont.id !== id),
    }));
  };
 
  render(){
  return (
    <>
      <Container>
        <h1>Phonebook</h1>
      <ContactForm newContact={this.addNewContact} />
      <h2>Contacts</h2>
      <Filter searchByName={this.searchByName} />
      <ContactList 
        contacts={this.viewContacts()}
        deleteItem={this.deleteContact}
      />
      </Container>
      
    </>
  );
}
}