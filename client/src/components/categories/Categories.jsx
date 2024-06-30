import React, { useEffect, useState } from 'react'
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
// import { Button, Form, Input, Modal, message } from 'antd';
import Add from './Add';
import Edit from './Edit';

const Categories = ({ categories, setCategories, setFiltered, products}) => {
  const [isModalAddOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categoryTitle,setCategoryTitle] = useState("Tümü")

  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFiltered(products)
    }else{
      setFiltered(products.filter((item)=>item.category === categoryTitle))
    }
    
  }, [products,setFiltered,categoryTitle]);


  return (
    <div className="text-center mb-8">
      {/* Küçük ekranlarda görüntülenecek dropdown düğmesi */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="block md:hidden bg-gray-200 px-24 py-5 rounded-lg mx-auto "
      >
        Kategoriler
      </button>
      {/* Küçük ekranlarda dropdown açılır menüsü */}
      {isDropdownOpen && (
        <ul className="md:hidden mt-2 bg-white rounded-lg shadow-md">
          {categories.map((category) => (
            <li
              key={category.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={()=>setCategoryTitle(category.title)}

              
            >
              {category.title}
            </li>
          ))}
        </ul>
      )}
      {/* Büyük ekranlarda görüntülenecek kategori listesi */}
      <ul className="hidden md:flex flex-wrap justify-center text-gray-500 rounded-lg ">
        {categories.map((category) => (
          <li
            key={category._id}
            onClick={()=>setCategoryTitle(category.title)}
            className="px-6 py-4  cursor-pointer transition-all"
            style={{ textDecoration: category.title === categoryTitle ? 'underline' : 'none' }}

          >
            <span className="block hover:text-black transition-all">
              {category.title}
            </span>
          </li>

        ))}
        <li className="px-6 py-4  cursor-pointer transition-all" onClick={() => setIsAddModalOpen(true)} >
          <PlusOutlined />
        </li>
        <li className="px-6 py-4  cursor-pointer transition-all" onClick={() => setIsEditModalOpen(true)}>
          <EditOutlined />
        </li>
        <Add isModalAddOpen={isModalAddOpen} setIsAddModalOpen={setIsAddModalOpen} setCategories={setCategories} categories={categories} />
        <Edit isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} categories={categories} setCategories={setCategories} />
        {/* <Modal title="Yeni Kategori Ekle" open={isModalAddOpen} onCancel={() => setIsAddModalOpen(false)} footer={false}>
          <Form layout='vertical' onFinish={onFinish} form={form}>
            <Form.Item name="title" label="Kategori Ekle" rules={[{ required: true, message: "Kategori adı boş geçilemez !" }]}>
              <Input />
            </Form.Item>
            <Form.Item className='flex justify-end mb-0'>
              <Button type='primary' htmlType='submit'>Oluştur</Button>
            </Form.Item>
          </Form>
        </Modal> */}
      </ul>
    </div>
  )
}

export default Categories
