import { use } from "react";
import ProductCard from "./ProductCard";
import {useState , useEffect} from "react";

const ProductList=({ products, cart, onAddToCart, onIncrement, onDecrement })=>{

    return (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
            <div className="grid grid-cols-3 gap-4">
                <h1 className="text-3xl font-bold col-span-3 mb-4">Product List</h1>
                {products.map((product)=>{
                    const count = cart[product.id] || 0;
                    return(
                        <ProductCard 
                            key={product.id}
                            id={product.id}
                            name={product.name} 
                            sellingPrice={product.sellingPrice}
                            originalPrice={product.originalPrice}
                            image={product.image}
                            count={count}
                            onAddToCart={onAddToCart}
                            onIncrement={onIncrement}
                            onDecrement={onDecrement}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ProductList;