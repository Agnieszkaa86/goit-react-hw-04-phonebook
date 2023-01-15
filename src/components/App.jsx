import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { Container } from './ContactForm/ContactForm.styled';

const LOKAL_KEY = 'contacts';

export const App = () => {
  const initiateContacts = () =>
    JSON.parse(localStorage.getItem(LOKAL_KEY)) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];

  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(initiateContacts);
  useEffect(() => {
    try {
      const initiateContacts = JSON.stringify(contacts);
      localStorage.setItem('LOKAL_KEY', initiateContacts);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }, [contacts]);

  const addNewContact = ({ name, number }) => {
    const foundContact = contacts.find(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
    if (foundContact) {
      alert(`${foundContact.name} is already in contacts`);
      return;
    } else {
      setContacts([...contacts, { name, number, id: nanoid() }]);
    }
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
