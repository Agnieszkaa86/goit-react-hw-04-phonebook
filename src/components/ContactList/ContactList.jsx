import { ContactItem } from 'components/ContactItem/ContactItem';
import PropTypes from 'prop-types';
import { Ul } from './ContactList.styled';

export const ContactList = ({ contacts, deleteItem }) => {
  return (
    <div>
      {contacts.length > 0 ? (
        <Ul>
          {contacts.map(({ id, name, number }) => (
            <ContactItem
              key={id}
              id={id}
              name={name}
              number={number}
              deleteItem={deleteItem}
            />
          ))}
        </Ul>
      ) : (
        <p>No contacts available</p>
      )}
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteItem: PropTypes.func.isRequired,
};
