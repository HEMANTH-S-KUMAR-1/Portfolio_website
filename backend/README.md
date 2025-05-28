# Portfolio Backend Service

This is the backend service for the portfolio website, handling protected calculations and sensitive operations.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### POST /calculate
- Input: `{ "input": number }`
- Output: `{ "result": number }`
- Protected calculation endpoint

### GET /health
- Output: `{ "status": "ok" }`
- Health check endpoint

## Deployment

### Option A: Render.com
1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables from `.env`

### Option B: Railway.app
1. Create new project
2. Connect your GitHub repository
3. Add environment variables
4. Deploy

### Option C: Vercel
1. Create new project
2. Connect your GitHub repository
3. Configure as a Node.js project
4. Add environment variables
5. Deploy

## Security Notes
- Keep your `.env` file private
- Never commit sensitive information to Git
- Use environment variables for all secrets 