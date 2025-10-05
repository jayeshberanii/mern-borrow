import { User } from "@/types/common";

interface Props {
  users: User[];
  selectedUser: string;
  onChange: (userId: string) => void;
}

const UserSelect: React.FC<Props> = ({ users, selectedUser, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Select User</label>
      <select
        value={selectedUser}
        onChange={(e) => onChange(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">-- Select User --</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>
      <p className="text-sm text-gray-500 mt-1">
        A user can borrow up to 2 books.
      </p>
    </div>
  );
};

export default UserSelect;
