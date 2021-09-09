import { ResponsiveBar } from '@nivo/bar';
import moment from 'moment';
import { useContext } from 'react';
import { useAPI } from '../Context/apiContext';
import { chartThemeDark, chartThemeLight } from '../Theme/chartTheme';
import { ThemeContext } from '../Theme/themeContext';

const BarChart = () => {
    const { barChartData, initialValueObj } = useAPI();
    const { theme } = useContext(ThemeContext);

    console.log('Stacked', barChartData);
    console.log('ini Stacked', initialValueObj);
    const nivoM = [
        'rgb(232, 193, 160,0.8)',
        'rgb(244, 117, 96,0.8)',
        'rgb(241, 225, 91,0.8)',
        'rgb(232, 168, 56,0.8)',
        'rgb(97, 205, 187,0.8)',
        'rgb(151, 227, 213,0.8)',
    ];
    return (
        <>
            <h3 className="chart-title">Monthly Sales Comparison</h3>
            <ResponsiveBar
                data={barChartData}
                keys={Object.keys(initialValueObj)}
                indexBy="Order_Date"
                margin={{ top: 50, right: 120, bottom: 50, left: 80 }}
                theme={theme === 'dark' ? chartThemeDark : chartThemeLight}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                valueFormat=" >-$,d"
                // colors={{ scheme: 'nivo' }}
                colors={theme === 'dark' ? { scheme: 'paired' } : nivoM}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={
                    [
                        // {
                        //     match: {
                        //         id: 'East',
                        //     },
                        //     id: 'dots',
                        // },
                        // {
                        //     match: {
                        //         id: 'West',
                        //     },
                        //     id: 'lines',
                        // },
                    ]
                }
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Order Date',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    format: (tick) => moment(tick).format('MMM'),
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Sales',
                    legendPosition: 'middle',
                    legendOffset: -60,
                }}
                enableLabel={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                tooltip={(e) => (
                    <div className="relative">
                        <div className="tooltip">
                            <div>Region: {e.id}</div>

                            <div>Sales: {e.formattedValue}</div>
                        </div>
                        <svg className="tooltip-arrow" width="8" height="8">
                            <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
                        </svg>
                    </div>
                )}
            />
        </>
    );
};
export default BarChart;
