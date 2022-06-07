# Linux 常用命令

## 一、常用帮助命令

* `-- help` 

```shell
[admin@localhost ~]$ date --help
```

* `man page` 

```shell
[admin@localhost ~]$ man date

DATE(1)                          User Commands                         DATE(1)

NAME
       date - print or set the system date and time

SYNOPSIS
       date [OPTION]... [+FORMAT]
       date [-u|--utc|--universal] [MMDDhhmm[[CC]YY][.ss]]

DESCRIPTION
       Display the current time in the given FORMAT, or set the system date.
```

> 在表格第一行，可以看到的是: [DATE(1)]，DATE 是命令的名称，(1) 代表一般用户可以使用的命令。常见的几个数字的意义是这样的:

| 代号 | 代表内容                                                     |
| ---- | ------------------------------------------------------------ |
| 1    | **用户在 shell 环境中可以操作的命令或可执行文件**            |
| 2    | 系统内核可调用的函数与工具                                   |
| 3    | 一些常用的函数(function) 与 函数库(library) , 大部分为C的函数库(libc) |
| 4    | 设备文件说明，通常在 /dev 下的文件                           |
| 5    | **配置文件或是某些文件的格式**                               |
| 6    | 游戏(games)                                                  |
| 7    | 惯例与协议等，例如 Linux 文件系统、网络协议、ASCII 代码等的说明 |
| 8    | **系统管理员可用的管理命令**                                 |
| 9    | 根内核有关的文件                                             |

`man page` **常用按键** 

| 按键        | 进行工作                                                     |
| ----------- | ------------------------------------------------------------ |
| 空格键      | 向下翻一页                                                   |
| [Page Down] | 向下翻一页                                                   |
| [Page Up]   | 向上翻一页                                                   |
| [Home]      | 去到第一页                                                   |
| [End]       | 去到最后一页                                                 |
| /string     | 向 **[下]** 查找 string 这个字符串                           |
| ?string     | 向 **[上]** 查找 string 这个字符串                           |
| n, N        | 利用 /  或 ? 来查找字符时，可以用 n 来继续下一个查找，可以用 N 来进行 **[反向]** 查找 |
| q           | 结束这次的 man page                                          |

  

## 二、关机命令

* 将数据同步写入硬盘中的命令:   `sync`

* 常用的关机命令:  `shutdown` 

* 重新启动，关机:  `reboot`、 `halt`、`poweroff` 




### 1. `shutdown`  

这个命令会通知系统内的各个进程(processes)，并且将通知系统中的一些服务来关闭。 `shutdown` 可以完成如下工作

* 可以自由选择关机模式：是要关机或重启均可
* 可以设置关机时间：可以设置成现在立刻关机，也可以设置某一个特定时间才关机
* 可以自定义关机信息：在关机之前，可以将自己设置的信息发送给在线用户
* 可以仅发送警告信息：有时有可能你要进行一些测试，而不想让其他的用户干扰，或是明白地告诉用户某段时间要注意一下，这个时候就可以使用 `shutdown` 来吓一吓用户，但却不是真得要关机

```shell
[root@localhost ~]# shutdown [-krhc] [时间] [警告信息]
选项与参数
-k : 不要真的关机，只是发送警告信息
-r : 在将系统的服务停掉之后就重新启动(常用)
-h : 将系统的服务停掉后，立即关机（常用）
-c : 取消已经在进行的 shutdown 命令内容。
时间: 指定系统关机的时间，若没有这个项目，则默认 1 分钟后自动进行。
```

```shell
[root@localhost ~]# shutdown -h +10  
10 分钟后自动关机
[root@localhost ~]# shutdown -r + 30 "The system will reboot"
再过 30 分钟系统会重新启动，并显示后面的信息给所有在线的使用者
```



### 2. `poweroff`、`halt`、 `reboot` 

```shell
[root@localhost ~]# sync; sync; sync; reboot
```

```shell
[root@localhost ~]# halt     # 系统停止，屏幕可能会保留系统已经停止的信息
[root@localhost ~]# poweroff # 系统关机，所以没有提供额外的电力，屏幕空白
```

## 三、修改文件属性与权限

### 1. chgrp

> 修改文件所属用户组

```shell
[root@localhost ~]# chrgp [-R] dirname/filename ...

选项与参数
-R : 进行递归 (recursive) 修改，亦即连同子目录下的所有文件，目录都更新成为这个用户组，常常用在修改某一目录内所有的文件之情况。
```

### 2. chown

> 修改文件拥有者

```shell
[root@localhost ~]# chow [-R] 账号名称 文件或者目录
[root@localhost ~]# chow [-R] 账号名称:用户组名 文件或者目录

选项与参数
-R : 进行递归 (recursive) 修改，亦即连同子目录下的所有文件
```

### 3. chmod

> 修改文件的权限

* chmod 语法

  ```shell
  [root@localhost ~]# chmod [-R] xyz 文件或者目录
  
  选项与参数
  xyz : 就是刚刚提到的数字类型的权限属性，为 rwx 属性数值的相加
  -R  : 进行递归 (recursive) 修改，亦即连同子目录下的所有文件
  ```

* 数字类型修改文件权限:
  * Linux 文件的基本权限就有9个， 分别是拥有者(owner)、所属群组(group)、其他人(other)，三种身份各有自己的读(red)、写(write)、执行(execute)权限，可以用数字来代表各个权限:

    ```shell
    r: 4
    w: 2
    x: 1
    ```

    每种身份(owner、group、others) 各自的三个权限 (r、w、x) 数字是需要累积的。例如权限为: [-rwxrwx---] 数字则是:

    ```shell
    owner = rwx = 4 + 2 + 1 = 7
    group = rwx = 4 + 2 + 1 = 7
    others = --- = 0 + 0 + 0 = 0
    ```

