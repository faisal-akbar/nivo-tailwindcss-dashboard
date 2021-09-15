import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-resizable/css/styles.css';
import { useAPI } from './Context/apiContext';
import PreLoader from './PreLoader';
import Filters from './SelectOptions/Filters';
import AreaBump from './Visualizations/AreaBump';
import BarChart from './Visualizations/BarChart';
import MultiLineChartLatestMonth from './Visualizations/MultiLineChartLatestMonth';
// import LineChart from './Visualizations/LineChart';
import PieChart from './Visualizations/PieChart';
import ScatterPlot from './Visualizations/ScatterPlot';
import StackedBarChart from './Visualizations/StackedBarChart';

// Handles the responsive nature of the grid
const ResponsiveGridLayout = WidthProvider(Responsive);
// Determines the screen breakpoints for the columns
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 320 };
// How many columns are available at each breakpoint
const cols = { lg: 4, md: 4, sm: 1, xs: 1, xxs: 1 };

const Dashboard = () => {
    const { isLoading, isFilter } = useAPI();

    // eslint-disable-next-line no-unused-expressions
    // theme === 'dark' ? setSelectedRegion(regionOptions) : setSelectedRegion(regionOptionsLight);

    return (
        <div>
            {isFilter && <Filters />}
            {/* <StatsCard/> */}
            {!isLoading ? (
                <ResponsiveGridLayout className="my-5 mx-8" breakpoints={breakpoints} cols={cols}>
                    {/* <div data-grid={{ x: 0, y: 0, w: 2, h: 3 }}>
                        <StatsCard />
                    </div> */}
                    {/* <div className="chart-card" key="1" data-grid={{ x: 0, y: 0, w: 2, h: 3 }}>
                        <LineChart />
                    </div> */}

                    <div className="chart-card" key="1" data-grid={{ x: 0, y: 0, w: 2, h: 3 }}>
                        <PieChart />
                    </div>
                    {/* <div className="chart-card" key="2" data-grid={{ x: 2, y: 0, w: 2, h: 3 }}>
                        <MultiLineChart />
                    </div> */}
                    <div className="chart-card" key="2" data-grid={{ x: 2, y: 0, w: 2, h: 3 }}>
                        <MultiLineChartLatestMonth />
                    </div>
                    <div className="chart-card" key="3" data-grid={{ x: 0, y: 2, w: 2, h: 3 }}>
                        <AreaBump />
                    </div>
                    <div className="chart-card" key="4" data-grid={{ x: 2, y: 2, w: 2, h: 3 }}>
                        <StackedBarChart />
                    </div>
                    <div className="chart-card" key="5" data-grid={{ x: 0, y: 3, w: 2, h: 3 }}>
                        <ScatterPlot />
                    </div>
                    <div className="chart-card" key="6" data-grid={{ x: 2, y: 3, w: 2, h: 3 }}>
                        <BarChart />
                    </div>
                </ResponsiveGridLayout>
            ) : (
                <PreLoader />
            )}
        </div>
    );
};

export default Dashboard;
