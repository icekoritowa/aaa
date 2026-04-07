import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const productsApi = {
  async getAll() {
    const response = await apiClient.get("/products");
    return response.data;
  },

  async create(product) {
    const response = await apiClient.post("/products", product);
    return response.data;
  },

  async update(id, product) {
    const response = await apiClient.patch(`/products/${id}`, product);
    return response.data;
  },

  async remove(id) {
    await apiClient.delete(`/products/${id}`);
  },
};
