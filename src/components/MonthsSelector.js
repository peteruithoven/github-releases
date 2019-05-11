import React from "react";
import dayjs from "dayjs";
import AppBarSelect from './AppBarSelect.js';

const MonthsSelector = ({ month, months, onChange }) => (
    <form>
        <AppBarSelect
            id="month"
            label="Within"
            value={month}
            options={months.map(month => ({
                value: month,
                content: dayjs(month).format('MMM YYYY')
            }))}
            onChange={onChange}
        />
    </form>
)
export default MonthsSelector;
