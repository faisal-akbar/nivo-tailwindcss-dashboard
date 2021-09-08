/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import _ from 'lodash';
import moment from 'moment';

// Date Formatter:
const dateFormatter = (date, dateFrequency = 'month', format = 'YYYY-MM') =>
    moment(date).startOf(dateFrequency).format(format);

export const dateFormattedData = (data, date, dateFrequency = 'month', format = 'YYYY-MM') => {
    const changedDateFormat = data.map((d) => {
        const properties = {
            ...d,
            // Order_Date: d.Order_Date.slice(0, -3), or
            [date]: moment(d[date]).startOf(dateFrequency).format(format),
        };
        return properties;
    });
    return changedDateFormat;
};
// ==================================SINGLE LINE CHART====================================
export const lineChartDataFunc = (data, dateDimension, measureName) => {
    const measureByDateGroup = _(data)
        // .groupBy((x) => x.Order_Date)
        .groupBy((x) => dateFormatter(x.Order_Date))
        .map((value, key) => ({ x: key, y: _.sumBy(value, measureName) }))
        .value();

    const measureByDate = [];
    const measureByDateObj = {};
    if (data.length > 0) {
        measureByDateObj.id = `${measureName} by ${dateDimension}`;
        measureByDateObj.data = measureByDateGroup.map(({ x, y }) => ({
            x,
            y,
        }));
    }
    measureByDate.push(measureByDateObj);
    return measureByDate;
};
// export const lineChartDataFunc = (data) => {
//     const salesByDateGroup = _(data)
//         // .groupBy((x) => x.Order_Date)
//         .groupBy((x) => moment(x.Order_Date).startOf('month').format('YYYY-MM'))
//         .map((value, key) => ({ Order_Date: key, Sales: _.sumBy(value, 'Sales') }))
//         .value();

//     const salesByDate = [];
//     const salesByDateObj = {};
//     if (data.length > 0) {
//         salesByDateObj.id = 'SalesByDate';
//         salesByDateObj.data = salesByDateGroup.map(({ Order_Date, Sales }) => ({
//             x: Order_Date,
//             y: Sales,
//         }));
//     }
//     salesByDate.push(salesByDateObj);
//     return salesByDate;
// };

// ==================================MULTI LINE CHART====================================

export const multiLineChartDataFunc = (data, dimensionName1, dimensionName2, measureName) => {
    const groupByMultiDimension = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const item of data) {
        const {
            [dimensionName1]: dimension1,
            [dimensionName2]: dimension2,
            [measureName]: measure,
        } = item;
        let group = groupByMultiDimension.find((v) => v.dimension1 === dimension1);
        if (!group) groupByMultiDimension.push((group = { dimension1, data: [] }));

        const groupItem = group.data.find((v) => v.dimension2 === dimension2);

        if (!groupItem) group.data.push({ dimension2, measure });
        else groupItem.measure += measure;
    }

    const multiLineChartData = groupByMultiDimension.map((d) => {
        const properties = {
            id: d.dimension1,
            data: d.data.map((p) => {
                const prop = {
                    x: p.dimension2,
                    y: p.measure,
                };
                return prop;
            }),
        };
        return properties;
    });
    return multiLineChartData;
};

// const monthYearData = sortedData.map((d) => {
//     const properties = {
//         ...d,
//         // Order_Date: d.Order_Date.slice(0, -3), or
//         Order_Date: moment(d.Order_Date).startOf('month').format('YYYY-MM'),
//     };
//     return properties;
// });

// const groupByRegionDate = [];

// // eslint-disable-next-line no-restricted-syntax
// for (const item of monthYearData) {
//     const { Region, Order_Date, Sales } = item;
//     let group = groupByRegionDate.find((v) => v.Region === Region);
//     if (!group) groupByRegionDate.push((group = { Region, data: [] }));

//     const groupItem = group.data.find((v) => v.Order_Date === Order_Date);

//     if (!groupItem) group.data.push({ Order_Date, Sales });
//     else groupItem.Sales += Sales;
// }

