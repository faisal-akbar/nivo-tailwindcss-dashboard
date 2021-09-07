import { ResponsiveAreaBump } from '@nivo/bump';
import { useContext } from 'react';
import { useAPI } from '../Context/apiContext';
import { chartThemeDark, chartThemeLight } from '../Theme/chartTheme';
import { ThemeContext } from '../Theme/themeContext';

const AreaBump = () => {
    const { areaBumpData } = useAPI();
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <h3 className="chart-title">Sales by Region Over Month</h3>
            <ResponsiveAreaBump
                data={areaBumpData}
                margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                theme={theme === 'dark' ? chartThemeDark : chartThemeLight}
                spacing={8}
                colors={{ scheme: 'nivo' }}
                blendMode="normal"
                fillOPacity={0.1}
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
                fill={[
                    {
                        match: {
                            id: 'CoffeeScript',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'TypeScript',
                        },
                        id: 'lines',
                    },
                ]}
                startLabel="id"
                axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -36,
                }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
            />
        </>
    );
};
export default AreaBump;
