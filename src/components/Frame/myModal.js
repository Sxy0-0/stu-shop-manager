import React, {Component} from 'react';
import {Button, Card, Form, Input, InputNumber, Modal} from "antd";
import axios from "axios";

class MyModal extends Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            modalAddInfoVisible: false
        }
    }


    log = () => {
        console.log(this.props);
        this.props.changeModal();
    }

    render() {
        return (
                <Modal title="新增信息"
                         visible={this.props.modalAddInfoVisible}
                         onCancel={()=>{
                             console.log(this.props);
                           this.props.changeModal();
                       }}
                >
                    <Form  ref={this.props.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}
                          initialValues={{name:this.props.name,price:this.props.price}}>
                        <Form.Item label="名字"  name="name" rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },

                        ]}>
                            <Input placeholder="input name"/>
                        </Form.Item>
                        <Form.Item label="价格"  name="price" rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                            // {
                            //     type: "number",
                            //     message: 'Please input a number',
                            // },
                            //自定义校验
                            ({getFieldValue}) => ({
                                validator(rule,value,callback){
                                    if (value >= 100){
                                        return  Promise.reject('不能超过150');
                                    }else{
                                        return Promise.resolve();
                                    }
                                }
                            })
                        ]}>
                            <InputNumber placeholder="input price"/>
                        </Form.Item>
                        <Form.Item >
                            <Button type="normal" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form>
                </Modal>
        );
    }
}
// MyModal.propTypes = {
//     modalAddInfoVisible:PropTypes.boolean.is
// }
export default MyModal;