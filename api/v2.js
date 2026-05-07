module.exports = async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_KEY;

  // FIXED URL: Removed the extra "models/" prefix
  const url = `https://generativelanguage.googleapis.com/v1/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `You are Anley's Portfolio AI. User: ${message}` }] }]
      })
    });

    const data = await response.json();
    
    // If it STILL says not found, we try one more model name variation
    if (data.error) {
        return res.status(200).json({ reply: "Final check: " + data.error.message });
    }

    const aiReply = data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply: aiReply });

  } catch (error) {
    res.status(200).json({ reply: "System error: " + error.message });
  }
};

