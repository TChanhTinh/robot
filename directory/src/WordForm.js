import React from 'react'
import { Form, Button, Input } from 'antd'
import axios from 'axios';

const { TextArea } = Input

function WordForm({form}) {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const onFinish = values => {
        console.log('Success:', values);
        axios.post('http://localhost:9000/dictionary/add', values)
        .then(res => {
            console.log("Send success")
        })
    };

    return (
        <Form
            {...layout}
            form={form}
            name="addWord"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Username"
                name="username"
            >
                <Input></Input>
            </Form.Item>
            <Form.Item
                label="Word"
                name="word"
                rules={[{ required: true, message: 'please input vaild word!' }]}
            >
                <Input></Input>
            </Form.Item>
            <Form.Item
                label="Mean"
                name="mean"
                rules={[{ required: true, message: 'please input vaild mean!' }]}
            >
                <Input></Input>
            </Form.Item>

            <Form.Item
                label="Word type"
                name="type"
                rules={[{ required: true, message: 'please input vaild word!' }]}
            >
                <Input></Input>
            </Form.Item>


            <Form.Item
                label="Word pronounce"
                name="pronounce"
                rules={[{ required: true, message: 'please input correct pronounce!' }]}
            >
                <Input></Input>
            </Form.Item>

            <Form.Item
                label="Word description"
                name="description"
                rules={[{ required: true, message: 'please input correct pronounce!' }]}
            >
                <TextArea></TextArea>
            </Form.Item>
        </Form>
    )
}

export default WordForm;