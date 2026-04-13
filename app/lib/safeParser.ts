export const fallbackFeedback: Feedback = {
    overallScore: 0,
    ATS: {
        score: 0,
        tips: [{ type: "improve", tip: "Analysis failed to parse. Please try again." }]
    },
    toneAndStyle: {
        score: 0,
        tips: []
    },
    content: {
        score: 0,
        tips: []
    },
    structure: {
        score: 0,
        tips: []
    },
    skills: {
        score: 0,
        tips: []
    }
};

/**
 * Safely parses AI-generated JSON content.
 * Handles cases where the AI wraps JSON in markdown blocks or adds introductory text.
 */
export function parseAIJSON<T>(text: string, fallback: T): T {
    if (!text) return fallback;

    try {
        // 1. Direct attempt
        return JSON.parse(text);
    } catch (e) {
        try {
            // 2. Regex attempt - find the first '{' and last '}'
            const start = text.indexOf('{');
            const end = text.lastIndexOf('}');
            
            if (start !== -1 && end !== -1 && end > start) {
                const jsonContent = text.substring(start, end + 1);
                return JSON.parse(jsonContent);
            }
        } catch (innerE) {
            // Silently fail in production
        }
    }

    return fallback;
}