* 符号类型修改文件权限

  还有一个修改权限的方法。从之前的介绍中我们可以发现，基本上就九个权限分别是 (1)user、(2)group、(3)others 三种身份，我们就可以借由 u、g、o 来代表三种身份的权限。此外，a 则代表 all 亦即全部的身份。读写权限就可以写成 r、w、x，也就是可以用下面的方式来看:

  <table>
  	<tr>
  		<td rowspan="4">chmod</td>
  		<td rowspan="4"> u <br> g <br> o <br> a</td>
          <td rowspan="4"> + (加入) <br> - (移除) <br> = (设置) </td>
          <td rowspan="4"> r <br> w <br> x</td>
          <td rowspan="4">文件目录</td>
  	</tr>
  </table>

  * 实践

    > 将一个文件的权限设置为 [-rwxr-xr-x]

    ```shell
    [root@localhost ~]# chmod u=rwx,go=rx .bashrc
    [root@localhost ~]# ls -al .bashrc
    -rwxr-xr-x. 1 root root 176 Dec 29  2013 .bashrc
    ```

    注意:   u=rwx,go=rx是连在一起的，中间并没有任何空格。

    > 在不知道原先的文件属性的情况下，给原文件的每个人均添加可写入的权限

    ```shell
    [root@localhost ~]# ls -al .bashrc
    -rwxr-xr-x. 1 root root 176 Dec 29  2013 .bashrc
    
    [root@localhost ~]# chmod a+w .bashrc
    
    [root@localhost ~]# ls -al .bashrc 
    -rwxrwxrwx. 1 root root 176 Dec 29  2013 .bashrc
    ```

    > 如果是要将权限去掉而不修改其他已经存在的权限，例如拿掉全部人的可执行权限

    ```shell
    [root@localhost ~]# chmod a-x .bashrc
    
    [root@localhost ~]# ls -al .bashrc
    -rw-rw-rw-. 1 root root 176 Dec 29  2013 .bashrc
    ```


## 四、目录相关操作

比较特殊的目录

| 目录     | 意义                                                      |
| -------- | :-------------------------------------------------------- |
| .        | 代表此层目录                                              |
| ..       | 代表上一层目录                                            |
| -        | 代表前一个工作目录                                        |
| ~        | 代表目前使用者身份所在的家目录                            |
| ~account | 代表 account 这个使用者的家目录(account 是这个账号的名称) |

### 1.  cd

> 切换目录  

cd 是 Change Directory 的缩写

```shell
[root@localhost ~]# cd [相对路径或绝对路径]

[root@localhost ~]# cd ~admin
# 代表进入admin 这个使用者的家目录，亦即 /home/admin
```

### 2. pwd

> 显示当前所在的目录

pwd 是 Print Working Directory 的缩写

```shell
[root@localhost ~]# pwd [-P]

选项与参数：
-P ： 显示出真正的路径，而非使用链接 (link) 路径
```

### 3. mkdir

> 建立新目录

```shell
[root@localhost ~]# mkdir [-mp] 目录名称

选项与参数
-m : 设置文件的权限，直接设置，不使用默认权限(umask)
-p : 帮助你直接将所需要的目录(包含上层目录)递归创建
```

### 4. rmdir

> 删除 "空" 的目录

```shell
[root@localhost ~]# rmdir [-p] 目录名称

选项与参数:
-p : 连同上层 "空的" 目录也一起删除。
```

## 五、文件与目录管理

### 1.  ls

> 文件与目录的查看

```shell
[root@localhost ~]# ls [aAdfFhilnrRSt]  文件名或目录名称
[root@localhost ~]# ls [--colo={never, auto, always}] 文件名或目录名称
[root@localhost ~]# ls [--full-time] 文件名或目录名称

选项与参数
-a : 全部的文件，连同隐藏文件(开头为 . 的文件)一起列出来；
-d : 仅列出目录本身，而不是列出目录内的文件数据；ls
-l : 详细信息显示，包含文件的属性与权限等数据
```

注意：仅列出常用的参数，其余参数未列出。

### 2. 复制、删除与移动

#### 2.1  cp

> 复制文件或目录
>
> 注意： 如果源文件有两个以上，则最后一个目标文件一定要是 "目录" 才行

```shell
[root@localhost ~]# cp [adfilprsu] 源文件(source) 目标文件(destination)
[root@localhost ~]# cp [options] source1 source2 source3 ... directory

选项与参数
-a : 相当于 -dr --preserve=all 的意思，至于 dr 请参考下列说明(常用)
-d : 若源文件为链接文件的属性(link file)，则复制链接文件属性而非文件本身
-i : 若目标文件(destination)已经存在时，在覆盖时会先询问操作的进行(常用)
-p : 连同文件的属性(权限、用户、时间)一起复制过去，而非使用默认属性(备份常用)
-r : 递归复制，用于目录的复制操作(常用)
-preserve=all : 除了 -p 的权限相关参数外，还加入 SELinux 的属性，links、xattr等也复制
```

注意:  仅列出常用的参数，其余参数未列出。

#### 2.2 rm 

> 删除文件或目录

