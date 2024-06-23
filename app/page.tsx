import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
    buttons: [
        {
            label: 'Fetch my trading stats',
        },
    ],
    image: {
        src: `${NEXT_PUBLIC_URL}/api/og`,
        aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
    title: 'Drake Frame',
    description: 'Drake',
    openGraph: {
        title: 'Drake Frame',
        description: 'Drake',
        images: [`${NEXT_PUBLIC_URL}/park-1.png`],
    },
    other: {
        ...frameMetadata,
    },
};

export default function Page() {
    return (
        <>
            <h1>Welcome to Drake frames playground!</h1>
        </>
    );
}