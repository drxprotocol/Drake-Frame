import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
    let accountAddress: string | undefined = '';
    let text: string | undefined = '';

    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body, { allowFramegear: true,});

    if (isValid) {
        accountAddress = message.interactor.verified_accounts[0];
    }

    console.debug(
        `message =>`, message,
        `isValid =>`, isValid,
        `accountAddress =>`, accountAddress,
    );


    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: `Refresh`,
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/api/og?address=${accountAddress || ''}`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
        }),
    );
}

export async function POST(req: NextRequest): Promise<Response> {
    console.debug(`request =>`, req);
    return getResponse(req);
}

export const dynamic = 'force-dynamic';
