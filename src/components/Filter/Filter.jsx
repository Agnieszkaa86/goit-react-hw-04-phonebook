import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './Filter.styled';

export function Filter({ searchByName }) {
  return (
    <label>
      Find contacts by name
      <Input name="filter" type="text" onChange={searchByName} />
    </label>
  );
}
Filter.propTypes = {
  searchByName: PropTypes.func.isRequired,
};
