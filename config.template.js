// ===========================================
// SUPABASE CONFIGURATION TEMPLATE
// ===========================================
// Copy this file to config.js and add your actual credentials
// This template shows the required structure without exposing sensitive data

const SUPABASE_CONFIG = {
    // Supabase Project URL
    // Get this from your Supabase project dashboard
    url: 'YOUR_SUPABASE_PROJECT_URL_HERE',
    
    // Supabase Anonymous Key (safe for client-side use)
    // Get this from your Supabase project dashboard > Settings > API
    anonKey: 'YOUR_SUPABASE_ANON_KEY_HERE',
    
    // Database table names
    // Update these to match your actual table names
    tables: {
        matches: 'matches_complete',  // Your matches table name
        teams: 'teams'               // Your teams table name
    },
    
    // Application settings
    app: {
        name: 'Volleyball Games Management',
        version: '1.0.0',
        debug: false  // Set to true for development debugging
    },
    
    // UI Configuration
    ui: {
        // Date formatting (ISO locale codes)
        dateFormat: 'en-US',  // Options: 'en-US', 'de-DE', 'fr-FR', etc.
        timeFormat: 'HH:mm',  // 24-hour format
        
        // Pagination settings
        itemsPerPage: 20,
        
        // Mobile breakpoint (in pixels)
        mobileBreakpoint: 768
    },
    
    // Feature flags
    // Enable/disable specific features
    features: {
        adminPanel: true,        // Admin authentication and management
        realTimeUpdates: true,   // Real-time database updates
        contactManagement: true, // Contact info editing
        teamFiltering: true      // Team-based filtering
    }
};

// ===========================================
// SETUP INSTRUCTIONS
// ===========================================
// 1. Copy this file to config.js
// 2. Replace the placeholder values with your actual Supabase credentials
// 3. Update table names if they differ from the defaults
// 4. Customize UI settings as needed
// 5. Adjust feature flags based on your requirements

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
    const hasUrl = SUPABASE_CONFIG.url && SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_PROJECT_URL_HERE';
    const hasKey = SUPABASE_CONFIG.anonKey && SUPABASE_CONFIG.anonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE';
    
    if (!hasUrl || !hasKey) {
        console.warn('⚠️  Configuration template detected!');
        console.warn('Please copy this file to config.js and add your actual Supabase credentials.');
    } else {
        console.log('✅ Configuration loaded successfully');
    }
})(); 