// const multiLineChartData = groupByRegionDate.map((d) => {
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

// ==================================PIE CHART====================================:
export const pieChartDataFunc = (data, dimensionName, measureName) => {
    const groupByDimension = _(data)
        .groupBy((x) => x[dimensionName])
        .map((value, key) => ({ id: key, value: _.sumBy(value, measureName) }))
        .value();
    return groupByDimension;
};
// export const pieChartDataFunc = (data) => {
//     const groupByRegion = _(data)
//         .groupBy((x) => x.Region)
//         .map((value, key) => ({ id: key, value: _.sumBy(value, 'Sales') }))
//         .value();
//     return groupByRegion;
// };

// ==================================STACKED BAR CHART====================================:
// eslint-disable-next-line import/prefer-default-export
export const stackedBarChartDataFunc = (data, dimensionName1, dimensionName2, measureName) => {
    const stackedBarChartData = Object.values(
        data.reduce(
            (
                r,
                {
                    [dimensionName1]: dimension1,
                    [dimensionName2]: dimension2,
                    [measureName]: measure,
                }
            ) => {
                // const date = Order_Date.substr(0, 7);

                r[dimension1] === undefined || r[dimension1] === null
                    ? (r[dimension1] = {
                          [dimensionName1]: dimension1,
                          East: 0,
                          South: 0,
                          Central: 0,
                          West: 0,
                      })
                    : (r[dimension1][dimension2] += measure);
                return r;
            },
            {}
        )
    );
    return stackedBarChartData;
};
// export const stackedBarChartDataFunc = (data) => {
//     const stackedBarChartData = Object.values(
//         data.reduce((r, { Order_Date, Region, Sales }) => {
//             const date = Order_Date.substr(0, 7);
// // r[date] ??= { Order_Date: date, East: 0, South: 0, Central: 0, West: 0 };
//             r[date] === undefined || r[date] === null
//                 ? (r[date] = { Order_Date: date, East: 0, South: 0, Central: 0, West: 0 })
//                 : (r[date][Region] += Sales);
//             return r;
//         }, {})
//     );
//     return stackedBarChartData;
// };

// ==================================AREA BUMP CHART====================================:

export const areaBumpDataFunc = (data, dimensionName1, dimensionName2, measureName) => {
    const areaBump = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const item of data) {
        const {
            [dimensionName1]: dimension1,
            [dimensionName2]: dimension2,
            [measureName]: measure,
        } = item;
        let group = areaBump.find((v) => v.dimension1 === dimension1);
        if (!group) areaBump.push((group = { dimension1, data: [] }));

        const groupItem = group.data.find((v) => v.dimension2 === dimension2);

        if (!groupItem) group.data.push({ dimension2, measure });
        else groupItem.measure += measure;
    }

    const areaBumpData = areaBump.map((d) => {
        const properties = {
            id: d.dimension1,
            data: d.data.map((p) => {
                const prop = {
                    x: p.dimension2,
                    y: p.measure,
                };
                return prop;
            }),
        };
        return properties;
    });
    return areaBumpData;
};
// export const areaBumpDataFunc = (data) => {
//     const monthData = data.map((d) => {
//         const properties = {
//             ...d,
//             // Order_Date: d.Order_Date.slice(0, -3), or
//             Order_Date: moment(d.Order_Date).startOf('month').format('MMM'),
//         };
//         return properties;
//     });
//     const areaBump = [];

//     // eslint-disable-next-line no-restricted-syntax
//     for (const item of monthData) {
//         const { Region, Order_Date, Sales } = item;
//         let group = areaBump.find((v) => v.Region === Region);
//         if (!group) areaBump.push((group = { Region, data: [] }));

//         const groupItem = group.data.find((v) => v.Order_Date === Order_Date);

//         if (!groupItem) group.data.push({ Order_Date, Sales });
//         else groupItem.Sales += Sales;
//     }

