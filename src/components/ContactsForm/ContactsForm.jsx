import { useState } from 'react';
import { Form, Label, Button, Input } from './ContactsForm.styled';

export const ContactForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

const handleSubmit = event => {
  event.preventDefault();
  onSubmit({ name, number });
  reset();
  };

const handleChange = event => {
  const { name, value } = event.target;
  switch (name) {
    case 'name':
      setName(value);
      break;

    case 'number':
      setNumber(value);
      break;

    default:
      return;
  };
}
  const reset = () => {
    setName('');
    setNumber('');
  };
    return (
      <Form onSubmit={handleSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            title=""
            required
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            title=""
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }


