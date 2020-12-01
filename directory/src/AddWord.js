import React, {useState} from 'react'
import { Button, Modal, Form } from 'antd'
import WordForm from './WordForm';

function AddWord({ icon, wordData, relateData, type }) {
    const [modalVisibility, setModalVisibility] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm();

    function showModal() {
        setModalVisibility(true)
    }

    function handleOk(e) {
        setLoading(true)
        setTimeout(() => {
            form.submit()
            setModalVisibility(false)
            setLoading(false)
        }, 1000)
    }

    function handleCancel(e) {
        console.log(e);
        setModalVisibility(false)
    };

    return (
        <div>
            <Button type="primary" icon={icon} shape="circle" onClick={() => showModal()}>
            </Button>
            <Modal
                title={`${type} new word to dictionary`}
                actionType={type}
                visible={modalVisibility}
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
                <WordForm form={form} wordData={wordData} relateData={relateData} actionType={type}/>
            </Modal>
        </div>
    )
}

export default AddWord