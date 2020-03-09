import React, {Component} from 'react';
import {Card, Table, Button, Popconfirm} from 'antd'
import axios from 'axios';

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:null,
            columns : [
                {
                    title:'序号',
                    key:'id',
                    width:80,
                    align:'center',
                    render:(txt,record,index) => index +1
                },{
                    title:'名字',
                    dataIndex:'name',
                    align:'center'
                },{
                    title:'价格',
                    dataIndex:'price',
                    align:'center'
                },{
                    title:'操作',
                    align:'center',
                    render:((txt, record, index) =>
                       <div>
                            <Button type="primary" size="small" style={ {margin :'1px 1px'}}
                            onClick={() => {
                                this.props.history.push(`/admin/products/edit/${record.id}`)
                            }}
                            >修改</Button>
                           <Popconfirm title="是否确认删除" onCancel={() => console.log("1")}
                                       onConfirm={() => {
                                                axios.get(`http://localhost:8085/deleteById?id=${record.id}`)
                                                    .then(res => {
                                                        console.log(res);
                                                        this.props.history.push('/admin');
                                                    })
                                                        }
                                       }>

                            <Button type="danger" size="small">删除</Button>
                           </Popconfirm>
                        </div>
                    )
                }
            ],
            dataSource:[],
            total:0,
            current:1
        }
    }

   componentDidMount() {
       const url = `http://localhost:8085/getPage?current=1&size=2`
       axios.get(url,{
           headers: {'Access-Control-Allow-Origin': '*'}
       }).then( response => {
           const dataSource = response.data.records;
           console.log(response);
           this.setState({dataSource : dataSource,total:response.data.total});
           console.log(dataSource);

       })
       console.log(this.props);
   }

  pageChange = (current,size) => {
       const url = `http://localhost:8085/getPage?current=${current}&size=${size}`
       axios.get(url,{
           headers: {'Access-Control-Allow-Origin': '*'}
       }).then( response => {
           const dataSource = response.data.records;
           console.log(response);
           this.setState({dataSource : dataSource,total:response.data.total});
           console.log(dataSource);

       })
       console.log(this.props);
   }


    render() {
        return (
            <Card title="商品列表" extra={
                <Button type="primary"
                        size="small"
                        onClick={() => {
                            this.props.history.push('/admin/products/edit')}
                        }>
                    新增
                </Button>
            }>
                <Table columns={this.state.columns} bordered dataSource={this.state.dataSource}
                       pagination={{total:this.state.total,pageSize:2,onChange:this.pageChange}}/>
            </Card>
        );
    }
}

export default List;