# ScholarStream - Scholarship Management Platform

A full-stack MERN application designed to connect students with scholarship opportunities worldwide. Universities and organizations can post scholarships, while students can search, apply, and track their applications seamlessly.

## 🌐 Live URL
[Live Demo](https://your-deployed-url.netlify.app)

## 🎯 Purpose
To simplify the complex process of finding financial aid for education. This centralized platform helps students discover scholarship opportunities they might miss and streamlines the application review process for administrators.

## ✨ Key Features

### For Students
- 🔍 **Smart Search & Filter** - Find scholarships by name, university, country, degree, or category
- 📝 **Easy Application** - Apply to scholarships with integrated Stripe payment
- 📊 **Application Tracking** - Monitor application status (Pending → Processing → Completed)
- ⭐ **Review System** - Rate and review scholarships after completion
- 👤 **Profile Management** - Update personal information anytime

### For Moderators
- 📋 **Application Management** - Review, approve, or reject student applications
- 💬 **Feedback System** - Provide feedback on applications
- 🔄 **Status Updates** - Change application status with one click
- 🗑️ **Content Moderation** - Delete inappropriate reviews

### For Admins
- ➕ **Scholarship Management** - Add, update, and delete scholarships
- 👥 **User Management** - Manage all users, change roles, delete accounts
- 📈 **Analytics Dashboard** - View platform statistics with charts
- 🎛️ **Full Control** - Access to all platform features

### General Features
- 🔐 **Secure Authentication** - Firebase Auth with email/password and Google login
- 💳 **Stripe Payment** - Secure payment processing for application fees
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🎨 **Modern UI** - Beautiful design with smooth animations
- 🔒 **Role-Based Access** - Different dashboards for different user roles

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Recharts** - Charts & graphs
- **Lucide React** - Icons

### Authentication & Payment
- **Firebase** - Authentication (Email/Password + Google)
- **Stripe** - Payment processing

### Backend Integration
- **REST API** - Connected to Express.js backend
- **JWT** - Token-based authentication

## 📦 NPM Packages

```json
{
  "@stripe/react-stripe-js": "^3.6.1",
  "@stripe/stripe-js": "^7.3.0",
  "axios": "^1.9.0",
  "firebase": "^11.9.0",
  "framer-motion": "^12.12.1",
  "lucide-react": "^0.511.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.1",
  "recharts": "^2.15.3",
  "tailwindcss": "^4.1.8"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/scholarstream-client.git
cd scholarstream-client
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Run development server
```bash
npm run dev
```

## 👤 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@scholarstream.com | Admin@123 |
| Moderator | moderator@scholarstream.com | Mod@1234 |
| Student | student@scholarstream.com | Student@123 |

## 📁 Project Structure

```
src/
├── components/
│   ├── home/          # Homepage components
│   ├── layout/        # Navbar, Footer, DashboardLayout
│   └── scholarship/   # ScholarshipCard, Filters
├── contexts/          # AuthContext
├── hooks/             # Custom hooks
├── pages/
│   ├── auth/          # Login, Register
│   ├── checkout/      # Payment pages
│   ├── dashboard/     # Admin, Moderator, Student dashboards
│   └── scholarships/  # Scholarship listing & details
├── routes/            # Route configurations
└── services/          # API services
```

## 🎨 Design Highlights

- Modern glassmorphism effects
- Smooth page transitions with Framer Motion
- Consistent color scheme (Purple/Indigo theme)
- Accessible and SEO-friendly
- Dark mode ready architecture

## 📄 License

This project is created for educational purposes.

---

**Crafted with ❤️ by Mahmud**
