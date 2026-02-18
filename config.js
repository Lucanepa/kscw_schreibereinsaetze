// ===========================================
// POCKETBASE CONFIGURATION
// ===========================================
// This file contains sensitive configuration data
// DO NOT commit this file to version control

const POCKETBASE_CONFIG = {
    // PocketBase Server URL
    url: 'https://pocketbase.lucanepa.com',

    // Collection names
    collections: {
        matches: 'scorer_matches',
        scorers: 'scorer_scorers',
        places: 'scorer_places',
        editLog: 'scorer_edit_log'
    },

    // Application settings
    app: {
        name: 'Volleyball Games Management',
        version: '2.0.0',
        debug: false
    },

    // UI Configuration
    ui: {
        // Date formatting
        dateFormat: 'en-US',
        timeFormat: 'HH:mm',

        // Pagination
        itemsPerPage: 20,

        // Mobile breakpoint
        mobileBreakpoint: 768
    },

    // Feature flags
    features: {
        adminPanel: true,
        realTimeUpdates: true,
        contactManagement: true,
        teamFiltering: true
    }
};

// ===========================================
// EXPORT CONFIGURATION
// ===========================================
// Support for both browser and Node.js environments

if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = POCKETBASE_CONFIG;
} else if (typeof window !== 'undefined') {
    // Browser environment
    window.POCKETBASE_CONFIG = POCKETBASE_CONFIG;
}

// ===========================================
// VALIDATION
// ===========================================
// Basic configuration validation

(function validateConfig() {
    if (!POCKETBASE_CONFIG.url) {
        console.error('PocketBase URL not configured. Please update config.js.');
    }
})();
