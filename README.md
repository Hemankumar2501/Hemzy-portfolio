# Hemankumar - AI Engineer Portfolio

A modern, interactive portfolio website showcasing AI & Data Science projects with a gaming-inspired level-based design.

## 🎮 Features

- **Level-Based Design**: Gaming-inspired progression system showing your journey from Level 1 to Level 4
- **Interactive 3D Models**: 
  - Goku model in Hero section (mouse/touch interactive)
  - Luffy hat in Skills section (auto-rotating)
- **Smooth Animations**: GSAP-powered scroll animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Single Page Application**: Smooth scrolling navigation

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: GSAP (GreenSock)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📦 Project Structure

```
app/
├── public/              # Static assets
│   ├── son_goku.glb    # 3D Goku model
│   ├── luffy_hat.glb   # 3D Luffy hat model
│   ├── profile_photo.jpg
│   ├── project_*.jpg   # Project images
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── 3d/         # 3D model components
│   │   └── Navigation.tsx
│   ├── sections/       # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Certifications.tsx
│   │   ├── GitHubStats.tsx
│   │   ├── Process.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── App.tsx         # Main app component
│   ├── App.css         # App-specific styles
│   ├── index.css       # Global styles
│   └── main.tsx        # Entry point
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd app
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open http://localhost:5173/ in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📱 Sections

1. **Hero** - Level 4 player profile with stats (111 XP, 1398 rating)
2. **About** - Player journey timeline from Level 1-4
3. **Skills** - Interactive skill tree with 8 tech skills
4. **Projects** - Quest archive with 5 completed projects
5. **Certifications** - Achievement badges
6. **Stats** - LeetCode & GitHub statistics
7. **Process** - Development workflow
8. **Testimonials** - Client feedback
9. **Contact** - Get in touch form
10. **Footer** - Quick links and social media

## 🎯 Key Highlights

- **Level 4 Student**: 4th year BTech AI & Data Science
- **111 Problems Solved**: LeetCode rating 1398
- **8+ Skills Mastered**: Python, ML, Deep Learning, SQL, Data Analysis, AWS, Excel, AI
- **5 Quests Completed**: 3,900 XP earned from projects
- **34 Repositories**: Active GitHub contributor

## 📧 Contact

- **Email**: hemankumar.chandrasekar@gmail.com
- **Phone**: +91 9444969550
- **LinkedIn**: [hemankumar-c-264b0429b](https://www.linkedin.com/in/hemankumar-c-264b0429b/)
- **GitHub**: [Hemankumar2501](https://github.com/Hemankumar2501)

## 📄 License

© 2026 Hemankumar C. All rights reserved.

---

Built with ❤️ using React + Three.js + GSAP
