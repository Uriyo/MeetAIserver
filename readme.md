# LiveKit Token Service

This is a simple Express-based backend service that generates LiveKit access tokens for participants and notifies a bot service when a participant joins a room.

## Features
- Generates JWT tokens for LiveKit participants.
- Notifies a bot service to join the room when a participant joins.
- Implements CORS to allow cross-origin requests.

## Prerequisites
Make sure you have the following installed:
- Node.js (v14 or later)
- npm or yarn

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Environment Variables
Create a `.env` file in the project root and add the following variables:
```env
LIVEKIT_API=<your_livekit_api_key>
LIVEKIT_SECRET=<your_livekit_secret_key>
BOT_SERVICE_URL=<your_bot_service_url>
```

## Usage

Start the server:
```sh
npm start
```
The server will run on `http://localhost:3001` by default.

### API Endpoints

#### Get LiveKit Token
```
GET /getToken?participantName=<name>&roomName=<room>
```
- **Parameters:**
  - `participantName`: The name of the participant.
  - `roomName`: The name of the LiveKit room.
- **Response:**
  ```json
  {
    "success": true,
    "token": "<jwt_token>"
  }
  ```

