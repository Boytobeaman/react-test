/**
 * 加载外部资源
 * @param {string[]} rs - 资源地址，支持js和css
 * @return {Promise<() | Event>} - 失败会返回event，成功回调无返回值
 */
function loadResource(rs) {
  const ele = [];
  rs.forEach(addr => {
    const r = /.+\.(?<ext>\w{2,3})$/;
    const exec = r.exec(addr);
    if (exec) {
      const ext = exec.groups.ext;
      switch (ext) {
        case 'js': {
          const el = document.createElement('script');
          el.src = addr;
          ele.push(el);
          break;
        }
        case 'css': {
          const el = document.createElement('link');
          el.href = addr;
          el.rel = 'stylesheet';
          ele.push(el);
          break;
        }
        default: break;
      }
    }
  });
  const len = ele.length;
  let i = 0;
  return new Promise((resolve, reject) => {
    ele.forEach(el => {
      el.onload = e => {
        e.stopPropagation();
        i += 1;
        if (i >= len) {
          resolve();
        }
      }
      el.onerror = e => {
        e.stopPropagation();
        window.stop();
        reject(e);
      }
      document.head.appendChild(el);
    })
  })
}

export default loadResource;
