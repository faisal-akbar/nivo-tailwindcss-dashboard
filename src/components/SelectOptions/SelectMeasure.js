import React from 'react';
import Select from 'react-select';
import { regionOptions } from '../../reactSelectData/data';

const SelectMeasure = ({ changeOption }) => (
    <Select
        defaultValue={regionOptions[0]}
        label="Single select"
        options={regionOptions}
        onChange={changeOption}
        theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
                ...theme.colors,
                primary25: 'hotpink',
                primary: 'black',
            },
        })}
    />
);

export default SelectMeasure;
