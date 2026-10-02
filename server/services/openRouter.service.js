import axios from "axios"
export const safeJsonParse = (text) => {
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch (e) {
        const cleaned = text.replace(/```(?:json)?\s*([\s\S]*?)\s*```/gi, '$1').trim();
        try {
            return JSON.parse(cleaned);
        } catch (e2) {
            const match = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
            if (match) {
                return JSON.parse(match[0]);
            }
            throw new Error("Unable to parse structured JSON from AI output");
        }
    }
}

export const askAi = async (messages) => {
    try {
        if(!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Messages array is empty.");
        }
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: messages
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 45000 // 45 seconds timeout for high concurrency resilience
            }
        );

        const content = response?.data?.choices?.[0]?.message?.content;

        if (!content || !content.trim()) {
            throw new Error("AI returned empty response.");
        }

        return content;
    } catch (error) {
        console.error("OpenRouter Error:", error.response?.data || error.message);
        if (error.code === 'ECONNABORTED') {
            throw new Error("AI request timed out. Please try again.");
        }
        throw new Error(error.response?.data?.error?.message || "OpenRouter API Error");
    }
}