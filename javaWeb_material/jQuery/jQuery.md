# jQuery

## 1. jQuery简介

​		目前最流行的JavaScript函数库之一，对JavaScript进行了封装。并不是一门新语言。将常用的、复杂的操作进行函数化封装，直接调用，大大降低了使用JavaScript的难度，改变了使用JavaScript的习惯。jQuery能做的JavaScript也能做，但使用jQuery能大幅提高开发效率,由美国人John Resig在2006年推出，目前最新版本是v3.5.1。宗旨：Write less，do more（写更少代码，做更多事情）。官方网址http://jquery.com/



## 2. jQuery选择器

### 2.1 基本选择器

| 选择器             | 示例                           |
| ------------------ | ------------------------------ |
| 标签选择器         | `$("a")`                       |
| ID选择器           | `$("#id")` , `$("p#id")`       |
| 类选择器           | `$(".class")` , `("h2.class")` |
| 通配选择器         | `$("*")`                       |
| 并集选择器         | `$("elem1,elem2,elem3")`       |
| 后代选择器         | `$("ul li")`                   |
| 父子选择器         | `$("ul>li")`                   |
| 后面第一个兄弟元素 | `$("prev + next")`             |
| 后面所有的兄弟元素 | ` $("prev ~ next")`            |



### 2.2  属性选择器

| 选择器                     | 说明                                 |
| -------------------------- | ------------------------------------ |
| `[attribute]`              | 匹配包含给定属性的元素               |
| `[attribute1][attribute2]` | 复合属性选择器，需要同时满足多个属性 |
| `[attribute=value] `       | 匹配给定的属性是某个特定值的元素     |
| `[attribute!=value]`       | 匹配所有属性不等于特定值的元素       |
| `[attribute^=value]`       | 匹配给定的属性是以某些值开始的元素   |
| `[attribute$=value]`       | 匹配给定的属性是以某些值结尾的元素   |
| `[attribute*=value] `      | 匹配给定的属性是以包含某些值的元素   |



### 2.3 位置选择器

* 针对整个页面而言的位置选择器

  | 选择器        | 说明                                     |
  | ------------- | ---------------------------------------- |
  | **`:first`**  | 获取第一个元素                           |
  | **`:last`**   | 获取最后一个元素                         |
  | **`:odd `**   | 匹配所有索引值为奇数的元素，从0 开始计数 |
  | **`:even`**   | 匹配所有索引值为偶数的元素，从0 开始计数 |
  | **`:eq(n) `** | 匹配一个给定索引值的元素                 |
  | **`:gt(n)`**  | 匹配所有大于给定索引值的元素             |
  | **`:lt(n)`**  | 匹配所有小于给定索引值的元素             |



* 针对上级标签而言的位置选择器

  | 选择器                                                     | 说明                                           |
  | :--------------------------------------------------------- | ---------------------------------------------- |
  | **`:first-child`**                                         | 匹配第一个子元素                               |
  | **`:last-child`**                                          | 匹配最后一个子元素                             |
  | **`:only-child`**                                          | 如果某个元素是父元素中唯一的子元素，将会被匹配 |
  | **`:nth-child(n)  :nth-child(odd/even) :nth-child(xn+y)`** | 匹配其父元素下的第N个子或奇偶元素              |

>  注意：nth-child()选择器编号是从1开始，而其他选择器从0开始

### 2.4 表单选择器

* 关于表单项的选择器

  `:text   :password  :radio  :checkbox  :hidden  :file  :submit` 

  `:input`  匹配所有 input, textarea, select 和 button 元素

 

* 关于表单项状态的选择器

  `:selected  :checked  :enabled  :disabled  :hidden :visible` 

> 注意`$("input")` 和`$(":input")` 的区别: 
>
> ​	`$("input")` ：标签选择器，只匹配input标签, 
>
> ​	`$(":input")` ： 匹配所有 input, textarea, select 和 button 元素



## 3. DOM编程

### 3.1 jQuery操作属性和样式

