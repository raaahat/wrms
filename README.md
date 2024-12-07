Work Request Management System (WRMS)

🚀 About the Project
The Work Request Management System (WRMS) is a streamlined solution for managing work requests between operation departments and maintenance teams. The app enables teams to efficiently create, assign, and track requests in both normal and strict modes, providing real-time updates on timelines and roles.

✨ Problem It Solves
In industries with large-scale operations, managing maintenance requests often leads to miscommunication, delayed updates, and unclear accountability. WRMS solves these problems by:

Standardizing work request creation with unique identifiers (wrNo).
Assigning roles and permissions for maintenance managers, shift engineers, and operation engineers.
Providing an integrated timeline for tracking work progress in strict mode.
Ensuring seamless follow-up for unresolved issues via follow-up requests.
Simplifying role-based access control (RBAC) for secure and efficient management.
🛠️ Features
Role-Based Access Control (RBAC): Different roles for Managers, Shift Engineers, and Operation Engineers.
Strict Mode Tracking: Ensures timelines and responsibilities are clearly defined.
Dynamic Work Request Numbering: Generates unique wrNo with intelligent counters.
Real-Time Updates: Track assignments and status changes with timestamps.
Validation & Security: Powered by zod schema validation and Clerk for secure authentication.
Responsive Design: Mobile-first design using Tailwind CSS.
🧑‍💻 Tech Stack
Frontend: Next.js, Tailwind CSS
Backend: Server Actions in Next.js, Prisma ORM
Database: PostgreSQL (hosted on Neon)
Authentication: Clerk
Validation: Zod
State Management: Zustand
📦 Installation and Getting Started
Prerequisites
Node.js (v18+)
Bun (for efficient package management)
PostgreSQL (set up locally or use a managed service like Neon)
Steps to Run Locally
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/work-request-management-system.git
cd work-request-management-system
Install dependencies:

bash
Copy code
bun install
Set up the environment:

Create a .env file and configure the following variables:

env
Copy code
DATABASE_URL=your_postgres_connection_string
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key
Set up the database:

bash
Copy code
npx prisma migrate dev --name init
Run the development server:

bash
Copy code
bun dev
Open in your browser:

Navigate to http://localhost:3000.

📖 Usage
Creating a Work Request
Log in as an authorized user.
Navigate to the "New Work Request" page.
Fill out the required fields such as title, area, type (Electrical or Mechanical), and remarks.
Submit the form to generate a new work request.
Assigning Roles
Maintenance Managers can assign engineers to work requests.
Shift Engineers can oversee operation engineers in strict mode.
Viewing Timelines
Access the "Timeline" page to monitor strict mode work requests and track the progress of assignments and completions.

🏆 Why This Project Stands Out
Practical Use Case: Tackles real-world challenges in industrial operations.
Scalable Design: Built using modern frameworks and best practices.
Full-Stack Expertise: Demonstrates proficiency in backend, frontend, and database management.
Security-Oriented: Role-based access and robust validation to prevent misuse.
Job-Ready Features: Perfect for showcasing skills like:
Server Actions in Next.js
Prisma ORM for relational database modeling
Clerk for secure authentication and role management
🌟 Contributing
Contributions are welcome! Please fork the repo and submit a pull request for any feature suggestions or bug fixes.

Fork the repo
Create a feature branch: git checkout -b feature/your-feature
Commit your changes: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature
Submit a pull request
📄 License
This project is licensed under the MIT License.

👨‍💻 Showcase
Built with ❤️ by Rahat. If you found this project helpful, please give it a ⭐ on GitHub.