```shell
[root@localhost ~]# rm [-fir] 文件或目录

选项与参数:
-f : 就是 force 的意思，忽略不存在的文件，不会出现警告信息。
-I : 交互模式，在删除前会询问使用者是否操作
-r : 递归删除，最常用于目录的删除。
```

#### 2.3 mv

> 移动文件与目录，或重命名

```shell
[root@localhost ~]# mv [-fiu] source destination
[root@localhost ~]# mv [options] source1 source2 source3 ... directory

选项与参数
-f : force 强制的意思，如果目标文件以及存在，不会询问而直接覆盖
-i : 如目标文件(destination)已经存在时，就会询问是否覆盖
-u : 如目标文件已经存在，且 source 教新，才会更新(update)
```

### 3.  获取路径的文件名与目录名

#### 3.1 basename 

> 获取路径的文件名

```shell
[root@localhost ~]#  basename /etc/sysconfig/network
network
```

#### 3.2 dirname 

> 获取目录名称

```shell
[root@localhost ~]#  dirname /etc/sysconfig/network
/etc/sysconfig
```

### 4 .文件内容查看

* cat   由第一行开始显示文件内容
* tac   从最后一行开始显示，可以看出 tac 是 cat 的倒着写
* nl     显示的时候，同时输出行号
* more 一页一页第显示文件内容
* less  与more类似，但比 more 更好的是，它可以往前翻页
* head  只看前面几行
* tail     只看后面几行
* od      以二进制的方式读取文件内容

####  4.1 cat (concatenate)

> 直接查看文件内容

```shell
[root@localhost ~]# cat [-AbEnTv]

选项与参数:
-A : 相当于 -vET 的整合选项，可以列出一些特殊字符而不是空白而已
-b : 列出行号，仅针对非空白行做行号显示，空白行不标行号
-E : 将结尾的换行符$显示出来
-n : 打印出行号，连同空白行也会有行号，与 -b 的选项不同
-T : 将 [tab] 按键以 ^I 显示出来
-v : 列出一些看不出来的特殊字符
```

####  4. 2 tac   反向列示

> 反向列示

```shell
[root@localhost ~]# tac /etc/issue

Kernel \r on an \m
\S
```

反过来进行输出

####  4.3 nl  添加行号打印

> 添加行号打印

```shell
[root@localhost ~]# nl [-bnw] 文件

选项与参数:
-b : 指定行号指定的方式，主要有两种:
	 -b a : 表示不论是否为空行，也同样列出行号 (类似 cat -n)
	 -b t : 如果有空行，空的那一行不要列出行号 (默认值)
-n : 列出行号表示的方法，主要有三种:
	 -n ln : 行号在屏幕的最左方显示
	 -n rn : 行号在屏幕的最右方显示，且不加0
	 -n rz : 行号在屏幕的最右方显示，且加0
-w : 行号栏位的占用的字符数
```

#### 4.4 more 可翻页查看

> 可翻页查看  一页一页翻动

```shell
[root@localhost ~]# more /etc/man_db.conf
# 
#
# This file is used by the man-db package to configure the man and cat paths.
... (中间省略) ...
--More--(30%)
```

| 按键          | 功能                                               |
| ------------- | -------------------------------------------------- |
| 空格键(space) | 代表向下翻一页                                     |
| Enter         | 代表向下翻一行                                     |
| /字符串       | 代表在这个显示的内容当中，向下查找字符串这个关键词 |
| :f            | 立刻显示出文件名以及目前显示的行数                 |
| q             | 代表立刻离开 more, 不再显示该文件内容              |
| b 或 [ctrl]-b | 代表往回翻页，不过这操作只对文件有用，对管道无用   |

#### 4.5 less  可翻页查看

> 可翻页查看  一页一页翻动

```shell
[root@localhost ~]# less /etc/man_db.conf 
# 
#
# This file is used by the man-db package to configure the man and cat paths.
# It is also used to provide a manpath for those without one by examining
... (中间省略) ...
: <== 这里可以等待你输入命令
```

| 按键          | 功能                                 |
| ------------- | ------------------------------------ |
| 空格键(space) | 向下翻动一页                         |
| [pagedown]    | 向下翻动一页                         |
| [pageup]      | 向上翻动一页                         |
| /字符串       | 向下查找字符串的功能                 |
| ?字符串       | 向上查找字符串的功能                 |
| n             | 重复前一个查找(与 / 或 ? 有关)       |
| N             | 反向的重复前一个查找(与 / 或 ? 有关) |
| g             | 前进到这个数据的第一行               |
| G             | 前进到这个数据的最后一行(注意大小写) |
| q             | 离开 less 这个程序                   |

####  4.6 head  数据截取

> 取出文本前面几行

```shell
[root@localhost ~]# head [-n number] 文件

选项与参数:
-n : 后面接数字，代表显示几行的意思(默认显示前十行)
	 如果后面接的数字为负数(例如: -xxx)，则表示显示前面所有行数，不包括后面xxx行
```

####  4.7 tail  数据截取

> 取出后面几行

```shell
[root@localhost ~]# tail [-n number] 文件

选项与参数:
-n : 后面接数字，代表显示几行的意思
	 如果后面接的数字为正数(例如: +xxx)，则该文件从 xxx 行以后都会被列出来
-f : 表示持续刷新显示后面所接文件的内容，要等按下 [ctrl]-c 才会结束
```

####  4.8 od  非纯文本文件

> 以二进制的方式读取文件内容

