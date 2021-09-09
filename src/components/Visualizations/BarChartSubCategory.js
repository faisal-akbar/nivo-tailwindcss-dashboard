import { ResponsiveBar } from '@nivo/bar';
import { useContext } from 'react';
import { useAPI } from '../Context/apiContext';
import { chartThemeDark, chartThemeLight } from '../Theme/chartTheme';
import { ThemeContext } from '../Theme/themeContext';

const BarChartSubCategory = () => {
    const { barChartTopData } = useAPI();
    console.log(barChartTopData);
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <h3 className="chart-title">Top 5 Sub Categories Sales</h3>
            <ResponsiveBar
                data={barChartTopData}
                keys={['Sales']}
                indexBy="Sub_Category"
                margin={{ top: 50, right: 60, bottom: 70, left: 90 }}
                theme={theme === 'dark' ? chartThemeDark : chartThemeLight}
                padding={0.3}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                valueFormat=" >-$,d"
                colors={theme === 'dark' ? ['#B07AA1'] : ['#7873C0']}
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
                    legend: 'Sales',
                    legendPosition: 'middle',
                    legendOffset: 46,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Sub Category',
                    legendPosition: 'middle',
                    legendOffset: -65,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[]}
                tooltip={(e) => {
                    console.log(e);
                    return (
                        <div className="relative">
                            <div className="tooltip">
                                <div>Sub Category: {e.indexValue}</div>

                                <div>Sales: {e.formattedValue}</div>
                            </div>
                            <svg className="tooltip-arrow" width="8" height="8">
                                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
                            </svg>
                        </div>
                    );
                }}
            />
        </>
    );
};
export default BarChartSubCategory;
