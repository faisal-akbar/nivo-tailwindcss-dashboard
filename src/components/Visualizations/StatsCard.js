import React from 'react';
import { useAPI } from '../Context/apiContext';

const StatsCard = () => {
    const { salesKPI, profitKPI, discountKPI, orderKPI } = useAPI();
    return (
        <div className="grid sm:grid-cols-4 gap-6 mx-10 mt-4 dark:text-gray-300">
            <div className="chart-card flex flex-col justify-center items-center ">
                <div className="text-2xl mb-2 ">Sales</div>
                <h2 className="font-bold text-3xl mb-2">
                    ${Math.round(salesKPI).toLocaleString()}
                </h2>
            </div>
            <div className="chart-card flex flex-col justify-center items-center">
                <div className="text-2xl mb-2">Profit</div>
                <h2 className="font-bold text-3xl mb-2">
                    ${Math.round(profitKPI).toLocaleString()}
                </h2>
            </div>
            <div className="chart-card flex flex-col justify-center items-center">
                <div className="text-2xl mb-2">Order</div>
                <h2 className="font-bold text-3xl mb-2">
                    #{Math.round(orderKPI).toLocaleString()}
                </h2>
            </div>
            <div className="chart-card flex flex-col justify-center items-center">
                <div className="text-2xl mb-2">Discount</div>
                <h2 className="font-bold text-3xl mb-2">{discountKPI.toFixed(2)}%</h2>
            </div>
        </div>
    );
};

export default StatsCard;