```shell
[root@localhost ~]# od [-t TYPE] 文件

选项或参数:
-t : 后面可以接各种[类型 (TYPE)]的输出，例如:
	 a     : 利用默认的字符来输出
	 c     : 使用 ASCII 字符来输出
	 d[size] : 利用十进制(deciaml)来输出数据，每个整数占用size Bytes
	 f[size] : 利用浮点数值(floating)来输出数据，每个数占用 size Bytes
	 o[size] : 利用八进制(octal)来输出数据，每个整数占用 size Bytes
	 x[size] : 利用十六进制(hexadecimal)来输出数据，每个整数占用size Bytes
```

#### 4.9 touch 创建文件

> 修改文件时间或创建新文件

每个文件在 Linux 下面都会记录许多的时间参数，其实有三个主要的变动时间，那么这三个时间的意义是什么：

* 修改时间 (modification time, mtime):

  当文件的 [内容数据] 变更时，就会更新这个时间，内容数据指的是文件的内容，而不是文件的属性或权限

* 状态时间 (status time, ctime):

  当文件的 [状态(status)] 改变时，就会更新这个时间，举例来说，像是权限与属性被更改了，都会更新这个时间

* 读取时间(access time, atime):

  当 [该文件的内容被读取] 时，就会更新这个读取时间(access)，举例来说，我们使用 cat 去读取 /etc/man_db.conf，就会更新该文件的 atime。

```shell
[root@localhost ~]# date; ls -l /etc/man_db.conf ; ls -l --time=atime /etc/man_db.conf ;ls -l --time=ctime /etc/man_db.conf 
Sun Jan 19 16:16:03 CST 2020
-rw-r--r--. 1 root root 5171 Oct 31  2018 /etc/man_db.conf
-rw-r--r--. 1 root root 5171 Jan 18 14:08 /etc/man_db.conf
-rw-r--r--. 1 root root 5171 Jan 14 20:45 /etc/man_db.conf 
```

在默认情况下，ls 显示出来的是该文件的 mtim，也就是这个文件的内容上次被修改的时间。

```shell
[root@localhost ~]# touch [-acdmt] 文件

选项与参数:
-a : 仅自定义 access time
-c : 修改文件的时间，若该文件不存在则不建立新文件
-d : 后面可以接欲自定义的日期而不用目前的日期，也可以使用 --date="日期时间"
-m : 修改 mtime
-t : 后面可以接欲自定义的时间而不用目前的时间，格式为 [YYYYMMDDhhmm]
```

### 5. 文件与目录的默认权限与隐藏权限

#### 5.1 文件默认权限: umask

> umask 就是指目前用户在建立文件或目录的时候的权限默认值

查看默认权限值

```shell
[root@localhost ~]# umask
0022     <== 与一般权限有关的是后面三个数字。

[root@localhost ~]# umask -S
u=rwx,g=rx,o=rx
```

查看的方式有两种，一种可以直接输入 `umask` ，就可以看到数字类型的权限设置值，一种则是加入 -S (Symbolic) 这个选项，就会以符号的方式显示出权限了。`umask` 有四组数字，第一组是特殊权限用的，可以先不用管他，先看后面三组即可。

在默认权限的属性上，目录与文件是不一样的，由于 x 权限对于目录非常重要的。而一般文件的建立则不应该有执行的权限，因为一般文件通常是用于数据的记录，当然不需要执行的权限了。因此默认的情况如下:

* 若用户建立为文件则默认没有可以执行(x) 的权限，级只有 rw 这两个项目，也就是最大为 666，默认权限如下:

  ```shell
  -rw-rw-rw-
  ```

* 若用户建立为目录，则由于 x 与是否可以进入此目录有关，因此默认为所有权限均开放，即 777，默认权限如下:

  ```shell
  drwxrwxrwx
  ```

要注意的，`umask`  的数字指的是该默认值需要减掉的权限。由于 r、w、x 分别是 4、2、1，所以当要拿掉能写的权限，就是输入2，以此类推。

如果以上面的例子来说明的话，因为 umask 为 022，所有 user 并没有拿掉任何权限，group 与 other 的权限被拿掉了 2 (也就是 w 这个权限),那么当用户:

* **建立文件时** : (-rw-rw-rw-) - (----w--w-)  == > -rw-r--r--
* **建立目录时** : (drwxrwxrwx) - (d----w--w-)  == > drwxr-xr-x

####  5.2 设置 umask 默认权限

> 直接在 umask 后输入权限值就行  例如  umask 002

```
[root@localhost ~]# umask 002
[root@localhost ~]# umask
0002

[root@localhost ~]# umask -S
u=rwx,g=rwx,o=rx
```

####  5.3 chattr 配置文件隐藏属性

> 配置文件隐藏属性

注意: **chattr 命令只能在 ext2、ext3、ext4 的 Linux 传统文件系统上面完整生效** ，其他文件系统可能就无法完整的支持这个命令了，例如 xfs 仅支持部分参数而已。

