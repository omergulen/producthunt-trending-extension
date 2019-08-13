import React from 'react';
import PropTypes from 'prop-types';
import Select from '@atlaskit/select';
import { periodOptions, findPeriod } from '../helpers/producthunt';

const PeriodSelect = ({ onChange, selectedValue }) => {
  return (
    <Select
      styles={{
        control: base => ({ ...base, backgroundColor: '#EBECF0', borderColor: '#EBECF0!important' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: isSelected ? '#da552f' : isFocused ? '#EBECF0' : '#fefefe',
            color: isSelected ? '#FFF' : '#172b4d',
            ':active': {
              backgroundColor: '#cfd0d4'
            }
          };
        },
      }}
      isSearchable={false}
      value={findPeriod(selectedValue)}
      onChange={({ value }) => onChange(value)}
      options={periodOptions}
      placeholder="Select period"
    />
  );
};

PeriodSelect.propTypes = {
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(PeriodSelect);
