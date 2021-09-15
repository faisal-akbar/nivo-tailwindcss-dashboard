import { ResponsiveBar } from '@nivo/bar';
import moment from 'moment';
import { useContext } from 'react';
import { useAPI } from '../Context/apiContext';
import { chartThemeDark, chartThemeLight } from '../Theme/chartTheme';
import { ThemeContext } from '../Theme/themeContext';

const StackedBarChart = () => {
    const { barChartData, initialValueObj } = useAPI();
    const { theme } = useContext(ThemeContext);

    console.log('Stacked', barChartData);
    console.log('ini Stacked', initialValueObj);

    const colorsLight = {
        East: 'rgb(232, 193, 160,0.8)',
        West: 'rgb(244, 117, 96,0.8)',
        Central: 'rgb(241, 225, 91,0.8)',
        South: 'rgb(232, 168, 56,0.8)',
    };
    const colorsDark = {
        East: 'rgb(166, 206, 227,0.6)',
        West: 'rgb(29, 111, 166,0.6)',
        Central: 'rgb(164, 207, 127,0.6)',
        South: 'rgb(51, 160, 44,0.6)',
    };
    const getColorLight = (bar) => colorsLight[bar.id];
    const getColorDark = (bar) => colorsDark[bar.id];
    return (
        <>
            <h3 className="chart-title">Monthly Sales Comparison</h3>
            <ResponsiveBar
                data={barChartData}
                keys={Object.keys(initialValueObj)}
                indexBy="Order_Date"
                margin={{ top: 50, right: 60, bottom: 60, left: 80 }}
                theme={theme === 'dark' ? chartThemeDark : chartThemeLight}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                valueFormat=" >-$,d"
                // colors={{ scheme: 'nivo' }}
                colors={theme === 'dark' ? getColorDark : getColorLight}
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
                    legend: 'Month of Order Date',
                    legendPosition: 'middle',
                    legendOffset: 35,
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
                legends={[]}
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
export default StackedBarChart;
