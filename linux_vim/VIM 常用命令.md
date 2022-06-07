# VIM 常用命令

## 一、Vim选项和配置

### 1.1 基本配置

```shell
set enc=utf-8
set nocompatible
source $VIMRUNTIME/vimrc_example.vim
```

* 设置编辑文件的内码是UTF-8(非所有平台缺省，但为编辑多语言所必需)
* 设置 vim 不需要和 vi 兼容 (仅为万一起见，目前大部分情况下这是缺省情况)
* 导入 Vim 的示例配置（这会打开一些有用的选项，如语法加亮、搜索加亮、命令历史、 记住上次的文件位置，等等）

### 1.2 备份和撤销文件

```shell
set nobackup         #  不产生备份

if has ('persistent_undo')
	set undofile     #   产生备份文件
	set undodir=~/.vim/undodir    # 产生撤销文件
	if !isdirectory(&undodir)
		call mkdir(&undodir, 'p', 0700)      # 产生撤销文件夹
	endif
endif
```

让Vim在启动时自动创建这个目录

### 1.3 鼠标支持

```shell
if has('mouse')
	if has('gui_running') || (&term =~ 'xterm' && !has('mac'))
		set mouse=a
	else
		set mouse=nvi
	endif
endif
```

如果使用xterm 兼容终端的话，通常建议是：

* 在不按下修饰键时，鼠标选择产生vim内部的可视选择
* 在按下shift时，鼠标选择产生系统的文本选择



## 二、文本修改

| 操作 | 说明                                              |
| ---- | ------------------------------------------------- |
| cc   | 修改整行                                          |
| C    | 相当于 c$，删除到行尾然后进入插入模式             |
| s    | 相当于cl， 删除一个字符然后进入插入模式           |
| S    | 相当于cc，替换整行的内容                          |
| r    | 替换光标下的字符                                  |
| R    | 进入替换模式，每次按键(直到 \<Esc\>) 替换一个字符 |
| u    | 撤销最近的一个修改动作                            |
| U    | 撤销当前行上的所有操作                            |



## 三、文本对象选择

假设有下面的文本内容

```c
if (message == "sesame open")
```

我们进一步假设光标停在 "sesame" 的 "a" 上, 那么: 

| 操作                      | 说明                                        |
| ------------------------- | ------------------------------------------- |
| dw   (delete word)        | 删除 ame␣, 结果是 if (message == "sesopen") |
| diw  (delete inside word) | 删除 sesame, 结果是 if (message == " open") |
| daw  (delete a word)      | 删除 sesame␣, 结果是 if (message == "open") |
| diW                       | 删除"sesame, 结果是 if (message == open")   |
| daW                       | 删除"sesame␣, 结果是 if (message == open")  |
| di"                       | 删除sesame open, 结果是 if (message == "")  |
| da"                       | 删除 "sesame open", 结果是 if (message ==)  |
| di( 或 di)                | 删除 message == "sesame open"，结果是 if () |
| da( 或 da)                | 删除 (message == "sesame open")，结果是 if␣ |

上面演示了 a、i 和 w、双引号、圆括号搭配使用，这些对于任何语言的代码编辑都是非常 有用的。实际上，可以搭配的还有更多： 

* 搭配 s（sentence）对句子进行操作——适合西文文本编辑 
* 搭配 p（paragraph) 对段落进行操作——适合西文文本编辑，及带空行的代码编辑 
* 搭配 t（tag）对 HTML/XML 标签进行操作——适合 HTML、XML 等语言的代码编辑 
* 搭配 ` 和 ' 对这两种引号里的内容进行操作——适合使用这些引号的代码，如 shell 和 Python 
* 搭配方括号（“[”和“]”）对方括号里的内容进行操作——适合各种语言（大部分都 会用到方括号吧） 
* 搭配花括号（“{”和“}”）对花括号里的内容进行操作——适合类 C 的语言 
* 搭配角括号（“<”和“>”）对角括号里的内容进行操作——适合 C++ 的模板代码

```shell
example  :
	c2i{
```



## 四、更快地移动

| 操作    | 说明                   |
| ------- | ---------------------- |
| \<C-B\> | 向上翻页               |
| \<C-F\> | 向下翻页               |
| \<C-U\> | 向上翻半页             |
| \<C-D\> | 向下翻半页             |
| zt      | 当前行滚动到屏幕的顶部 |
| zz      | 当前行滚动到屏幕的中部 |
| zb      | 当前行滚动到屏幕的底部 |



## 五、重复

| 操作 | 说明                                   |
| ---- | -------------------------------------- |
| ;    | 重复最近的字符查找(f、t 等) 操作       |
| ,    | 重复最近的字符查找操作，反方向         |
| n    | 重复最近的字符查找操作(/ 和 ?)         |
| N    | 重复最近的字符查找操作(/ 和 ?)，反方向 |
| .    | 重复执行最近的修改操作                 |













   

​		

