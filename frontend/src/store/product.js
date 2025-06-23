import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async( newProduct ) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return { success: false, message: 'Please fill in all fields'}
        }
        const res = await fetch(`http://localhost:5000/api/products`, { method: "POST", headers: {"Content-Type": "application/json",  "Access-Control-Allow-Origin": "*" }, body: JSON.stringify(newProduct)})
        const data = await res.json();
        set((state) => ({ products:[...state.products, data.data]}))
        return { success: true, message: 'Product created successfully' }
    },
    fetchProducts: async() => {
        const res = await fetch(`http://localhost:5000/api/products`)
        const data = await res.json();
        if(!data.success){
            return { success: false, message: data.message}
        }   
        set({ products: data.data })
    },
    updateProduct: async(productId, updatedProduct) => {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`, { method: "PUT", headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }, body: JSON.stringify(updatedProduct)})
        const data = await res.json();
        if(!data.success){
            return { success: false, message: data.message}
        }   
        set((state) => ({ products: state.products.map(product => product._id === productId ? data.data : product) }));
        return { success: true, message: data.message }
    },
    deleteProduct: async(productId) => {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`, { method: "DELETE" });
        const data = await res.json();
        if(!data.success){
            return { success: false, message: data.message}
        }   
        set((state) => ({ products: state.products.filter(product => product._id !== productId) }));
        if(!data.success){
            return { success: false, message: data.message}
        }   
        return { success: true, message: data.message }
    }
}));