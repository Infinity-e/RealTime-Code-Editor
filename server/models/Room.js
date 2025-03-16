import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  participants: [{ name: String }],
  code: { type: String, default: "" },
});

export default mongoose.model("Room", RoomSchema);

