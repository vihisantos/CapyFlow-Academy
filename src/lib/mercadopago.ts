export const MP_ACCESS_TOKEN = 'APP_USR-6f437e41-74ae-45ae-9d60-1b95bde8262b';

export async function createPreference() {
    try {
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MP_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                items: [
                    {
                        title: 'CapyFlow Academy PRO',
                        quantity: 1,
                        currency_id: 'BRL',
                        unit_price: 29.90
                    }
                ],
                back_urls: {
                    success: typeof window !== 'undefined' ? `${window.location.origin}/dashboard?status=approved` : 'http://localhost:3000/dashboard?status=approved',
                    failure: typeof window !== 'undefined' ? `${window.location.origin}/dashboard?status=failure` : 'http://localhost:3000/dashboard?status=failure',
                    pending: typeof window !== 'undefined' ? `${window.location.origin}/dashboard?status=pending` : 'http://localhost:3000/dashboard?status=pending'
                },
                auto_return: 'approved'
            })
        });

        const data = await response.json();
        return data.init_point; // URL to redirect
    } catch (error) {
        console.error("Error creating preference:", error);
        return null;
    }
}
