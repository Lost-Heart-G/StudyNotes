# Bash shell

## 一、shell 的变量功能

### 1. 变量的使用与

####  1.1 echo

变量的使用: echo

```shell
[admin@localhost ~]$ echo $variable

[admin@localhost ~]$ echo $PATH
/usr/local/java/jdk1.8.0_251/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/admin/.local/bin:/home/admin/bin

[admin@localhost ~]$ echo ${PATH}
/usr/local/java/jdk1.8.0_251/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/admin/.local/bin:/home/admin/bin
```

利用echo 就能够读出，只是需要在变量名称前面加上 \$ ,或是以  \${变量} 的方式来使用都可以。

####  1.2 变量设置规则

```shell
[admin@localhost ~]$ echo ${myname}  # 在bash 当中，当一个变量尚未被设置时，默认的内容是[空]
[admin@localhost ~]$ myname=VBird
[admin@localhost ~]$ echo ${myname}
VBird
```

变量的设置规则:

* 变量与变量内容以一个等号【=】连接

  ```shell
  myname=VBird
  ```

* 等号两边不能直接接空格，如下所示为错误:

  ```shell
  myname = VBird 或 myname=VBird Tsai
  ```

* 变量名称只能是英文字母与数字，但开头字符不能是数字，如下为错误

  ```shell
  2myname=VBird
  ```

* 变量内容若有空格可使用双引号【"】或单引号【'】将变量内容结合起来

  * **双引号内的特殊字符如 $ 等， 可以保有原本的特性 ** 

    ```shell
    [admin@localhost ~]$ var="lang is $LANG"
    [admin@localhost ~]$ echo ${var}
    lang is en_US.UTF-8
    ```

  * **单引号内的特殊字符则仅为一般字符(纯文本)** 

    ```shell
    [admin@localhost ~]$ var='lang is $LANG'
    [admin@localhost ~]$ echo ${var}
    lang is $LANG
    ```

