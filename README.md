# Sync Forms

A comprehensive form management system built with modern web technologies to streamline data collection, administration, and workflow management for educational institutions and organizations.

## 🚀 Features

- **Admin Dashboard**: Create, edit, and manage forms with an intuitive interface
- **Student Portal**: Secure form submission and response tracking
- **Real-time Synchronization**: Instant updates and data consistency across platforms
- **Authentication System**: Role-based access for admins and students
- **Responsive Design**: Optimized for desktop and mobile devices
- **Form Analytics**: Track submissions and responses in real-time

## 🛠 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_React-000000?style=for-the-badge&logo=lucide&logoColor=white)

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm
- Supabase account for backend services

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/darshan-pr/SyncForms.git
   cd SyncForms
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### For Administrators:
1. Navigate to `/auth/admin-login` to log in as an admin
2. Access the dashboard at `/admin/dashboard`
3. Create new forms at `/admin/forms/create`
4. Manage existing forms at `/admin/forms`
5. Edit forms at `/admin/forms/edit/[formId]`

### For Students:
1. Sign up or log in at `/auth/signup` or `/auth/login`
2. View available forms at `/student/home`
3. Fill out forms at `/student/forms/[formId]`

## 🏗 Project Structure

```
sync-forms/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin pages and routes
│   ├── auth/              # Authentication pages
│   ├── student/           # Student pages and routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── admin/            # Admin-specific components
│   └── student/          # Student-specific components
├── lib/                  # Utility functions and services
│   ├── authService.ts    # Authentication logic
│   ├── formService.ts    # Form management logic
│   └── supabaseClient.ts # Supabase client configuration
└── public/               # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
Build the project for production:
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using Next.js and Supabase
