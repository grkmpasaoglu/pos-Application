// import React, { useState } from 'react'
// import { Table, Card, Button } from 'antd'
// import Header from '../components/header/Header'
// import CreateBill from '../components/cart/CreateBill.jsx'

// const CartPage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const dataSource = [
//     {
//       key: '1',
//       name: 'Mike',
//       age: 32,
//       address: '10 Downing Street',
//     },
//     {
//       key: '2',
//       name: 'John',
//       age: 42,
//       address: '10 Downing Street',
//     },
//   ]

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//       key: 'age',
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//     },
//   ]

//   return (
//     <div>
//       <Header />
//       <div className="px-6 mt-6">
//         <Table
//           dataSource={dataSource}
//           columns={columns}
//           bordered
//           pagination={false}
//         />
//         <div className="cart-total flex justify-end">
//           <Card className="w-72 mt-4">
//             <div className="flex justify-between">
//               <span>Ara Toplam</span>
//               <span>11 ₺</span>
//             </div>
//             <div className="flex justify-between my-2">
//               <span>KDV Toplam %8</span>
//               <span className="text-red-500">44 ₺</span>
//             </div>
//             <div className="flex justify-between font-bold">
//               <span>Toplam</span>
//               <span>22 ₺</span>
//             </div>
//             <Button
//               className=" mt-2 w-full bg-black text-white"
//               size="large"
//               onClick={() => setIsModalOpen(true)}
//             >
//               Sipariş Oluştur
//             </Button>
//           </Card>
//         </div>
//       </div>
//       <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
//     </div>
//   )
// }

// export default CartPage



import { Button, Card, Input, message, Popconfirm, Space, Table } from "antd";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateBill from "../components/cart/CreateBill.jsx";
import Header from "../components/header/Header.jsx";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { deleteCart, increase, decrease } from "../redux/cartSlice.js";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';



const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  }
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex)
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title")
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category")
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{text.toFixed(2)}₺</span>;
      },
      sorter: (a, b) => a.price - b.price
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increase(record))}
            />
            <span className="font-bold w-6 inline-block text-center">
              {record.quantity}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Ürün Silinsin Mi?")) {
                    dispatch(decrease(record));
                    message.success("Ürün Sepetten Silindi.");
                  }
                }
                if (record.quantity > 1) {
                  dispatch(decrease(record));
                }
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)}₺</span>;
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Silmek istediğinizden emin misiniz?"
            onConfirm={() => {
              dispatch(deleteCart(record));
              message.success("Ürün Sepetten Silindi.");
            }}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button
              type="link"
              danger

            >
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  return (
    <>
      <Header />
      <div className='overflow-y-scroll h-screen px-4 pb-24 md:pb-40'>
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{formatPrice(cart.total > 0 ? cart.total : 0)}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Toplam {cart.tax}</span>
              <span className="text-red-600">{(cart.total * cart.tax) / 100} ₺</span>
            </div>
            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <b>              {formatPrice(cart.total + (cart.total * cart.tax) / 100)}₺
              </b>
            </div>
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};
export default CartPage;