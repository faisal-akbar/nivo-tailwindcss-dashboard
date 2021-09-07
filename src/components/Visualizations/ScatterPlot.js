/* eslint-disable func-names */
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { useContext } from 'react';
import { useAPI } from '../Context/apiContext';
import { chartThemeDark, chartThemeLight } from '../Theme/chartTheme';
import { ThemeContext } from '../Theme/themeContext';

const ScatterPlot = () => {
    const { scatterChartData } = useAPI();
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <h3 className="chart-title">Profit vs Sales by Region</h3>
            <ResponsiveScatterPlot
                data={scatterChartData}
                margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                theme={theme === 'dark' ? chartThemeDark : chartThemeLight}
                xScale={{ type: 'linear', min: 0, max: 'auto' }}
                xFormat={(e) => `$${Math.round(e)}`}
                yScale={{ type: 'linear', min: 0, max: 'auto' }}
                yFormat={(e) => `$${Math.round(e)}`}
                blendMode="normal"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Sales',
                    legendPosition: 'middle',
                    legendOffset: 46,
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Profit',
                    legendPosition: 'middle',
                    legendOffset: -60,
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 130,
                        translateY: 0,
                        itemWidth: 100,
                        itemHeight: 12,
                        itemsSpacing: 5,
                        itemDirection: 'left-to-right',
                        symbolSize: 12,
                        symbolShape: 'circle',
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

export default ScatterPlot;
