import Link from "next/link";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      cache: "no-store", // Prevent caching for development purposes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }

    const users: User[] = await res.json();

    // Sort users based on the sortOrder
    const sortedUsers = sort(users).asc(
      sortOrder === "email" ? (user) => user.email : (user) => user.name
    );

    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              <Link href="/users?sortOrder=name">Name</Link>
            </th>
            <th>
              <Link href="/users?sortOrder=email">Email</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } catch (error) {
    console.error("Error fetching or sorting users:", error);

    // Return a fallback UI in case of error
    return (
      <p className="text-danger">
        Failed to load user data. Please try again later.
      </p>
    );
  }
};

export default UserTable;
