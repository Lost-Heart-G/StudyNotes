# ajax

## 1. 同步和异步

### 1.1 同步交互

​		首先用户向HTTP服务器提交一个处理请求。接着服务器端接收到请求后，按照预先编写好的程序中的业务逻辑进行处理，比如和数据库服务器进行数据信息交换。最后，服务器对请求进行响应，将结果返回给客户端，返回一个HTML在浏览器中显示，通常会有CSS样式丰富页面的显示效果。

![image-20210919214753489](assets\image-20210919214753489.png)

* 优点: 

  ​		可以保留浏览器后退按钮的正常功能。在动态更新页面的情况下，用户可以回到前一个页面状态，浏览器能记下历史记录中的静态页面,用户通常都希望单击后退按钮时，就能够取消他们的前一次操作，同步交互可以实现这个需求.

* 缺点:

  1. 同步交互的不足之处，会给用户一种不连贯的体验，当服务器处理请求时，用户只能等待状态，页面中的显示内容只能是空白。

  2. 因为已经跳转到新的页面,原本在页面上的信息无法保存,好多信息需要重新填写

### 1.2 异步交互

​		指发送一个请求,不需要等待返回,随时可以再发送下一个请求，即不需要等待。在部分情况下，我们的项目开发中都会优先选择不需要等待的异步交互方式。将用户请求放入消息队列，并反馈给用户，系统迁移程序已经启动，你可以关闭浏览器了。然后程序再慢慢地去写入数据库去。这就是异步。异步不用等所有操作等做完，就响应用户请求。即先响应用户请求，然后慢慢去写数据库，用户体验较好

![image-20210919215102546](assets\image-20210919215102546.png)

* 优点: 

  1. 前端用户操作和后台服务器运算可以同时进行,可以充分利用用户操作的间隔时间完成运算

  2. 页面没有跳转,响应回来的数据直接就在原页面上,页面原有信息得以保留* 

* 缺点:

  ​		可能破坏浏览器后退按钮的正常行为。在动态更新页面的情况下，用户无法回到前一个页面状态，这是因为浏览器仅能记录的始终是当前一个的静态页面。用户通常都希望单击后退按钮，就能够取消他们的前一次操作，但是在AJAX这样异步的程序，却无法这样做。



## 2. ajax 介绍

​		“Asynchronous Javascript And XML”（异步 JavaScript和 XML），是指一种创建交互式、快速动态网页应用的网页开发技术，无需重新加载整个网页的情况下，能够更新部分网页的技术。通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。



### 2.1 AJAX关键技术

* 使用CSS构建用户界面样式,负责页面排版和美工

* 使用DOM进行动态显示和交互,对页面进行局部修改

* 使用XMLHttpRequest异步获取数据

* 使用JavaScript将所有的元素绑定在一起

> AJAX的最大的特点:  异步访问,局部刷新



## 3.  AJAX数据格式处理

### 3.1 响应普通文本数据

​	如果服务器给我们响应的数据非常简答,那么使用字符串就好了,不需要我们做复杂的处理,后台编码也简单.



### 3.2 JSON的介绍和应用

​		JSON(JavaScriptObject Notation, JS 对象简谱) 是一种轻量级的数据交换格式。它基于ECMAScript (欧洲计算机协会制定的js规范)的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。简洁和清晰的层次结构使得JSON 成为理想的数据交换语言。 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。它有如下优点

1.  轻量级,在这里用它不是为了厉害的功能代码,而是为了实现数据转换

2.  Json 格式既能考虑到前端对象的特点 同时也能兼顾后台对象信息的特点

3. Json 格式可以被前端直接识别并解析成对象

4.  jQuery形式实现AJAX默认前后端传递数据的格式就是JSON

![image-20210919220222011](assets\image-20210919220222011.png)



#### 3.2.1 JSON 与 JS 对象的关系

​		很多人搞不清楚 JSON 和 JS 对象的关系，甚至连谁是谁都不清楚。其实，可以这么理解：JSON 是 JS 对象的字符串表示法，它使用文本表示一个 JS 对象的信息，本质是一个字符串。

