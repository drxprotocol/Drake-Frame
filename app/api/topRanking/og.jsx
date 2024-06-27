import React from 'react';
import Axios from "axios";
import {generateAddressSummary} from "../../util/StringFormat";
import {NEXT_PUBLIC_URL} from "../../config";
import {defaultTimestampFormat} from "../../util/DateUtil";
import {numberFormatAndGetApprox} from "../../util/NumberFormat";

export const fetchTopFiveRankingData = async () => {
    try {
        let url = `https://staging.drake.exchange/drx-api/pnlRanking/top`;
        let response = await Axios.get(url);
        let data = response?.data || [];

        data = data.map(pnlRanking => {
            let { result: finalPnlFormat } = numberFormatAndGetApprox(pnlRanking.finalPnl, 2);
            return {
                ...pnlRanking,
                finalPnlFormat,
            }
        });

        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const RankIcon = ({ranking}) => {
    return (<div style={{
        width: `48px`,
        height: `48px`,
        backgroundImage: `url(${NEXT_PUBLIC_URL}/ic_ranking_${ranking}.svg)`,
    }}></div>);
};

export const GenerateFrameImg = ({rankingData = []}) => {
    let lastUpdatedTimeFormat = rankingData.length ? defaultTimestampFormat(rankingData[0].lastUpdatedTime) : '';

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
                zIndex: -1,
                width: `1337`,
                height: `1092px`,
                backgroundImage: `url(${NEXT_PUBLIC_URL}/bg_1.svg)`,
            }}></div>
            <div style={{
                position: `absolute`,
                top: `-450px`,
                right: `-200px`,
                zIndex: -2,
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


            <div tw={`flex flex-col w-full items-start justify-center`} style={{
                marginTop: `100px`,
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
                }}><span>{`TOP 5 RANK`}</span></div>

                <div tw={`flex flex-col w-full`} style={{
                    padding: `0px 56px`,
                    color: `#fff`,
                    fontSize: `48px`,
                }}>


                    <div tw={`flex justify-between w-full`} style={{
                        padding: `20px 0`,
                        color: `#64748b`
                    }}>
                        <div style={{
                            width: '50px'
                        }}>{`#`}</div>
                        <div style={{
                            width: '300px'
                        }}>{`Address`}</div>
                        <div style={{
                            width: '150px'
                        }}>{`No. of Referee`}</div>
                        <div style={{
                            width: '250px'
                        }}>{`Final PnL`}</div>
                    </div>


                    {rankingData.map((pnlRanking, index) => {
                        return (
                            <div tw={`flex justify-between w-full`} style={{
                                padding: `20px 0`,
                                color: `#ffffff`
                            }} key={index}>
                                <div style={{
                                    display: 'flex',
                                    width: '50px'
                                }}>{index < 3 ? <RankIcon ranking={pnlRanking.ranking} /> : `${pnlRanking.ranking}`}</div>
                                <div style={{
                                    width: '300px'
                                }}>{`${generateAddressSummary(pnlRanking.address, 6)}`}</div>
                                <div style={{
                                    width: '150px'
                                }}>{`${pnlRanking.referredSize}`}</div>
                                <div style={{
                                    width: '250px',
                                    color: '#22c55e',
                                }}>{`$${pnlRanking.finalPnlFormat}`}</div>
                            </div>
                        );
                    })}

                </div>
            </div>

            <div tw={`flex`} style={{
                marginTop: `85px`,
                fontSize: `34px`,
                color: `#64748b`
            }}>
                <span>{lastUpdatedTimeFormat ? `Last updated (UTC): ${lastUpdatedTimeFormat}` : ''}</span>
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