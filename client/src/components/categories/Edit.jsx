import { Button, Form, Input, Modal, Table, message } from 'antd'
import React, { useState } from 'react'

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) => {

    const onFinish = (values) => {
        console.log(values);
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/update-category", {
                method: "PUT",
                body: JSON.stringify({ ...values, categoryId: editingRow._id }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Kategori başarıyla güncellendi.");
            setCategories(
                categories.map((item) => {
                    if (item._id === editingRow._id) {
                        return { ...item, title: values.title };
                    }
                    return item;
                })
            );
        } catch (error) {
            message.error("Bir şeyler yanlış gitti.");
            console.log(error);
        }
    };

    const deleteCategory = (id) => {
        if (window.confirm("Kategori silinecek. Emin misiniz ?")) {
            try {
                fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category", {
                    method: "DELETE",
                    body: JSON.stringify({ categoryId: id }),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                })
                message.success("Kategori başarıyla silindi.")
                setCategories(categories.filter((item)=> item._id !== id))
            } catch (error) {
                console.log(error)
                message.error("Bir şeyler yanlış gitti.");

            }

        }
    }

    const [editingRow, setEditingRow] = useState({});

    const columns = [
        {
            title: "Category Title",
            dataIndex: "title",
            render: (_, record) => {
                if (record._id === editingRow._id) {
                    return (
                        <Form.Item className='mb-0' name="title">
                            <Input defaultValue={record.title} />
                        </Form.Item>
                    )
                } else {
                    return (<p>{record.title}</p>
                    )
                }
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <div className='flex'>
                        <Button type='link' onClick={() => setEditingRow(record)}>Düzenle</Button>
                        <Button type='text' htmlType='submit'>Kaydet</Button>
                        <Button className='text-red-500' onClick={() => deleteCategory(record._id)} type='text'>Sil</Button>
                    </div>
                )
            }
        }
    ]
    return (
        <div>
            <Modal open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} title="Kategori İşlemleri" footer={false}>
                <Form onFinish={onFinish}>
                    <Table dataSource={categories} columns={columns} rowKey={"_id"} />
                </Form>
            </Modal>
        </div>
    )
}

export default Edit