```js
var obj = {a: 'Hello', b: 'World'}; //这是一个对象，注意键名也是可以使用引号包裹的

var json = '{"a": "Hello", "b":   "World"}'; //这是一个 JSON 字符串，本质是一个字符串
```

#### 3.2.2 JSON 和 JS 对象互转

要实现从JSON字符串转换为JS对象，使用 `JSON.parse()`  方法

```js
var obj = JSON.parse('{"a": "Hello", "b":   "World"}');  //结果是 {a: 'Hello', b: 'World'}
```

要实现从JS对象转换为JSON字符串，使用 `JSON.stringify()` 方法

```js
var json = JSON.stringify({a: 'Hello', b: 'World'});    //结果是  '{"a": "Hello", "b": "World"}'
```



### 3.3 GSON工具类的使用

gson工具类中已经给我们封装好了json格式和java对象之间转换的API,我们直接使用即可,再也不用手动去转换项目中

页面代码

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>$Title</title>
    <script>
      var xhr ;
      function testData(){
        xhr =new XMLHttpRequest();
        xhr.open("GET","testServlet.do",true);
        xhr.onreadystatechange=showReturnInfo;
        xhr.send(null);
      }
      function showReturnInfo(){
        if(xhr.readyState==4 && xhr.status==200){
          var info =xhr.responseText;
          var users=JSON.parse(info)
          for (var i = 0; i <users.length ; i++) {
            var user =users[i];
            console.log(user.uname)
            console.log(user.age)
            console.log(user.gender)
            console.log(user.birthday)
          }
        }
      }
    </script>
  </head>
  <body>
  <input type="button" value="测试" onclick="testData()">
  </body>
</html>
```

后台代码

```java
@WebServlet("/testServlet.do")
public class TestServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user1 =new User("晓明1",10,"男",new Date());
        User user2 =new User("晓明2",10,"男",new Date());
        User user3 =new User("晓明3",10,"男",new Date());
        User user4 =new User("晓明4",10,"男",new Date());
        User user5 =new User("晓明5",10,"男",new Date());
        ArrayList<User> list =new ArrayList<>();
        Collections.addAll(list,user1,user2,user3,user4,user5);
        // 响应普通文本数据
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        GsonBuilder gsonBuilder = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss");
        Gson gson = gsonBuilder.create();
        String str = gson.toJson(list);
        System.out.println(str);
        resp.getWriter().print(str);
    }
}
```



## 4. ajax 结合jQuery 实现

### 4.1 jQuery.ajax()的简单使用

基本语法为(经典语法):

前端代码

```html
<!DOCTYPE html>
<html>
<head>
    <title>$Title%</title>
    <meta charset="UTF-8"/>
    <script src="js/jquery.min.js"></script>
    <script>
        function checkUname(){
            // 获取输入框中的内容
            if(null == $("#unameI").val() || '' == $("#unameI").val()){
                $("#unameInfo").text("用户名不能为空");
                return;
            }
            $("#unameInfo").text("");
            // 通过jQuery.ajax() 发送异步请求
            $.ajax(
                    {
                        type:"GET",// 请求的方式 GET  POST
                        url:"unameCheckServlet.do?", // 请求的后台服务的路径
                        data:"uname="+$("#unameI").val(),// 提交的参数
                        success:function(info){ // 响应成功执行的函数
                            $("#unameInfo").text(info)
                        }
                    }
            )
        }
    </script>
</head>
<body>
<form action="myServlet1.do" >
    用户名:<input id="unameI" type="text" name="uname" onblur="checkUname()">
    <span id="unameInfo" style="color: red"></span><br/>
    密码:<input type="password" name="pwd"><br/>
    <input type="submit" value="提交按钮">
