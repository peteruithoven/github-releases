import React from "react";
import dayjs from "dayjs";
import AppBarSelect from './AppBarSelect.js';

const MonthsSelector = ({ month, months, onChange }) => (
    <AppBarSelect
        id="month"
        label="Month"
        value={month}
        options={months.map(month => ({
            value: month,
            content: dayjs(month).format('MMM YYYY')
        }))}
        onChange={onChange}
    />
)
export default MonthsSelector;
