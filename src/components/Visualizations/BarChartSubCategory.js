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
                margin={{ top: 50, right: 60, bottom: 50, left: 80 }}
                theme={theme === 'dark' ? chartThemeDark : chartThemeLight}
                padding={0.3}
                layout="horizontal"
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
                    legend: 'Sales',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Sub Category',
                    legendPosition: 'middle',
                    legendOffset: -60,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[]}
            />
        </>
    );
};
export default BarChartSubCategory;
