export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function saveTrainingSession(data: any, token: string) {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to save session');
    }

    return response.json();
}

export async function getMyHistory(token: string) {
    const response = await fetch(`${API_BASE_URL}/sessions/my`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch history');
    }

    return response.json();
}

export async function getCompletedSnippetIds(token: string) {
    const response = await fetch(`${API_BASE_URL}/sessions/completed-ids`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch completed IDs');
    }

    return response.json();
}
