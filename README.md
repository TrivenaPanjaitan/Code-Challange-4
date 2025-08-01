# 🌍 Code Challenge 4 – Travel Article App

This is a travel article web application built as part of a frontend technical test. Users can **create**, **read**, **update**, and **delete** travel articles. The app includes features like infinite scroll, filtering by title and category, and responsive UI.

## ✨ Live Demo

🔗 [Deployed on Vercel](https://code-challange-4.vercel.app/)

## 📁 Repository

🔗 [GitHub Repo (Public)](https://github.com/TrivenaPanjaitan/Code-Challange-4)

---

## 🧰 Tech Stack

- **Next.js 14+** with App Router
- **TypeScript**
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Zod** & **React Hook Form** for form validation
- **Axios** for API calls
- **Strapi-style REST API**
- **Vercel** for deployment

---

## 📦 Project Structure

```
.
├── app/                  # App Router Pages
│   ├── page.tsx         # Homepage with article list & filter
│   ├── create/page.tsx  # Create article page
│   ├── edit/[id]/       # Edit article page
│   └── detail/[id]/     # Detail view page
├── components/          # Shared UI components
│   ├── ArticleCard.tsx
│   ├── LogoutButton.tsx
│   ├── modals/          # Success & Error Modals
│   └── skeleton/        # Loading skeletons
├── lib/                 # API services
│   └── article.ts
├── store/               # Zustand stores
│   └── articleStore.ts
│   └── categoryStore.ts
├── types/               # Type definitions
├── public/icons/        # Static icons
└── ...
```

---

## ⚙️ Installation & Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/TrivenaPanjaitan/Code-Challange-4.git
cd Code-Challange-4
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Set environment variable

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api
```

> 🔐 Make sure the API endpoint is publicly accessible.

### 4. Run the development server

```bash
yarn dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🧪 Features Implemented

- ✅ Infinite scroll with Intersection Observer
- ✅ Filter by title and category
- ✅ Loading skeletons for better UX
- ✅ Error and success modal feedback
- ✅ Protected route check (simple localStorage token)
- ✅ CRUD operations for articles
- ✅ Responsive UI with dark mode support

---

## 📝 Notes

- Authentication token is stored in `localStorage`.
- Basic session check is performed on initial load (logout on 401).
- Modal actions are customizable with optional `onClose`/`onOk` handlers.

---

## 🧑 Author

**Trivena Panjaitan**  
Frontend Developer  
✉️ [LinkedIn](https://www.linkedin.com/in/trivenapanjaitan/) *(optional)*

---

## 📄 License

This project is for technical test purposes only and not intended for production use.