```
[root@localhost ~]# chattr [+-=] [ASacdistu] 文件或目录名

选项与参数:
+ : 增加某一个特殊参数，其他原本存在参数则不动
- : 删除某一个特殊参数，其他原本存在参数则不动
= : 直接设置参数，且仅有后面接的参数。
A : 当设置了 A 这个属性时，若你在存取次文件（或目录）时，它的存取时间 atime 将不会被修改，可避免 I/O 较慢 的机器过度的读写磁盘。
S : 一般文件时非同步写入磁盘的，如果加上 S 这个属性时，当你进行任何文件的修改，该修改会[同步]写入磁盘中
a : 当设置 a 之后，这个文件将只能增加数据，而不能删除也不能修改数据，只有 root 才能设置这属性。
c : 这个属性设置之后，将会自动的将此文件[压缩]，读取的时候将会自动解压缩，但是在存储的时候，将会先进行压缩后再存储
d : 当 dump 程序被执行的时候，设置 d 属性将可使用该文件（或目录）不会被 dump 备份。
i : 这个 i 可厉害了，它可以让一个文件[不能被删除、改名、设置连接也无法写入或新增数据。]对于系统安全性有相当大的助益，只有 root 能设置此属性。
s : 当文件设置了 s 属性时，如果该文件被删除，它将会被完全从硬盘中删除，所以如果误删，完全无法恢复。
u : 与 s 相反，当使用 u 来配置文件时，如果该文件被删除，则数据内容其实还在磁盘中，可以恢复该文件
```

注意: **属性设置常见的是 `a` 和 `i` 的设置值，而且很多值必须是 root 才能设置。** **xfs 文件系统仅支持 Aadis 而已** 

这个命令是很重要的，尤其是在系统的数据安全上面。由于这些属性是隐藏的性质，所以需要以 lsattr 才能看到该属性。其中，个人认为最重要的当属 +i 与 +a 这个属性了， +i 可以让一个文件无法被修改。

####  5.4 lsattr  显示文件隐藏属性

```
[root@localhost ~]# lsattr [-adR] 文件或目录

选项与参数:
-a : 将隐藏文件的属性也显示出来
-d : 如果接的是目录，仅列出目录本身的属性而非目录内的文件名
-R : 连同子目录的数据也一并列出来
```

###  6. 命令与文件的查找

##### 6.1 which   脚本文件的查找

> 查找 [执行文件]

```
[root@localhost ~]# whic [-a] command

选项或参数:
-a : 将所有由 PATH 目录中可以找到的命令列出，而不止第一个被找到的命令名称
```

**这个命令是根据 [PATH] 这个环境变量所规范的路径，去查找执行文件的文件名。** 

#####   6.2 whereis  文件的查找

> 由一些特定的目录中查找文件

```
[root@localhost ~]# whereis [-lbmsu] 文件或目录名

选项与参数: 
-l : 可以列出 whereis 会去查询的几个主要目录
-b : 只找 binary（二进制）格式的文件
-m : 只找在说明文件 manual 路径下的文件
-s : 只找 source 源文件
-u : 查找不在上述三个项目当中的其他特殊文件
```

#####  6.3 locate / updatedb   文件的查找

* locate 查找文件

  通过已建立的数据库 /var/lib/mlocate 里面的数据查找，数据库建立默认是每天执行一次。

```
[root@localhost ~]# locate [-ir] keyword

选项与参数: 
-i : 忽略大小写的差异
-c : 不输出文件名，仅计算找到的文件数量
-l : 仅输出几行的意思，例如输出五行则是 -l 5
-s : 输出 locate 所使用的数据库文件的相关信息，包括该数据库记录的文件/目录数量等
-r : 后面可接正则表达式的显示方法
```

当你新建立起来的文件，却还在数据库更新之前查找该文件，那么 locate 会告诉你 [找不到]。可以直接输入 `updatedb` 手动更新数据库，updatedb 命令会去读取 /etc/updatedb.conf 这个配置文件的设置，然后再去硬盘里面进行查找文件名的操作，最后更新整个数据库文件。

* updatedb 更新数据库
  * updatedb : 根据 /etc/updatedb.conf 的设置去查找系统硬盘内的文件，并更新 /var/lib/mlocate
  * locate : 依据 /var/lib/mlocate 内的数据库记录，找出用户所输入的关键词的文件名。 

##### 6.4 find   文件的查找

```
[root@localhost ~]# find [PATH] [option] [action]

选项与参数:
1. 与时间有关的选项: 共有 -atime, -ctime 与 -mtime , 以-mtime说明
   -mtime  n : n 为数字，意义为在 n 天之前[一天之内]被修改过内容的文件
   -mtime +n : 列出在 n 天之前(不含 n 天本身)被修改过内容的文件
   -mtime -n : 列出在 n 天之内(含 n 天本身)被修改过内容的文件
   -newer file : file 为一个存在的文件，列出比 file 还新的文件
```

```
[root@localhost ~]# find / -mtime 0
# 那个 0 是重点。0代表目前时间，所以从现在开始到 24 小时前，
# 有变动过的内容的文件都会被显示出来。那如果是三天前那一天的24小时内？
# find / -mtime 3有变动过的文件都会被显示的意思
```



现在我们知道 atime、ctime、与 mtime 的意义，如果想要找出一天内被修改过的文件，可以使用上述做法。但如果想要找出 4 天内被修改过的文件? 那可以使用 `[find /var -mtime -4]` 。那如果是 4 天前的那一天就用 `[find /var -mtime 4]` ，有没有加上 [+、-] 差别很大。

* **+4 代表大于等于 5 天前的文件** :  ex> `find /var -mtime +4`
* **-4 代表小于等于 4 天内的文件** : ex> `find /var -mtime -4`
*  **4 则代表 4-5 那一天的文件** : ex> `find /var -mtime 4` 

```
选项与参数:
2. 与使用者或用户组名称相关的参数
	-uid n : n 为数字，这个数字是使用者的账号 ID，亦即 UID，这个 UID 是记录在 /etc/passwd 里面
	-gid n : n 为数字，这个数字是用户组名称的 ID，亦即 GID，这个 GID 是记录在 /etc/group 里面
	-user name  : name 为使用者账号名称，例如 admin
	-group name : name 为用户组名称，例如 users
    -nouser     : 查找文件的拥有者不在 /etc/passwd 中
    -nogroup    : 查找文件的用户组不存在于 /etc/group 的文件。当你自行安装软件时，很有可能该软件的属性当中并没有文件拥有者，这是可能的，在这个时候，就可以使用 -nouser 或 -nogroup 查找。
```

