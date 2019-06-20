import React from 'react';
import AppBarSelect from './AppBarSelect.js';

const dateTimeFormat = new Intl.DateTimeFormat('default', {
  year: 'numeric',
  month: 'short',
});

const MonthsSelector = ({ month, months, onChange }) => (
  <AppBarSelect
    id="month"
    label="Month"
    value={month}
    options={months.map(month => ({
      value: month,
      content: dateTimeFormat.format(new Date(month)),
    }))}
    onChange={onChange}
  />
);
export default MonthsSelector;
