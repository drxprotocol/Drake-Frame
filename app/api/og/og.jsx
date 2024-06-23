import React from 'react';
import Axios from "axios";

const fetchTopOneAccountData = async () => {
    let address = `0xDd5364B3ae1B5465630125534Eb7E14d32154050`;
    try {
        let url = `http://localhost:9027/referral?address=${address}`;
        let response = await Axios.get(url);
        let data = response?.data;
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const fetchAccountData = async (address) => {
    if(!address){
        let data = await fetchTopOneAccountData();
        return data;
    }

    try {
        let url = `http://localhost:9027/referral?address=${address}`;
        let response = await Axios.get(url);
        let data = response?.data;
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const GenerateFrameImg = ({accountData = {}}) => {

    return (
        <div tw="flex flex-col w-full h-full items-center bg-white justify-center text-4xl">
            <div style={{
                fontFamily:"Switzer-Regular"
            }}>{`address: ${accountData?.address}`}</div>

            <div style={{
                fontFamily:"Switzer-Regular"
            }}>
                {`code: ${accountData?.referralCode}`}
            </div>
        </div>
    );
};

export const GenerateFailedFrameImg = () => {
    return (
        <div tw="flex flex-col w-full h-full items-center bg-white justify-center text-4xl">
            <div style={{
                fontFamily:"Switzer-Regular"
            }}>
                {`Failed to generate the image`}
            </div>
        </div>
    );
};