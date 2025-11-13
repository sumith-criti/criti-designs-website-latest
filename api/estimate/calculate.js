import { calculateEstimate } from '@/lib/calculateEstimate';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const formData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!formData || typeof formData !== 'object') {
      return res.status(400).json({ error: 'Invalid request payload.' });
    }

    const estimate = calculateEstimate(formData);

    return res.status(200).json({ estimate });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[calculate-estimate]', error);
    return res.status(500).json({
      error: 'Unable to calculate estimate at this time. Please try again later.',
    });
  }
}


