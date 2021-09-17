/* eslint-disable func-names */
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { useContext } from 'react';
import { useAPI } from '../Context/apiContext';
import { chartThemeDark, chartThemeLight } from '../Theme/chartTheme';
import { ThemeContext } from '../Theme/themeContext';

const ScatterPlot = () => {
    const { scatterChartData, sortedData } = useAPI();
    // console.log('scatter', scatterChartData);

    const { theme } = useContext(ThemeContext);

    const min = Math.min(...sortedData.map((item) => item.Sales));
    const max = Math.max(...sortedData.map((item) => item.Sales));
    // console.log('min max', min, max);

    return (
        <>
            <h3 className="chart-title">Profit vs Sales by Region</h3>

            <ResponsiveScatterPlot
                data={scatterChartData}
                margin={{ top: 30, right: 60, bottom: 60, left: 90 }}
                theme={theme === 'dark' ? chartThemeDark : chartThemeLight}
                xScale={{ type: 'linear', min: 0, max: 'auto' }}
                xFormat={(e) => `$${Math.round(e)}`}
                yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                yFormat={(e) => `$${Math.round(e)}`}
                // colors={theme === 'dark' ? getColorDark : getColorLight}
                // colors={theme === 'dark' ? { scheme: 'paired' } : { scheme: 'nivo' }}
                colors={theme === 'dark' ? ['rgb(0,196,159,0.7)'] : ['rgb(0,136,254,0.7)']}
                // colors={theme === 'dark' ? ['#00C49F'] : ['#0088FE']}
                blendMode="normal"
                nodeSize={(e) => Math.abs((e.x - min) / (max - min)) * 40}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Sales',
                    legendPosition: 'middle',
                    legendOffset: 35,
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
                legends={[]}
                tooltip={(e) => (
                    // console.log(e);
                    <div className="relative">
                        <div className="tooltip">
                            <div>Sales: {e.node.data.formattedX} </div>

                            <div>Profit: {e.node.data.formattedY}</div>
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

export default ScatterPlot;
