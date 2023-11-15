import React from 'react';
import { nanoid } from 'nanoid';
import { Form, Label, Button, Input } from './ContactsForm.styled';

export class ContactForm extends React.Component {
  state = {  
    name: '',
    number: '',
  };

  nameId = nanoid();
  numberId = nanoid();
  

  handleSubmit = event => {
    event.preventDefault(); 
    this.props.onSubmit({ name: this.state.name, number: this.state.number });
    this.reset();
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor={this.nameId}>
          Name
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            title=""
            required
          />
        </Label>
        <Label htmlFor={this.numberId}>
          Number
          <Input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            title=""
            required
          />
        </Label>
        <Button type="submit">Add contact </Button>
      </Form>
    );
  }
}

