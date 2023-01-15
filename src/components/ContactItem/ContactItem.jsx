import PropTypes from 'prop-types';
import { Li, Button } from './ContactItem.styled';

export const ContactItem = ({ id, name, number, deleteItem }) => {
  return (
    <Li>
      <span>
        {name}: {number}
      </span>
      <div>
        <a href={`tel:${number}`}>
          <Button> Call</Button>
        </a>
        <Button
          type="button"
          onClick={() => {
            deleteItem(id);
          }}
        >
          Delete
        </Button>
      </div>
    </Li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