#### 3.1.1 操作属性

jQuery给我们封装了`attr()` 和 `removeAttr()` ,更加便捷的操作属性

| 操作                             | 说明                      |
| -------------------------------- | ------------------------- |
| `$("#f1").attr("color")`         | 获取ID为 f1 的 color 属性 |
| `$("#f1").attr("color","green")` | 修改ID为 f1 的 color 属性 |
| `$("#f1").removeAttr("color")`   | 移除ID为 f1 的 color 属性 |
| `$("#f1").attr("class","a")`     | 添加属性                  |

#### 3.1.2 操作样式

jQuery给我们封装了`css()` 方法,便于我们操作样式,多数情况样式选择器使用类选择器,所以jQuery针对于这一情况,给我们封装了`addClass`   `removeClass`  `toggleClass`  三个方法

| 操作                            | 说明                                        |
| ------------------------------- | ------------------------------------------- |
| `$("#d1").css("width")`         | 获得ID为 d1 的 css 样式                     |
| `$("#d1").css("width","200px")` | 修改ID为 d1 的 css 样式                     |
| `$("#d2").addClass("b")`        | 添加样式                                    |
| `$("#d2").removeClass("b")`     | 移除样式                                    |
| `$("#d2").toggleClass("b")`     | 切换样式 -- 原来有b 则删除,如果没有,则增加b |



### 3.2 jQuery操作文本和增删元素

#### 3.2.1 操作文本

jQuery给我们封装了`text()` , `html()` 和 `val()` 三个方法

| 操作                                 | 说明                 |
| ------------------------------------ | -------------------- |
| `$("#d1").text()`                    | 获取标签中的文本信息 |
| `$("#d1").html()`                    | 获取标签中的信息     |
| `$("#i1").val()`                     | 获取标签中的value值  |
| `$("#d1").text("<h1>牛气冲天</h1>")` | 修改标签中的文本信息 |
| `$("#d1").html("<h1>牛气冲天</h1>")` | 修改标签中的信息     |
| `$("#i1").val("你好")`               | 修改标签中的value值  |

#### 3.2.1 增删元素

jQuery从元素的创建到元素的增加和删除都给我们提供了更加便捷的方法

* 创建元素

   `$('<span>text<span>')`  

* 追加元素

  `append()`  ` appendTo() ` 添加内部标签

  `before()`  `insertBefore()`  向前增加标签

  `after()`  `insertAfter()`   向后增加标签

* 删除元素

  `empty()`  清空字标签

  `remove()` 移除当前标签

```javascript
function fun1(){
    // 创建元素
    var span1=$("<span></span>");
    // 设置样式
    span1.css("color","green");
    span1.css("border","1px solid blue");
    span1.css("background-color","lightgray")
    // 设置文字
    span1.text("今天天气很好");


    $('#d1').append(span1)

}
function fun2(){
    var h =$("<h3>测试文字</h3>").css("color","red").css("border","1px solid green")
    h.appendTo($('#d1'))
}
function fun3(){
    var span1=$('<span style="color: red; border: 1px solid orangered;">测试文字</span>') 
    $("#d1").before(span1);
}
function fun4(){
    var span1=$('<span style="color: red; border: 1px solid orangered;">测试文字</span>') 
    span1.insertBefore($("#d1"));
}
function fun5(){
    var span1=$('<span style="color: red; border: 1px solid orangered;">测试文字</span>') 
    $("#d1").after(span1);
}
function fun6(){
    var span1=$('<span style="color: red; border: 1px solid orangered;">测试文字</span>') 
    span1.insertAfter($("#d1"));
}
function fun7(){
    $("#d1").empty()
}
function fun8(){
    $("#d1").remove(); // 移除当前元素本身
}
```



### 3.3  jQuery操作事件

无非就是 **绑定事件**, **触发事件**, **解绑定事件**.

jQuery中,我们可以使用: 

* **事件的绑定**:  bind(),live()(1.8及之前可用),on()(1.9之后推荐使用),one()

