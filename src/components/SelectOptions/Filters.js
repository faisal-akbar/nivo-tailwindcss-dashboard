import React, { useContext } from 'react';
import {
    regionOptions,
    regionOptionsLight,
    segmentOptions,
    // eslint-disable-next-line prettier/prettier
    yearOptions
} from '../../reactSelectData/data';
import { useAPI } from '../Context/apiContext';
import { ThemeContext } from '../Theme/themeContext';
import MultiSelect from './MultiSelect';
import SelectOptions from './SelectOptions';

const Filters = () => {
    const {
        setSelectedYear,
        setSelectedSegment,
        selectedSegment,
        selectedRegion,
        setSelectedRegion,
    } = useAPI();
    const { theme } = useContext(ThemeContext);
    return (
        <div className=" absolute right-0 top-14 flex flex-col space-y-3 w-96 dark:bg-gray-700 bg-gray-300 shadow-md p-2 my-3 z-20 transition-all">
            <div className="dark:text-white border-b-2 border-gray-800 dark:border-gray-100">
                Filters
            </div>
            <SelectOptions
                className="w-[90]"
                options={yearOptions}
                defaultValue={yearOptions[0]}
                filterOptions={yearOptions}
                changeFilter={setSelectedYear}
            />
            <MultiSelect
                className="w-[90]"
                filterOptions={theme === 'dark' ? regionOptions : regionOptionsLight}
                value={selectedRegion}
                setValue={setSelectedRegion}
                name="Segment"
            />
            <MultiSelect
                className="w-[90]"
                filterOptions={segmentOptions}
                value={selectedSegment}
                setValue={setSelectedSegment}
                name="Segment"
            />
        </div>
    );
};

export default Filters;
