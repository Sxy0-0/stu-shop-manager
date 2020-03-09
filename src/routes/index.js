import Login from "../pages/Login";
import List from "../pages/admin/products/List";
import Index from "../pages/admin/dashboard/Index";
import Edit from "../pages/admin/products/Edit";
import PageNotFound from "../pages/PageNotFound";
import Test from "../Test";
import { QuestionOutlined, UserOutlined } from '@ant-design/icons';

export const mainRoutes = [{
    path:'/login',
    component:Login
},{
    path: '/404',
    component: PageNotFound
}]
export const adminRoutes = [{
    path:'/admin/dashboard',
    component:Index,
    isShow:true,
    title:'看板',
    icon:{QuestionOutlined}
},{
    path: '/admin/products',
    component: List,
    isShow:true,
    exact: true,
    title:'商品管理',
    icon:'{UserOutlined}'
},{
    path: '/admin',
    component: List,
    isShow:false,
    exact: true,
    title:'商品管理',
},{
    path: "/admin/products/edit/:id?",
    component: Edit,
    isShow:false
},{
    path: '/admin/test',
    component: Test,
    title:'测试',
    isShow:true
}]