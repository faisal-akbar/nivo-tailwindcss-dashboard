import { ResponsiveBar } from '@nivo/bar';
import moment from 'moment';
import { useContext } from 'react';
import { useAPI } from '../Context/apiContext';
import { chartThemeDark, chartThemeLight } from '../Theme/chartTheme';
import { ThemeContext } from '../Theme/themeContext';

const BarChart = () => {
    const { barChartData } = useAPI();
    const { theme } = useContext(ThemeContext);

    console.log('Stacked', barChartData);

    return (
        <>
            <h3 className="chart-title">Monthly Sales Comparison</h3>
            <ResponsiveBar
                data={barChartData}
                keys={['East', 'West', 'Central', 'South']}
                indexBy="Order_Date"
                margin={{ top: 50, right: 120, bottom: 50, left: 80 }}
                theme={theme === 'dark' ? chartThemeDark : chartThemeLight}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                valueFormat=" >-$,d"
                colors={{ scheme: 'nivo' }}
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
            />
        </>
    );
};
export default BarChart;
