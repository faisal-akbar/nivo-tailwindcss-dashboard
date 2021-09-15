import React from 'react';
import Select from 'react-select';

const SingleSelect = ({ defaultValue, filterOptions, changeFilter, ...rest }) => (
    <Select
        defaultValue={defaultValue}
        label="Single select"
        options={filterOptions}
        onChange={changeFilter}
        theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
                ...theme.colors,
                primary25: 'hotpink',
                primary: 'black',
            },
        })}
        {...rest}
    />
);

export default SingleSelect;