* 可用转义符 **[\\]** 将特殊符号(如 [Enter] 、$、\\、空格、' 等)变成一般字符

  ```shell
  myname=VBird\ Tsai
  ```

* 在一串命令的执行中，还需要借由其他额外的命令所提供的信息时，可以使用 **反单引号 [\`命令\`] 或 [ $(命令) ]** 。 

  ```shell
  [admin@localhost ~]$ version=$(uname -r)
  [admin@localhost ~]$ echo ${version}
  3.10.0-1062.el7.x86_64
  ```

* 若该变量为扩增变量内容时，可用 "\$变量名" 或 "\${变量名称}" 累加内容:

  ```shell
  PATH="$PATH":/home/bin 或 
  PATH=${PATH}:/home/bin
  ```

* 若该变量需要在其他子程序执行，则**需要以 export 来使变量变成环境变量 **

  ```shell
  export PATH
  ```

* 通常大写字符为系统默认变量，自行设置变量可以使用小写字符，方便判断(不是硬性要求)

####  1.3 unset

取消变量的方法是使用 unset : [unset 变量名称 ]

```shell
unset myname
```



###  2. 环境变量的功能

####  2.1 env

用env 观察环境变量与常见环境变量的说明

####  2.2 set

用set观察所有变量(含环境变量与自定义变量)

####  2.3 export

自定义变量转成环境变量

```shell
export 变量名称
```



###  3. 影响显示结果的语系变量(locale)

```shell
locale -a  <== 查看Linux 支持的所有语系
```

```shell
locale  <== 查看Linux 设置的语系
```

```shell
[admin@localhost ~]$ locale
LANG=en_US.UTF-8           <=主语言的环境
LC_CTYPE="en_US.UTF-8"     <=字符(文字)辨识的编码
LC_NUMERIC="en_US.UTF-8"   <=数字系统的显示信息
LC_TIME="en_US.UTF-8"      <=时间系统的显示数据
LC_COLLATE="en_US.UTF-8"   <=字符的比较与排序等
LC_MONETARY="en_US.UTF-8"  <=币值格式的显示等
LC_MESSAGES="en_US.UTF-8"  <=信息显示的内容，如功能表，错误信息等
LC_ALL=                    <=整体语系的环境
...(后面省略)...
```

**设置 LANG 或是 LC_ALL时，其他的语系变量就会被这两个变量所替换。** 

使用 locale 时, 系统是显示目前 Linux 主机内包含的语系文件，这些语系文件都放置在 `usr/lib/locale` 这个目录中

可以根据自己去调整自己喜好的语系，整体系统默认的语系定义在 `/etc/locale.conf` 里面。

```shell
[root@localhost ~]# cat /etc/locale.conf 
LANG="en_US.UTF-8"
```

###  4. 变量键盘读取、数组与声明

#### 4.1 read  键盘读取

读取来自键盘输入的变量

```shell
[admin@localhost ~]$ read [-pt] variable
选项与参数:
-p  : 后面可以接提示字符
-t  : 后面接可以等待的 [秒数]
```

```shell
[admin@localhost ~]$ read atest
This is a test
[admin@localhost ~]$ echo ${atest}
This is a test

[admin@localhost ~]$ read -p "Please keyin your name: " -t 30 named
Please keyin your name: VBird Tsai
[admin@localhost ~]$ echo ${named}
VBird Tsai
```

#### 4.2 declare、typeset  声明

declare 或 typeset 是一样的功能，就是声明变量的类型,如果使用 declare 后面并没有接任何参数，那么 bash 就会主动的将所有的变量名称与内容通通显示出来，就好像使用 set 一样。

```shell
[admin@localhost ~]$ declare [-aixr] variable
选项与参数:
-a  : 将后面名为 variable 的变量定义为数字 （array） 类型
-i  : 将后面名为 variable 的变量定义为整数  (integer) 类型
-x  : 用法与 export 一样，就是将后面的variable 变成环境变量
-r  : 将变量设置成为 readonly 类型，该变量不可被更改内容，也不能unset
```

```shell
范例一: 让变量 sum 进行 100+300+50 的求和结果
[admin@localhost ~]$ sum=100+300+50
[admin@localhost ~]$ echo ${sum}
100+300+50

[admin@localhost ~]$ declare -i sum=100+300+50
[admin@localhost ~]$ echo ${sum}
450
```

默认情况下，bash 对于变量的基本定义

* **变量类型默认为字符串。** 
* **bash 环境中的数值运算，默认最多仅能达到整数形态，所有 1/3 的结果是0。** 

```shell
范例二: 将 sum 变成环境变量
[admin@localhost ~]$ declare -x sum  
[admin@localhost ~]$ export | grep sum
declare -ix sum="450"

范例三: 让 sum 变成只读属性，不可修改
[admin@localhost ~]$ declare -r sum
[admin@localhost ~]$ sum=testing
-bash: sum: readonly variable

范例四: 让 sum 变成非环境变量的自定义变量
[admin@localhost ~]$ declare +x sum  <= 将 "-" 变成 "+" 可以进行 [取消] 操作
[admin@localhost ~]$ declare -p sum  <= -p 可以单独列出变量的类型
declare -ir sum="450"  <= 只剩下 i、r 的类型，不具有 x 。
```

#### 4.3 arry 数组

```shell
var[index]=content

读取数组的方式
${数组}
```



### 5 .文件系统及程序的限制关系 ulimit

```shell
[admin@localhost ~]$ ulimit [-SHacdfltu] [配额]
参数与选项: 
-H : hard limit 严格的设置，必定不能超过这个设置的数值
-S : soft limit 警告的设置，可以超过这个设置值，但是若超过则有警告信息。
	 在设置上，通常 soft 会比 hard 小，举例来说，soft 可设置80 而 hard 设置为 100,
	 那么在你可以使用到90（没有超过100）,但介于 80-100 之间时，系统会有警告信息通知你.
-a : 后面不接任何选项与参数，可列出所有的限制额度
-f : 此 shell 可以建立的最大文件容量(一般可能设置为2GB) 单位为 Kbytes。
-t : 可使用的最大CPU时间(单位为秒)
-u : 单一使用者可以使用的最大进程(process)数量

# 其他参数可以man ulimit 自行参看
```



### 6. 变量内容的删除、取代与替换(可选)

#### 6.1 变量内容的删除与替换

| 变量设置方式               | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| ${变量#关键词}             | 若变量内容从头开始的数据符合【关键词】，则将符合的最短数据删除 |
| ${变量##关键词}            | 若变量内容从头开始的数据符合【关键词】，则将符合的最长数据删除 |
| ${变量%关键词}             | 若变量内容从尾向前的数据符合【关键词】，则将符合的最短数据删除 |
| ${变量%%关键词}            | 若变量内容从尾向前的数据符合【关键词】，则将符合的最长数据删除 |
| ${变量/旧字符串/新字符串}  | 若变量内容符合【旧字符串】则【第一个旧字符串会被新字符串替换】 |
| ${变量//旧字符串/新字符串} | 若变量内容符合【旧字符串】则【全部的旧字符串会被新字符串替换】 |

```shell
[admin@localhost ~]$ path=${PATH}
[admin@localhost ~]$ echo ${path}
/usr/local/java/jdk1.8.0_251/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/admin/.local/bin:/home/admin/bin

范例一: ${变量#关键字}  从头开始  删除符合关键词的最短数据
[admin@localhost ~]$ echo ${path#/*:}
/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/admin/.local/bin:/home/admin/bin

范例二: ${变量##关键词}  从头开始  删除符合关键词的最长数据
[admin@localhost ~]$ echo ${path##/*:}
/home/admin/bin
```

```shell
[admin@localhost ~]$ echo ${path}
/usr/local/java/jdk1.8.0_251/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/admin/.local/bin:/home/admin/bin

范例三: ${变量%关键词}   从尾向前 删除符合关键词的最短数据
[admin@localhost ~]$ echo ${path%:*bin}
/usr/local/java/jdk1.8.0_251/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/s
bin:/home/admin/.local/bin

范例四: ${变量%%关键词}   从尾向前 删除符合关键词的最长数据
[admin@localhost ~]$ echo ${path%%:*bin}
/usr/local/java/jdk1.8.0_251/bin
```

```shell
[admin@localhost ~]$ echo ${path}
/usr/local/java/jdk1.8.0_251/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/admin/.local/bin:/home/admin/bin

范例五: ${变量/旧字符串/新字符串}  新字符串替换第一个符合内容旧字符串 
[admin@localhost ~]$ echo ${path}
/usr/local/java/jdk1.8.0_251/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/admin/.local/bin:/home/admin/bin

范例六: ${变量//旧字符串/新字符串}  新字符串替换所有符合内容的旧字符串
[admin@localhost ~]$ echo ${path//sbin/SBIN}
/usr/local/java/jdk1.8.0_251/bin:/usr/local/bin:/usr/bin:/usr/local/SBIN:/usr/SBIN:/home/admin/.local/bin:/home/admin/bin
```

#### 6.2 变量的测试与内容替换

下面的例子当中，那个 var 与 str 为变量，我们想要针对 str 是否有设置来决定 var 的值.

一般来说， str: 代表 【str 没有设置或为空的字符串】, 至于 str 则仅为 【没有该变量】

| 变量设置方式     | str没有设置           | str为空字符串        | str已设置为非空字符串 |
| ---------------- | --------------------- | -------------------- | --------------------- |
| var=${str-expr}  | var=expr              | var=                 | var=$str              |
| var=${str:-expr} | var=expr              | var=expr             | var=$str              |
| var=${str+expr}  | var=                  | var=expr             | var=expr              |
| var=${str:+expr} | var=                  | var=                 | var=expr              |
| var=${str=expr}  | str=expr <br>var=expr | str不变<br>var=      | str不变<br>var=$str   |
| var=${str:=expr} | str=expr<br>var=expr  | str=expr<br>var=expr | str不变<br>var=$str   |
| var=${str?expr}  | expr 输出至 stderr    | var=                 | var=$str              |
| var=${str:?expr} | expr 输出至 stderr    | expr 输出至 stderr   | var=$str              |

```shell
测试 str 没有值的时候减号(-)的用法
[admin@localhost ~]$ unset str; var=${str-newvar}
[admin@localhost ~]$ echo "var=${var}, str=${str}"
var=newvar, str=

测试 str 有值的时候减号(-)的用法
[admin@localhost ~]$ str="oldvar"; var=${str-newvar}
[admin@localhost ~]$ echo "var=${var}, str=${str}"
var=oldvar, str=oldvar
```

```shell
测试 str 没有值的时候等号(=)的用法
[admin@localhost ~]$ unset str; var=${str=newvar}
[admin@localhost ~]$ echo "var=${var}, str=${str}"
var=newvar, str=newvar

测试 str 有值的时候等号(=)的用法
[admin@localhost ~]$ str="oldvar"; var=${str=newvar}
[admin@localhost ~]$ echo "var=${var}, str=${str}"
var=oldvar, str=oldvar
```

```shell
测试 str 没有值的时候问好(?)的用法
[admin@localhost ~]$ unset str; var=${str?newvar}
-bash: str: newvar

测试 str 有值的时候问号(?)的用法
[admin@localhost ~]$ str="oldvar"; var=${str?newvar}
[admin@localhost ~]$ echo "var=${var}, str=${str}"
var=oldvar, str=oldvar
```



## 二、命令别名与历史命令

### 1. 命令别名设置:  alias、unalias

alias 的定义规则与变量定义规则几乎相同。

`【别名】='命令 选项...'` 

```shell
简化命令 [ls -al | more]  查看隐藏文件，并且需要长的列出一页一页翻看 
[admin@localhost ~]$ alias lm='ls -al | more' 

简化命令 [rm -i] 以防误删文件
[admin@localhost ~]$ alias rm='rm -i'
```

可以使用alias 查看系统目前有哪些的命令别名

```shell
[admin@localhost ~]$ alias
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l.='ls -d .* --color=auto'
alias ll='ls -l --color=auto'
alias lm='ls -al | more'
alias ls='ls --color=auto'
alias rm='rm -i'
alias vi='vim'
alias which='alias | /usr/bin/which --tty-only --read-alias --show-dot --show-tilde'
```

`unalias` 取消命令别名

```shell
[admin@localhost ~]$ unalias lm
```

> 持久命令别名: 
>
> 使用 vim 编辑 ~/.bashrc 
>
> 在~/.bashrc 中添加 命令别名  alias 【别名】="命令 选项..."



### 2. 历史命令: history

```shell
[admin@localhost ~]$ history [n]
[admin@localhost ~]$ history [-c]
[admin@localhost ~]$ history [-raw] histfiles
选项与参数:
n  : 数字，意思是 [要列出最近的 n 条命令行表] 的意思
-c : 将目前的 shell 中的所有history 内容全部清除
-a : 将目前新增的 history 命令新增入 historyfiles 中，若没有histfiles, 这默认写入 ~/.bash_history。
-r : 将 histfiles 的内容读到目前这个 shell 的 history 记录中
-w : 将目前的 history 记录内容写入hisfiles 中。
```

```shell
范例一: 列出目前内存内的所有有 history 记录
 [admin@localhost ~]$ history
 # 前面省略
  361  su -
  362  ip addr
  363  vim ~/.bashrc 
  364  alias
  365  vim ~/.bashrc 
  366  source ~/.bashrc 
  367  alias
  368  ls
  369  ls -al
  370  history
  
  # 列出的信息当中，共分两栏，第一栏为该命令在这个 shell 当中的历史
  # 另一个则是命令本身的内容，至于会显示几条命令记录，则与 HISTSIZE 有关
```



```shell
[admin@localhost ~]$ !number
[admin@localhost ~]$ !command
[admin@localhost ~]$ !!
选项与参数:
number    : 执行第几条命令的意思
command   : 由最近的命令向前查找 【命名串开头为 command】 的那个命令，并执行
!!        : 执行上一个命令(相当于按向上键后，按下回车)
```

##  三、通配符

| 符号  | 意义                                                      |
| ----- | --------------------------------------------------------- |
| *     | 代表【0个到无穷多个】任意字符                             |
| ?     | 代表【一定有一个】任意字符                                |
| []    | 同样代表【一定有一个括号内】的字符(非任意字符)            |
| [ - ] | 若减号在中括号内时，代表【在编码顺序内的所有字符】        |
| [ ^ ] | 若中括号内的第一个字符为指数符号(^)，那表示【反向选择】。 |

## 四、数据流重定向

###  1. standard output 与 standard  error output

* 标准输入(stdin):  代码为0, 使用 `<` 或 `<<` ;
* 标准输出(stdout): 代码为1, 使用 `>` 或 `>>` ;
* 标准错误输出(stderr): 代码为2, 使用 `2>` 或 `2>>` ;

```shell
范例一: 观察你的系统根目录(/) 下面的文件名、权限与属性，并记录下来

[admin@localhost ~]$ ll /
[admin@localhost ~]$ ll / > ~/rootfile
[admin@localhost ~]$ ll ~/rootfile
-rw-rw-r--. 1 admin admin 977 Apr 30 15:22 /home/admin/rootfile
```

* `1>` :  以覆盖的方法将【正确的数据】输出到指定的文件或设备上
* `1>>` : 以累加的方法将【正确的数据】输出到指定的文件或设备上
* `2>` :  以覆盖的方法将【错误的数据】输出到指定的文件或设备上
* `2>>` : 以累加的方法将【错误的数据】输出到指定的文件或设备上

```shell
将正确的信息与错误的信息分流 正确数据放到 list_right 错误数据放到 list_error
[admin@localhost ~]$ find / -name .bashrc >list_right  2> list_error
```

### 2. /dev/null 垃圾桶黑洞设备与特殊写法

/dev/null 可以吃掉任何导向这个设备的信息

```shell
将错误的数据丢弃，屏幕上显示正确的数据
[admin@localhost ~]$ find / -name .bashrc 2> /dev/null
/home/admin/.bashrc
```

将正确的数据与错误的数据写入一个文件，可以使用特殊写法

```shell
将命令数据全部写入名为list的文件中。
[admin@localhost ~]$ find / -name .bashrc > list 2> list  <==错误的
[admin@localhost ~]$ find / -name .bashrc > list 2>&1  <==正确
[admin@localhost ~]$ find / -name .bashrc &> list   <==正确
```

上述第一行错误的原因是，由于两股数据同时写入同一个文件，又没有使用特殊的语法，此时两股数据可能会交叉写入该文件内，造成次序的错乱。

### 3. standard input: < 与 <<

将原本需要将由键盘输入的数据，改由文件内容来替换

```shell
利用 cat 命令来建立一个文件的简单流程
[admin@localhost ~]$ cat > catfile
testing
cat file test
<==这里按下[ctrl]+d 来退出
[admin@localhost ~]$ cat catfile 
testing
cat file test
```

用某个文件的内容来替换键盘的敲击

```shell
[admin@localhost ~]$ cat > catfile < ~/.bashrc
[admin@localhost ~]$ ll catfile ~/.bashrc 
-rw-rw-r--. 1 admin admin 248 Apr 30 16:14 catfile
-rw-r--r--. 1 admin admin 248 Apr 29 17:16 /home/admin/.bashrc
# 注意看，这两个文件的大小会一模一样，几乎是使用 cp 来复制一般。
```

`<<`  代表【结束的输入字符】

```shell
[admin@localhost ~]$ cat > catfile << "eof"
> This is a test
> Ok now stop
> eof
[admin@localhost ~]$ cat catfile 
This is a test
Ok now stop
```

###  4. 命令执行的判断根据: ;、&&、||

* cmd; cmd (不考虑命令相关性的连续命令执行)

  ```shell
  [root@localhost ~]# sync; sync; shutdown -h now
  ```

  一次执行多个命令

* $? (命令返回值) 与 && 或 ||

  两个命令之间有关联性，而这个依赖性主要判断的地方就在于前面一个命令执行结果的返回是否正确。

  | 命令执行情况   | 说明                                                         |
  | -------------- | ------------------------------------------------------------ |
  | cmd1 && cmd2   | 1. 若 cmd1 执行完毕且正确执行(\$?=0), 则开始执行 cmd2 <br>2. 若 cmd1 执行完毕且为错误 (\$? $\neq$ 0), 则 cmd2 不执行 |
  | cmd1 \|\| cmd2 | 1. 若 cmd1 执行完毕且正确执行(\$?=0), 则 cmd2 不执行 <br>2. 若 cmd1 执行完毕且为错误(\$? $\neq$ 0), 则 开始执行 cmd2 |

  ```shell
  command1 && command2 || command3
  ```

  

## 五、管道命名(pipe)

管道命令使用的是 【 | 】 这个界定符号, 另外，管道命令与【连续执行命令】是不一样的。

```shell
[admin@localhost ~]$ ls -al /etc | less
```

 > * 管道命令仅能处理标准输出，对于标准错误会予以忽略
 > * 管道命令必须要能够接受来自前一个命令的数据成为标准输入继续处理才行

###  1. 选取命令: cut 、 grep

####  1.1 cut

这个命令可以将一段信息的某一段给它【切】出来，处理的信息是以【行】为单位。

```shell
[admin@localhost ~]$ cut -d'分隔符' -f fields  <== 用于有特定分隔字符
[admin@localhost ~]$ cut -c字符区间            <== 用于排列整齐的信息
选择与参数:
-d : 后面接分隔字符，与 -f 一起使用
-f : 根据 -d 的分隔字符将一段信息划分成为数段，用 -f 取出第几段的意思
-c : 以字符(characters) 的单位取出固定字符区间
```

```shell
范例一: 
[admin@localhost ~]$ echo ${PATH}
/usr/local/java/jdk1.8.0_251/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/admin/.local/bin:/home/admin/bin
[admin@localhost ~]$ echo ${PATH} | cut -d':' -f 5  <== 列出第五
/usr/sbin
[admin@localhost ~]$ echo ${PATH} | cut -d':' -f 3,5 <== 列出第三与第五
/usr/bin:/usr/sbi
```

```shell
范例二: 
[admin@localhost ~]$ export
declare -x PWD="/home/admin"
declare -x SELINUX_LEVEL_REQUESTED=""
declare -x SELINUX_ROLE_REQUESTED=""
declare -x SELINUX_USE_CURRENT_RANGE=""
... 其他省略 ...
# 注意看，每个数据都是排列整齐的输出，如果我们不想要 [declare -x] 时， 就得这么做
[admin@localhost ~]$ export | cut 12-
PWD="/home/admin"
SELINUX_LEVEL_REQUESTED=""
SELINUX_ROLE_REQUESTED=""
SELINUX_USE_CURRENT_RANGE=""
# 我们还可以指定某个范围的值，例如第 12-20 的字符，就是 cut -c 12-20等
```

cut 主要的用途在于将同一行里面的数据进行分解，最常使用在分析一些数据或文字数据的时候。

####  1. 2 grep

grep 分析一行信息，若当中有我们所需要的信息，就将该行拿出来。

```shell
[admin@localhost ~]$ grep [acinv][--color=auto] '查找字符' filename
选项与参数:
-a : 将二进制文件以文本文件的方式查找数据
-c : 计算找到 '查找字符' 的次数
-i : 忽略大小写的不同，所以大小写视为相同
-n : 顺便输出行号
-v : 反向选择，亦即显示出没有 '查找字符' 内容的那一行
--color=auto : 可以将找到的关键部分加上颜色的显示
```

```shell
# last 可以输出【账号/终端/来源/日期时间】的数据，并且是排列整齐的。
范例一: 将 last 当中，有出现 admin 的那一行就显示出来
[admin@localhost ~]$ last | grep 'admin'
admin    pts/0        :0               Tue Jan 14 21:45 - 21:48  (00:03)    
admin    pts/0        :0               Tue Jan 14 21:44 - 21:44  (00:00)    
admin    pts/0        :0               Tue Jan 14 21:43 - 21:44  (00:00)    
admin    pts/0        :0               Tue Jan 14 21:22 - 21:42  (00:20)    
admin    :0           :0               Tue Jan 14 21:21 - down   (00:27) 
```

```shell
范例二: 将 last 当中，没有出现 admin 的那一行显示出来
[admin@localhost ~]$ last | grep -v 'admin'
reboot   system boot  3.10.0-1062.el7. Sun May  3 12:40 - 13:13  (00:32)    
reboot   system boot  3.10.0-1062.el7. Sat May  2 23:13 - 00:13  (00:59)    
reboot   system boot  3.10.0-1062.el7. Thu Apr 30 14:21 - 16:26  (02:04)    
reboot   system boot  3.10.0-1062.el7. Wed Apr 29 15:20 - 21:10  (05:50)    
reboot   system boot  3.10.0-1062.el7. Tue Apr 28 18:38 - 20:57  (02:18)    
reboot   system boot  3.10.0-1062.el7. Mon Apr 27 15:40 - 17:14  (01:33) 
```

```shell
范例三: 在 last 的输出信息中，只要有 admin 就取出来, 并且仅取第一栏
[admin@localhost ~]$ last | grep 'admin' | cut -d ' ' -f 1
admin
admin
admin

# 在取出 admin 之后，利用命令 cut 的处理，就能够仅取得第一栏
```

###  2. 排序命令: sort、wc、uniq

#### 2.1 sort

排序时。 建议使用LANG=C 来让语系统统一，数据排序比较好一些

```shell
[admin@localhost ~]$ sort [-fbMnrtuk] [file or stdin]
-f : 忽略大小写的差异，例如 A 与 a 视为编码相同
-n : 使用【纯数字】进行排序(默认是以文字形式来排序的)
-t : 分隔符，默认是用[Tab]键来分隔
-k : 以哪个区间(field) 来进行排序
其他参数自行 man sort 查看
```

```shell
范例一: /etc/passwd 内容是以 : 来进行分隔的，我们以第三栏来进行排序
[admin@localhost ~]$ cat /etc/passwd | sort -t ':' -k 3
root:x:0:0:root:/root:/bin/bash
admin:x:1000:1000:admin:/home/admin:/bin/bash
qemu:x:107:107:qemu user:/:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
usbmuxd:x:113:113:usbmuxd user:/:/sbin/nologin
```

```shell
范例二: 利用 last, 将输出的数据仅显示账号，并加以排序
[admin@localhost ~]$ last | cut -d ' ' -f1 |sort
```

#### 2.2  uniq 

重复的数据仅列出一个显示

```shell
[admin@localhost ~]$ uniq [-ic]
选项与参数
-i : 忽略大小写字符的不同
-c : 进行计数
```

```shell
范例一: 使用 last 将账号列出，仅取出账号栏，进行排序后仅取出一位
[admin@localhost ~]$ last | cut -d ' ' -f1 |sort | uniq

admin
reboot
wtmp

范例二: 乘上题，如果我还想知道每个人的登录总次数?
[admin@localhost ~]$ last | cut -d ' ' -f1 | sort | uniq -c
      1 
     86 admin
     25 reboot
      1 wtmp
```

#### 2.3 wc

wc 可以计算输出信息的整体数据

```shell
[admin@localhost ~]$ wc [-lwm]
选项与参数:
-l : 仅列出行
-w : 仅列出多上字（英文字母）
-m : 多少个字符
```

```shell
范例一: 查看 /etc/man_db.conf 里面到底有多上相关字、行、字符数
[admin@localhost ~]$ cat /etc/man_db.conf | wc
    131     723    5171
# 输出的三个数字中， 分别代表:【行、字数、字符数】
```

```shell
范例二: 使用 last 可以输出登录者，但是 last 最后两行并账号内容，该如何以一行命令取得登录系统的总人次
[admin@localhost ~]$ last | grep [a-zA-Z] | grep -v 'wtmp' | grep -v 'reboot' | \
> grep -v 'unknow' | wc -l
86
```

### 3 双重定向: tee

`tee` 会同时将数据流分送到文件与屏幕(screen)，而输出到屏幕的，其实就是 stdout， 那就可以让下个命令继续处理。

```shell
[admin@localhost ~]$ tee [-a] file
选项与参数: 
-a : 以累加(append) 的方式，将数据加入到 file 当中
```

```shell
范例一: 
[admin@localhost ~]$ last | tee last.list | cut -d ' ' -f1
admin
reboot
admin
admin
admin
admin
reboot

# 这个范例可以让我们将 last 的输出存一份到 last.list 文件当中
```

```shell
范例二:
[root@localhost home]# ls -l /home | tee ~/homefile | more
total 4
drwx------. 18 admin admin 4096 May  3 13:59 admin

# 将 ls 的数据存一份到 ~/homefile, 同时屏幕也有输出信息
```

```shell
[root@localhost ~]# ls -l / | tee -a  ~/homefile | more
total 20
lrwxrwxrwx.   1 root root    7 Jan 14 20:41 bin -> usr/bin
dr-xr-xr-x.   5 root root 4096 Jan 14 21:21 boot
drwxr-xr-x.  20 root root 3400 May  3 12:41 dev
drwxr-xr-x. 141 root root 8192 Apr 30 14:36 etc
drwxr-xr-x.   3 root root   19 Jan 14 20:49 home

# tee后面接的文件会被覆盖， 若加上 -a 这个选项则能将信息累加。
```

### 4 字符转换命令: tr、col、join、paste、expand

#### 4.1 tr

tr 可以用来删除一点信息当中的文字，或是进行文字信息的替换

```shell
[root@localhost ~]# tr [-ds] SET1 ...
选项与参数:
-d : 删除信息中的 SET1 这个字符
-s : 替换掉重复的字符
```

#### 4.2 col

用来简单处理将 [tab] 按键替换成为空格

```shell
[admin@localhost ~]$ col [-xb]
选项与参数
-x : 将 tab 按键转换成对等空格键
```

#### 4.3 join

join 是处理两个文件之间的数据，而且主要是在处理【两个文件当中， 有相同数据的那一行，才将它加在一起】的意思。

```shell
[admin@localhost ~]$ join [-ti12] file1 file2
选项与参数: 
-t : join 默认以空格字符分隔数据，并且比对【第一栏位】的数据
	 如果两个文件相同，则将两条数据连成一行，且第一个栏位放在第一个。
-i : 忽略大小写的差异
-1 : 这是数字1， 代表【第一个文件要用哪个栏位来分析】的意思
-2 : 代表【第二个文件要用哪个栏位来分析】的意思
```

#### 4.4 paste

paste 直接将两行贴在一起，且中间以 [Tab] 键隔开

```
[admin@localhost ~]$ past [-d] file1 file2
选项与参数:
-d : 后面可以接分隔符、默认是以 [Tab] 来分隔
-  : 如果file部分写成 -, 表示来自标准输入的数据的意思
```

#### 4.5 expand

将 [Tab] 按键转换成空格

### 5 化分命令: split

可以将一个大文件，依据文件大小或行数来划分。

```shell
[admin@localhost ~]$ split [bl] file PREFIX
选项与参数:
-b : 后面可接欲划分成的文件大小，可加单位，例如 b、k、m 等
-l : 以行数来进行划分
PREFIX: 代表前缀字符的意思，可作为划分文件的前缀文字
```

```shell
范例一: 
[admin@localhost ~]$ cd /tmp; split -b 300k /etc/services services
[admin@localhost tmp]$ ll -k services*
-rw-rw-r--. 1 admin admin 307200 May  3 14:50 servicesaa
-rw-rw-r--. 1 admin admin 307200 May  3 14:50 servicesab
-rw-rw-r--. 1 admin admin  55893 May  3 14:50 servicesac

# 这个文件名可以随意取，我们只要写上前缀文字，小文件就会以xxxaa、xxxab、xxxac 等方式来建立小文件

范例二: 将小文件合并成为一个大文件，可以使用数据流重定向
[admin@localhost tmp]$ cat services* >> servicesback
```

```shell
范例三: 使用 ls -al /输出的信息中，每十行记录成一个文件
[admin@localhost tmp]$ ls -al / | split -l 10 - lsroot
[admin@localhost tmp]$ wc -l lsroot*
  10 lsrootaa
  10 lsrootab
   2 lsrootac
  22 total
# 重点在这个 - 号，一般来说，如果需要 stdout 或 stdin 时， 但偏偏又没有文件
# 有的只是 - 时, 那么这个 - 就会被当成 stdin 或 stdout
```

### 6 参数代换: xargs

xargs : 产生某个命令的参数

xargs 可以读入 stdin 的数据，并且以空格符或换行符作为识别符，将 stdin 的数据分隔成参数。

```shell
[admin@localhost tmp]$ xargs [-0epn] command
选项与参数:
-0 : 如果输入的 stdin 含有特殊字符，如: `、\、空格等字符时，这个-0参数
	 可以将它还原成一般字符，这个参数可以用于特殊状态。
-e : 这个是EOF（end of file）的意思，后面可以接一个字符，当xargs分析到这个字符时，就会停止工作
-p : 在执行每个命令时，都会询问使用者的意思
-n : 后面接次数，每次 command 命令执行时，要使用几个参数的意思。
当 xargs 后面没有接任何命令时，默认是以 echo 来进行输出
```

```shell
范例一: 将/etc/passwd 内的第一栏取出，仅取三行，使用 id 这个命令将每个账号内容显示出来
[admin@localhost tmp]$ id root
uid=0(root) gid=0(root) groups=0(root)  <== 这个 id 命令可以查询使用者的 UID/GID 等信息

[admin@localhost tmp]$ id $(cut -d ':' -f 1 /etc/passwd | head -n 3)
# 虽然使用$(cmd) 可以预先取得参数，但可惜的是, id 这个命令【仅】能接受一个参数而已
# 所以上述的这个命令执行会出现错误，根本不会显示用户的 ID

[admin@localhost tmp]$ cut -d ':' -f1 /etc/passwd | head -n 3 | id
uid=1000(admin) gid=1000(admin) groups=1000(admin),10(wheel) 
# 因为 id 并不是管道命令，因此在上面这个命令执行后，前面的东西通通不见，只会执行 id

[admin@localhost tmp]$ cut -d ':' -f1 /etc/passwd | head -n 3 | xargs id
# 依旧会出现错误，这是因为 xargs 一口气将全部的数据通通丢给 id 处理， 但 id 就接受1个参数

[admin@localhost tmp]$ cut -d ':' -f1 /etc/passwd | head -n 3 | xargs -n 1 id
uid=0(root) gid=0(root) groups=0(root)
uid=1(bin) gid=1(bin) groups=1(bin)
uid=2(daemon) gid=2(daemon) groups=2(daemon)
# 通过 -n 来处理，一次给予一个参数，因此上述的结果就 OK 正常显示

[admin@localhost tmp]$ cut -d ':' -f1 /etc/passwd | head -n 3 | xargs -p -n 1 id
id root ?...y
id bin ?...uid=0(root) gid=0(root) groups=0(root)
y
id daemon ?...uid=1(bin) gid=1(bin) groups=1(bin)
...(下面省略)...

#这个-p 的选项可以让使用者的使用过程中，被询问到每个命令是否执行
```

> 很多命令其实并不支持管道命令，因此我们可以通过 xargs 提供该命令使用 标准输入

```shell
范例二: 找出/usr/sbin 下面具有特殊权限的文件名，并使用ls -l 列出详细属性
[admin@localhost ~]$ find /usr/sbin -perm /7000 | xargs ls -l
-rwx--s--x. 1 root lock      11208 Jun 10  2014 /usr/sbin/lockdev
-rwsr-xr-x. 1 root root     117432 Aug  9  2019 /usr/sbin/mount.nfs
-rwxr-sr-x. 1 root root      11224 Aug  9  2019 /usr/sbin/netreport
-rwsr-xr-x. 1 root root      11216 Apr 11  2018 /usr/sbin/pam_timestamp_check
-rwxr-sr-x. 1 root postdrop 218632 Oct 31  2018 /usr/sbin/postdrop
-rwxr-sr-x. 1 root postdrop 260112 Oct 31  2018 /usr/sbin/postqueue
-rwsr-xr-x. 1 root root      36280 Apr 11  2018 /usr/sbin/unix_chkpwd
-rws--x--x. 1 root root      40328 Aug  9  2019 /usr/sbin/userhelper
-rwsr-xr-x. 1 root root      11296 Aug  9  2019 /usr/sbin/usernetctl
```

### 7 关于减号【-】的用途

管道命令在 bash 的连续的处理程序中是相当重要的。另外，在日志文件的分析中也是相当重要的一环，所以请特别留意。另外，在管道命令当中，常常会使用到前一个命令的 stdout 作为这次的 stdin，某些命令需要用到文件名（例如 tar）来进行处理时，该 stdin 与 stdout 可以利用减号 "-" 来替代。

```shell
[admin@localhost ~]$ mkdir /tmp/homeback
[admin@localhost ~]$ tar -cvf - /home | tar -xvf - -C /tmp/homeback
```

上面这个例子是说:【我将/home 里面的文件给它打包，但打包的数据不是记录到文件，而是传送到 stdout，经过管道后，将 tar -cvf - /home 传送给后面的 tar -xvf -】。后面的这个 - 则是使用前一个命令的stdout ，因此，我们就不需要使用文件名了。







