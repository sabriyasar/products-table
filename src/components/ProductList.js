import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Form, InputNumber } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Search } = Input;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Ürünleri sunucudan yükleme
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${window.location.origin}/.netlify/functions/getProducts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  

  useEffect(() => {
    fetchProducts(); // Bileşen yüklendiğinde ürünleri yükle
  }, []);

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
  const handleOk = async (values) => {
    if (editingProduct) {
      // Ürün güncelleme
      const updatedProducts = products.map((product) =>
        product.key === editingProduct.key ? { ...editingProduct, ...values } : product
      );
      setProducts(updatedProducts);
      // Güncellenen ürünü sunucuya gönderme
      await fetch('/.netlify/functions/updateProduct', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingProduct, ...values }),
      });
    } else {
      // Yeni ürün ekleme
      const newProduct = { key: Date.now(), ...values };
      setProducts([...products, newProduct]);
      await fetch('/.netlify/functions/addProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
    }
    setIsModalVisible(false);
  };

  // Ürün silme
  const handleDelete = async (key) => {
    setProducts(products.filter((product) => product.key !== key));
    await fetch('/.netlify/functions/deleteProduct', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });
  };

  // Arama filtresi
  const handleSearch = (value) => {
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
