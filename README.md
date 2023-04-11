<h1 align="center">Form Designer</h1>

<div align="center">

基于<a href="https://ant.design/" target="_blank" rel="noopener noreferrer">Ant Design</a>
和 <a href="http://jqueryui.com/" target="_blank" rel="noopener noreferrer">jQuery UI</a> 的表单设计器

![](https://github.com/lumengwei/form-designer/blob/master/preview-react.png)

</div>

### 特性

- [x] React
- [x] Vue 3.x
- [x] Typescript
- [x] 统一的组件定义，对Vue 和React 的实现提供一个统一的组件定义描述

### 概念

- Component 组件
- Layout 布局，一种特殊的Component
- Component Editor 组件属性编辑器
- Component Factory 提供组件定义

### 扩展组件

#### 定义组件属性类型

在src/props.ts 文件中定义组件属性

```
export type RateProps = {
    count: number
}

```

#### 定义一个ComponentFactory

在src/factory目录下定义。 提供了makeFieldId()和makeComponentId()两个方法用于生成id

```
class RateFactory implements FieldFactory<RateProps> {
    readonly type = "Rate"
    readonly group = FactoryGroup.Component;
    title = "评分"

    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition() {
        return {
            id: makeComponentId(),
            type: this.type,
            title: this.title,
            fieldDef: {
                fieldId: makeFieldId(),
                fieldType: 'varchar' as FieldType,
                fieldName: '',
            },
            props: {
                count: 5
            },
        }
    }
}

export default new RateFactory();
```
#### 创建一个vue组件或布局

- 在src/antdv-designer/src/designer/components目录下添加vue组件
- 在src/antdv-designer/src/designer/layout目录下添加vue布局


#### 创建一个React组件或布局

- 在src/antd-designer/src/designer/components目录下添加React组件
- 在src/antd-designer/src/designer/layout目录下添加React布局