//     const areaBumpData = areaBump.map((d) => {
//         const properties = {
//             id: d.Region,
//             data: d.data.map((p) => {
//                 const prop = {
//                     x: p.Order_Date,
//                     y: p.Sales,
//                 };
//                 return prop;
//             }),
//         };
//         return properties;
//     });
//     return areaBumpData;
// };

// ==================================SCATTER CHART WITH ONE DIMENSION AND TWO MEASURE====================================:

export const scatterChartWithDimensionFunc = (data, dimensionName, measureName1, measureName2) => {
    const salesProfitScatter = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const item of data) {
        const {
            [dimensionName]: dimension,
            [measureName1]: measure1,
            [measureName2]: measure2,
        } = item;
        let group = salesProfitScatter.find((v) => v.dimension === dimension);
        if (!group) salesProfitScatter.push((group = { dimension, data: [] }));

        // const groupItem = group.data.find((v) => v.Order_Date === Order_Date);
        const groupItem = group.data;
        groupItem.push({ measure1, measure2 });
        groupItem.measure1 += measure1;
        groupItem.measure1 += measure2;
    }

    const salesProfitData = salesProfitScatter.map((d) => {
        const properties = {
            id: d.dimension,
            data: d.data.map((p) => {
                const prop = {
                    x: p.measure1,
                    y: p.measure2,
                };
                return prop;
            }),
        };
        return properties;
    });

    return salesProfitData;
};
// export const scatterChartFunc = (data) => {
//     const salesProfitScatter = [];

//     // eslint-disable-next-line no-restricted-syntax
//     for (const item of data) {
//         const { Region, Sales, Profit } = item;
//         let group = salesProfitScatter.find((v) => v.Region === Region);
//         if (!group) salesProfitScatter.push((group = { Region, data: [] }));

//         // const groupItem = group.data.find((v) => v.Order_Date === Order_Date);
//         const groupItem = group.data;
//         groupItem.push({ Sales, Profit });
//         groupItem.Sales += Sales;
//         groupItem.Profit += Profit;
//     }

//     const salesProfitData = salesProfitScatter.map((d) => {
//         const properties = {
//             id: d.Region,
//             data: d.data.map((p) => {
//                 const prop = {
//                     x: p.Sales,
//                     y: p.Profit,
//                 };
//                 return prop;
//             }),
//         };
//         return properties;
//     });

//     return salesProfitData;
// };

// ==================================SCATTER CHART WITH TWO MEASURE====================================:
export const scatterChartFunc = (data, measureName1, measureName2) => {
    const measures = [];
    const measuresObj = {};
    if (data.length > 0) {
        measuresObj.id = `${measureName1} and ${measureName2}`;
        measuresObj.data = data.map(({ [measureName1]: measure1, [measureName2]: measure2 }) => ({
            x: measure1,
            y: measure2,
        }));
    }
    measures.push(measuresObj);
    return measures;
};

// ==================================TOP 5 BAR CHART====================================:

export const barChartTopDataFunc = (data, dimensionName, measureName, top = 5) => {
    const groupByDimension = _(data)
        .groupBy((x) => x[dimensionName])
        .map((value, key) => ({ [dimensionName]: key, [measureName]: _.sumBy(value, measureName) }))
        .value();
    const dimensionSortedByMeasure = groupByDimension.sort(
        (a, b) => b[measureName] - a[measureName]
    );
    const topDimensionByMeasure = dimensionSortedByMeasure.slice(0, top).reverse();
    return topDimensionByMeasure;
};

// export const barChartTopDataFunc = (data) => {
//     const groupBySubcategory = _(data)
//         .groupBy((x) => x.Sub_Category)
//         .map((value, key) => ({ Sub_Category: key, Sales: _.sumBy(value, 'Sales') }))
//         .value();
//     const subcategorySortedBySales = groupBySubcategory.sort((a, b) => b.Sales - a.Sales);
//     const topSalesSubCategory = subcategorySortedBySales.slice(0, 5).reverse();
//     return topSalesSubCategory;
// };
