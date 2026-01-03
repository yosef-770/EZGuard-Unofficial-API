# EZGuard Unofficial API Wrapper (Node.js)

[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![ES Modules](https://img.shields.io/badge/ES%20Modules-Yes-brightgreen.svg)](https://nodejs.org/api/esm.html)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This project provides a convenient API wrapper for working with the EZGuard system through browser-like communication.  
The goal is to enable simple access to data such as incident reports, forms, patrols, and more – using Node.js.

---

## ⚠️ Important Notice

**This is NOT an official project** by Wizelink / EZGuard.  
- It has no business or technical affiliation with the company
- The project is based on reverse engineering of the communication between the client and the system
- **Use of this project is at your own risk**

---

## 🎯 What Does This Project Do?

✅ **Provides a Node.js server with a convenient REST API**  
✅ **Manages communication with the EZGuard system**  
✅ **Enables retrieval and management of data**:
   - 📋 Incidents
   - 📝 Forms
   - 📊 Reports
   - 🔍 Additional details

✅ **Modern Architecture**:
   - 🏗️ Modular code structure
   - 🔐 Smart authentication management (token reuse)
   - 🔄 ES Modules
   - 🐳 Full Docker support
   - 🔒 Auth middleware
   - 📦 Separation of concerns (services/controllers/routes)

---

## 📋 Prerequisites

- **Node.js** 20 or higher
- **npm** or **yarn**
- **Docker** (optional, but recommended)
- Active EZGuard account

---

## 🚀 Installation

### Method 1: Standard Installation

```bash
# Clone the project
git clone <repository-url>
cd api-ezguard-main

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit the `.env` file with your details:
```env
TOKEN=your_api_token_here
EZGUARD_EMAIL=your_email@example.com
EZGUARD_PASSWORD=your_password
EZGUARD_API_BASE_URL=https://webapi.ez-guard.com/v3
PORT=3050
```

### Method 2: Docker (Recommended)

```bash
# Clone the project
git clone <repository-url>
cd api-ezguard-main

# Create environment file
cp .env.example .env
# Edit .env with your details

# Run with Docker Compose
docker-compose up -d
```

📖 **Detailed Docker Guide**: See [DOCKER.md](DOCKER.md)

---

## ▶️ Running the Project

### Standard Run

```bash
node server.js
```

Expected output:
```
[dotenv] injecting env (5) from .env
✓ Connected to EzGuard successfully
Server is running on port 3050
```

### Running with Docker

```bash
# Start
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 🔌 API Usage

All requests require an authentication header:
```
Authorization: Bearer YOUR_TOKEN
```

### Examples

#### Get Incidents
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:3050/incidents?timestamp=2024-01-01T00:00:00Z&offset=0&limit=30"
```

#### Get Specific Incident
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:3050/incidents/12345"
```

#### Get Forms
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:3050/forms?timestamp=2024-01-01T00:00:00Z&offset=0&limit=30"
```

#### Get Specific Form
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:3050/forms/67890"
```

---

## 📁 Project Structure

```
api-ezguard-main/
├── config.js                 # Environment variables management
├── server.js                 # Main Express server
├── .env                      # Environment variables (not in git)
├── .env.example             # Environment variables example
│
├── middleware/
│   └── auth.js              # JWT/Token authentication
│
├── routes/
│   ├── incidents.js         # Incidents routing
│   └── forms.js             # Forms routing
│
├── controllers/
│   ├── incidentsController.js
│   ├── formSubmissionsController.js
│   └── ncidentDetailsController.js
│
├── services/
│   ├── EzGuardClient.js     # HTTP client for EZGuard communication
│   ├── AuthManager.js       # ⭐ Smart authentication management (singleton)
│   ├── incidents.js         # Incidents logic
│   ├── incidentDetails.js
│   ├── formSubmissions.js
│   └── formSubmissionDetails.js
│
├── Dockerfile               # Docker image definition
├── docker-compose.yml       # Docker Compose configuration
├── .dockerignore           # Files to ignore in build
└── DOCKER.md               # Detailed Docker guide
```

---

## ⚡ Special Features

### 🔐 Smart Authentication Management (AuthManager)

The project includes an advanced authentication management mechanism:

- ✅ Single connection on first startup
- ✅ Reuses active token
- ✅ Automatic refresh when token expires
- ✅ Improved performance

### 🎨 ES Modules

The project uses modern ES Modules:
```javascript
import express from 'express';
export default router;
```

Instead of legacy CommonJS:
```javascript
const express = require('express');
module.exports = router;
```

### 🔒 Security

- ✅ Environment variables (`.env`)
- ✅ Token-based authentication
- ✅ Properly configured `.gitignore`
- ✅ `.dockerignore` for secure builds

---

## 🌍 Environment Variables

### Variables Explanation

**🔑 EZGuard Authentication** (dedicated API user):
- `EZGUARD_EMAIL` - Email of a user in the EZGuard system
- `EZGUARD_PASSWORD` - User password

**⚠️ Important**: The user **cannot** have two-factor authentication (2FA) enabled.  
**Recommendation**: Create a dedicated user with a strong password without 2FA for the API, while other regular users in the organization should have 2FA enabled.

**🔐 Authentication for Our Proxy Server**:
- `TOKEN` - A token that **you choose** to secure access to your API server
  - This is **NOT a token from EZGuard**
  - This is your token to protect your server
  - Example: `my-secret-token-123`

---

### Variables Table

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TOKEN` | API authentication token | ✅ | - |
| `EZGUARD_EMAIL` | EZGuard login email | ✅ | - |
| `EZGUARD_PASSWORD` | EZGuard password | ✅ | - |
| `EZGUARD_API_BASE_URL` | Base API URL | ❌ | `https://webapi.ez-guard.com/v3` |
| `PORT` | Server port | ❌ | `3050` |
| `EXTERNAL_PORT` | External port (Docker only) | ❌ | `3050` |

---

## 🐳 Docker

The project includes full Docker support:

- **Multi-stage build** for optimization
- **Alpine Linux** for minimal size
- **Built-in health checks**
- **Docker Compose** for convenient management

For detailed information: [DOCKER.md](DOCKER.md)

---

## 🛠️ Development

### Adding a New Endpoint

1. Create a service in `services/`
2. Create a controller in `controllers/`
3. Create a route in `routes/`
4. Register the route in `server.js`

### Running Tests

```bash
npm test  # (not yet configured)
```

---

## 📝 License

Apache License 2.0

See [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📞 Support

- 🐛 Bug reports: Open an Issue
- 💡 Ideas: Open a Discussion
- ❓ Questions: See the documentation

---

## ⚠️ Disclaimer

This project is not approved, supported, or affiliated in any way with Wizelink or EZGuard.  
Use at your own risk.

---

**Built with ❤️ using Node.js & Express**
