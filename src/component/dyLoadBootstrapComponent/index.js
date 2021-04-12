import asyncComponent from "../dynamicLoadResource";

export default $$Rcomponent => {
    return asyncComponent(
        $$Rcomponent,
        [
            `/static/bootstrap.min.css`,
            `/static/jquery-3.5.1.slim.min.js`,
            `/static/popper.min.js`,
            `/static/bootstrap.min.js`,
        ],
        () => window.$
    )
};
