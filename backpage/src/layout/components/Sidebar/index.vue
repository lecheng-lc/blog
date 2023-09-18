<template>
  <div class="menu">
    <a-spin :spinning="loading" tip="Loading...">
      <Logo />
      <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" :items="menuList"
        @click="clickMenu">
      </a-menu>
    </a-spin>
  </div>
</template>
<script setup lang="ts">
import { ref, VueElement, h, watch } from 'vue'
import Logo from './components/Logo.vue'
import type { ItemType } from 'ant-design-vue'
import { userStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'

const Router = useRouter()
const Route = useRoute()
const userStoreIns = userStore()
const loading = ref(false)
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])
function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group'
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type
  } as ItemType
}
const routes = userStoreIns.routes
const addIcon = (str: string) => {
  return h(SvgIcon, {
    iconClass: str
  })
}
console.error(routes,900)


const deepLoopFloat = (menuList: any, newArr: any = []) => {
  menuList.forEach((item: any) => {
    if (item.meta.ignoreSideBar) return
    if (!item?.children?.length) {
      return newArr.push(getItem(item.name, item.path, addIcon(item.icon)))
    }
    newArr.push(getItem(item.name, item.path, addIcon(item.icon), deepLoopFloat(item.children)))
  })
  return newArr
}
const menuList = deepLoopFloat(routes)
const clickMenu = ({ key }: { key: string, }) => {
  Router.push(key)
}
const recoverMenuSelectedKeys = (url: string) => {
  selectedKeys.value = [url]
}
const recoverMenuOpenKeys = (routes: any, url: string) => {
  openKeys.value = []
  let pathArr: any[] = []
  const findSelectedKeys = (routes:any, url:string, record:any = []) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path === url) {
        record.push(i)
        pathArr.push(routes[i].path)
        return {
          success: true,
          record: record
        }
      } else if (routes[i].children) {
        record.push(i)
        pathArr.push(routes[i].path)
        const result:any = findSelectedKeys(routes[i].children, url, record)
        if (result.success) return {
          success: true,
          record:result.record
        }
      } else {
        record = []
      }
    }
  }
  
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path === url) {
      openKeys.value.push(routes[i].path)
    } else if(routes[i].children){
      const result = findSelectedKeys(routes[i].children, url, [])
      if(result) {
       result.record.unshift(i)
       pathArr.unshift(routes[i].path)
       openKeys.value = pathArr
        return
      } else {
        pathArr = []
      }
    }
  }
}
watch(() => Route.path, (newUrl: string) => {
  recoverMenuSelectedKeys(newUrl)
  recoverMenuOpenKeys(routes, newUrl)
}, { immediate: true })
</script>
<style lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;

    .logo-img {
      width: 30px;
      margin: 0;
    }

    .logo-text {
      margin: 0 0 0 10px;
      font-size: 24px;
      font-weight: bold;
      color: #dadada;
      white-space: nowrap;
    }
  }

  .ant-menu-root {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  /* 去除菜单 Loading 遮罩层 */
  .ant-spin-nested-loading,
  .ant-spin-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    .ant-spin {
      max-height: 100% !important;
    }

    .ant-spin-container::after {
      background: transparent !important;
    }

    .ant-spin-blur {
      overflow: auto !important;
      clear: none !important;
      opacity: 1 !important;
    }
  }
}
</style>
<!-- // import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Menu, Spin } from "antd";
// import { findAllBreadcrumb, getOpenKeys, handleRouter, searchRoute } from "@/utils/util";
// import { setMenuList } from "@/redux/modules/menu/action";
// import { setBreadcrumbList } from "@/redux/modules/breadcrumb/action";
// import { setAuthRouter } from "@/redux/modules/auth/action";
// import { getMenuList } from "@/api/modules/login";
// import { connect } from "react-redux";
// import type { MenuProps } from "antd";
// import * as Icons from "@ant-design/icons";
// import Logo from "./components/Logo";
// import "./index.less";

// const LayoutMenu = (props: any) => {
// 	const { pathname } = useLocation();
// 	const { isCollapse, setBreadcrumbList, setAuthRouter, setMenuList: setMenuListAction } = props;
// 	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
// 	const [openKeys, setOpenKeys] = useState<string[]>([]);

// 	// 刷新页面菜单保持高亮
// 	useEffect(() => {
// 		setSelectedKeys([pathname]);
// 		isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
// 	}, [pathname, isCollapse]);

// 	// 设置当前展开的 subMenu
// 	const onOpenChange = (openKeys: string[]) => {
// 		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
// 		const latestOpenKey = openKeys[openKeys.length - 1];
// 		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
// 		setOpenKeys([latestOpenKey]);
// 	};

// 	// 定义 menu 类型
// 	type MenuItem = Required<MenuProps>["items"][number];
// 	const getItem = (
// 		label: React.ReactNode,
// 		key?: React.Key | null,
// 		icon?: React.ReactNode,
// 		children?: MenuItem[],
// 		type?: "group"
// 	): MenuItem => {
// 		return {
// 			key,
// 			icon,
// 			children,
// 			label,
// 			type
// 		} as MenuItem;
// 	};
// 	// 动态渲染 Icon 图标
// 	const customIcons: { [key: string]: any } = Icons;
// 	const addIcon = (name: string) => {
// 		return React.createElement(customIcons[name]);
// 	};
// 	// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
// 	const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
// 		menuList.forEach((item: Menu.MenuOptions) => {
// 			// 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
// 			if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
// 			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
// 		});
// 		return newArr;
// 	};

// 	// 获取菜单列表并处理成 antd menu 需要的格式
// 	const [menuList, setMenuList] = useState<MenuItem[]>([]);
// 	const [loading, setLoading] = useState(false);
// 	const getMenuData = async () => {
// 		setLoading(true);
// 		try {
// 			const { data } = await getMenuList();
// 			if (!data) return;
// 			setMenuList(deepLoopFloat(data));
// 			// 存储处理过后的所有面包屑导航栏到 redux 中
// 			setBreadcrumbList(findAllBreadcrumb(data));
// 			// 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
// 			const dynamicRouter = handleRouter(data);
// 			setAuthRouter(dynamicRouter);
// 			setMenuListAction(data);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};
// 	useEffect(() => {
// 		getMenuData();
// 	}, []);

// 	// 点击当前菜单跳转页面
// 	const navigate = useNavigate();
// 	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
// 		const route = searchRoute(key, props.menuList);
// 		if (route.isLink) window.open(route.isLink, "_blank");
// 		navigate(key);
// 	};

// 	return (
// 		<div className="menu">
// 			<Spin spinning={loading} tip="Loading...">
// 				<Logo></Logo>
// 				<Menu
// 					theme="dark"
// 					mode="inline"
// 					triggerSubMenuAction="click"
// 					openKeys={openKeys}
// 					selectedKeys={selectedKeys}
// 					items={menuList}
// 					onClick={clickMenu}
// 					onOpenChange={onOpenChange}
// 				></Menu>
// 			</Spin>
// 		</div>
// 	);
// };

// const mapStateToProps = (state: any) => state.menu;
// const mapDispatchToProps = { setMenuList, setBreadcrumbList, setAuthRouter };
// export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu); -->