```
选项与参数:
3. 与文件权限及名称相关的参数
	-name filename : 查找文件名称为 filename 的文件
	-size [+-]SIZE : 查找比 SIZE 还要大 (+) 或小(-) 的文件这个 SIZE 的规格有:
				 c : 代表 Bytes，k : 代表 1024Bytes。所以要找比 50KB 还要大的文件，就是[-size +50K]
	-type TYPE     : 查找文件的类型为 TYPE 的，类型主要有: 一般正规文件(f)、设备文件(b,c)、目录文件(d)、链接文件(l)、socket(s)、及FIEO(p) 等属性。
	-perm mode     : 查找文件权限 [刚好等于] mode 的文件，这个 mode 为类似 chmod 的属性值，举例来说， -rwsr-xr-x 的属性值为 4775
	-perm -mode    : 查找文件权限 [必须要全部囊括 mode 的权限] 的文件，举例来说，我们要查找 -rwxr--r--，亦即 0744 的文件，使用 -perm -0744，当一个文件的权限为 -rwsr-xr-x，亦即 4755 时，也会被列出来，因为 -rwsr-xr-x 的属性已经囊括了 -rwxr--r-- 的属性了
	-perm /mode    : 查找文件权限 [包括任一 mode 的权限] 的文件，举例来说，我们查找 -rwxr-xr-x，亦即 -perm /755 时，但有一个文件属性为 -rw------- 也会被列出来，因为它有 -rw.... 的属性存在
```

```
选项与参数:
4. 额外可进行的操作:
	-exec command : command 为其他命令，-exec 后面可再接额外的命令来处理查找到的结果
	-print        : 将结果打印到屏幕上，这个操作是默认操作。
```

```
[root@localhost ~]# find /usr/bin /usr/sbin -perm /7000 -exec ls -l {} \;
# 注意到，那个-exec 后面的 ls -l 就是额外的命令，命令不支持命令别名
# 所以仅能使用 ls -l 不可以使用 ll,
```

该范例中特殊的地方有 `{}`  以及 `\;`  还有 `-exec`  这个关键词，这些东西的意义为:

* `{}`  : 代表的是由 find 找到的内容
* -exec 一直到 \; 是关键词 : 代表 find 额外操作的开始 (-exec) 到结束 (\;)，在这中间的就是 find 命令内的额外操作
* 因为 [ ; ] 在 bash 环境下是有特殊意义的，因此利用反斜杠来转义

## 六、文件系统的简单操作

###  1. 磁盘与目录的容量

#### 1.1 df    磁盘使用情况

> 列出文件系统的整体磁盘使用量  
>
> 常用参数:  -h、-i

```
[root@localhost ~]# df [-ahikHTm] [目录或文件名]

选项与参数:
-a : 列出所有的文件系统，包括系统特有的 /proc 等文件系统
-k : 以 KBytes 的容量显示各个文件系统
-m : 以 MBytes 的容量显示各个文件系统
-h : 以人们较容易阅读的 GBytes、Mbytes、KBytes 等格式自行显示
-H : 以 M=100K 替换 M=1024K 的进位方式
-T : 连同该硬盘分区的文件系统名称(例如: xfs) 也列出
-i : 不用磁盘容量，而以 inode 的数量显示
```

在 Linux 下面如果 df 没有加任何选项，那么默认会将系统内所有的（不含特殊的内存内的文件系统与 swap）都以 1 KBytes 的容量来列出来。

####   1.2 du   磁盘使用情况

> 查看文件系统的磁盘使用量(常用在查看目录所占磁盘空间)
>
> 常用参数:  -s

```
[root@localhost ~]# du [ahskm] 文件或目录名称

选项与参数:
-a : 列出所有的文件与目录容量，因为默认仅统计目录下面的文件量
-h : 以人们较容易阅读的容量格式(G/M)显示
-s : 仅列出总量，而不列出每个各别的目录占用量
-S : 不包括子目录下的总计
-k : 以 KBytes 的容量显示各个文件系统
-m : 以 MBytes 的容量显示各个文件系统
```

###   2. 硬连接与符号链接

```
[root@localhost ~]# ln [-sf] 源文件 目标文件

选项与参数:
-s : 如果不加任何参数就进行链接，那就是硬连接，至于 -s 就是符号链接
-f : 如果目标文件存在时，就主动的将目标文件直接删除后再建立
```

使用 ln 如果不加任何参数的话，那么就是硬连接

####磁盘的分区、格式化、检验与挂载

想要在系统里面新增一块磁盘，应该做以下操作:

1. 对磁盘进行划分，以建立可用的硬盘分区
2. 对该硬盘分区进行格式化(format)，以建立系统可用的文件系统
3. 若想要仔细一点，则可对刚刚建立好的文件系统进行检验
4. 在 Linux 系统上，需要建立挂载点(亦即目录)，并将它挂载上来

#### 2.1 lsblk  列出系统上所有的磁盘列表

> lsblk(list block device) : 列出系统上所有的磁盘列表

