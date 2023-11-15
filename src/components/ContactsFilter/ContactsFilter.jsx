import PropTypes from 'prop-types';
import { Div, Label, Input } from './ContactsFilter.styled';

export function Filter({value, changeFilter}) {
  return (
    <Div>
      <Label>
      Find contacts by name
      <Input type="text" value={value} onChange={changeFilter}></Input>
      </Label>
    </Div>
  )
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
