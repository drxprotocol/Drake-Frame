import React from 'react';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import {GenerateFrameImg, GenerateFailedFrameImg, fetchAccountData} from './og';
import { NEXT_PUBLIC_URL } from '../../config';

const defaultGenerateOption = {
    width: 1200,
    height: 1200,
};

let generateOptionCache = null;
const buildGenerateOption = async () => {
    if(generateOptionCache){
        return generateOptionCache;
    }

    let SwitzerFontData = await fetch(
        new URL(`${NEXT_PUBLIC_URL}/font/Switzer/Switzer-Regular.ttf`, import.meta.url),
    ).then((res) => res.arrayBuffer());
    let SpaceGroteskBoldFontData = await fetch(
        new URL(`${NEXT_PUBLIC_URL}/font/SpaceGrotesk/SpaceGrotesk-SemiBold-BF65712b4fe55fc.ttf`, import.meta.url),
    ).then((res) => res.arrayBuffer());

    let fonts = [
        {
            name: 'Switzer-Regular',
            data: SwitzerFontData,
            style: 'normal',
        },
        {
            name: 'SpaceGrotesk-Bold',
            data: SpaceGroteskBoldFontData,
            style: 'normal',
        },
    ];

    generateOptionCache = {
        ...defaultGenerateOption,
        fonts: fonts,
    };

    return generateOptionCache;
};

export async function GET(request: NextRequest) {
    try {
        let { searchParams } = request.nextUrl;
        let address = searchParams.get('address');

        let accountData = await fetchAccountData(address);

        let generateOption = await buildGenerateOption();
        return new ImageResponse(
            (
                <GenerateFrameImg accountData={accountData} />
            ),
            generateOption,
        );
    } catch (e) {
        console.error(e);

        return new ImageResponse(
            (
                <GenerateFailedFrameImg />
            ),
            defaultGenerateOption,
        );
    }

}