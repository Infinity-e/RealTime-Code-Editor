import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

// Create a Room
router.post("/create", async (req, res) => {
  const { roomId } = req.body;
  try {
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) return res.status(400).json({ message: "Room already exists" });

    const newRoom = new Room({ roomId, participants: [] });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Join a Room
router.post("/join", async (req, res) => {
  const { roomId, name } = req.body;
  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.participants.push({ name });
    await room.save();
    res.status(200).json({ message: "Joined room", room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch Room Data
router.get("/:roomId", async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId });
    if (!room) return res.status(404).json({ message: "Room not found" });

    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
