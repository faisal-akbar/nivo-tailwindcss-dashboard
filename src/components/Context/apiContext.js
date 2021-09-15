import moment from 'moment';
import { createContext, useContext, useEffect, useState } from 'react';
import {
    categoryOptions,
    regionOptions,
    segmentOptions,
    // eslint-disable-next-line prettier/prettier
    yearOptions
} from '../../reactSelectData/data';
import {
    areaBumpDataFunc,
    barChartTopDataFunc,
    dateFormattedData,
    initialValueStackedBar,
    lineChartDataFunc,
    multiLineChartDataFunc,
    pieChartDataFunc,
    scatterChartFunc,
    scatterChartWithDimensionFunc,
    stackedBarChartDataFunc,
    // eslint-disable-next-line prettier/prettier
    uniqueArray
} from '../../utils/dataPrep';

const APIContext = createContext();

function APIContextProvider({ children }) {
    // Initialize state
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilter, setIsFilter] = useState(false);

    // Filters
    const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
    const [selectedRegion, setSelectedRegion] = useState(regionOptions);
    const [selectedSegment, setSelectedSegment] = useState(segmentOptions);
    const [selectedCategory, setSelectedCategory] = useState(categoryOptions);

    const segmentArray = selectedSegment.map((item) => item.value);
    const regionArray = selectedRegion.map((item) => item.value);
    const categoryArray = selectedCategory.map((item) => item.value);

    // Fetch data
    const getData = () => {
        fetch('data/superstore_data.json', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((d) => {
                setData(d);
                setIsLoading(false);
            })
            .then((err) => console.error(err));
    };
    useEffect(() => {
        getData();
    }, []);

    // Change the data type and date format:
    const newData = data.map((d) => {
        const properties = {
            ...d,
            Order_Date: moment(d.Order_Date).format('YYYY-MM-DD'),
            Ship_Date: moment(d.Ship_Date).format('YYYY-MM-DD'),
            Sales: +d.Sales,
            Quantity: +d.Quantity,
            Discount: +d.Discount,
            Profit: +d.Profit,
        };
        return properties;
    });

    // Filter data by Year
    const filteredData = newData.filter(
        (d) =>
            moment(d.Order_Date).startOf('year').format('YYYY') === selectedYear.value &&
            segmentArray.includes(d.Segment) &&
            regionArray.includes(d.Region) &&
            categoryArray.includes(d.Category)
    );

    // Sort data by Order Date
    const sortedData = filteredData.sort(
        (a, b) => new Date(a.Order_Date).getTime() - new Date(b.Order_Date).getTime()
    );

    // KPIs
    const salesKPI = filteredData.reduce((a, b) => a + b.Sales, 0);
    const profitKPI = filteredData.reduce((a, b) => a + b.Profit, 0);
    const discountKPI =
        (filteredData.reduce((a, b) => a + b.Discount, 0) / filteredData.length) * 100;
    const orderKPI = filteredData.reduce((a, b) => a + b.Quantity, 0);

    const dateFormatChangedData = dateFormattedData(sortedData, 'Order_Date');
    const dateFormatChangedDataAreaBump = dateFormattedData(
        sortedData,
        'Order_Date',
        'month',
        'MMM'
    );
    // Line Chart
    const latestMonthMultiLine = sortedData.filter(
        (d) => d.Order_Date.slice(0, 7) === sortedData[sortedData.length - 1].Order_Date.slice(0, 7)
    );
    const latestMonthMultiLineChartData = multiLineChartDataFunc(
        latestMonthMultiLine,
        'Region',
        'Order_Date',
        'Sales'
    );

    // Prepare Chart Data:
    const lineChartData = lineChartDataFunc(sortedData, 'Order_Date', 'Sales');
    const multiLineChartData = multiLineChartDataFunc(
        dateFormatChangedData,
        'Region',
        'Order_Date',
        'Sales'
    );
    const pieChartData = pieChartDataFunc(sortedData, 'Region', 'Sales');
    const scatterChartData = scatterChartFunc(sortedData, 'Sales', 'Profit');
    const scatterChartWithDimensionData = scatterChartWithDimensionFunc(
        sortedData,
        'Region',
        'Sales',
        'Profit'
    );
    const areaBumpData = areaBumpDataFunc(
        dateFormatChangedDataAreaBump,
        'Region',
        'Order_Date',
        'Sales'
    );

    const uniqueArrayRegion = uniqueArray(dateFormatChangedData, 'Region');
    const initialValueObj = initialValueStackedBar(uniqueArrayRegion);
    // const barChartData = stackedBarChartDataFunc(sortedData);
    const barChartData = stackedBarChartDataFunc(
        dateFormatChangedData,
        'Order_Date',
        'Region',
        'Sales',
        initialValueObj
    );
    // eslint-disable-next-line no-undef
    // const barChartTopData = barChartTopDataFunc(sortedData);
    const barChartTopData = barChartTopDataFunc(sortedData, 'Sub_Category', 'Sales');

    return (
        <APIContext.Provider
            value={{
                isLoading,
                salesKPI,
                profitKPI,
                discountKPI,
                orderKPI,
                lineChartData,
                pieChartData,
                scatterChartData,
                scatterChartWithDimensionData,
                areaBumpData,
                barChartData,
                initialValueObj,
                barChartTopData,
                multiLineChartData,
                latestMonthMultiLineChartData,
                sortedData,
                // Filter
                setSelectedYear,
                selectedSegment,
                setSelectedSegment,
                selectedRegion,
                setSelectedRegion,
                selectedCategory,
                setSelectedCategory,
                isFilter,
                setIsFilter,
            }}
        >
            {children}{' '}
        </APIContext.Provider>
    );
}

