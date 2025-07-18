# GitHub Setup Instructions

Follow these steps to link your project to GitHub:

## Method 1: Create New Repository on GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Enter repository name: `blood-donation-system`
   - Add description: "Comprehensive blood donation management system"
   - Choose public or private
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Link your local project to GitHub:**
   ```bash
   # Initialize git repository (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Make initial commit
   git commit -m "Initial commit: Blood donation management system"
   
   # Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/blood-donation-system.git
   
   # Push to GitHub
   git push -u origin main
   ```

## Method 2: Import from ZIP file

1. **Extract the ZIP file** to your desired location
2. **Follow Method 1** steps above

## Environment Variables Setup

**Important:** Never commit your `.env` file to GitHub!

1. **For development:**
   - Create `.env` file locally with your Supabase credentials
   - The `.gitignore` file already excludes `.env` from version control

2. **For deployment:**
   - Set environment variables in your hosting platform (Netlify, Vercel, etc.)
   - Use the same variable names: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

## Repository Structure

```
blood-donation-system/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types
│   └── config/            # Configuration files
├── supabase/              # Database migrations
├── public/                # Static assets
├── dist/                  # Build output (ignored by git)
├── README.md              # Project documentation
├── package.json           # Dependencies and scripts
└── .gitignore            # Git ignore rules
```

## Next Steps

1. **Set up branch protection** (recommended for collaboration)
2. **Add collaborators** if working in a team
3. **Set up GitHub Actions** for CI/CD (optional)
4. **Create issues and project boards** for task management

## Useful Git Commands

```bash
# Check status
git status

# Add specific files
git add filename

# Commit changes
git commit -m "Your commit message"

# Push changes
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout branch-name
```