import PropTypes from 'prop-types';
import { List, Item, Button } from './ContctsList.style';

export const ContactList = ({ contacts, deleteContact }) => (
    <List>
      {contacts.map(contact => (
        <Item key={contact.id}>
          {contact.name + ':' + contact.number }
          {
          <Button
            type="button"
            name="delete"
            onClick={() => deleteContact(contact.id)}
          >
            delete
          </Button>
        }       
        </Item>
      ))}
    </List>
  );


ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};