import React from 'react';

const StatsCardDetails = ({ metric, amount, formatBefore, formatAfter }) => (
    <div className="chart-card flex flex-col justify-center items-center ">
        <div className="text-2xl mb-2 ">{metric}</div>
        <h2 className="font-bold text-3xl mb-2">
            {formatBefore}
            {amount}
            {formatAfter}
        </h2>
    </div>
);

export default StatsCardDetails;