* **事件解绑定**:  unbind()

* **事件的触发**:  行为触发,  jQuery方法触发

```html
<!DOCTYPE html>
<html>
    <head>
         <meta charset="UTF-8">
         <title></title>
         <style>
             #d1{
                  width: 200px;
                  height: 200px;
                  border: 1px solid red;
             }
         </style>
         <script type="text/javascript"   src="js/jquery.min.js"   ></script>
         <script>
             function fun1(){
                //给元素绑定事件
                //原生JS
                /*var div1=document.getElementById("d1")
                div1.onmouseover=function (){
                	alert("悬停")
                }*/
               
               
               /* bind 方法绑定事件
                * 在jQuery中,事件的名称= 原始名称去掉 on
                * onclick       click
                * onmouseover   mouseover
                * 
                * */
                $("#d1").bind('mouseover',function(){
                	$('#d1').css("background-color",'yellow')
                });
                
                /*事件名作为方法*/
                $("#d1").mouseleave(function(){
                	$('#d1').css("background-color",'lightgreen')
                });
                
                
                /*
                 * one 绑定事件一次 
                 * 
                 * */
                /*$("#d1").one('mouseover',function(){
                	$('#d1').css("background-color",'yellow')
                });
                
                 $("#d1").one('mouseleave',function(){
                	$('#d1').css("background-color",'lightgreen')
                });*/
               
                
             }
             function fun2(){
             	//$("#d1").unbind();  接触绑定的所有事件
             	$("#d1").unbind("mouseover") // 接触绑定的指定事件
                 
             }
             function fun3(){
                 // 相当于发生了获得焦点事件
                 $("#i1").focus()
             }
             function fun4(){
                 console.log("获得焦点了")
             }
         </script>
    </head>
    <body>
         <div id='d1'>
         	
         </div>
         <input type="button"   value="添加事件" onclick="fun1()" />
         <input type="button"   value="解除绑定" onclick="fun2()" />
         <br />
         <input type="text"  id='i1' onfocus="fun4()"/>
         <input type="button"   value="触发事件" onclick="fun3()" />
    </body>
</html>

```



### 3.4 jQuery对象和DOM对象的转换

​		使用原生JS方式获得的页面结点对象我们可以简称为DOM对象,使用jQuery核心函数获得的对象我们可以简称为jQuery对象,这两种方式获得的对象即是是页面上同一个元素,那么也是不一样的,二者之间的API是不通用的.而在某些情况下,我们往往无法选择接收的对象,只能被动使用,那么这个时候我们可以让二者实现转换,以达到可以调用API实现功能的目的

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <script type="text/javascript" src="js/jquery.min.js" ></script>
        <script>
            $(function(){
                //1 原生JS获取页面元素  原生DOM对象
                var div1=document.getElementById("d1");

                //2 jQuery方式获取页面元素 jQuery对象
                var div2=$("#d1");
                /*
                 * DOM对象和jQuery对象之间的方法和属性是不通用
                 *
                 * */
                console.log(div1.innerText);
                console.log(div2.text());

                console.log(div1)
                console.log(div2)

                // DOM对象如何调用jQuery函数  DOM对象转换为jQuery    $(DOM)
                console.log($(div1).text());
                // jQuery对象如何调用DOM对象的属性和方法   jQuery转换为DOM对象  get(0)  [0]
                console.log(div2.get(0).innerText)
                console.log(div2[0].innerText)

            })
        </script>
    </head>
    <body>
        <div id="d1">测试文字</div>
    </body>
</html>
```

>注意:
>
>使用原生JSDOM对象转换成jQuery对象方式是`$(dom对象)` 
>
>jQuery对象转换成DOM对象的方式是`jQuery对象[0]` / `jQuery对象.get(0)`  



### 3.5 jQuery中的迭代遍历方式  

​		jQuery给我们封装了一个快捷遍历元素的方法,接下来我们就使用一下jQuery中新的遍历方式

```js
/*
* each每拿出一个元素 都会执行一次内部的function
* i 当前元素的所有
* e 当前元素 DOM对象
*
* */
$.each($lis,function (i,e){
       console.info(i+'>>>'+$(e).text())
 })
