// ===========================================
// POCKETBASE CONFIGURATION TEMPLATE
// ===========================================
// Copy this file to config.js and add your actual PocketBase URL
// This template shows the required structure without exposing sensitive data

const POCKETBASE_CONFIG = {
    // PocketBase Server URL
    // Get this from your PocketBase deployment (e.g., 'http://127.0.0.1:8090')
    url: 'YOUR_POCKETBASE_URL_HERE',

    // Collection names
    // Update these to match your actual collection names
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
// 2. Replace the placeholder URL with your actual PocketBase server URL
// 3. Update collection names if they differ from the defaults
// 4. Customize UI settings as needed
// 5. Adjust feature flags based on your requirements

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
    const hasUrl = POCKETBASE_CONFIG.url && POCKETBASE_CONFIG.url !== 'YOUR_POCKETBASE_URL_HERE';

    if (!hasUrl) {
        const errorMessage = 'CRITICAL: PocketBase configuration is incomplete. ' +
            'Please copy config.template.js to config.js and add your actual PocketBase URL.';

        console.error('Configuration Validation Failed:', {
            error: errorMessage,
            hasUrl: hasUrl,
            url: POCKETBASE_CONFIG.url,
            timestamp: new Date().toISOString(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Node.js'
        });

        if (typeof window !== 'undefined') {
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
                <strong>Configuration Error:</strong> PocketBase URL is not configured.
                Please contact your administrator or check the browser console for details.
            `;
            document.body.appendChild(errorDiv);
        }

        if (typeof process !== 'undefined' && process.exit) {
            console.error('Terminating application due to invalid configuration.');
            process.exit(1);
        }

        throw new Error(errorMessage);
    } else {
        console.log('PocketBase configuration validated successfully.');
    }
})();
