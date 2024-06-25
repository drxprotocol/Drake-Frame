import React from 'react';
import Axios from "axios";
import {generateAddressSummary} from "../../util/StringFormat";
import {NEXT_PUBLIC_URL} from "../../config";
import {defaultTimestampFormat} from "../../util/DateUtil";

export const fetchAccountData = async (address) => {
    let data = {
        address: '0xDd5364B3ae1B5465630125534Eb7E14d32154050',
        usdcBalance: '',
        impAddress: '',
        cmpAddress: '',

        tradingPnl: '1314.52',
        volumeIn24: '',
        volume: '15123.16',

        impEquity: '',
        impVolumeIn24: '',
        impVolume: '',

        cmpEquity: '',
        cmpVolumeIn24: '',
        cmpVolume: '',

        referralCode: '0bUg6uKX',
        referredSize: 5,
        referredAddress: [],
        referredPnl: '1058.79',

        feedbackBonus: 0.1,

        finalPnl: '2610.64',
        ranking: 20,

        lastUpdatedTime: new Date().getTime(),
    };
    
    if(!address){
        return data;
    }

    return {
        ...data,
        address,
    };
};

export const GenerateFrameImg = ({accountData = {}}) => {
    let summartAddress = generateAddressSummary(accountData.address, 6);
    let lastUpdatedTimeFormat = defaultTimestampFormat(accountData.lastUpdatedTime);

    return (
        <div tw="flex flex-col w-full h-full items-start bg-white justify-start"  style={{
            padding: `35px 45px`,
            fontFamily:"Switzer-Regular",
            backgroundColor: '#0f172a',
            position: `relative`,
        }}>
            <div style={{
                position: `absolute`,
                top: `70px`,
                left: `-210px`,
                zIndex: `-1`,
                width: `1337`,
                height: `1092px`,
                backgroundImage: `url(${NEXT_PUBLIC_URL}/bg_1.svg)`,
            }}></div>
            <div style={{
                position: `absolute`,
                top: `-450px`,
                right: `-200px`,
                zIndex: `-2`,
                width: `1354`,
                height: `1373`,
                backgroundImage: `url(${NEXT_PUBLIC_URL}/bg_2.svg)`,
                opacity: 0.75,
            }}></div>


            <div tw={`flex items-center justify-between w-full`}>
                <img
                    width="261"
                    height="72"
                    src={`${NEXT_PUBLIC_URL}/logo.svg`}
                />
                <img
                    width="379"
                    height="45"
                    src={`${NEXT_PUBLIC_URL}/daily_status.svg`}
                />
            </div>

            <div tw="flex w-full items-start " style={{
                marginTop: `30px`,
            }}>
                <div tw={`flex`}>
                    <img
                        width="160"
                        height="160"
                        src={`${NEXT_PUBLIC_URL}/avarta.png`}
                        style={{
                            borderRadius: `80px`,
                        }}
                    />
                </div>
                <div tw={`flex flex-col`} style={{
                    marginLeft: `32px`,
                }}>
                    <div style={{
                        color: `#fff`,
                        fontSize: `64px`,
                    }}>{summartAddress}</div>
                    <div tw={`flex`}>
                        <span style={{
                            color: `#6f748b`,
                            fontSize: `56px`,
                        }}>{`Rank:`}</span>
                        <span style={{
                            color: `#EC7FDA`,
                            fontSize: `56px`,
                        }}>{accountData.ranking}</span>
                    </div>
                </div>
            </div>


            <div tw={`flex flex-col w-full items-start justify-center`} style={{
                marginTop: `30px`,
                borderRadius: `40px`,
                border: `1px solid #334155`,
                background: `rgba(30, 41, 59, 0.89)`,
                color: `#f7fee7`,
            }}>
                <div tw={`flex items-center justify-center`} style={{
                    width: `287px`,
                    height: `90px`,
                    borderRadius: `40px 0px`,
                    border: `1px solid #334155`,
                    background: `#0F172A`,
                    fontSize: `40px`,
                }}><span>{`MY STATS`}</span></div>

                <div tw={`flex flex-col w-full`} style={{
                    padding: `0px 56px`,
                    color: `#fff`,
                    fontSize: `48px`,
                }}>
                    <div tw={`flex justify-between w-full`} style={{
                        padding: `20px 0`,
                        borderBottom: `1px solid #334155`,
                    }}>
                        <span>{`Trading PnL`}</span>
                        <span style={{
                            color: `#22c55e`,
                        }}>{`$${accountData.tradingPnl}`}</span>
                    </div>

                    <div tw={`flex justify-between w-full`} style={{
                        padding: `20px 0`,
                        borderBottom: `1px solid #334155`,
                    }}>
                        <span>{`Trading Volume`}</span>
                        <span style={{
                            color: `#22c55e`,
                        }}>{`$${accountData.volume}`}</span>
                    </div>


                    <div tw={`flex justify-between w-full`} style={{
                        padding: `20px 0`,
                        borderBottom: `1px solid #334155`,
                    }}>
                        <span>{`No. of Referee`}</span>
                        <span>{accountData.referredSize}</span>
                    </div>

                    <div tw={`flex justify-between w-full`} style={{
                        padding: `20px 0`,
                        borderBottom: `1px solid #334155`,
                    }}>
                        <span>{`Total Referee TradingPnL`}</span>
                        <span style={{
                            color: `#22c55e`,
                        }}>{`$${accountData.referredPnl}`}</span>
                    </div>


                    <div tw={`flex justify-between w-full`} style={{
                        padding: `20px 0`,
                        borderBottom: `1px solid #334155`,
                    }}>
                        <span>{`Feedback Bonus`}</span>
                        <span>{`${accountData.feedbackBonus * 100}%`}</span>
                    </div>


                    <div tw={`flex justify-between w-full`} style={{
                        padding: `20px 0`,
                    }}>
                        <span>{`Final PnL`}</span>
                        <span style={{
                            color: `#22c55e`,
                        }}>{`$${accountData.finalPnl}`}</span>
                    </div>
                </div>
            </div>


            <div tw={`flex`} style={{
                marginTop: `30px`,
                fontSize: `41px`,
                color: `#64748b`
            }}>
                <span>{`Ref Link:`}</span>
                <span style={{
                    color: `#fec600`
                }}>{`https://drake.exchange?referredCode=${accountData.referralCode}`}</span>
            </div>

            <div tw={`flex`} style={{
                marginTop: `15px`,
                fontSize: `34px`,
                color: `#64748b`
            }}>
                <span>{`Last updated (UTC): ${lastUpdatedTimeFormat}`}</span>
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