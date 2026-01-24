// MOCK IMPLEMENTATION DUE TO CORS LIMITATIONS ON GITHUB PAGES
// The real Mercado Pago API does not support client-side calls from static sites.

export async function createPreference() {
    // Determine the correct path handling explicitly for GitHub Pages
    // We can use a relative path if we leverage the Next.js router, but since this is an "external" link...
    // Let's assume public folder root.

    // Logic to detect base path
    const isProd = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
    const basePath = isProd ? '/CapyFlow-Academy' : '';

    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));

    // Return URL to our local Mock Checkout
    return `${window.location.origin}${basePath}/checkout.html`;
}

