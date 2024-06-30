



import { useState } from "react"
import ProductItem from "./ProductItem"
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import Add from "./Add"
import { useNavigate } from "react-router-dom"

const Products = ({ categories, filtered, products, setProducst, search }) => {
  const [isModalAddOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="products-wrapper grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 overflow-y-scroll h-screen md:pb-80">
      {filtered.filter((item) => item.title.toLowerCase().includes(search)).map((item) => (
        <ProductItem item={item} key={item._id} />
      ))}

      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none p-2 h-80 flex justify-center items-center" onClick={() => setIsAddModalOpen(true)} >
        <PlusOutlined />
      </div>

      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none p-2 h-80 flex justify-center items-center" onClick={() => navigate("products")}>
        <EditOutlined />
      </div>

      <Add isModalAddOpen={isModalAddOpen} setIsAddModalOpen={setIsAddModalOpen} categories={categories} setProducst={setProducst} products={products} />
    </div>
  )
}

export default Products
