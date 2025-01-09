"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";

const MartList = () => {
  const [marts, setMarts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMarts = async () => {
    try {
      const response = await fetch("/api/marts"); // API 엔드포인트
      const data = await response.json();
      setMarts(data);
    } catch (error) {
      console.error("Failed to fetch marts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarts();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "remark", headerName: "Remark", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const handleEdit = (mart) => {
    console.log("Edit mart:", mart);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/marts/${id}`, { method: "DELETE" });
      setMarts((prev) => prev.filter((mart) => mart.id !== id));
    } catch (error) {
      console.error("Failed to delete mart:", error);
    }
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid rows={marts} columns={columns} loading={loading} />
    </div>
  );
};

export default MartList;
