module.exports = api => {
    return {
        plugins: [
            "@babel/plugin-transform-react-jsx",
            require("@babel/plugin-syntax-dynamic-import"),
            [require("@babel/plugin-proposal-decorators"), {"legacy": true}],
            [require("@babel/plugin-proposal-class-properties"), {"loose": false}]
        ],
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "entry",
                    // caller.target 等于 webpack 配置的 target 选项
                    targets: api.caller(caller => caller && caller.target === "node")
                        ? {node: "current"}
                        : {chrome: "58", ie: "11"}
                }
            ]
        ]
    }
}
