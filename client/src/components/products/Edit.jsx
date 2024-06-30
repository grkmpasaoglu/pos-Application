import { Button, Form, Input, Modal, Select, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'

const Edit = () => {



    const onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/products/update-product", {
                method: "PUT",
                body: JSON.stringify({ ...values, ProductId:editingItem._id }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Ürün başarıyla güncellendi.");
            setProducts(
                products.map((item) => {
                    if (item._id === editingItem._id) {
                        return values;
                    }
                    else{
                        return item;
                    }
                })
            );
        } catch (error) {
            message.error("Bir şeyler yanlış gitti.");
            console.log(error);
        }
    };

    const deleteProduct = (id) => {
        if (window.confirm("Ürün silinecek. Emin misiniz ?")) {
            try {
                fetch(process.env.REACT_APP_SERVER_URL + "/api/products/delete-product", {
                    method: "DELETE",
                    body: JSON.stringify({ ProductId: id }),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                })
                message.success("Ürün başarıyla silindi.")
                setProducts(products.filter((item) => item._id !== id))
            } catch (error) {
                console.log(error)
                message.error("Bir şeyler yanlış gitti.");

            }

        }
    }


    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState();
    const [form] = Form.useForm();



    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all")
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error)
            }
        }

        getProducts();
    }, [])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all")
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log(error)
            }
        }

        getCategories();
    }, [])

    const columns = [
        {
            title: "Ürün Adı",
            dataIndex: "title",
            width: "8%",
            render: (_, record) => {
                return <p>{record.title}</p>;
            },
        },
        {
            title: "Ürün Görseli",
            dataIndex: "img",
            width: "2%",
            render: (_, record) => {
                return (
                    <img src={record.img} alt="" className="w-full h-20 object-cover" />
                );
            },
        },
        {
            title: "Ürün Fiyatı",
            dataIndex: "price",
            width: "8%",
        },
        {
            title: "Kategori",
            dataIndex: "category",
            width: "8%",
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "8%",
            render: (_, record) => {
                return (
                    <div>
                     <Button
                            type="link"
                            className="pl-0"
                            onClick={() => {
                                setIsEditModalOpen(true);
                                setEditingItem(record);
                            }}
                        >
                            Düzenle
                        </Button>
                        <Button
                            type="link"
                            danger
                            onClick={() => deleteProduct(record._id)}
                        >
                            Sil
                        </Button>
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <div className='overflow-y-scroll h-screen pb-24 md:pb-72'>
                <Table dataSource={products} columns={columns} rowKey={"_id"} />
            </div>
            <Modal title="Yeni Ürün Ekle" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={false}>
                <Form layout='vertical' onFinish={onFinish} form={form} initialValues={editingItem}>
                    <Form.Item name="title" label="Ürün Adı" rules={[{ required: true, message: "Ürün adı boş geçilemez !" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="img" label="Ürün Görseli" rules={[{ required: true, message: "Ürün adı boş geçilemez !" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Ürün Fiyatı" rules={[{ required: true, message: "Ürün adı boş geçilemez !" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="category" label="Ürün Kategorisi" rules={[{ required: true, message: "Kategori boş geçilemez !" }]}>
                        <Select
                            showSearch
                            placeholder="Seçmek için aratın"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.title ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
                            }
                            options={categories}
                        />
                    </Form.Item>
                    <Form.Item className='flex justify-end mb-0'>
                        <Button type='primary' htmlType='submit'>Düzenle</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>



    )
}

export default Edit
