import crypto from 'crypto';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const chunkSize = parseInt(req.query.size) || 5;
    const maxSize = 50;
    const requestedSize = Math.min(chunkSize, maxSize);

    try {
        // Generate random data
        const data = crypto.randomBytes(requestedSize * 1024 * 1024);

        // Set headers
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Length', data.length);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('X-Data-Size', `${requestedSize}MB`);

        res.status(200).send(data);
    } catch (error) {
        console.error('[DOWNLOAD] Error:', error);
        res.status(500).json({ error: 'Failed to generate download data' });
    }
}

export const config = {
    api: {
        bodyParser: false,
        responseLimit: '50mb',
    },
};
