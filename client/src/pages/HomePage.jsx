import { useEffect, useState } from 'react'
import CartTotals from '../components/cart/CartTotals.jsx'
import Categories from '../components/categories/Categories'
import Header from '../components/header/Header'
import Products from '../components/products/Products'

const HomePage = () => {

  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [products, setProducst] = useState([])
  const [search, setSearch] = useState("")


  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all")
        const data = await response.json();
        data && setCategories(data.map((item) => {
          return { ...item, value: item.title }
        }));
      } catch (error) {
        console.log(error)
      }
    }

    getCategories();
  }, [])


  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all")
        const data = await response.json();
        setProducst(data);
      } catch (error) {
        console.log(error)
      }
    }

    getProducts();
  }, [])


  return (
    <>
      <Header setSearch={setSearch}/>
      <div className="flex flex-col lg:flex-row lg:pl-2">
        <div className="lg:w-10/12 mt-6">
          <div className="mb-4">
            <Categories categories={categories} setCategories={setCategories} setFiltered={setFiltered} products={products}/>
          </div>
          <div className="mb-12 px-12 ">
            <Products categories={categories} filtered={filtered} products={products} setProducst={setProducst} search={search}/>
          </div>
        </div>
        <div className="lg:w-2/12 lg:ml-4 h-screen lg:pb-32 border">
          <CartTotals />
        </div>
      </div>
    </>
  )
}

export default HomePage
