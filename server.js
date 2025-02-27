import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { AccessToken } from 'livekit-server-sdk';

import 'dotenv/config'

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'], // Restrict methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
  }));
  

const createToken = async (participantName,roomName) => {
  if(roomName === undefined || roomName === null || roomName === '') {
    throw new Error('Room name is required');
  }
  if(participantName === undefined || participantName === null || participantName === '') {
     throw new Error ('Participant name is required');
  }
  
  const at = new AccessToken(process.env.LIVEKIT_API, process.env.LIVEKIT_SECRET, {
    identity: participantName,
    ttl: '1h',
  });
  

  at.addGrant({ roomJoin: true, room: roomName });
  
  return await at.toJwt();
};

const notifyBot = async (roomName) => {
  try {
    const url=process.env.BOT_SERVICE_URL;
    await axios.post(`${url}/join-room`, { roomName });
    console.log(`Bot notified to join room: ${roomName}`);
  } catch (error) {
    console.error('Error notifying bot service:', error.message);
  }
};

app.get(`/getToken`, async (req, res) => {
    try {
        const participantName = req.query.participantName;
        const roomName = req.query.roomName;
        const token = await createToken(participantName,roomName);
        res.json({ success: true, token });
        notifyBot(roomName);
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
