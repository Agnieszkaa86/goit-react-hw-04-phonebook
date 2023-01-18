import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { Container } from './ContactForm/ContactForm.styled';

const CONTACTS_STORAGE_KEY = 'contacts';

export const App = () => {

   const [contacts, setContacts] = useState(()=>JSON.parse(localStorage.getItem(CONTACTS_STORAGE_KEY))|| []);
   const [filter, setFilter] = useState('');
  useEffect(() => {
    const contactsJSON = JSON.stringify(contacts);
    localStorage.setItem(CONTACTS_STORAGE_KEY, contactsJSON);
  }, [contacts]);
   

  const addNewContact = ({ name, number }) => {
    if (contacts.find(contact =>
      contact.name===name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (contacts.find(contact => contact.number === number)){
      alert(`Number ${number} already exists`);
      return;
    }
    const newContact = {
      name,
      number,
      id: nanoid()
    };
    
      setContacts([...contacts,newContact]);
    
  };

  const searchByName = event => {
    setFilter(() => event.target.value.toLowerCase());
  };
  const viewContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };
  const deleteContact = id => {
    setContacts(() => contacts.filter(contact => contact.id !== id));
  };

  return (
    <>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm newContact={addNewContact} />
        <h2>Contacts</h2>
        <Filter searchByName={searchByName} />
        <ContactList contacts={viewContacts()} deleteItem={deleteContact} />
      </Container>
    </>
  );
};
