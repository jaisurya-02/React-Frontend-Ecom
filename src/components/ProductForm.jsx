import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductForm=({ onAddProduct })=>{
    const [productName,setProductName]=useState("");
    const handleNameChange =(e)=>{
        setProductName(e.target.value);
    }
    const [ImageURL,setImageURL]=useState("");
    const handleURLChange =(e)=>{
        setImageURL(e.target.value);
    }
    const [sellingPrice,setSellingPrice]=useState("");
    const handlePriceChange =(e)=>{
        setSellingPrice(e.target.value);
    }
    const [originalPrice,setOriginalPrice]=useState("");
    const handleOriginalPriceChange =(e)=>{
        setOriginalPrice(e.target.value);
    }
    const [category,setCategory]=useState("Electronics");
    const handleCategoryChange =(e)=>{
        setCategory(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        if (!productName || !ImageURL || !sellingPrice || !originalPrice) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/products', {
                name: productName,
                imageURL: ImageURL,
                selling_price: parseFloat(sellingPrice),
                original_price: parseFloat(originalPrice),
                category: category,
            });

            if (response.status === 201) {
                const created = response.data?.product || null;
                if (created) {
                    onAddProduct(created);
                }
                toast.success(`Product '${productName}' added successfully!`);
                
                setProductName("");
                setImageURL("");
                setSellingPrice("");
                setOriginalPrice("");
                setCategory("Electronics");
            } else {
                toast.error("Failed to add product to server");
            }
        } catch (error) {
            console.error('Error adding product:', error);
            const msg = error.response?.data?.error || 'Failed to add product';
            toast.error(msg);
        }
}
    return(
        <div className="w-[600px] mx-auto p-5 flex flex-col gap-4 bg-green-50 rounded-md mt-10 mb-10 shadow-xl shadow-gray-500">
            <h1 className="text-3xl mx-auto underline font-bold mb-4">Add Products</h1>
            <label className="text-lg font-medium">Product Name</label>
            <input type="text" 
                   placeholder="Enter Product Name"
                   className="p-2 rounded-md shadow-xl shadow-gray-300"
                   value={productName}
                   onChange={handleNameChange}/>
            <label className="text-lg font-medium">Image URL</label>
            <input type="text" 
                   placeholder="Enter ImageURL" 
                   className="p-2 rounded-md shadow-xl shadow-gray-300"
                   value={ImageURL}
                   onChange={handleURLChange}/>
            <label className="text-lg font-medium">Selling Price</label>
            <input type="number" 
                   placeholder="Enter Selling Price" 
                   className="p-2 rounded-md shadow-xl shadow-gray-300"
                   value={sellingPrice}
                   onChange={handlePriceChange}/>
            <label className="text-lg font-medium">Original Price</label>
            <input type="number" 
                   placeholder="Enter Original Price" 
                   className="p-2 rounded-md shadow-xl shadow-gray-300"
                   value={originalPrice}
                   onChange={handleOriginalPriceChange}/>
            <label className="text-lg font-medium">Category</label>
            <select className="p-2 rounded-md shadow-xl shadow-gray-300" value={category} onChange={handleCategoryChange}>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Others">Others</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600" onClick={handleSubmit}>Submit</button>
        </div>
    )
}
export default ProductForm