// ===========================================
// TEAM UTILITIES - SHARED MODULE
// ===========================================
// This module contains shared functions for team name normalization
// and person team checking that can be imported by both coaches.html and index.html

// Color palette for team assignments - expanded to reduce collisions
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
    '#f39c12', // Orange (different shade)
    '#e74c3c', // Red (different shade)
    '#9b59b6', // Purple (different shade)
    '#3498db', // Blue (different shade)
    '#1abc9c', // Teal (different shade)
    '#f1c40f', // Yellow (different shade)
    '#e67e22', // Orange (different shade)
    '#95a5a6', // Gray (different shade)
    '#16a085', // Teal (different shade)
    '#8e44ad', // Purple (different shade)
    '#2980b9', // Blue (different shade)
    '#c0392b', // Red (different shade)
    '#27ae60', // Green (different shade)
    '#d35400', // Orange (different shade)
    '#7f8c8d', // Gray (different shade)
    '#2c3e50', // Dark Blue Gray (different shade)
    '#e74c3c', // Red (different shade)
    '#3498db', // Blue (different shade)
    '#f39c12', // Orange (different shade)
    '#1abc9c', // Teal (different shade)
    '#9b59b6', // Purple (different shade)
    '#f1c40f', // Yellow (different shade)
    '#e67e22', // Orange (different shade)
    '#95a5a6', // Gray (different shade)
    '#16a085', // Teal (different shade)
    '#8e44ad', // Purple (different shade)
    '#2980b9', // Blue (different shade)
    '#c0392b', // Red (different shade)
    '#27ae60', // Green (different shade)
    '#d35400', // Orange (different shade)
    '#7f8c8d', // Gray (different shade)
    '#2c3e50', // Dark Blue Gray (different shade)
];

// Improved hash function for better color distribution
function hashString(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    
    // Use a more robust hash algorithm with better distribution
    // This algorithm is specifically designed to handle similar team names better
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        // Use different multipliers for different positions to create more variation
        const multiplier = (i % 3 === 0) ? 31 : (i % 3 === 1) ? 37 : 41;
        hash = ((hash << 5) + hash) + (char * multiplier);
    }
    
    // Additional mixing for better distribution
    hash = hash ^ (hash >>> 16);
    hash = hash * 0x85ebca6b;
    hash = hash ^ (hash >>> 13);
    hash = hash * 0xc2b2ae35;
    hash = hash ^ (hash >>> 16);
    
    // Add more mixing to ensure better distribution
    hash = hash ^ (hash >>> 7);
    hash = hash * 0x9e3779b9;
    hash = hash ^ (hash >>> 11);
    
    // Add position-based mixing for similar team names
    if (str.includes('D')) {
        hash = hash ^ (str.indexOf('D') * 0xdeadbeef);
    }
    if (str.includes('H')) {
        hash = hash ^ (str.indexOf('H') * 0xbeefdead);
    }
    
    return Math.abs(hash);
}

// Get consistent color for a team using hash-based assignment
function getTeamColor(teamName) {
    if (!teamName) return '#6c757d'; // Default gray for empty teams
    
    try {
        const normalizedTeam = normalizeTeamName(teamName);
        const hash = hashString(normalizedTeam);
        const colorIndex = hash % colorPalette.length;
        
        return colorPalette[colorIndex];
    } catch (error) {
        console.error('Error in getTeamColor for', teamName, ':', error);
        return '#6c757d'; // Default gray fallback
    }
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
    console.log('teamUtils loaded successfully:', window.teamUtils);
} else {
    // Fallback for unsupported environments
    const errorMessage = 'teamUtils: Unsupported environment detected. Neither Node.js (module.exports) nor browser (window) globals are available.';
    if (typeof console !== 'undefined' && console.error) {
        console.error(errorMessage);
    }
    throw new Error(errorMessage);
}