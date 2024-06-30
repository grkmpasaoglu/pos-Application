import { Button, Form, Input, Modal, Select, message } from 'antd'
import React from 'react'

const Add = ({ isModalAddOpen, setIsAddModalOpen, setCategories, categories, setProducts, products }) => {

    const [form] = Form.useForm();


    const onFinish = (values) => {

        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
            message.success("Ürün eklendi.")
            form.resetFields();
            setProducts([...products, {...values, _id: Math.random(), title: values.title, price:Number(values.price) }])

        } catch (error) {
            console.log(error)
        }
    }
    return (


        <div>
            <Modal title="Yeni Ürün Ekle" open={isModalAddOpen} onCancel={() => setIsAddModalOpen(false)} footer={false}>
                <Form layout='vertical' onFinish={onFinish} form={form}>
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
                        <Button type='primary' htmlType='submit'>Ekle</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Add