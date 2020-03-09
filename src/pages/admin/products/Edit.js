import React, {Component,useState,useEffect} from 'react';
import {Form, Card, Input, Button,InputNumber} from 'antd';
import axios from 'axios';

class Edit extends Component {
    formRef = React.createRef();

    constructor(props){
        super(props);

        this.state = {
            name:'',
            price:0,
    }
        if (this.props.match.params.id){
            const url = `http://localhost:8085/getById?id=${this.props.match.params.id}`
            axios.get(url).then(res =>{
                console.log('res：',res);
                console.log('res data：',res.data);
                this.setState({name:res.data.name,price:res.data.price});
                // this.formRef.current.setFieldsValue({
                //     name:res.data.name,price:res.data.price
                // });
                this.formRef.current.resetFields();
            })
        }
    }
    componentDidMount() {
        console.log(this.props);
    }

    onFinish = (values) =>{
        console.log('Success:', values);
        if (this.props.match.params.id){
            const url = `http://localhost:8085/submit`
            values['id'] = this.props.match.params.id;
            axios.post(url,values).then(res => {
                console.log(res);
                console.log("values:",values);
                this.props.history.push('/admin/products');
            });
        }else{
            const url = `http://localhost:8085/submit`
            axios.post(url,values).then(res => {
                console.log(res);
                this.props.history.push('/admin/products');
            });
        }
        this.forceUpdate();
    }
    onFinishFailed = (errorInfo ) =>{
        console.log('errorInfo :', errorInfo );
    }

    render() {
        return (
           <Card title="商品编辑">
               <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}
                     initialValues={{name:this.state.name,price:this.state.price}}>
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
           </Card>
        );
    }
}

export default Edit;