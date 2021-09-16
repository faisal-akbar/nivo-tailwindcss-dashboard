import React from 'react';
import {
    categoryOptions,
    regionOptions,
    segmentOptions,
    // eslint-disable-next-line prettier/prettier
    yearOptions
} from '../../reactSelectData/data';
import { useAPI } from '../Context/apiContext';
import MultiSelect from './MultiSelect';
import SingleSelect from './singleSelect';

const Filters = () => {
    const {
        setSelectedYear,
        setSelectedSegment,
        selectedSegment,
        selectedRegion,
        setSelectedRegion,
        selectedCategory,
        setSelectedCategory,
    } = useAPI();

    return (
        <div className=" absolute right-0 top-14 flex flex-col space-y-3 w-[100] dark:bg-gray-700 bg-gray-300 shadow-md px-2 py-3 my-3 z-20 transition-all">
            <div className="text-gray-900 dark:text-white border-b-2 border-gray-800 dark:border-gray-100">
                Filters
            </div>
            <div className="flex flex-col divide-y-2 divide-gray-200 dark:divide-gray-600">
                <div className="mb-2">
                    <div className="text-gray-900 dark:text-white my-2 ml-1">Year</div>
                    <SingleSelect
                        className="w-96"
                        options={yearOptions}
                        defaultValue={yearOptions[0]}
                        filterOptions={yearOptions}
                        changeFilter={setSelectedYear}
                    />
                </div>
                <div className="my-2">
                    <div className="text-gray-900 dark:text-white my-2 ml-1">Region</div>
                    <MultiSelect
                        className="w-96"
                        filterOptions={regionOptions}
                        value={selectedRegion}
                        setValue={setSelectedRegion}
                        name="Region"
                    />
                </div>
                <div className="my-2">
                    <div className="text-gray-900 dark:text-white my-2 ml-1">Segment</div>
                    <MultiSelect
                        className="w-96"
                        filterOptions={segmentOptions}
                        value={selectedSegment}
                        setValue={setSelectedSegment}
                        name="Segment"
                    />
                </div>
                <div className="my-2">
                    <div className="text-gray-900 dark:text-white my-2 ml-1">Category</div>
                    <MultiSelect
                        className="w-96"
                        filterOptions={categoryOptions}
                        value={selectedCategory}
                        setValue={setSelectedCategory}
                        name="Category"
                    />
                </div>
            </div>
        </div>
    );
};

export default Filters;
