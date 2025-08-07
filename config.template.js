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
        // Configuration template detected - credentials not set
        const errorMessage = 'CRITICAL: Supabase configuration is incomplete. ' +
            'Please copy config.template.js to config.js and add your actual Supabase credentials. ' +
            `Missing: ${!hasUrl ? 'URL' : ''}${!hasUrl && !hasKey ? ' and ' : ''}${!hasKey ? 'ANON_KEY' : ''}`;
        
        // Log error with detailed information
        console.error('Configuration Validation Failed:', {
            error: errorMessage,
            hasUrl: hasUrl,
            hasKey: hasKey,
            url: SUPABASE_CONFIG.url,
            anonKey: SUPABASE_CONFIG.anonKey ? '[REDACTED]' : 'NOT_SET',
            timestamp: new Date().toISOString(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Node.js'
        });
        
        // In browser environment, show user-friendly error
        if (typeof window !== 'undefined') {
            // Create a visible error message for users
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #dc3545;
                color: white;
                padding: 15px;
                text-align: center;
                font-family: Arial, sans-serif;
                font-size: 14px;
                z-index: 9999;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            `;
            errorDiv.innerHTML = `
                <strong>Configuration Error:</strong> Supabase credentials are not configured. 
                Please contact your administrator or check the browser console for details.
            `;
            document.body.appendChild(errorDiv);
        }
        
        // In Node.js environment, terminate the process
        if (typeof process !== 'undefined' && process.exit) {
            console.error('Terminating application due to invalid configuration.');
            process.exit(1);
        }
        
        // For browser environments, throw an error to prevent further execution
        throw new Error(errorMessage);
    } else {
        // Configuration loaded successfully
        console.log('Supabase configuration validated successfully.');
    }
})(); 
