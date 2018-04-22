# 使用说明

小demo<br>

效果：鼠标滚动，懒加载从浏览器底部出现的图片
<br>

`html`:
<br>

```html
<img src="预加载的图片" data-src="加载的目标图片" class="目标类" alt="随便">
```

<br>

`js`:
<br>
先引入依赖，然后：

```js
    <script>
        LazyLoad({
            timeout: 200,
            class: 'lazyload',
            errorImg: 'error.png',
	    wait: 100
        });
    </script>
```
基本参数说明：<br>
* timeout:延时加载图片时间
* class:目标类
* errorImg:加载图片后显示是替补照片
* wait:节流阀
