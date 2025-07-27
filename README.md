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

### 2. Supabase Project Setup

**Important:** Before using the admin panel, you need to configure your Supabase project:

1. **Create Admin Users (Recommended):**
   - Go to your Supabase Dashboard
   - Navigate to **Authentication** → **Users**
   - Click **Add User** to create admin accounts
   - Enter email and password for each admin
   - No email confirmation required for manually created users

2. **Disable Public Signups (Security):**
   - Go to **Authentication** → **Settings**
   - Under **User Signups**, **Disable** public signups
   - This prevents unauthorized users from creating accounts

3. **Configure Email Settings (Optional):**
   - In **Authentication** → **Settings**
   - Configure **SMTP Settings** for email verification
   - Or disable email confirmation in **Email Templates**

4. **Set Up Row Level Security (Recommended):**
   - Go to **Database** → **Policies**
   - Create policies for your tables to control access

### 3. Security

- `config.js` is included in `.gitignore` to prevent accidental commits
- Only the template file (`config.template.js`) is tracked in git
- API keys are never exposed in the main HTML files

### 4. Files Structure

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

## Troubleshooting

### "Signups not allowed for this instance" Error
This error occurs when user signups are disabled in your Supabase project.

**Solution (Admin-Only Access):**
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** to create admin accounts manually
4. Provide the credentials to your admin users
5. Users can now login with the credentials you provided

**Note:** Public signups are intentionally disabled for security. Only manually created users can access the admin panel.

### "Email not confirmed" Error
If you get email confirmation errors:

**Solution 1 (Disable Email Confirmation):**
1. Go to **Authentication** → **Settings**
2. Disable **Enable email confirmations**
3. Save changes

**Solution 2 (Configure SMTP):**
1. Go to **Authentication** → **Settings**
2. Configure **SMTP Settings** with your email provider
3. Test the email configuration

### "column matches_complete.id does not exist" Error
This error occurs when the system tries to use an `id` column that doesn't exist.

**Solution:** The system has been updated to use a composite key (`date`, `time`, `home_team`, `away_team`) for identifying records. This is handled automatically in the latest version.

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

**Note:** The system uses a combination of `date`, `time`, `home_team`, and `away_team` to uniquely identify games for updates, as there may not be a dedicated `id` column.

### teams table
- `team_short`: Team identifiers for filtering

## Recent Updates

### Phone Number Masking
- Phone numbers are now masked on the public page (showing as dots)
- Users can type directly without deleting placeholder characters
- Admin page shows real phone numbers for editing

### Database Update Logic
- Fixed database update errors by using composite keys instead of `id` column
- Improved error handling and user feedback

### UI Improvements
- Enhanced mobile responsiveness
- Better visual indicators for missing contact information
- Improved filtering and search functionality 
