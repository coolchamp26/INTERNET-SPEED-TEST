export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const chunks = [];

        // Read the request body
        await new Promise((resolve, reject) => {
            req.on('data', chunk => chunks.push(chunk));
            req.on('end', resolve);
            req.on('error', reject);
        });

        const buffer = Buffer.concat(chunks);
        const receivedSize = buffer.length;
        const sizeMB = (receivedSize / (1024 * 1024)).toFixed(2);

        res.status(200).json({
            success: true,
            received: receivedSize,
            receivedMB: parseFloat(sizeMB),
            timestamp: Date.now()
        });
    } catch (error) {
        console.error('[UPLOAD] Error:', error);
        res.status(500).json({ error: 'Failed to process upload data' });
    }
}

export const config = {
    api: {
        bodyParser: false,
        sizeLimit: '50mb',
    },
};