</form>
</body>
</html>
```

后台代码

```java
@WebServlet("/unameCheckServlet.do")
public class UnameCheckServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uname = req.getParameter("uname");
        String info="";
        if("msb".equals(uname)){
            info="用户名已经占用";
        }else{
            info="用户名可用";
        }
        // 向浏览器响应数据
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        resp.getWriter().print(info);
    }
}
```

### 4.2  jQuery.ajax()属性详解

$.ajax()方法中有很多属性可以供我们使用,其中很多属性都有默认值,那么这些属性都有哪些,处理的是什么事情?接下来给大家一一介绍一下

1. `url`:   要求为String类型的参数，（默认为当前页地址）发送请求的地址。

2. `type`: 要求为String类型的参数，请求方式（post或get）默认为get。注意其他http请求方法，例如put和delete也可以使用，但仅部分浏览器支持。

3. `timeou`t: 要求为Number类型的参数，设置请求超时时间（毫秒）。此设置将覆盖$.ajaxSetup()方法的全局设置。

4. `async`:  要求为Boolean类型的参数，默认设置为true，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为false。注意，同步请求将锁住浏览器，用户其他操作必须等待请求完成才可以执行。

5. `cache`:  要求为Boolean类型的参数，默认为true（当dataType为script时，默认为false），设置为false将不会从浏览器缓存中加载请求信息。

6. `data`:  要求为Object或String类型的参数，发送到服务器的数据。如果已经不是字符串，将自动转换为字符串格式。get请求中将附加在url后。防止这种自动转换，可以查看　　processData选项。对象必须为key/value格式，例如{foo1:"bar1",foo2:"bar2"}转换为&foo1=bar1&foo2=bar2。如果是数组，JQuery将自动为不同值对应同一个名称。例如{foo:["bar1","bar2"]}转换为&foo=bar1&foo=bar2。

7. `dataType`: 要求为String类型的参数，预期服务器返回的数据类型。如果不指定，JQuery将自动根据http包mime信息返回responseXML或responseText，并作为回调函数参数传递。可用的类型如下：

   `xml` ：返回XML文档，可用JQuery处理。

   `html` ：返回纯文本HTML信息；包含的script标签会在插入DOM时执行。

   `script` ：返回纯文本JavaScript代码。不会自动缓存结果。除非设置了cache参数。注意在远程请求时（不在同一个域下），所有post请求都将转为get请求。

   `json` ：返回JSON数据。

   `jsonp` ：JSONP格式。使用JSONP形式调用函数时，例如myurl?callback=?，JQuery将自动替换后一个“?”为正确的函数名，以执行回调函数。

   `text` ：返回纯文本字符串。

8. `beforeSend`：要求为Function类型的参数，发送请求前可以修改XMLHttpRequest对象的函数，例如添加自定义HTTP头。在beforeSend中如果返回false可以取消本次ajax请求。

   XMLHttpRequest对象是惟一的参数。

   ```js
     function(XMLHttpRequest){
          this; //调用本次ajax请求时传递的options参数
     }
   ```

9. `complete`: 要求为Function类型的参数，请求完成后调用的回调函数（请求成功或失败时均调用）。参数：XMLHttpRequest对象和一个描述成功请求类型的字符串。

   ```js
   function(XMLHttpRequest, textStatus){
     this; //调用本次ajax请求时传递的options参数
   }
   ```

10. `success`：

    要求为Function类型的参数，请求成功后调用的回调函数，有两个参数。
    (1)由服务器返回，并根据dataType参数进行处理后的数据。
    (2)描述状态的字符串。

    ```js
    function(data, textStatus){
      //data可能是xmlDoc、jsonObj、html、text等等
      this; //调用本次ajax请求时传递的options参数
    }
    ```

11. `error`: 要求为Function类型的参数，请求失败时被调用的函数。该函数有3个参数，即XMLHttpRequest对象、错误信息、捕获的错误对象(可选)。ajax事件函数如下：

    ```js
    function(XMLHttpRequest, textStatus, errorThrown){
      //通常情况下textStatus和errorThrown只有其中一个包含信息
      this; //调用本次ajax请求时传递的options参数
    }
    ```

12. `contentType`：

    要求为String类型的参数，当发送信息至服务器时，内容编码类型默认为`"application/x-www-form-urlencoded"` 。该默认值适合大多数应用场合。

13. `dataFilter`：要求为Function类型的参数，给Ajax返回的原始数据进行预处理的函数。提供data和type两个参数。data是Ajax返回的原始数据，type是调用jQuery.ajax时提供的dataType参数。函数返回的值将由jQuery进一步处理。

    ```js
    function(data, type){
      //返回处理后的数据
       return data;
      }
    ```

    

14. `global`: 要求为Boolean类型的参数，默认为true。表示是否触发全局ajax事件。设置为false将不会触发全局ajax事件，ajaxStart或ajaxStop可用于控制各种ajax事件。

15. `ifModified`：要求为Boolean类型的参数，默认为false。仅在服务器数据改变时获取新数据。服务器数据改变判断的依据是Last-Modified头信息。默认值是false，即忽略头信息。

16. `jsonp`：要求为String类型的参数，在一个jsonp请求中重写回调函数的名字。该值用来替代在"callback=?"这种GET或POST请求中URL参数里的"callback"部分，例如{jsonp:'onJsonPLoad'}会导致将"onJsonPLoad=?"传给服务器。

17. `username`：要求为String类型的参数，用于响应HTTP访问认证请求的用户名。

18. `password`：要求为String类型的参数，用于响应HTTP访问认证请求的密码。

19. `processData`：要求为Boolean类型的参数，默认为true。默认情况下，发送的数据将被转换为对象（从技术角度来讲并非字符串）以配合默认内容类型"application/x-www-form-urlencoded"。如果要发送DOM树信息或者其他不希望转换的信息，请设置为false。

20. `scriptCharset`：要求为String类型的参数，只有当请求时dataType为"jsonp"或者"script"，并且type是GET时才会用于强制修改字符集(charset)。通常在本地和远程的内容编码不同时使用。

> 注意:
>
> ajax异步提交的可选属性和方法较多,实际研发我们没必要写这么多,一般可以使用默认值的属性就可以省略不写,一些业务逻辑或者功能上不需要的方法也可以省略不写,由于属性太多,针对于一些特殊情况,jQuery也给我们提供了一些专用的方法,这样可以简化$.ajax的写法,每一种简化写法都相当于已经指定了$.ajax一些属性的值.



### 4.3 jQuery实现AJAX的其他写法

#### 4.3.1 `jQuery load()` 

` jQuery load()`  方法是简单但强大的 AJAX 方法，load() 方法从服务器加载数据，并把返回的数据放入被选元素中。默认使用 GET 方式 - 传递附加参数时自动转换为 POST 方式,

语法为:

```js
$(selector).load(URL,data,callback);
```

 参数的含义为: 

* `url`: URL地址

* `data`:待发送参数。

* `callback`:载入成功时回调函数

测试代码

准备第一个页面

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <script src="js/jquery.min.js"></script>
        <script>
            function testLoad(){
                //$("#d1").load("servlet2.do","username=aaa&password=bbb",function(){alert("响应结束")})
                $("#d1").load("loadPage.html #a")
            }
        </script>
    </head>
    <body>
        <div id="d1" style="width: 100px;height: 100px;border: 1px solid black">
        </div>
        <input type="button" value="测试" onclick="testLoad()">
    </body>
</html>
```

