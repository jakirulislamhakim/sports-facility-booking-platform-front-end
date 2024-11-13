# Sports Facility Booking Platform (Frontend)

[Live Site](https://sprorts-facility-booking-platform.vercel.app) |
[Backend Repository](https://github.com/jakirulislamhakim/sports-facility-booking-platform--backend)

### Admin Credentials

Use the following credentials to log in as an admin:

- **Email**: `hakim@gmail.com`
- **Password**: `strongPassword`

## Table of Contents

- [Important Links](#important-links)
- [Usage](#usage)
  - [Admin Credentials](#admin-credentials)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Additional Features](#additional-features)
- [Getting Started](#getting-started)

  - [Installation](#installation)
  - [Running the Application](#running-the-application)

---

## Project Overview

The **Sports Facility Booking Platform** is a responsive, secure web application allowing users to book sports facilities online. It includes functionality for facility searching, filtering, and booking, with a seamless payment process via Ammar Pay. This frontend is built with TypeScript, React, and Ant Design, ensuring a smooth and user-friendly experience.

## Key Features

- **Facility Management**:
  - Facility searching, filtering, and pagination.
  - Only registered users can book facilities and share experiences.
- **User Management**:
  - User profiles with dynamic dashboards for both users and admins.
  - Secure login, registration, and protected routes.
- **Booking System**:
  - Availability checking for bookings.
  - Only allows bookings up to 3 months in advance; prevents booking for past dates.
  - Payment integration with Ammar Pay for secure transactions.
- **Admin Capabilities**:
  - Facility and booking management.
  - Ability to create new admin accounts.
- **Dynamic UI Elements**:
  - Customizable sidebar based on user/admin roles.
  - Real-time error handling with clear success/error messages.
- **Contact Us**:
  - Send inquiries via a contact form with email notifications.
  - Embedded map displaying the office location.

## Technologies Used

- **Frontend**: React, TypeScript, Ant Design
- **Forms and Validation**: React Hook Form, Zod
- **State Management**: Redux Toolkit
- **SEO**: Dynamic page titles with React Async Helmet
- **Deployment**: Vercel (Frontend)

## Additional Features

- **Security**: Role-based access and secure routes ensure user data protection.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **SEO**: Dynamic titles for each page, enhancing discoverability.
- **User Feedback**: Custom success and error messages for user interactions.
- **Error Handling**: Dedicated error and unauthorized access pages.

## Getting Started

To run this project locally, follow these instructions.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jakirulislamhakim/sports-facility-booking-platform-front-end
   cd sports-facility-booking-platform-front-end
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the app in development mode:

```bash
npm run dev
```
