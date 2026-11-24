# TiffinDesk – Full Stack Restaurant Management Application

## Project Overview
TiffinDesk is a restaurant management application developed to simplify daily restaurant operations through a user-friendly dashboard.
The application provides features to manage menu items, track customer orders, update order statuses, and view basic restaurant statistics.
This project was developed to gain practical experience in frontend development, backend API development, application architecture, and CRUD operations.

## Technologies Used
### Frontend
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite
- React Hooks (useState and useEffect)
- Browser Local Storage
### Backend
- Python
- FastAPI
- Pydantic
- REST API
- In-memory data management

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Postman / Swagger UI

## Key Features
### 1. Dashboard
- Displays basic restaurant statistics.
- Provides an overview of menu items and orders.
- Presents important information in an organized interface.

### 2. Menu Management
- View available menu items.
- Add new menu items.
- Update existing menu details.
- Delete menu items.

### 3. Order Management
- View customer orders.
- Create new orders.
- Track order information.
- Update order statuses.
- Delete orders.

### 4. Backend API Development
- Developed RESTful APIs using Python and FastAPI.
- Implemented CRUD operations for menu and order management.
- Added request validation using Pydantic.
- Implemented error handling for invalid requests and missing records.
- Organized backend functionality into reusable API operations.

## Project Structure
Prac_proj/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── main.py
│   ├── data.py
│   └── requirements.txt
│
└── README.md


## REST API Endpoints

The backend provides the following API endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API welcome message |
| GET | `/dashboard/stats` | Retrieve dashboard statistics |
| GET | `/menu` | Get all menu items |
| GET | `/menu/{item_id}` | Get a menu item by ID |
| POST | `/menu` | Add a new menu item |
| PUT | `/menu/{item_id}` | Update a menu item |
| DELETE | `/menu/{item_id}` | Delete a menu item |
| GET | `/orders` | Get all orders |
| GET | `/orders/{order_id}` | Get an order by ID |
| POST | `/orders` | Create a new order |
| PATCH | `/orders/{order_id}/status` | Update order status |
| DELETE | `/orders/{order_id}` | Delete an order |

## How to Run the Project Locally

### Prerequisites

Make sure the following tools are installed:

- Node.js and npm
- Python 3.10 or above
- Visual Studio Code
- Git

### 1. Clone the Repository
git clone https://github.com/Samyuktha-tech/Prac_proj.git

Navigate to the project folder:
cd Prac_proj


### 2. Run the Frontend

Open a terminal and execute:
cd frontend
npm install
npm run dev
Open the local development URL displayed in the terminal (usually http://localhost:5173).

### 3. Run the Backend

Open another terminal:
cd backend

Create a Python virtual environment:
python -m venv venv

Activate the environment on Windows:
venv\Scripts\activate

Install the required dependencies:
pip install "fastapi[standard]"


Start the FastAPI development server:
fastapi dev main.py

The backend will run at:
http://127.0.0.1:8000

### 4. Explore API Documentation

FastAPI provides interactive API documentation.

Open the following URL in your browser:
http://127.0.0.1:8000/docs

You can explore and test the available API endpoints using Swagger UI.

## Implementation Notes

- The frontend currently uses browser Local Storage for its application data.
- The FastAPI backend provides a separate REST API implementation.
- The frontend and backend are not yet connected through API integration.
- Backend data is currently stored in in-memory Python data structures rather than a persistent database.
- Backend data resets when the server restarts.

## Skills Demonstrated

Through this project, I gained practical experience in:

- Building reusable React components.
- Developing interactive user interfaces.
- Working with JavaScript and React Hooks.
- Implementing CRUD operations.
- Developing RESTful APIs using Python and FastAPI.
- Understanding client-server architecture.
- Handling application data and API validation.
- Organizing frontend and backend project structures.
- Using Git and GitHub for version control and source code management.
- Debugging and solving development issues.

## Future Improvements

- Integrate the React frontend with the FastAPI backend.
- Implement PostgreSQL database integration for persistent storage.
- Add user authentication and authorization.
- Improve application validation and error handling.
- Explore AI-powered features for restaurant management.

## Author

Samyuktha G V
GitHub: https://github.com/Samyuktha-tech


Note: This project was developed as a practical learning project to strengthen my frontend and backend development skills. 
I am continuously improving my technical knowledge and exploring new technologies to build better software applications.
