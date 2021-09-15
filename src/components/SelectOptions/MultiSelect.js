/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import chroma from 'chroma-js';
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                ? data.color
                : isFocused
                ? color.alpha(0.1).css()
                : null,
            color: isDisabled
                ? '#ccc'
                : isSelected
                ? chroma.contrast(color, 'white') > 2
                    ? 'white'
                    : 'black'
                : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
            },
        };
    },
    // multiValue: (base, state) => (state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base),
    multiValue: (styles, { data }) => {
        const color = chroma(data.color);
        return data.isFixed
            ? {
                  ...styles,
                  backgroundColor: 'gray',
              }
            : {
                  ...styles,
                  backgroundColor: color.alpha(0.5).css(),
              };
    },
    multiValueLabel: (styles, { data }) =>
        data.isFixed
            ? {
                  ...styles,
                  color: 'white',
              }
            : {
                  ...styles,
                  //   color: data.color,
                  color: 'black',
              },
    multiValueRemove: (styles, { data }) =>
        data.isFixed
            ? {
                  ...styles,
                  display: 'none',
              }
            : {
                  ...styles,
                  color: data.color,
                  ':hover': {
                      backgroundColor: data.color,
                      color: 'white',
                  },
              },
};

const selectOptions = (values) =>
    values && values.filter((v) => v.isFixed).concat(values.filter((v) => !v.isFixed));

export default function MultiSelect({ filterOptions, value, setValue, ...rest }) {
    // const [value, setValue] = useState(selectOptions([...filterOptions]));
    // console.log('value', value);
    const onChange = (value, { action, removedValue }) => {
        switch (action) {
            case 'remove-value':
            case 'pop-value':
                if (removedValue.isFixed) return;
                if (value.length === 1) value[0].isFixed = true; // <-- add the isFixed element
                break;
            case 'clear':
                value = filterOptions.filter((v) => v.isFixed);
                break;
            default:
                value.forEach((x) => (x.isFixed = false)); // <-- remove the isFixed element
                break;
        }
        value = selectOptions(value);
        setValue(value);
    };
    return (
        <div>
            <Select
                styles={colourStyles}
                components={animatedComponents}
                value={value}
                isMulti
                // isClearable={value && value.some((v) => !v.isFixed)}
                isClearable={false}
                classNamePrefix="select"
                onChange={onChange}
                options={filterOptions}
                defaultValue={filterOptions}
                {...rest}
            />
        </div>
    );
}
