import React from "react";
import loadResource from "./loadResource";
import './asyncComponent.css';

/**
 * 异步加载资源，并在加载成功后返回指定component
 * @param {ReactComponentElement} $$Rcomponent - react component
 * @param {string[]} resource - 资源数组，支持js、css
 * @param {function} [checkFn = () => false] - 额外的检查函数。如果返回true，跳过从服务器请求的过程
 * @return {ReactComponentElement} - react component
 */
function asyncComponent($$Rcomponent, resource, checkFn = () => false) {
  return class A extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loaded: checkFn(),
        msg: <div className={`loading-msg`}><div className="icon-loading" /><div className="icon-text">Loading</div><span className="icon-logo" /></div>
      };
    }

    componentDidMount() {
      if (!this.state.loaded) {
        loadResource(resource)
          .then(() => {
            this.setState({
              loaded: true,
            })
          })
          .catch(e => {
            console.error(e)
            this.setState({
              // msg: <div style={{color:'red'}} className={`loading-msg`}>loading resource fail</div>
              msg: <div className={`loading-msg`}><div className="icon-loading-error" /><div className="icon-text-error">Failed</div><span className="icon-logo" /></div>
            })
          })
      }
    }

    render() {
      const { loaded, msg } = this.state;
      if (loaded) {
        return <$$Rcomponent {...this.props} />
      } else {
        return <div>{msg}</div>
      }
    }
  }
}

export default asyncComponent;