第二个页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="a">
    <li>JAVA</li>
    <li>HTML</li>
    <li>CSS</li>
    <li>Mysql</li>
    <li>python</li>
</div>
</body>
</html>
```

后台代码

```java
@WebServlet("/servlet2.do")
public class Servlet2 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        System.out.println(username);
        System.out.println(password);
        resp.setContentType("text/html;charset=UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().print("<h1>hello</h1>");
    }
}
```

#### 4.3.2` $.get()` 

这是一个简单的 GET 请求功能以取代复杂` $.ajax` 。请求成功时可调用回调函数。如果需要在出错时执行函数，请使用`$.ajax` 。

语法为:

```js
$.get(url,[data],[callback],[type])
```

参数的含义为:

* `url`: URL地址

* `data`:待发送参数。 可选参数

* `callback`:载入成功时回调函数。可选参数

* `type`:返回内容格式，xml, html, script, json, text, _default  可选参数

该函数是简写的 Ajax 函数，等价于：

```js
$.ajax({
 type:   'GET',
  url: url,
  data: data,
  success: success,
  dataType: dataType
});
```

#### 4.3.3 `$.getJSON()` 

​	JSON是一种较为理想的数据传输格式，它能够很好的融合与JavaScript或其他宿主语言，并且可以被JS直接使用。使用JSON相比传统的通过 GET、POST直接发送“裸体”数据，在结构上更为合理，也更为安全。至于jQuery的getJSON()函数，只是设置了JSON参数的ajax()函数的一个简化版本。语法为:

```js
$.getJSON( 
    url,             //请求URL
    [data],          //传参，可选参数
    [callback]       //回调函数，可选参数
);
```

该函数是简写的 Ajax 函数，等价于：

```js
$.ajax({ 
  url: url,
  data: data, 
  success: callback,
  dataType: json
});
```

仅仅是等效于上述函数,但是除此之外这个函数也是可以跨域使用的，相比get()、post()有一定优势。另外这个函数可以通过把请求url写 成"myurl?callback=X"这种格式，让程序执行回调函数X。

> 注意:`$.getJSON` 是以GET方式提交数据，如果需要提交很大的数据量，可选 `$.post` 

#### 4.3.4 `$.post()` 

这是一个简单的 POST 请求功能以取代复杂 $.ajax 。请求成功时可调用回调函数。如果需要在出错时执行函数，请使用$.ajax。语法为:

```js
$.post(url,[data],[callback],[type])
```

参数的含义为:

* `url`: URL地址

* `data`:待发送参数。 可选参数

* `callback`:载入成功时回调函数。可选参数

* `type`:返回内容格式，xml, html, script, json, text, _default  可选参数

该函数是简写的 Ajax 函数，等价于：

```js
$.ajax({
  type:   'POST',
  url: url,
  data: data, 
  success: success, 
  dataType: dataType
})
```

### 4.4  jsonp跨域处理

#### 4.4.1 什么是跨域?

​		出于浏览器的同源策略限制。同源策略（Sameoriginpolicy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。可以说Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。同源策略会阻止一个域的javascript脚本和另外一个域的内容进行交互。所谓同源（即指在同一个域）就是两个页面具有相同的协议（protocol），主机（host）和端口号（port）
本地路径地址：http://127.0.0.1:8080/msb/index.jsp
https://127.0.0.1:8080/msb/index.jsp 协议不一样
http://192.168.24.11:8080/msb/index.jsp IP不一致
http://127.0.0.1:8888/msb/index.jsp 端口不一致
http://localhost:8080/msb/index.jsp IP不一致

#### 4.4.2 实现的原理是什么?

​		我们发现Web页面上调用js文件时则不受是否跨域的影响,拥有”src”这个属性的标签都却拥有跨域的能力，比如<\script>、<\img>、<\iframe>。那么跨域访问数据就有了一种可能，那就是在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理。就好比使用一个<script>,让其src属性指向我们要访问的跨域资源,然后以接收js文件的形式接收数据

* 通过:`dataType:'jsonp'` 属性实现跨域请求

* 通过 `jsonp:'callback'` 属性简化回调函数处理

  通过 `jsonp:’callback’` 实现自动处理回调函数名,相当于在url地址栏最后后拼接一个callback=函数名,后台自动根据这个函数名处理JS脚本,jQuery也会根据这函数名自动在前端处理回调函数,这样我们直接在success方法中接收返回的数据即可,可以不用自己去自己定义回调函数.后台获取参数时,参数名要要和jsonp:后面的函数名保持一致

页面代码

```html
<html>
    <head>
        <title>title</title>
        <meta charset="UTF-8"/>
        <script src="http://localhost:8080/ajaxDemo3_war_exploded/js/jquery.min.js"></script>
        <script>
            function checkUname(){
                // 获取输入框中的内容
                if(null == $("#unameI").val() || '' == $("#unameI").val()){
                    $("#unameInfo").text("用户名不能为空");
                    return;
                }
                $("#unameInfo").text("");
                // 通过jQuery.ajax() 发送异步请求
                $.ajax({
                    type:"GET",// 请求的方式 GET  POST
                    url:"http://localhost:8080/ajaxDemo3_war_exploded/unameCheckServlet.do?", // 请求的后台服务的路径
                    data:{uname:$("#unameI").val()},// 提交的参数
                    dataType:"jsonp",
                    jsonp:"aaa",
                    success:function(info){
                        $("#unameInfo").text(info)
                    }
                })
            }
        </script>
    </head>
    <body>
        <form action="myServlet1.do" >
            用户名:<input id="unameI" type="text" name="uname" onblur="checkUname()">
            <span id="unameInfo" style="color: red"></span><br/>
            密码:<input type="password" name="pwd"><br/>
            <input type="submit" value="提交按钮">
        </form>
    </body>
