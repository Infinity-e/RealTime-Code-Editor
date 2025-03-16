import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api"

const Sidebar = () => {
  const users = useQuery(api.rooms.getUsersInRoom); // Fetch connected users

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 border-r border-gray-800">
      <h2 className="text-xl font-semibold mb-4">Connected Users</h2>
      <div className="space-y-3">
        {users?.length ? (
          users.map((user) => (
            <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-800">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium">{user.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No users online</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
