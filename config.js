// ===========================================
// SUPABASE CONFIGURATION
// ===========================================
// This file contains sensitive configuration data
// DO NOT commit this file to version control

const SUPABASE_CONFIG = {
    // Supabase Project URL
    url: 'https://wilrrlwqgvzjdhmnwmte.supabase.co',

    // Supabase Anonymous Key (safe for client-side use)
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpbHJybHdxZ3Z6amRobW53bXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MDU2NzcsImV4cCI6MjA2OTE4MTY3N30.XUGU99itVC9sbNvh6qkuxgAT1lirnu4u_MBJDFzoB2Q',

    // Database table names
    tables: {
        matches: 'matches_complete',
        teams: 'teams'
    },

    // Application settings
    app: {
        name: 'Volleyball Games Management',
        version: '1.0.0',
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
    module.exports = SUPABASE_CONFIG;
} else if (typeof window !== 'undefined') {
    // Browser environment
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}

// ===========================================
// VALIDATION
// ===========================================
// Basic configuration validation

(function validateConfig() {
    if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
        console.error('❌ Supabase configuration is incomplete!');
        console.error('Please check your config.js file.');
    } else {
        console.log('✅ Supabase configuration loaded successfully');
    }
})(); 
