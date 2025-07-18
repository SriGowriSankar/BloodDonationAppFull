# Blood Donation Management System

A comprehensive blood donation management system built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Multi-role Authentication**: Support for donors, blood banks, hospitals, and administrators
- **Donor Management**: Complete donor registration and profile management
- **Blood Inventory**: Real-time blood stock tracking with expiration monitoring
- **Blood Requests**: Hospital blood request system with priority levels
- **Dashboard Analytics**: Comprehensive statistics and visualizations
- **Responsive Design**: Mobile-friendly interface with modern UI

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blood-donation-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase:
- Create a new Supabase project
- Run the migration files in the `supabase/migrations` folder
- Configure Row Level Security policies

5. Start the development server:
```bash
npm run dev
```

## Database Schema

The system includes the following main tables:
- `users` - User authentication and roles
- `donors` - Donor information and eligibility
- `blood_banks` - Blood bank facilities
- `hospitals` - Hospital information
- `blood_inventory` - Blood stock management
- `blood_requests` - Hospital blood requests
- `donations` - Donation records

## User Roles

1. **Admin**: Full system access and management
2. **Blood Bank**: Manage donors, inventory, and donations
3. **Hospital**: Create blood requests and view inventory
4. **Donor**: View personal donation history and profile

## Deployment

The application is deployed on Netlify: https://singular-kitten-e36c17.netlify.app

To deploy your own instance:
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your preferred hosting service
3. Configure environment variables on your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.