</html>
```

后端代码

```java
@WebServlet("/unameCheckServlet.do")
public class UnameCheckServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uname = req.getParameter("uname");
        String callBack = req.getParameter("aaa");
        System.out.println(uname);
        String info="";
        if("msb".equals(uname)){
            info="用户名已经占用";
        }else{
            info="用户名可用";
        }
        // 向浏览器响应数据
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/javaScript;charset=UTF-8");
        resp.getWriter().print(callBack+"('"+info+"')");
    }
}
```

#### 4.4.3 通过getJson方实现跨域请求

​	`getJSON`方法是可以实现跨域请求的,在用该方法实现跨域请求时,在传递参数上应该注意在url后拼接一个jsoncallback=?,jQuery会自动替换?为正确的回调函数名,我们就可以不用单独定义回调函数了

 前端代码

```html
<html>
    <head>
        <title>Title</title>
        <meta charset="UTF-8"/>
        <script src="http://localhost:8080/ajaxDemo3_war_exploded/js/jquery.min.js"></script>
        <script>
            function checkUname(){
                // 获取输入框中的内容
                if(null == $("#unameI").val() || '' == $("#unameI").val()){
                    $("#unameInfo").text("用户名不能为空");
                    return;
                }
                $("#unameInfo").text("");
                $.getJSON(
                    "http://localhost:8080/ajaxDemo3_war_exploded/unameCheckServlet.do?jsoncallback=?",
                    {uname:$("#unameI").val()},
                    function(info){
                        $("#unameInfo").text(info)
                    }
                )
            }
        </script>
    </head>
    <body>
        <form action="myServlet1.do" >
            用户名:<input id="unameI" type="text" name="uname" onblur="checkUname()">
            <span id="unameInfo" style="color: red"></span><br/>
            密码:<input type="password" name="pwd"><br/>
            <input type="submit" value="提交按钮">
        </form>
    </body>
</html>
```

后台代码

````java
@WebServlet("/unameCheckServlet.do")
public class UnameCheckServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uname = req.getParameter("uname");
        String callBack = req.getParameter("jsoncallback");
        System.out.println(uname);
        String info="";
        if("msb".equals(uname)){
            info="用户名已经占用";
        }else{
            info="用户名可用";
        }
        // 向浏览器响应数据
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/javaScript;charset=UTF-8");
        resp.getWriter().print(callBack+"('"+info+"')");
    }
}
````

拓展:通过后台代码也可以实现跨域,一般在过滤器中添加如下代码,那么前端在请求时就不用考虑跨域问题了

```java
 /*请求地址白名单 *代表所有    */
  resp.setHeader("Access-Control-Allow-Origin", "*");
  /*请求方式白名单      */
  resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  resp.setHeader("Access-Control-Max-Age", "3600");
  resp.setHeader("Access-Control-Allow-Headers", "x-requested-with");
```

