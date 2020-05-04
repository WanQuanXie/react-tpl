import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { cleanupOutdatedCaches } from 'workbox-precaching';
import * as navigationPreload from 'workbox-navigation-preload';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

// 自动删除旧缓存
cleanupOutdatedCaches();

// 预缓存文件，self.__WB_MANIFEST 是 workbox 生成的文件地址数组，项目中打包生成的所有静态文件都会自动添加到里面
// eslint-disable-next-line
precacheAndRoute(self.__WB_MANIFEST || []);

// 开启导航预加载
navigationPreload.enable();

const strategy = new NetworkFirst({
  cacheName: 'cached-navigations',
  plugins: [
    // Any plugins, like `ExpirationPlugin`, etc.
  ]
});
// 单页应用需要应用 NavigationRoute 进行缓存，此处可自定义白名单和黑名单
const navigationRoute = new NavigationRoute(strategy, {
  // Optionally, provide a allow/denylist of RegExps to determine
  // which paths will match this route.
  // allowlist: [],
  // 跳过登录和退出页面的拦截
  denylist: [/login/, /logout/]
});
registerRoute(navigationRoute);

// 运行时缓存配置
// 接口数据使用服务端数据
registerRoute(/^api/, new NetworkFirst());

// 图片cdn地址，属于跨域资源，我们使用 StaleWhileRevalidate 缓存策略
registerRoute(/^https:\/\/img.xxx.com\//, new StaleWhileRevalidate());
