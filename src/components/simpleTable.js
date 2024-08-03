import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteUser, editUser } from "../actions/userActions";

const SimpleTable = ({ dataSource }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm(); 

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (record) => {
    setCurrentUser(record);
    form.setFieldsValue(record); 
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    if (currentUser) {
      dispatch(editUser(currentUser.id, values));
      setIsModalVisible(false);
      setCurrentUser(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <>
          <Button 
            type='primary' 
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button 
            type='primary' 
            danger
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: 12 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className='simpletable'>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          initialValues={currentUser}
          onFinish={handleOk}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the user name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input the user email!' },
              { type: 'email', message: 'Please input a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SimpleTable;
