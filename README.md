# EZGuard Unofficial API Wrapper

[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Unofficial Node.js API wrapper for the EZGuard security management system.

## ⚠️ Disclaimer

This is **NOT an official project** by Wizelink/EZGuard. It's based on reverse engineering and provided as-is. Use at your own risk.

---

## Features

- REST API for EZGuard data (incidents, forms, reports)
- Smart authentication with token reuse
- Docker support
- ES Modules

---

## Prerequisites

- Node.js 20+
- Active EZGuard account (without 2FA)
- Docker (optional)

---

## Installation

```bash
# Clone the project
git clone https://github.com/yosef-770/EZGuard-Unofficial-API.git
cd EZGuard-Unofficial-API

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials
```

### Environment Variables

Create a `.env` file:

```env
# Your authentication token for this API server (choose any)
TOKEN=your-secret-token-here

# EZGuard credentials (user must NOT have 2FA enabled)
EZGUARD_EMAIL=your_email@example.com
EZGUARD_PASSWORD=your_password

# Optional
EZGUARD_API_BASE_URL=https://webapi.ez-guard.com/v3
PORT=3050
```

**Important**: 
- `TOKEN` is YOUR token to protect this API server (not from EZGuard)
- EZGuard user must have 2FA disabled
- Recommendation: Create a dedicated API user without 2FA, keep 2FA enabled for regular users

---

## Usage

### Standard Run

```bash
node server.js
```

### Docker

```bash
docker-compose up -d
```

See [DOCKER.md](DOCKER.md) for detailed Docker instructions.

---

## API Endpoints

All requests require: `Authorization: Bearer YOUR_TOKEN`

### Incidents

```bash
# List incidents
GET /incidents?timestamp=2024-01-01T00:00:00Z&offset=0&limit=30

# Get specific incident
GET /incidents/:id
```

### Forms

```bash
# List forms
GET /forms?timestamp=2024-01-01T00:00:00Z&offset=0&limit=30

# Get specific form
GET /forms/:id
```

### Example

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:3050/incidents?timestamp=2024-01-01T00:00:00Z"
```

---

## Project Structure

```
├── config.js              # Environment configuration
├── server.js              # Express server
├── middleware/
│   └── auth.js           # Authentication
├── routes/
│   ├── incidents.js
│   └── forms.js
├── controllers/          # Request handlers
├── services/
│   ├── EzGuardClient.js  # HTTP client
│   └── AuthManager.js    # Authentication manager
├── Dockerfile
└── docker-compose.yml
```

---

## Development

### Adding an Endpoint

1. Create service in `services/`
2. Create controller in `controllers/`
3. Create route in `routes/`
4. Register route in `server.js`

---

## License

Apache License 2.0 - See [LICENSE](LICENSE)

---

## Contributing

Pull requests welcome. For major changes, open an issue first.

---

## Support

- 🐛 Issues: [GitHub Issues](https://github.com/yosef-770/EZGuard-Unofficial-API/issues)
- 📖 Documentation: [DOCKER.md](DOCKER.md)

---

**Not affiliated with Wizelink or EZGuard**
