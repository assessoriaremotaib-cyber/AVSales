export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { messages, system } = req.body;
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system,
        messages
      })
    });
    
    const data = await response.json();
    const content = data.content?.map(b => b.text || '').join('') || 'Erro ao processar.';
    res.status(200).json({ content });
  } catch (err) {
    res.status(500).json({ content: 'Erro de conexão. Tente novamente.' });
  }
}
