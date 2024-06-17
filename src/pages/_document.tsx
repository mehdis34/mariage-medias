import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html lang="fr">
            <Head/>
            <body style={{
                overflowY: 'scroll'
            }}>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
