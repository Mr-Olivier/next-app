import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";

interface Props {
  searchParams: { sortOrder?: string }; // Added optional chaining for flexibility
}

const UsersPage = async ({ searchParams }: Props) => {
  const resolvedParams = await Promise.resolve(searchParams);
  const sortOrder = resolvedParams?.sortOrder || "name"; // Default to "name" if undefined

  return (
    <>
      <h1>Users</h1>
      <Link href="users/new" className="btn">
        New User
      </Link>
      <Suspense fallback={<p>Loading...</p>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UsersPage;