```
[root@localhost ~]# lsblk [-dfimpt] [device]

选项与参数:
-d : 仅列出磁盘本身，并不会列出该磁盘的分区数据
-f : 同时列出该磁盘内的文件系统名称
-i : 使用 ASCII 的字符输出，不要使用复杂的编码(在某些环境下很有用)
-m : 同时输出该设备在 /dev 下面的权限信息(rwx数据)
-p : 列出该设备的完整文件名，而不是仅列出最后的名字而已
-t : 列出该磁盘设备的详细数据，包括磁盘阵列机制，预读写的数据量大小等
```

####   2.2 blkid   列出设备的 UUID 等参数

> blkid : 列出设备的 UUID 等参数

```
[root@localhost tmp]# blkid
/dev/sr0: UUID="2019-09-11-18-50-31-00" LABEL="CentOS 7 x86_64" TYPE="iso9660" PTTYPE="dos" 
/dev/sda1: PARTUUID="8042bffc-4713-4f7d-86ed-ebe47b4feea7" 
/dev/sda2: UUID="08c81374-dc08-4acf-bffd-fdd34c50c241" TYPE="xfs" PARTUUID="cdfb9407-f6be-41f0-a33d-7af089fffa83" 
/dev/sda3: UUID="Jn9R4l-Vuir-87cc-BhHD-drzn-xb7c-4XpN9l" TYPE="LVM2_member" PARTUUID="bb77a846-e935-4335-bb16-6ab4a3281c99" 
/dev/mapper/centos00-root: UUID="dd391627-2967-4864-8272-126e2b46d00c" TYPE="xfs" 
/dev/mapper/centos00-swap: UUID="11aa28f8-08b9-49c6-96a8-513d503d4199" TYPE="swap" 
/dev/mapper/centos00-home: UUID="83ee9e88-954a-403c-a41a-95f53282c4b3" TYPE="xfs" 
```

#### 2.3 parted   列出磁盘的分区表类型与分区信息

> parted : 列出磁盘的分区表类型与分区信息

```
[root@localhost ~]# parted device_name print
```

####  2.4 gdisk    磁盘分区 (GPT 分区表使用)

MBR 分区表使用 fdisk 分区

GPT 分区表使用 gdisk 分区

> gdisk    磁盘分区 ( GPT 分区表使用)

```
[root@localhost ~]# gdisk 设备名称
```

```
[root@localhost tmp]# gdisk /dev/sda
GPT fdisk (gdisk) version 0.8.10

Partition table scan:
  MBR: protective
  BSD: not present
  APM: not present
  GPT: present

Found valid GPT with protective MBR; using GPT.   <== 找到了 GPT 的分区表

Command (? for help): <== 这里可以让你输入命令操作，可以按问号(?)来查看可用命令
Command (? for help): ?
b	back up GPT data to a file
c	change a partition's name
d	delete a partition <== 删除一个分区
i	show detailed information on a partition
l	list known partition types
n	add a new partition <== 增加一个分区
o	create a new empty GUID partition table (GPT)
p	print the partition table  <== 打印出分区表(常用)
q	quit without saving changes  <== 不保存分区就直接离开 gdisk
r	recovery and transformation options (experts only)
s	sort partitions
t	change a partition's type code
v	verify disk
w	write table to disk and exit <== 保持分区操作后离开 gdisk
x	extra functionality (experts only)
?	print this menu
```

应该通过 lsblk 或 blkid 先找到磁盘，再用 parted /dev/xxx print 来找出内部的分区表类型，之后才用 gdisk 或 fdisk 来操作系统

```
[root@localhost ~]# gdisk /dev/sda

Command (? for help): p
Number  Start (sector)    End (sector)  Size       Code  Name
   1            2048            6143   2.0 MiB     EF02  
   2            6144         2103295   1024.0 MiB  0700  
   3         2103296       165689343   78.0 GiB    8E00  
   4       165689344       166713343   500.0 MiB   8300  Linux filesystem
   5       166713344       166918143   100.0 MiB   0700  Microsoft basic data
# 找出最后一个 sector 的号码是很重要的
Command (? for help): n  <== 新增一个分区
Partition number (6-128, default 6): 6 <== 默认就是6号，所以也能回车
First sector (34-167772126, default = 166918144) or {+-}size{KMGTP}: 166918144 <== 也能回车
Last sector (166918144-167772126, default = 167772126) or {+-}size{KMGTP}: +100M <== 绝不能回车
# 我们不需要自己计算扇区号，通过 +容量 的这个方式，
# 就可以让 gdisk 主动去帮你算出最接近你需要的容量的扇区号码
Current type is 'Linux filesystem'
Hex code or GUID (L to show codes, Enter = 8300): # 使用默认值即可，直接回车
Changed type of partition to 'Linux filesystem'
# 这里是让你选择未来这个分区预计使用的文件系统，默认都是 Linux 文件系统8300
Command (? for help): p
Number  Start (sector)    End (sector)  Size       Code  Name
   1            2048            6143   2.0 MiB     EF02  
   2            6144         2103295   1024.0 MiB  0700  
   3         2103296       165689343   78.0 GiB    8E00  
   4       165689344       166713343   500.0 MiB   8300  Linux filesystem
   5       166713344       166918143   100.0 MiB   0700  Microsoft basic data
   6       166918144       167122943   100.0 MiB   8300  Linux filesystem
```

重点是在 [Last sector] 那一行，那行绝对不要使用默认值，因为默认值会将所有的容量用光。

文件系统的 ID。一般来说，Linux 大概都是 8200、8300、8e00 等三种格式，Windows 几乎都用 0700，如果忘记这些数字，可以在 gdsik 中按下 [L] 来显示。

