import React, { useState } from 'react';
import { Table, Button, Input, Modal, Form, InputNumber } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Search } = Input;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Ürün ekleme modalini açma
  const showAddProductModal = () => {
    setIsModalVisible(true);
    setEditingProduct(null);
  };

  // Modalı kapatma
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Ürün ekleme veya güncelleme
  const handleOk = (values) => {
    if (editingProduct) {
      // Ürün güncelleme
      setProducts(
        products.map((product) =>
          product.key === editingProduct.key ? { ...editingProduct, ...values } : product
        )
      );
    } else {
      // Yeni ürün ekleme
      setProducts([
        ...products,
        {
          key: Date.now(),
          ...values,
        },
      ]);
    }
    setIsModalVisible(false);
  };

  // Ürün silme
  const handleDelete = (key) => {
    setProducts(products.filter((product) => product.key !== key));
  };

  // Arama filtresi
  const handleSearch = (value) => {
    // Basit bir filtreleme örneği
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(filtered);
  };

  // Tablo sütunları
  const columns = [
    {
      title: 'Ürün Adı',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gramajı (g)',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Maliyeti (₺)',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'Perakende Satış Fiyatı (₺)',
      dataIndex: 'retailPrice',
      key: 'retailPrice',
    },
    {
      title: 'Toptan Satış Fiyatı (₺)',
      dataIndex: 'wholesalePrice',
      key: 'wholesalePrice',
    },
    {
      title: 'Seçenekler',
      key: 'actions',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingProduct(record);
              setIsModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ürün Listesi</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Search
          placeholder="Ürün ara"
          onSearch={handleSearch}
          enterButton
          style={{ maxWidth: '300px' }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showAddProductModal}
        >
          Ürün Ekle
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />

      {/* Ürün ekleme/güncelleme Modal */}
      <Modal
        title={editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleOk}
          initialValues={editingProduct || { name: '', weight: 0, cost: 0, retailPrice: 0, wholesalePrice: 0 }}
        >
          <Form.Item
            label="Ürün Adı"
            name="name"
            rules={[{ required: true, message: 'Lütfen ürün adını giriniz' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gramajı (g)"
            name="weight"
            rules={[{ required: true, message: 'Lütfen gramajı giriniz' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Maliyeti (₺)"
            name="cost"
            rules={[{ required: true, message: 'Lütfen maliyeti giriniz' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Perakende Satış Fiyatı (₺)"
            name="retailPrice"
            rules={[{ required: true, message: 'Lütfen perakende satış fiyatını giriniz' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Toptan Satış Fiyatı (₺)"
            name="wholesalePrice"
            rules={[{ required: true, message: 'Lütfen toptan satış fiyatını giriniz' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingProduct ? "Güncelle" : "Ekle"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;
