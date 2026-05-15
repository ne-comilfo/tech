import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "@consta/uikit/Table";
import type { TableColumn } from "@consta/uikit/Table";
import { Pagination } from "@consta/uikit/Pagination";
import { Select } from "@consta/uikit/Select";
import { Loader } from "@consta/uikit/Loader";
import { api } from "../../api/axios";
import "./PostTable.css";

type PostResponse = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

type PostRow = {
  id: string;
  title: string;
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

export const PostTable = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<LimitItem>(limitItems[0]);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/posts?page=${page}&per_page=${limit.id}`)
      .then((res) => {
        const mappedPosts = res.data.map((post: PostResponse) => ({
          id: String(post.id),
          title: post.title,
        }));
        setPosts(mappedPosts);
        setTotalPages(parseInt(res.headers["x-pagination-pages"], 10) || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, limit]);

  const columns: TableColumn<PostRow>[] = [
    { title: "ID", accessor: "id" },
    { title: "Заголовок", accessor: "title" },
  ];

  if (loading) return <Loader />;

  return (
    <div className="table-container">
      <Table
        rows={posts}
        columns={columns}
        onRowClick={({ id }) => navigate(`/posts/${id}`)}
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
