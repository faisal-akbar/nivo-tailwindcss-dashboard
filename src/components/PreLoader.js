import { css } from '@emotion/react';
import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { useAPI } from './Context/apiContext';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: none;
`;
const PreLoader = () => {
    const { isLoading } = useAPI();
    return (
        <div className="flex justify-center items-center mt-5">
            <PulseLoader color="#36D7B7" loading={isLoading} css={override} size={20} />
        </div>
    );
};

export default PreLoader;
