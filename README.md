# ProfitPilot 🚀

A modern React-based personal and business profit tracking dashboard with comprehensive financial management features.

## ✨ Features

- **📊 Dashboard Analytics** - Real-time financial overview with charts and insights
- **💰 Transaction Management** - Track income, expenses, and categorize transactions
- **📈 Financial Reports** - Detailed reports with charts and performance metrics
- **🏷️ Category Management** - Organize transactions with custom categories
- **📋 Budget Planning** - Set and monitor monthly budgets with alerts
- **🎯 Goal Tracking** - Set financial goals and track progress
- **⚙️ Settings & Preferences** - Customize theme, notifications, and account settings
- **🌙 Dark/Light Mode** - Persistent theme preference with system integration
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd profit-tracker

# Install dependencies
npm install
# or
yarn install
# or
bun install

# Start development server
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Dashboard/      # Dashboard-specific components
│   ├── ui/            # shadcn/ui components
│   ├── Layout.tsx     # Main layout with sidebar/navbar
│   └── ...
├── pages/             # Page components
│   ├── Index.tsx      # Dashboard home
│   ├── Transactions.tsx
│   ├── Reports.tsx
│   ├── Categories.tsx
│   ├── Budget.tsx
│   ├── Goals.tsx
│   └── Settings.tsx
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── main.tsx          # App entry point
```

## 🎨 Key Features

### Dashboard
- Summary cards with key metrics
- Interactive charts and graphs
- Business tips and insights
- Quick transaction entry

### Transactions
- Add, edit, and delete transactions
- Advanced filtering and search
- Category-based organization
- Export functionality

### Reports
- Monthly performance tracking
- Income/expense breakdown
- Profit margin analysis
- Trend visualization

### Budget Planning
- Category-based budgets
- Progress tracking
- Alert notifications
- Budget vs actual analysis

### Goals
- Financial goal setting
- Progress tracking
- Deadline management
- Achievement monitoring

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=ProfitPilot
VITE_API_URL=your_api_url_here
```

### Theme Customization
The app supports:
- Light/Dark mode toggle
- System theme detection
- Persistent theme preferences

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation with fixed header
- **Tablet**: Adaptive layout with collapsible sidebar
- **Mobile**: Mobile-first design with overlay navigation

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons
- [Recharts](https://recharts.org/) for data visualization

---

**ProfitPilot** - Your comprehensive financial management solution 💰
