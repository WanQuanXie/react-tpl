import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('root'));

// 只有当开启了模块热替换时 module.hot 才存在
if (module.hot) {
  // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./App 这个子模块
  // 第 2 个参数用于在新的子模块加载完毕后需要执行的逻辑
  module.hot.accept('./App', function () {
    console.log('Accepting the updated App module!');
    render(<App />, document.getElementById('root'));
  });
}
