import React  from "react";
import { Modal, Form } from "antd";




export default function Popup({ title, ok, onCreate, visible, onCancel, fields}) {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title={title}
        okText={ok || "Confirm"}
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
      >
        <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
        >
            {fields.map((field, index) => {
                return (
                    <Form.Item
                        key={index}
                        name={field.name}
                        label={field.label}
                        rules={field.rules}
                    >
                        {field.input}
                    </Form.Item>
                )
            })}
        </Form>
      </Modal>
    );
  };