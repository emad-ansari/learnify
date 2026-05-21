# 🚀 Learnify — Modern E-Learning Mobile App

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.7+-61DAFB?style=for-the-badge\&logo=react)
![Expo](https://img.shields.io/badge/Expo-Framework-000020?style=for-the-badge\&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-593D88?style=for-the-badge)
![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge\&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge\&logo=postgresql\&logoColor=white)

### A modern, elegant, and production-ready e-learning mobile application built with React Native and Expo.

</div>

---

# ✨ Features

## 🔐 Authentication

* Secure user authentication
* Sign In & Sign Up screens
* Persistent login session
* Zustand-based auth management

## 📚 Course System

* Explore all available courses
* Featured courses carousel
* Popular courses section
* Course detail pages
* Real-time search functionality
* Category-based filtering
* Pull-to-refresh support

## 🎨 Premium UI/UX

* Smooth animations using Reanimated
* Modern clean mobile UI
* Skeleton loading states
* Responsive layouts
* Beautiful card-based design
* Production-level loading experience

## 👤 Profile System

* User profile dashboard
* Upload avatar/profile picture
* Cloudinary image upload integration
* Learning progress overview
* Statistics section

## 📖 Learning Features

* Enrolled courses tracking
* Course progress tracking
* Current learning section
* Bookmark-ready architecture

# 📱 App Screens

## 🔑 Authentication Screens

<p align="center">
  <img src="./frontend/assets/screens/login-screen.png" width="230" />
  <img src="./screenshots/signup.png" width="230" />
</p>

---

## 🏠 Main Screens

<p align="center">
  <img src="./frontend/assets/screens/home-screen.png" width="230" />
  <img src="./frontend/assets/screens/explore-screen.png" width="230" />
</p>

<p align="center">
  <b>Home Screen</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Explore Screen</b>
</p>

### Features:
- Featured course carousel
- Category filters
- Debounced search
- Smooth animations
- Skeleton loaders

---

## 👤 Profile & Learning

<p align="center">
  <img src="./frontend/assets/screens/profile-screen.png" width="230" />
  <img src="./frontend/assets/screens/course-details.png" width="230" />
</p>

<p align="center">
  <b>Profile Screen</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Course Details</b>
</p>

### Features:
- Avatar upload
- Learning statistics
- Course details
- Progress tracking

# 🛠️ Tech Stack

## Frontend

* React Native
* Expo
* TypeScript
* Expo Router
* Zustand
* React Native Reanimated
* NativeWind
* Moti
* Expo Image Picker
* React Native Toast Message

## Backend

* Node.js
* Express.js
* PostgreSQL
* Drizzle ORM
* JWT Authentication
* Cloudinary

---

# ⚡ Performance Optimizations

* Optimized FlatList rendering
* Debounced search requests
* Skeleton loading states
* Memoized components
* Efficient Zustand store structure
* Smooth animations with Reanimated
* Lazy image loading

---

# 📂 Project Structure

```bash
learnify/
│
├── app/
│   ├── (auth)/
│   ├── (tabs)/
│   ├── course-details/
│   └── _layout.tsx
│
├── components/
│   ├── skeletons/
│   ├── ui/
│   └── cards/
│
├── store/
│   ├── useAuthStore.ts
│   ├── useCourseStore.ts
│   └── useProfileStore.ts
│
├── api/
├── assets/
├── hooks/
└── utils/
```

---

# ☁️ Cloudinary Avatar Upload

The app supports real-time profile image uploads using Cloudinary.

## Features

* Pick image from gallery
* Crop image before upload
* Upload directly to Cloudinary
* Save image URL in backend
* Instant UI update after upload

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/learnify.git
cd learnify
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file in the frontend:

```env
EXPO_PUBLIC_API_URL=your_backend_url
EXPO_PUBLIC_CLOUDINARY_URL=your_cloudinary_upload_url
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

## 4️⃣ Run App

```bash
npx expo start
```

---

# 📸 Adding Screenshots

Create a folder named:

```bash
/screenshots
```

Then add images:

```bash
signin.png
signup.png
home.png
explore.png
search.png
course-details.png
profile.png
```

---

# 🌟 Future Improvements

* Video player integration
* Course certificates
* Payment gateway integration
* Dark mode support
* Offline downloads
* Push notifications
* AI-based recommendations
* Wishlist system
* Instructor dashboard

---

# 🤝 Contributing

Contributions are welcome!

Feel free to fork this project and improve it.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

### Mohammad Emad

Passionate Full Stack & Mobile App Developer focused on building clean, modern, and user-friendly applications.

---

<div align="center">

### ⭐ If you like this project, give it a star on GitHub ⭐

</div>
