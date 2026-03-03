"use client";

export function Analytics() {
    const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://umami.maculewicz.pro/umami.js";
    const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "bdf24e08-6881-4c0c-8110-8cb8d0a1cb69";

    if (!umamiScriptUrl || !umamiWebsiteId) {
        return null;
    }

    return (
        <script
            defer
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
        />
    );
}
