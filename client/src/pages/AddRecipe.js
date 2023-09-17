import React from "react";
import {
  Container,
  //Button,
  Row
} from "react-bootstrap";

import { Button, Form, Input, InputNumber, Upload, Space } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

const AddRecipe = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }


  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className='text-light bg-dark p-5'>
        <Container>
          <h1>Add a Recipe!</h1>
        </Container>
        </div>
        <Container>
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
            maxWidth: 600,
            }}
            validateMessages={validateMessages}
            autoComplete="off"
        >
            <Form.Item
            name={['recipe', 'title']}
            label="Title"
            rules={[
                {
                required: true,
                },
            ]}
            >
            <Input />
            </Form.Item>
            <Form.Item
            label="Ingredients"
            >
                <Form.List name={['recipe', 'ingredients']}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
              }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'qty']}
                rules={[
                  {
                    required: true,
                    message: 'Missing quantity',
                  },
                ]}
              >
              <Input placeholder="Qty (e.g. 1)" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'unit']}
                rules={[
                  {
                    required: true,
                    message: 'Missing unit',
                  },
                ]}
              >
             <Input placeholder="Unit (e.g. cup)" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'ingredient']}
                rules={[
                  {
                    required: true,
                    message: 'Missing ingredient',
                  },
                ]}
              >
                <Input placeholder="Ingredient" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
            </Form.Item>
            <Form.Item
            name={['recipe', 'instructions']}
            label="Instructions"
            rules={[
                {
                required: true,
                },
            ]}>
            <Input.TextArea />
            </Form.Item>
            <Form.Item
            name={['recipe', 'servings']}
            label="Servings"
            rules={[
                {
                type: 'number',
                min: 0,
                max: 99,
                },
            ]}
            >
            <InputNumber />
            </Form.Item>
            <Form.Item
            name={['recipe', 'readyinminutes']}
            label="Ready in Minutes"
            rules={[
                {
                type: 'number',
                min: 0,
                max: 99,
                },
            ]}
            >
            <InputNumber />
            </Form.Item>

            <Form.Item
            name={['recipe', 'sourcelink']}
            label="Source Link"
            >
            <Input />
            </Form.Item>

            <Form.Item
            name={['recipe', 'image']}
            label="Recipe Image"
            >
            <Upload beforeUpload={() => false}
                listType="picture"
                >
            <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            </Form.Item>

            <Form.Item
            wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
            }}
            >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
  </Container>

    </>
  );
};

export default AddRecipe;