// ===========================================
// TEAM UTILITIES - SHARED MODULE
// ===========================================
// This module contains shared functions for team name normalization
// and person team checking that can be imported by both coaches.html and index.html

// Color palette for team assignments
const colorPalette = [
    '#28a745', // Green
    '#ffc107', // Yellow
    '#17a2b8', // Cyan
    '#6f42c1', // Purple
    '#dc3545', // Red
    '#fd7e14', // Orange
    '#20c997', // Teal
    '#e83e8c', // Pink
    '#6c757d', // Gray
    '#198754', // Dark Green
    '#0d6efd', // Blue
    '#6610f2', // Indigo
    '#34495e', // Dark Blue Gray
];

// Improved hash function for better color distribution
function hashString(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    
    // Use a better hash algorithm (djb2)
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) + hash) + char; // hash * 33 + char
    }
    
    // Additional mixing for better distribution
    hash = hash ^ (hash >>> 16);
    hash = hash * 0x85ebca6b;
    hash = hash ^ (hash >>> 13);
    hash = hash * 0xc2b2ae35;
    hash = hash ^ (hash >>> 16);
    
    return Math.abs(hash);
}

// Get consistent color for a team using hash-based assignment
function getTeamColor(teamName) {
    if (!teamName) return '#6c757d'; // Default gray for empty teams
    
    const normalizedTeam = normalizeTeamName(teamName);
    const hash = hashString(normalizedTeam);
    const colorIndex = hash % colorPalette.length;
    
    return colorPalette[colorIndex];
}

// Normalize team names to handle various formats and variations
// Examples: HU23-1, HU23-10, hu23-1, HU23 - 1, HU23–1 (en-dash), etc. -> HU23-1, HU23-10
function normalizeTeamName(teamName) {
    if (!teamName) return teamName;
    
    // Trim whitespace first
    teamName = teamName.trim();
    
    // Convert to uppercase for consistent processing
    teamName = teamName.toUpperCase();
    
    // Use regex to match HU23 followed by optional spaces, different dash types, and digits
    // This will match patterns like:
    // - HU23-1, HU23-10, HU23-99
    // - HU23 - 1, HU23 - 10 (with spaces around dash)
    // - HU23–1, HU23–10 (en-dash)
    // - HU23—1, HU23—10 (em-dash)
    // - hu23-1, HU23-1 (case insensitive)
    const hu23Pattern = /^HU23\s*[-\u2013\u2014]\s*(\d+)$/;
    if (hu23Pattern.test(teamName)) {
        // Extract the number and return HU23-{number}
        const match = teamName.match(hu23Pattern);
        return `HU23-${match[1]}`;
    }
    
    return teamName;
}

// Check if a person's teams array includes a specific team (with normalization)
// Also checks the legacy single string field person.team for backward compatibility
function personHasTeam(person, targetTeam) {
    if (!targetTeam) return false;
    
    const normalizedTargetTeam = normalizeTeamName(targetTeam);
    
    // Check if person has teams array (new format)
    if (Array.isArray(person.teams)) {
        return person.teams.some(team => normalizeTeamName(team) === normalizedTargetTeam);
    }
    
    // Check legacy single team field (backward compatibility)
    if (person.team) {
        return normalizeTeamName(person.team) === normalizedTargetTeam;
    }
    
    return false;
}

// ===========================================
// EXPORT FUNCTIONS
// ===========================================
// Support for both browser and Node.js environments

if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        normalizeTeamName,
        personHasTeam,
        getTeamColor,
        colorPalette
    };
} else if (typeof window !== 'undefined') {
    // Browser environment
    window.teamUtils = {
        normalizeTeamName,
        personHasTeam,
        getTeamColor,
        colorPalette
    };
} else {
    // Fallback for unsupported environments
    const errorMessage = 'teamUtils: Unsupported environment detected. Neither Node.js (module.exports) nor browser (window) globals are available.';
    if (typeof console !== 'undefined' && console.error) {
        console.error(errorMessage);
    }
    throw new Error(errorMessage);
}