```



```html
<!DOCTYPE html>
<html>
    <head>
         <meta charset="utf-8">
         <title></title>
         <script type="text/javascript" src="js/jquery.min.js" ></script>
         <script>
             $(function(){
                  var $lis =$('li')
                  console.info($lis)
                  for(var i = 0;i<$lis.length;i++){
                      /*遍历出的每个元素是DOM对象*/
                      console.info($lis[i].innerText)
                  }
                  for(var i in $lis){
                      console.info($lis[i].innerText)
                  }
                  /*遍历所有元素的方法*/
                  /*
                   each每拿出一个元素 都会执行一次内部的function
                   i 当前元素的所有
                   e 当前元素 DOM对象
                   *
                   * */
                  $lis.each(function (i,e){
                      console.info(i+'>>>'+$(e).text())
                  })
                  $.each($lis,function (i,e){
                      console.info(i+'>>>'+$(e).text())
                  })
             })
         </script>
    </head>
    <body>
         <ul>
             <li>AI</li>
             <li>Python</li>
             <li>大数据</li>
             <li>JAVA</li>
             <li>前端</li>
         </ul>
    </body>
</html>
```



## 4. jQuery动画效果的使用

### 4.1 显示和隐藏动画

* 实现简单显示动画效果方法:  `show()`      

* 实现简单隐藏动画效果方法:  `hide() `           

* 实现切换简单显示和隐藏动画效果方法:  `toggle() `  

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
        <style>
            #d1{
                width: 200px;
                height: 200px;
                background-color: yellow;
                display: none;
            }
        </style>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script>
            function fun1(){
                /*$("#d1").show(2000,'swing',function(){
                          alert("动画执行结束")
                    })*/
                $("#d1").show(2000);
            }
            function fun2(){
                $("#d1").hide(3000)
            }
            function fun3(){
                $("#d1").toggle(5000);
            }
        </script>
    </head>
    <body>
        <div id="d1"></div>
        <input type="button" value="show" onclick="fun1()" />
        <input type="button" value="hide" onclick="fun2()" />
        <input type="button" value="toggle" onclick="fun3()" />
    </body>
</html> 
```

### 4.2 滑动动画效果

* 实现向下滑动动画效果:  `slideDown`   

* 实现向上滑动动画效果:  `slideUp`  

* 实现滑动切换动画效果:  `slideToggle` 

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
        <style>
            #d1{
                width: 200px;
                height: 200px;
                background-color: yellow;
                display: none;
            }
        </style>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script>
            function fun1(){

                $("#d1").slideDown(2000);
            }
            function fun2(){
                $("#d1").slideUp(3000)
            }
            function fun3(){
                $("#d1").slideToggle(5000);//
            }
        </script>
    </head>
    <body>
        <div id="d1"></div>
        <input type="button" value="slideDown" onclick="fun1()" />
        <input type="button" value="slideUp" onclick="fun2()" />
        <input type="button" value="slideToggle" onclick="fun3()" />
    </body>
</html>
```

### 4.3 淡入淡出动画效果

* 实现淡入动画效果方法:  `fadeIn`      

* 实现淡出动画效果方法: `fadeOut`   

* 实现淡入淡出切换效果方法: `fadeToggle` 

* 实现淡入之指定透明度效果方法:  `fadeTo` 

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
        <style>
            #d1{
                width: 200px;
                height: 200px;
                background-color: green;
                display: none;
            }
        </style>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script>
            function fun1(){

                $("#d1").fadeIn(2000);
            }
            function fun2(){
                $("#d1").fadeOut(3000)
            }
            function fun3(){
                $("#d1").fadeToggle(5000);
            }
            function fun4(){
                $("#d1").fadeTo(5000,0.2);// 0-1 
            }
        </script>
    </head>
    <body>
        <div id="d1"></div>
        <input type="button" value="fadeIn" onclick="fun1()" />
        <input type="button" value="fadeOut" onclick="fun2()" />
        <input type="button" value="fadeToggle" onclick="fun3()" />
        <input type="button" value="fadeTo" onclick="fun4()" />
    </body>
</html>
```

