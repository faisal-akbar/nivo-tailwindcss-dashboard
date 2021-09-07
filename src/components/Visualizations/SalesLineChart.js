import { ResponsiveLine } from '@nivo/line';
import moment from 'moment';
import React, { useContext } from 'react';
import { useAPI } from '../Context/apiContext';
import { chartThemeDark, chartThemeLight } from '../Theme/chartTheme';
import { ThemeContext } from '../Theme/themeContext';

const SalesLineChart = () => {
    const { lineChartData } = useAPI();
    const customDate = (date, format = 'MMM DD, YY') => moment(date).format(format);
    // console.log(customDate);
    // console.log('group by region and d', test);

    const { theme } = useContext(ThemeContext);
    return (
        <>
            <h3 className="chart-title">Monthly Sales</h3>
            <ResponsiveLine
                data={lineChartData}
                margin={{ top: 50, right: 60, bottom: 90, left: 60 }}
                theme={theme === 'dark' ? chartThemeDark : chartThemeLight}
                // For Date field use following instead of xScale Point
                // xScale={{ type: 'time', format: '%Y-%m-%d' }}
                // xFormat="time:%Y-%m-%d"
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Order Date',
                    legendOffset: 70,
                    legendPosition: 'middle',
                    // For Date field use these additional properties
                    // tickValues: 'every 7 day',
                    // tickValues: 'every month',
                    // format: (tick) => moment(tick).format('MMM DD, YY'),
                    format: (tick) => moment(tick).format('MMM'),
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Sales',
                    legendOffset: -50,
                    legendPosition: 'middle',
                    // labelFormat: '.0s',
                    format: (d) => `${d / 1000}K`,
                }}
                enableSlices="x"
                sliceTooltip={({ slice }) => {
                    const date = slice.points[0].data.xFormatted;
                    console.log(date);
                    return (
                        <div className="relative">
                            <div className="absolute top-0 z-10 w-64 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-1/2 -translate-y-full bg-gray-600 rounded-lg shadow-lg">
                                <div>Month: {customDate(date, 'MMM, YY')}</div>
                                {slice.points.map((point) => (
                                    <div>Sales: {point.data.yFormatted}</div>
                                ))}
                            </div>
                            <svg
                                className="absolute z-10 w-6 h-6 text-gray-600 transform -translate-x-1/2 -translate-y-3 fill-current stroke-current"
                                width="8"
                                height="8"
                            >
                                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
                            </svg>
                        </div>
                    );
                }}
                color={{ scheme: 'category10' }}
                pointSize={6}
                pointColor={{ from: 'color', modifiers: [] }}
                pointBorderWidth={1}
                pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                pointLabelYOffset={-12}
                enableCrosshair={false}
                useMesh
                legends={[]}
            />
        </>
    );
};

export default SalesLineChart;
