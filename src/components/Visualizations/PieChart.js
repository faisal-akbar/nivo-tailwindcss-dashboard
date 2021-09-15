/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
import { ResponsivePie } from '@nivo/pie';
import { useContext } from 'react';
import { getColorDark, getColorLight } from '../../utils/chartColor';
import { useAPI } from '../Context/apiContext';
import { ThemeContext } from '../Theme/themeContext';

const PieChart = () => {
    const { pieChartData } = useAPI();

    const { theme } = useContext(ThemeContext);

    return (
        <>
            <h3 className="chart-title">Sales in Each Region</h3>
            <ResponsivePie
                data={pieChartData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                valueFormat=" >-$,d"
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={0}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={theme === 'dark' ? `#fff` : `#333`}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                colors={theme === 'dark' ? getColorDark : getColorLight}
                // colors={theme === 'dark' ? { scheme: 'paired' } : { scheme: 'nivo' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={[
                    {
                        match: {
                            id: 'ruby',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'c',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'go',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'python',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'scala',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'lisp',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'elixir',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'javascript',
                        },
                        id: 'lines',
                    },
                ]}
                legends={[]}
                tooltip={(e) => (
                    // console.log(e);
                    <div className="relative">
                        <div className="tooltip">
                            <div>Region: {e.datum.id}</div>
                            <div>Sales: {e.datum.formattedValue}</div>
                        </div>
                        <svg className="tooltip-arrow" width="8" height="8">
                            <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
                        </svg>
                    </div>
                )}
                onClick={(n, e) => console.log(n, e)}
            />
        </>
    );
};
export default PieChart;
