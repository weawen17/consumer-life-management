"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products"); // API 엔드포인트
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "productCode", headerName: "Product Code", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "price", headerName: "Price", width: 120, type: "number" },
    { field: "discount", headerName: "Discount", width: 120, type: "number" },
    { field: "status", headerName: "Status", width: 150 },
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

  const handleEdit = (product) => {
    console.log("Edit product:", product);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid rows={products} columns={columns} loading={loading} />
    </div>
  );
};

export default ProductList;
