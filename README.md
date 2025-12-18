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
