import React, { useState } from 'react';
import { Layout, Tabs, Input, Button, Table, Space, Tag, Card, Typography, Select, Switch } from 'antd';
import { PlusOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const InventoryProject = () => {
  const [customFields, setCustomFields] = useState([
    { id: 1, label: 'Fixed Text', type: 'Fixed', value: 'UNIT-' },
    { id: 2, label: '20-bit random', type: 'Random', value: 'X5_' },
  ]);

  const columns = [
    { title: '', dataIndex: 'drag', key: 'drag', render: () => <DragOutlined /> },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Label/Formatting', dataIndex: 'label', key: 'label', render: (text) => <Input defaultValue={text} /> },
    { title: 'Action', key: 'action', render: (_, record) => (
      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => setCustomFields(customFields.filter(f => f.id !== record.id))} />
    )},
  ];

  const items = [
    { key: '1', label: 'Items', children: <Table dataSource={[]} columns={[{title: 'ID', dataIndex: 'id'}, {title: 'Name', dataIndex: 'name'}]} locale={{emptyText: 'No items yet'}} /> },
    { key: '2', label: 'Settings', children: (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input placeholder="Inventory Title" size="large" />
        <Input.TextArea placeholder="Description (Markdown supported)" rows={4} />
      </Space>
    )},
    { key: '3', label: 'Custom ID', children: (
      <Card title="Configure Custom ID Format">
        <Text type="secondary">Example: 🛡️-A7E3A_013_2025</Text>
        <Table dataSource={customFields} columns={columns} pagination={false} rowKey="id" style={{ marginTop: 16 }} />
        <Button type="dashed" block icon={<PlusOutlined />} style={{ marginTop: 16 }}>Add element</Button>
      </Card>
    )},
    { key: '4', label: 'Access', children: <Text>Public access: <Switch /></Text> },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: '#fff', borderBottom: '1px solid #d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Title level={4} style={{ margin: 0 }}>iLearning Inventory</Title>
        <Space>
          <Select defaultValue="en" options={[{ value: 'en', label: 'English' }, { value: 'ru', label: 'Русский' }]} />
          <Button type="primary">Save Changes</Button>
        </Space>
      </Header>
      <Content style={{ padding: '24px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
          <Title level={2}>New Inventory 1 <Tag color="green">All changes saved</Tag></Title>
          <Tabs defaultActiveKey="3" items={items} />
        </div>
      </Content>
    </Layout>
  );
};

export default InventoryProject;