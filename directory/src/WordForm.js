import React, { useEffect, useState } from 'react'
import { Form, Input, Button, notification, Row, Col } from 'antd'
import axios from 'axios';

const { TextArea } = Input

function WordForm({ form, wordData, relateData, actionType }) {
    const [relate, setRelate] = useState([''])

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const onFinish = values => {
        axios.post(`http://localhost:9000/dictionary/${actionType}`, { ...{ index: wordData.index }, ...values, ...{ relate: relate } })
            .then(res => {
                form.resetFields()
                openNotification("Success!")
                window.location.reload()
            })
    };

    const openNotification = (description) => {
        notification.open({
            message: 'Form submit',
            description: description,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    const handleChangeRelateWord = (index, e) => {
        //console.log(e.target.value + index)
        let temp = [...relate]
        temp[index] = e.target.value
        setRelate(temp)
    }

    const handleDeleteClick = (index) => {
        let temp = [...relate]
        temp.splice(index, 1)
        setRelate(temp)
    }

    useEffect(() => {
        if (wordData != undefined) { }
        form.setFieldsValue({
            username: wordData.username,
            word: wordData.word,
            mean: wordData.mean,
            type: wordData.type,
            pronounce: wordData.pronunce,
            description: wordData.description,
        })
        setRelate(relateData)
    }, [wordData])

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
                <Input />
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
                label="Type"
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

            <Form.Item
                label="Relate word"
                name="relate2"
                rules={[{ required: false, message: '' }]}
            >
                {relate.map((mapData, index) => (
                    <Row>
                        <Col span={21}>
                            <Input value={mapData} onChange={(e) => handleChangeRelateWord(index, e)} />
                        </Col>
                        <Col span={3}>
                            <Button danger onClick={() => handleDeleteClick(index)}>X</Button>
                        </Col>
                    </Row>
                ))
                }
                <Button onClick={() => setRelate([...relate, ''])}>Add more relate</Button>
            </Form.Item>
        </Form>
    )
}

export default WordForm;