### 4.4 实现自定义动画效果

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <style>
            #d1 {
                width: 200px;
                height: 200px;
                background-color: yellow;
            }
        </style>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script>
            $(function(){

                //$("").animate({动画内容},执行时间,动画结束后要执行的方法)

                $("#d1").animate({
                    width:"100px",
                    height:"100px",
                    opcity:0.5,
                    borderRadius:"50px"
                },2000,function(){
                    alert("动画执行结束了")
                })
            })
        </script>
    </head>
    <body>
        <div id="d1"></div>
    </body>
</html>
```

## 5. 表单校验

### 5.1 基本的表单验证案例

验证要求:

* 用户名不能为空

* 用户名长度大于等于6

* 用户名中不能有数字

* 密码不少于5位

* 两次密码必须一致

* 邮箱格式正确 必须有@和.  例如123456789@qq.com

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script>
            function checkUsername(){
                var username =$("#user").val();
                if(username == ""){// 不能为空字符串
                    $("#usertip").html("<font color='red'>不能为空</font>");
                    return false;
                }

                if(username.length<=6){// 长度不能少于6位
                    $("#usertip").html("<font color='red'>长度必须在6位之上</font>");
                    return false;
                }

                for(var i =0;i<username.length;i++){// zhangsan
                    var c =username.charAt(i);
                    if(c<= '9' && c>= '0'){
                        $("#usertip").html("<font color='red'>不能使用数字</font>");
                        return false;
                    }
                }
                // 提示OK
                $("#usertip").html("<font color='green'>OK</font>")
                return true;

            }

            function checkPassword(){
                var pwd =$("#pwd").val();
                if(pwd.length<5){
                    $("#pwdtip").html("<font color='red'>长度不能少于5位</font>");
                    return false;
                }
                $("#pwdtip").html("<font color='green'>OK</font>");
                return true;
            }

            function checkRepwd(){
                var p1=$("#pwd").val();
                var p2=$("#repwd").val();

                if(p1.length< 5 || p1 != p2){
                    $("#repwdtip").html("<font color='red'>两次密码不一致</font>");
                    return false;
                }

                $("#repwdtip").html("<font color='green'>OK</font>");
                return true;
            }

            function checkEmail(){
                var em=$("#email").val();
                var index1=em.indexOf("@");
                var index2=em.indexOf(".");
                if(index1<1 || index2 < 1 ){
                    $("#emailtip").html("<font color='red'>邮箱格式有误</font>");
                    return false;
                }
                $("#emailtip").html("<font color='green'>OK</font>");
                return true;
            }

            function checkForm(){
                return checkUsername()&&checkPassword()&&checkRepwd()&&checkEmail();
            }
        </script>
    </head>
    <body>
        <table id="center" border="0" cellspacing="0" cellpadding="0">
            <form action="http://www.baidu.com" method="get" onsubmit="return checkForm()">
                <tr>
                    <td>您的姓名：</td>
                    <td>
                        <input id="user" type="text" name="username" onblur="checkUsername()"/>
                        <div id="usertip" style="display: inline;"></div>
                    </td>
                </tr>
                <tr>
                    <td>输入密码：</td>
                    <td>
                        <input id="pwd" name="pwd" type="password" onblur="checkPassword()"/>
                        <div id="pwdtip" style="display: inline;"></div>
                    </td>
                </tr>
                <tr>
                    <td>再输入一遍密码：</td>
                    <td>
                        <input id="repwd" type="password" onblur="checkRepwd()"/>
                        <div id="repwdtip" style="display: inline;"></div>
                    </td>
                </tr>
                <tr>
                    <td>您的Email：</td>
                    <td>
                        <input id="email" type="text" onblur="checkEmail()"/>
                        <span id="emailtip"></span>
                    </td>
                </tr>
                <tr>

                    <td colspan="2">
                        <input type="submit" value="注册" class="rb1" />
                    </td>
                </tr>
            </form>
        </table>
    </body>
</html>
```

