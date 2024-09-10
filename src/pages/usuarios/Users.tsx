import Layout from "../../layout/layout";
import React, { useEffect, useState } from "react";

interface UserProps {
    username: string;
    email: string;
    role: string;
    createdAt: string;
}

//test
const initialState: UserProps[] = [
    {
        username: "John Doe",
        email: "john@example.com",
        role: "Admin",
        createdAt: "2022-01-01"
    },
    {
        username: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        createdAt: "2022-02-15"
    }
]



const UsersPage = () => {
    const [users] = useState<UserProps[]>(initialState);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchItem, setSearchItem] = useState('');
    const userPerPage = 10

    return (
        <Layout>
            <div>

            </div>
        </Layout>
  );
};

export default UsersPage;
