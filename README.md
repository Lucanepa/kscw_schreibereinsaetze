# Volleyball Games Management System

A web-based system for managing volleyball games with public viewing and admin functionality.

## Features

- **Public View**: Browse games with filtering and contact information management
- **Admin Panel**: Secure authentication with advanced filtering and data management
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Direct integration with Supabase database

## Setup

### 1. Configuration

The system uses a separate configuration file to keep API keys secure:

1. Copy `config.template.js` to `config.js`
2. Add your Supabase credentials to `config.js`:
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'YOUR_SUPABASE_URL',
       anonKey: 'YOUR_SUPABASE_ANON_KEY'
   };
   ```

### 2. Security

- `config.js` is included in `.gitignore` to prevent accidental commits
- Only the template file (`config.template.js`) is tracked in git
- API keys are never exposed in the main HTML files

### 3. Files Structure

```
├── index.html                      # Main public page
├── admin.html                      # Admin panel
├── config.js                       # Configuration (not tracked)
├── config.template.js              # Configuration template
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## Usage

### Public Access
- Open `index.html` in a browser
- Filter games by team or role
- Click on games to view details and manage contact information

### Admin Access
- Click "Admin Access" on the main page
- Login with email/password (Supabase Auth)
- Advanced filtering and data management
- Full access to all game details

## Development

### Local Development
1. Set up your `config.js` file
2. Serve files using a local web server
3. Access via `http://localhost:port`

### GitHub Pages Deployment
1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Set up your `config.js` file on the server
4. Access via your GitHub Pages URL

## Security Notes

- The `anonKey` is safe to use in client-side code
- For additional security, consider using Row Level Security (RLS) in Supabase
- Admin access is protected by Supabase Authentication
- Contact information is hidden from public view after saving

## Database Schema

### matches_complete table
- `date`, `time`: Game scheduling
- `halle_short`, `home_team`, `away_team`: Game details
- `scorekeeper_team_short`, `taefeler_team_short`: Role assignments
- `scorekeeper_name`, `scorekeeper_phone`: Contact info
- `taefeler_name`, `taefeler_phone`: Contact info

### teams table
- `team_short`: Team identifiers for filtering 