将分区状态写入磁盘分区表

```
Command (? for help): w

Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING
PARTITIONS!!

Do you want to proceed? (Y/N): y
OK; writing new GUID partition table (GPT) to /dev/sda.
Warning: The kernel is still using the old partition table.
The new table will be used at the next reboot.
The operation has completed successfully.
# gdisk 会先警告你可能的问题，我们确定分区是对的，这时才按下 y，不过怎么会有警告呢？
# 这时因为这块磁盘目前正在使用中，因此系统无法立即加载新的分区
```

* partprobe 更新 Linux 内核的分区表信息

```
partprobe [-s] # 可以不使用 -s，那么屏幕上不会出现信息，不过建议加上 -s 比较清晰
```

```
[root@localhost ~]# partprobe -s
/dev/sda: gpt partitions 1 2 3 4 5 6
Warning: Unable to open /dev/sr0 read-write (Read-only file system).  /dev/sr0 has been opened read-only.
/dev/sr0: msdos partitions 2
```

* gdisk 删除一个分区

```
[root@localhost ~]# gdisk /dev/sda
Command (? for help): p
Number  Start (sector)    End (sector)  Size       Code  Name
   1            2048            6143   2.0 MiB     EF02  
   2            6144         2103295   1024.0 MiB  0700  
   3         2103296       165689343   78.0 GiB    8E00  
   4       165689344       166713343   500.0 MiB   8300  Linux filesystem
   5       166713344       166918143   100.0 MiB   0700  Microsoft basic data
   6       166918144       167122943   100.0 MiB   8300  Linux filesystem

Command (? for help): d
Partition number (1-6): 6

Command (? for help): w

Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING
PARTITIONS!!

Do you want to proceed? (Y/N): y
OK; writing new GUID partition table (GPT) to /dev/sda.
Warning: The kernel is still using the old partition table.
The new table will be used at the next reboot.
The operation has completed successfully.

[root@localhost ~]# partprobe -s  # 更新 Linux 内核的分区表信息
```

####  2.5 fdisk 磁盘分区(MRB 分区表)

MBR 分区表使用 fdisk 分区

GPT 分区表使用 gdisk 分区

> fdisk 磁盘分区 (MRB 分区表)

```
[root@localhost ~]# fdisk /dev/sda
Command (m for help): m <== 输入 m 后，就会看到下面这些命令介绍
Command action
   d   delete a partition
   g   create a new empty GPT partition table
   G   create an IRIX (SGI) partition table
   l   list known partition types
   m   print this menu
   n   add a new partition
   o   create a new empty DOS partition table
   p   print the partition table
   q   quit without saving changes
   s   create a new empty Sun disklabel
   t   change a partition's system id
   v   verify the partition table
   w   write table to disk and exit
   x   extra functionality (experts only)
```

## 七、网络服务

### 1.  netstat  

netstat 命令用于显示与IP、TCP、UDP和ICMP协议相关的统计数据，一般用于检验本机各端口的网络连接情况。

netstat 是在内核中访问网络及相关信息的程序，它提供TCP连接，TCP和UDP监听，进程内存管理的相关报告。

```shell
[admin@bogon ~]$ netstat [-atunlpresc][-A<网络类型>][--ip]

参数说明:
-a 或 --all : 显示所有连线中的 Socket。
-t 或 --tcp : 显示TCP传输协议的连线状况
-u 或 --udp : 显示UDP传输协议的连线状况
-n 或 --numeric : 直接使用IP地址，而不通过域名服务器
-l 或 --listening : 显示网络界面信息表单
-p 或 --programs : 显示正在使用 Socket 的程序识别码或程序名称
-r 或 --route : 显示Routing Table
-e 或 --extend : 显示网络其他相关信息
```

状态说明

```shell
LISTEN：侦听来自远方的TCP端口的连接请求

SYN-SENT：再发送连接请求后等待匹配的连接请求（如果有大量这样的状态包，检查是否中招了）

SYN-RECEIVED：再收到和发送一个连接请求后等待对方对连接请求的确认（如有大量此状态，估计被flood攻击了）

ESTABLISHED：代表一个打开的连接

FIN-WAIT-1：等待远程TCP连接中断请求，或先前的连接中断请求的确认

FIN-WAIT-2：从远程TCP等待连接中断请求

CLOSE-WAIT：等待从本地用户发来的连接中断请求

CLOSING：等待远程TCP对连接中断的确认

LAST-ACK：等待原来的发向远程TCP的连接中断请求的确认（不是什么好东西，此项出现，检查是否被攻击）

TIME-WAIT：等待足够的时间以确保远程TCP接收到连接中断请求的确认

CLOSED：没有任何连接状态
```

#### 1.1 常用的命令展示

* 显示网卡列表

  ```shell
  [admin@bogon ~]$ netstat -i
  Kernel Interface table
  Iface             MTU    RX-OK RX-ERR RX-DRP RX-OVR    TX-OK TX-ERR TX-DRP TX-OVR Flg
  ens33            1500      454      0      0 0           124      0      0      0 BMRU
  lo              65536       52      0      0 0            52      0      0      0 LRU
  virbr0           1500        0      0      0 0             0      0      0      0 BMU
  ```

* 常用组合

  `netstat -lntup` 

  ```shell
  [root@bogon ~]# netstat -lntup
  Active Internet connections (only servers)
  Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
  tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      1335/cupsd     
  tcp        0      0 127.0.0.1:25            0.0.0.0:*               LISTEN      1658/master   ....   
  ```

  