export default APIContextProvider;

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPI() {
    const context = useContext(APIContext);
    if (context === undefined) {
        throw new Error('Context must be used within a Provider');
    }
    return context;
}

// Prepare data for chart

// const grouped_items = _.groupBy(data, (b) =>
//     moment(b.modDate).startOf('month').format('YYYY/MM')
// );

// _.values(grouped_items).forEach((arr) =>
//     arr.sort((a, b) => moment(a.modDate).day() - moment(b.modDate).day())
// );

// const groupByRegion = _(filteredData).groupBy('Region').value();

// const another = _.forEach(groupByRegion, (value, key) => {
//     groupByRegion[key] = _.groupBy(groupByRegion[key], (item) =>
//         moment(item.Order_Date).startOf('month').format('YYYY-MM')
//     );
// });

// const salesByDateGroupSorted = salesByDateGroup.sort(
//     (a, b) => new Date(a.Order_Date).getTime() - new Date(b.Order_Date).getTime()
// (a, b) => moment(a.Order_Date).day() - moment(b.Order_Date).day()
// );
// .reverse();

// Multi LineChart
// Group by multiple keys (region, order date) and sum of sales:
// const monthYearData = sortedData.map((d) => {
//     const properties = {
//         ...d,
//         // Order_Date: d.Order_Date.slice(0, -3), or
//         Order_Date: moment(d.Order_Date).startOf('month').format('YYYY-MM'),
//     };
//     return properties;
// });

// const groupByRegionDate = [];

// eslint-disable-next-line no-restricted-syntax
// for (const item of monthYearData) {
//     const { Region, Order_Date, Sales } = item;
//     let group = groupByRegionDate.find((v) => v.Region === Region);
//     if (!group) groupByRegionDate.push((group = { Region, data: [] }));

//     const groupItem = group.data.find((v) => v.Order_Date === Order_Date);

//     if (!groupItem) group.data.push({ Order_Date, Sales });
//     else groupItem.Sales += Sales;
// }

// const test = groupByRegionDate.map((d) => {
//     const properties = {
//         id: d.Region,
//         data: d.data.map((p) => {
//             const prop = {
//                 x: p.Order_Date,
//                 y: p.Sales,
//             };
//             return prop;
//         }),
//     };
//     return properties;
// });

// console.log(groupByRegionDate);

// Bar Chart
// const barChartData = Object.values(
//     sortedData.reduce((r, { Order_Date, Region, Sales }) => {
//         const date = Order_Date.substr(0, 7);
//         // r[date] ??= { Order_Date: date, East: 0, South: 0, Central: 0, West: 0 };
//         // r[date][Region] += Sales;
//         // eslint-disable-next-line no-unused-expressions
//         r[date] === undefined || r[date] === null
//             ? (r[date] = { Order_Date: date, East: 0, South: 0, Central: 0, West: 0 })
//             : (r[date][Region] += Sales);
//         return r;
//     }, {})
// );
// console.log(result);
