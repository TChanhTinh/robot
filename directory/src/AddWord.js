import React, {useState} from 'react'
import { Button, Modal, Form } from 'antd'
import WordForm from './WordForm';

function AddWord() {
    const [modalToggle, setModalToggle] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm();

    function showModal() {
        setModalToggle(true)
    }

    function handleOk(e) {
        setLoading(true)
        setTimeout(() => {
            form.submit()
        }, 3000)
    }

    function handleCancel(e) {
        console.log(e);
        setModalToggle(false)
    };

    return (
        <div>
            <Button type="primary" onClick={() => showModal()}>
                Add word
            </Button>
            <Modal
                title="Add new word to dictionary"
                visible={modalToggle}
                onOk={() => handleOk()}
                onCancel={() => handleCancel()}
                footer={[
                    <Button key="back" onClick={() => handleCancel() }>
                      Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={() => handleOk() }>
                      Submit
                    </Button>,
                ]}
            >
                <WordForm form={form}/>
            </Modal>
        </div>
    )
}

export default AddWord