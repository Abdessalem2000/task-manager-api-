# 🚀 SaaS Analytics Dashboard API

A professional Node.js Backend with structured architecture and strong data validation.

## 🛠️ Tech Stack
- **Node.js & Express**: Core framework.
- **Joi**: Schema-based validation for all requests.
- **MongoDB**: Database for Users and Tasks.

## 🔒 Key Features
- **Centralized Error Handling**: Unified error response format.
- **Strong Validation**: Protected routes against malformed IDs and missing fields.
- **Clean Architecture**: Separation of concerns (MVC Pattern).

## 📖 API Endpoints
### Auth
- `POST /api/v1/auth/register` - Create new user.
- `POST /api/v1/auth/login` - User authentication.

### Tasks
- `POST /api/v1/tasks` - Create task (Validated).
- `PUT /api/v1/tasks/:id` - Update task (Validated ID).
- `DELETE /api/v1/tasks/:id` - Remove task (Validated ID).

## 🚀 Deployment
The API is deployed on **Render** and connected to **MongoDB Atlas**.

- **Base URL:** `https://task-manager-api-x8q7.onrender.com/api/v1`
- **Status:** Live ✅

> **Note:** Since this is hosted on a free tier, the first request might take a few seconds to wake up the server.
