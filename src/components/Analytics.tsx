import Script from 'next/script';

export function Analytics() {
    const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
    const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

    if (!umamiScriptUrl || !umamiWebsiteId) {
        return null;
    }

    let validatedUrl: URL;

    try {
        validatedUrl = new URL(umamiScriptUrl);
    } catch {
        return null;
    }

    if (validatedUrl.protocol !== 'https:') {
        return null;
    }

    return (
        <Script
            src={validatedUrl.toString()}
            data-website-id={umamiWebsiteId}
            data-domains="maculewicz.pro,www.maculewicz.pro"
            strategy="afterInteractive"
        />
    );
}
