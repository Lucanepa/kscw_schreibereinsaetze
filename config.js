// Supabase Configuration Template
// Copy this file to config.js and add your actual credentials
const SUPABASE_CONFIG = {
    url: 'https://wilrrlwqgvzjdhmnwmte.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpbHJybHdxZ3Z6amRobW53bXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MDU2NzcsImV4cCI6MjA2OTE4MTY3N30.XUGU99itVC9sbNvh6qkuxgAT1lirnu4u_MBJDFzoB2Q'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
} 
