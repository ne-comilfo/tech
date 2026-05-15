import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "@consta/uikit/Table";
import type { TableColumn } from "@consta/uikit/Table";
import { Pagination } from "@consta/uikit/Pagination";
import { Select } from "@consta/uikit/Select";
import { Loader } from "@consta/uikit/Loader";
import { api } from "../../api/axios";
import "./UserTable.css";

type UserResponse = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

type UserRow = {
  id: string;
  name: string;
  email: string;
};

type LimitItem = {
  label: string;
  id: number;
};

const limitItems: LimitItem[] = [
  { label: "10", id: 10 },
  { label: "25", id: 25 },
  { label: "50", id: 50 },
];

export const UserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<LimitItem>(limitItems[0]);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/users?page=${page}&per_page=${limit.id}`)
      .then((res) => {
        const mappedUsers = res.data.map((user: UserResponse) => ({
          id: String(user.id),
          name: user.name,
          email: user.email,
        }));
        setUsers(mappedUsers);
        setTotalPages(parseInt(res.headers["x-pagination-pages"], 10) || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, limit]);

  const columns: TableColumn<UserRow>[] = [
    { title: "ID", accessor: "id" },
    { title: "Имя", accessor: "name" },
    { title: "Email", accessor: "email" },
  ];

  if (loading) return <Loader />;

  return (
    <div className="table-container">
      <Table
        rows={users}
        columns={columns}
        onRowClick={({ id }) => navigate(`/users/${id}`)}
      />
      <div className="pagination-container">
        <Pagination value={page} onChange={setPage} items={totalPages} />
        <Select
          items={limitItems}
          value={limit}
          onChange={(value) => {
            if (value) {
              setLimit(value);
              setPage(1);
            }
          }}
          getItemLabel={(item) => item.label}
          getItemKey={(item) => item.id}
        />
      </div>
    </div>
  );
};
