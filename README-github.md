# 🚨 News Alert System

A real-time incident reporting and monitoring system designed for emergency response coordination. Built with Next.js 14, TypeScript, and OpenStreetMap.

![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Leaflet](https://img.shields.io/badge/Leaflet-1.7.1-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-blue)

## ✨ Features

### 🎯 Core Functionality
- **Real-time Incident Monitoring**: View incidents on an interactive map
- **Role-based Access Control**: Different views for public users and authorities
- **Interactive Map**: Location-based incident visualization with OpenStreetMap
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

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Leaflet with react-leaflet (OpenStreetMap)
- **Data**: CSV file processing with PapaParse
- **Icons**: Lucide React
- **Authentication**: JWT-based (mock implementation)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/news-alert-system.git
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

## 🎮 Demo Credentials

### Authority Users
- **Police Officer**: `police@example.com` / `password123`
- **Medical Staff**: `medical@example.com` / `password123`
- **Firefighter**: `fire@example.com` / `password123`

### Public Access
- Click "Continue as Public User" to access without authentication

## 📱 Available Pages

- **Main Dashboard** (`/`) - Interactive map with incident list
- **All Incidents** (`/incidents`) - Grid view of all incidents
- **Incident Details** (`/incident/[id]`) - Detailed view for each incident

## 🏗️ Project Structure

```
news-alert-system/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── incidents/     # Incident data endpoints
│   ├── incident/[id]/     # Dynamic incident details page
│   ├── incidents/         # All incidents list page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   ├── DynamicMap.tsx     # SSR-safe map wrapper
│   ├── IncidentDetails.tsx # Detailed incident view
│   ├── IncidentList.tsx   # Incident list with filters
│   ├── LoginForm.tsx      # Authentication form
│   └── Map.tsx           # Interactive map component
├── lib/                   # Utility functions
│   └── data.ts           # Data processing utilities
├── types/                 # TypeScript type definitions
│   └── index.ts          # Interface definitions
├── Data/                  # Sample data
│   └── news_alert_sample_dataset_extended.csv
└── public/               # Static assets
```

## 🌟 Why OpenStreetMap + Leaflet?

- ✅ **Completely Free**: No API keys, no usage limits, no billing
- 🌍 **Open Source**: Community-driven mapping data
- 🚀 **Lightweight**: Smaller bundle size compared to commercial alternatives
- 🔒 **Privacy-Friendly**: No tracking or data collection
- 🔧 **Flexible**: Easy to customize and extend

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Features

1. **New Incident Categories**: Update `getCategoryColor()` and `getCategoryIcon()` in `lib/data.ts`
2. **New User Roles**: Update the `UserRole` type and add role mappings
3. **Custom Map Styling**: Modify the Map component or add new tile providers

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms
Compatible with any platform supporting Next.js:
- Netlify
- Railway  
- DigitalOcean App Platform
- AWS Amplify

## 🔮 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Export functionality (PDF reports)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenStreetMap**: For providing free, open-source mapping data
- **Leaflet**: For the excellent mapping library
- **Next.js Team**: For the amazing React framework
- **Vercel**: For seamless deployment platform

## 📞 Support

- 📧 **Issues**: Open an issue on GitHub
- 💬 **Discussions**: Use GitHub Discussions for questions
- 📖 **Documentation**: Check the `/docs` folder for detailed guides

---

**⚠️ Note**: This is a prototype system. For production use, implement proper authentication, database storage, and security measures.

**Made with ❤️ for emergency response coordination**