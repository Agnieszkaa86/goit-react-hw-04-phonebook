import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Form, Input } from './ContactForm.styled';

const INITIAL_STATE = {
  name: '',
  number: '',
};
class ContactForm extends Component {
  state = INITIAL_STATE;

  handleSubmit = event => {
    event.preventDefault();
    const contact = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    };
    this.props.newContact(contact);
    this.resetForm();
  };

  inputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };
  resetForm = () => {
    this.setState(INITIAL_STATE);
  };
  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <label>
            Name
            <Input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.inputChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label>
            Number
            <Input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.inputChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </Form>
      </>
    );
  }
}
ContactForm.propTypes = {
  newContact: PropTypes.func.isRequired,
};

export default ContactForm;