总结：

1.对于表单的提交，要给form标签绑定onSubmit事件，而不是给submit按钮绑定onClick事件,onsubmit绑定的方法时要有return关键字,绑定的方法要返回true/false

2.表单项内容不管输入的是字符串、数字、日期，js、jQuery、JSP接收后都是String类型

3.表单的验证和String对象有密切关系 length charAt(i) indexOf("@")

4.如果表单项内容为空，js收到的不是null，而是空字符串。判断条件不能写 username == null，而要写username==""或username.length ==0  

5.验证出错要return false，验证无错要return true，并且 onsubmit="return checkForm()"

6.该示例的缺点主要在于对于邮箱如果采用传统方式进行验证，代码繁琐并且不能保证严谨性,过度依赖String的API。对于邮箱、手机号码、邮政编码等验证，可以使用正则表达式进行验证，严谨而且简单。

### 5.2 正则表达式

#### 5.2.1 什么是正则表达式

​		Regular Expression，在代码中常简写为regex,正则表达式使用单个字符串来描述、匹配一系列符合某个句法规则的字符串。在很多文本编辑器里，正则表达式通常被用来检索、替换那些符合某个模式的文本。正则表达式是对字符串（包括普通字符（例如，a 到 z 之间的字母）和特殊字符（称为“元字符”））操作的一种逻辑公式，就是用事先定义好的一些特定字符、及这些特定字符的组合，组成一个“规则字符串”，这个“规则字符串”用来表达对字符串的一种过滤逻辑。正则表达式是一种文本模式，该模式描述在搜索文本时要匹配的一个或多个字符串。

#### 5.2.2 为什么使用正则表达式

* 正则表达式可以是文本的校验的代码更加简洁

* 正则表达式可以实现更加严谨细致的校验

#### 5.2.3 正则表达式举例

* 匹配国内电话号码：`\d{3}-\d{8}|\d{4}-\d{7}` 

* 匹配腾讯QQ号：`[1-9][0-9]{4,}` 

* 匹配中国邮政编码：`\d{6}`    

* 匹配身份证：`\d{15}|\d{18}` 

* 匹配由数字和26个英文字母组成的字符串: `^[A-Za-z0-9]+$` 　

* 匹配Email地址：`\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*` 

* 匹配中文字符的正则表达式：` [\u4e00-\u9fa5] [a-zA-Z]` 

#### 5.2.4 如何创建正则表达式

正则表达式在JS中创建的语法为:

*  `var reg=/china/;` 
*  `var reg=new RegExp("china");` 

#### 5.2.5  函数

`test(str)` ：判断指定字符串是否符合规则，返回 true或 false

#### 5.2.6 正则表达式的通配符号

| 符号    | 描述                                                 |
| ------- | ---------------------------------------------------- |
| `/.../` | 代表一个模式的开始和结束                             |
| `^`     | 匹配字符串的开始                                     |
| `$`     | 匹配字符串的结束                                     |
| `\s`    | 任何空白字符                                         |
| `\S`    | 任何非空白字符                                       |
| `\d`    | 匹配一个数字字符, 等价于 `[0-9]`                     |
| `\D`    | 除了数字之外的任何字符, 等价于`[^0-9]`               |
| `\w`    | 匹配一个数字、下划线或字母字符, 等价于 `[A-Za-z0-9]` |
| `.`     | 除了换行符之外的任意字符                             |

#### 5.2.7 正则表达式的重复字符

