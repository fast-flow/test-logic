# Custom style

If you want to completely customize the style,you need a reference [lib/index.css](../lib/index.css),and using the props.themes props.prefixClassName.

> You must read   [component-develop-guide:encapsulation](https://github.com/nimojs/component-develop-guide/blob/master/encapsulation.md)

````css
html .r-alert--themes-info {
    border-color: #aaa;
    background-color: #eee;
    color:#333;
}
````


````demo
{
    title: 'Custom style',
    html: '<div id="example__custom-style" >loading...</div>',
    desc: 'describe',
    file: './custom-style.demo.js'
}
````
