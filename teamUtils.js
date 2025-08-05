// ===========================================
// TEAM UTILITIES - SHARED MODULE
// ===========================================
// This module contains shared functions for team name normalization
// and person team checking that can be imported by both coaches.html and index.html

// Normalize team names to handle various formats and variations
// Examples: HU23-1, HU23-10, hu23-1, HU23 - 1, HU23–1 (en-dash), etc. -> HU23
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
    const hu23Pattern = /^HU23\s*[-\u2013\u2014]\s*\d+$/;
    if (hu23Pattern.test(teamName)) {
        return 'HU23';
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
        personHasTeam
    };
} else if (typeof window !== 'undefined') {
    // Browser environment
    window.teamUtils = {
        normalizeTeamName,
        personHasTeam
    };
} else {
    // Fallback for unsupported environments
    const errorMessage = 'teamUtils: Unsupported environment detected. Neither Node.js (module.exports) nor browser (window) globals are available.';
    if (typeof console !== 'undefined' && console.error) {
        console.error(errorMessage);
    }
    throw new Error(errorMessage);
}