| 符号     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| `{n}`    | 匹配前一项 n 次                                              |
| `{n, }`  | 匹配前一项 n 次，或者多次                                    |
| `{n, m}` | 匹配前一项至少 n 次，但是不能超过 m 次                       |
| `*`      | 匹配前一项 0 次或多次, 等价于 `{0, }`                        |
| `+`      | 匹配前一项 1 次或多次, 等价于 `{1, }`                        |
| `?`      | 匹配前一项 0 次或 1 次， 也就是说前一项是可选的, 等价于 `{0, 1}` |

#### 5.2.8 使用正则表达式实现数据验证

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script>
            /*
             * 正则表达式不依赖jQuery
             * 正则表达式本身就是一个字符串 只不过该字符串用于表述一种规则
             * 
             * */
            var reg =/^\w?$/
            var words ="a";
            console.log(reg.test(words))

            var regex1 = /^\d{6}$/;
            var regex2 = /^1[3456789]\d{9}$/;
            var regex3 = /^\w{6,}@[0-9A-Za-z]{2,}(\.[a-zA-Z]{2,3}){1,2}$/;  
        </script>
    </head>
    <body>
    </body>
</html>
```

### 5.3 表单验证完善

form表单中应用正则表达式

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script>
            function checkUsername(){
                var reg1=/^\D{6,}$/
                var username =$("#user").val();
                if(!reg1.test(username)){
                    $("#usertip").html("<font color='red'>格式必须是至少六位的非数字</font>");
                    return false;
                }
                // 提示OK
                $("#usertip").html("<font color='green'>OK</font>")
                return true;

            }

            function checkPassword(){
                var reg2=/^\S{5,}$/
                var pwd =$("#pwd").val();
                if(!reg2.test(pwd)){
                    $("#pwdtip").html("<font color='red'>至少为5位非空格</font>");
                    return false;
                }
                $("#pwdtip").html("<font color='green'>OK</font>");
                return true;
            }

            function checkRepwd(){
                var p1=$("#pwd").val();
                var p2=$("#repwd").val();

                if(p1.length< 5 || p1 != p2){
                    $("#repwdtip").html("<font color='red'>两次密码不一致</font>");
                    return false;
                }

                $("#repwdtip").html("<font color='green'>OK</font>");
                return true;
            }

            function checkEmail(){
                var em=$("#email").val();
                var regex3 = /^\w{6,}@[0-9A-Za-z]{2,}(\.[a-zA-Z]{2,3}){1,2}$/; 
                if(!regex3.test(em) ){
                    $("#emailtip").html("<font color='red'>邮箱格式有误</font>");
                    return false;
                }
                $("#emailtip").html("<font color='green'>OK</font>");
                return true;
            }

            function checkForm(){
                return checkUsername()&&checkPassword()&&checkRepwd()&&checkEmail();
            }
        </script>
    </head>
    <body>
        <table id="center" border="0" cellspacing="0" cellpadding="0">
            <form action="http://www.baidu.com" method="get" onsubmit="return checkForm()">
                <tr>
                    <td>您的姓名：</td>
                    <td>
                        <input id="user" type="text" name="username" onblur="checkUsername()"/>
                        <div id="usertip" style="display: inline;"></div>
                    </td>
                </tr>
                <tr>
                    <td>输入密码：</td>
                    <td>
                        <input id="pwd" name="pwd" type="password" onblur="checkPassword()"/>
                        <div id="pwdtip" style="display: inline;"></div>
                    </td>
                </tr>
                <tr>
                    <td>再输入一遍密码：</td>
                    <td>
                        <input id="repwd" type="password" onblur="checkRepwd()"/>
                        <div id="repwdtip" style="display: inline;"></div>
                    </td>
                </tr>
                <tr>
                    <td>您的Email：</td>
                    <td>
                        <input id="email" type="text" onblur="checkEmail()"/>
                        <span id="emailtip"></span>
                    </td>
                </tr>
                <tr>

                    <td colspan="2">
                        <input type="submit" value="注册" class="rb1" />
                    </td>
                </tr>
            </form>
        </table>
    </body>
</html>
```





