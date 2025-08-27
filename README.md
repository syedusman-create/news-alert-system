# News Alert System

A real-time incident reporting and monitoring system with role-based access control and interactive mapping.

## Features

### 🎯 Core Functionality
- **Real-time Incident Monitoring**: View incidents on an interactive map
- **Role-based Access Control**: Different views for public users and authorities
- **Interactive Map**: Location-based incident visualization with Mapbox
- **Status Management**: Authorities can update incident status (New → Acknowledged → Resolved)
- **Filtering & Search**: Filter incidents by category, status, and location

### 👥 User Roles
- **Public Users**: View all incidents (read-only)
- **Police Officers**: Access crime and accident incidents
- **Medical Staff**: Access medical emergency incidents
- **Firefighters**: Access fire-related incidents

### 🗺️ Map Features
- Interactive incident markers with category-based colors
- Click to view incident details
- Real-time status updates
- Location-based filtering
- **Powered by OpenStreetMap** (completely free!)

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Leaflet with react-leaflet (OpenStreetMap)
- **Data**: CSV file processing with PapaParse
- **Icons**: Lucide React
- **Authentication**: JWT-based (mock implementation)

## Why OpenStreetMap + Leaflet?

✨ **Completely Free**: No API keys, no usage limits, no billing
🌍 **Open Source**: Community-driven mapping data
🚀 **Lightweight**: Smaller bundle size compared to Mapbox
🔒 **Privacy-Friendly**: No tracking or data collection
🔧 **Flexible**: Easy to customize and extend

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-alert-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

**Note**: No API keys or tokens required! OpenStreetMap is completely free to use.

## Demo Credentials

### Authority Users
- **Police Officer**: `police@example.com` / `password123`
- **Medical Staff**: `medical@example.com` / `password123`
- **Firefighter**: `fire@example.com` / `password123`

### Public Access
- Click "Continue as Public User" to access without authentication

## Project Structure

```
news-alert-system/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── incidents/     # Incident data endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── LoginForm.tsx      # Authentication form
│   ├── Map.tsx           # Interactive map component
│   └── IncidentList.tsx  # Incident list with filters
├── lib/                   # Utility functions
│   └── data.ts           # Data processing and utilities
├── types/                 # TypeScript type definitions
│   └── index.ts          # Interface definitions
├── Data/                  # Data files
│   └── news_alert_sample_dataset_extended.csv
└── public/               # Static assets
```

## Data Structure

The system uses a CSV file with the following structure:
- `text`: Incident description
- `category`: Incident category (Fire, Medical, Crime, etc.)
- `type`: Incident type (Emergency/Non-Emergency)
- `location`: Geographic location
- `time`: Timestamp
- `status`: Current status (New/Acknowledged/Resolved)

## API Endpoints

### Authentication
- `POST /api/auth` - User login

### Incidents
- `GET /api/incidents` - Fetch all incidents from CSV

## Customization

### Adding New Categories
1. Update the `getCategoryColor()` and `getCategoryIcon()` functions in `lib/data.ts`
2. Add new role mappings in `getRoleBasedCategories()`

### Modifying Map Styling
- Edit the Map component in `components/Map.tsx`
- Customize marker styles and popup content
- Change tile providers (e.g., use different OpenStreetMap styles)
- Modify the `createCustomIcon()` function for different marker designs

### Adding New User Roles
1. Update the `UserRole` type in `types/index.ts`
2. Add role configuration in `lib/data.ts`
3. Update the login form and role display logic

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

---

**Note**: This is a prototype system. For production use, implement proper authentication, database storage, and security measures.
