import React from 'react';
import { useAPI } from '../Context/apiContext';
import StatsCardDetails from './StatsCardDetails';

const StatsCard = () => {
    const { salesKPI, profitKPI, discountKPI, orderKPI } = useAPI();

    const totalSales = Math.round(salesKPI).toLocaleString();
    const totalProfit = Math.round(profitKPI).toLocaleString();
    const totalOrder = Math.round(orderKPI).toLocaleString();
    const avgDiscount = discountKPI.toFixed(1);
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mx-10 mt-4 dark:text-gray-300">
            <StatsCardDetails metric="Sales" amount={totalSales} formatBefore="$" formatAfter="" />
            <StatsCardDetails
                metric="Profit"
                amount={totalProfit}
                formatBefore="$"
                formatAfter=""
            />
            <StatsCardDetails metric="Order" amount={totalOrder} formatBefore="$" formatAfter="" />
            <StatsCardDetails
                metric="Avg. Discount"
                amount={avgDiscount}
                formatBefore=""
                formatAfter="%"
            />
        </div>
    );
};

export default StatsCard;
