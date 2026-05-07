const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    // 1. Initialize with the Key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    
    // 2. Use the standard model name without 'latest' or 'models/'
    // If the package.json is 0.21.0, this will automatically use the correct stable URL
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { message } = req.body;
    const result = await model.generateContent(message || "Hi");
    const response = await result.response;
    
    res.status(200).json({ reply: response.text() });
  } catch (error) {
    res.status(200).json({ reply: "Final Debug Error: " + error.message });
  }
};

