/**
 * Validation rules and utilities for ResumeIQ
 */

export interface ValidationError {
    isValid: boolean;
    message?: string;
}

/**
 * Validates Company Name
 * Rules: 2-100 chars, letters, numbers, spaces, and . , & ' - ( )
 */
export function validateCompanyName(name: string): ValidationError {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
        return { isValid: false, message: "Company name must be at least 2 characters." };
    }
    if (trimmed.length > 100) {
        return { isValid: false, message: "Company name must not exceed 100 characters." };
    }

    // Allowed: Letters, numbers, spaces, and . , & ' - ( )
    const regex = /^[a-zA-Z0-9\s.,&'\-()]+$/;
    if (!regex.test(trimmed)) {
        return { 
            isValid: false, 
            message: "Invalid characters used. Only letters, numbers, spaces, and . , & ' - ( ) are allowed." 
        };
    }

    // Block common SQL injection keywords and script patterns
    const dangerousPatterns = [/select\s/i, /drop\s/i, /delete\s/i, /insert\s/i, /<script/i];
    if (dangerousPatterns.some(pattern => pattern.test(trimmed))) {
        return { isValid: false, message: "Malicious input detected." };
    }

    return { isValid: true };
}

/**
 * Validates Job Title
 * Rules: 2-120 chars, letters, numbers, spaces, and . , - / ( )
 */
export function validateJobTitle(title: string): ValidationError {
    const trimmed = title.trim();
    if (trimmed.length < 2) {
        return { isValid: false, message: "Job title must be at least 2 characters." };
    }
    if (trimmed.length > 120) {
        return { isValid: false, message: "Job title must not exceed 120 characters." };
    }

    // Allowed: Letters, numbers, spaces, and . , - / ( )
    const regex = /^[a-zA-Z0-9\s.,\-/( )]+$/;
    if (!regex.test(trimmed)) {
        return { 
            isValid: false, 
            message: "Invalid characters. Only letters, numbers, spaces, and . , - / ( ) are allowed (no @, #, etc)." 
        };
    }

    return { isValid: true };
}

/**
 * Sanitizes and Validates Job Description
 * Rules: 50-5000 chars, strip HTML/script tags
 */
export function validateJobDescription(description: string): ValidationError & { sanitized?: string } {
    const trimmed = description.trim();
    
    // Strip HTML tags
    const sanitized = trimmed.replace(/<[^>]*>?/gm, '');

    if (sanitized.length < 50) {
        return { isValid: false, message: "Job description is too short (min 50 characters)." };
    }
    if (sanitized.length > 5000) {
        return { isValid: false, message: "Job description is too long (max 5,000 characters)." };
    }

    // Check for dangerous patterns after stripping HTML
    const dangerousPatterns = [/javascript:/i, /onerror=/i, /onload=/i, /alert\(/i];
    if (dangerousPatterns.some(pattern => pattern.test(sanitized))) {
        return { isValid: false, message: "Malicious script patterns detected." };
    }

    return { isValid: true, sanitized };
}
