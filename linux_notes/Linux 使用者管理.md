# Linux 使用者管理

### 有效用户组(effective group)与初始用户组(initial group)

#### 1. groups: 有效与支持用户组的观察

```shell
[user1@localhost ~]$ groups
group1 users
```

在以上输出的信息中，可知道 user1 这个用户同时属于 group1、users 这两个用户组，而且，<span style="color: red;">第一个输出的用户组即为有效用户组</span> , 此时我以 touch 去建立一个新文件，那么这个文件的拥有者为  user1， 而用户组是 group1

#### 2.  newgrp: 有效用户组的切换

使用newgrp 切换有效用户组时，那想要切换的用户组必须是你已经有支持的用户组。

```shell
[user1@localhost ~]$ newgrp users
[user1@localhost ~]$ groups
users group1
[user1@localhost ~]$ touch test
[user1@localhost ~]$ ll
total 0
-rw-r--r-- 1 user1 users 0 Oct  7 16:31 test
[user1@localhost ~]$ exit    # 注意，记得退出 newgrp 环境
```



## 一、账号管理

### 1 新增与删除用户

#### 1.1 useradd

```shell
[root@localhost ~]# useradd [-u UID] [-g 初始用户组] [-G 次要用户组] [-mM] [-c 说明栏][-d 家目录绝对路径] [-s shell] 使用账号名称

选项与参数:
-u : 后面接的是UID, 是一组数字，直接指定一个特定的UID给这个账号。
-g : 后面接的用户组是初始用户组。
-G : 后面接的用户组是次要用户组。
-M : 强制，不要建立使用家目录。(系统账号默认值)
-m : 强制，要建立使用者家目录。(一般账号默认值)
-c : 这个就是/etc/passwd 的第五栏的说明内容，可以随便我们设置的。
-d : 指定某个目录成为家目录，而不使用默认值，务必时候用绝对路径。
-r : 建立系统账号。
```

#### 1.2  useradd 参考文件

```shell
[admin@localhost ~]$ useradd -D
GROUP=100            <== 默认的用户组
HOME=/home           <== 默认的家目录
INACTIVE=-1          <== 密码失效日，在 shadow 内的第 7 栏
EXPIRE=              <== 账号失效日，在 shadow 内的第 8 栏
SHELL=/bin/bash      <== 默认的 shell
SKEL=/etc/skel       <== 使用者家目录内的数据参考目录
CREATE_MAIL_SPOOL=yes <== 是否主动帮助使用者建立邮箱(mailbox)
```

> 这些数据默认在 /etc/default/useradd 文件中。

#### 1.3 passwd

```shell
[root@localhost ~]# passwd [--stdin] [账号名称]  <== 所有人均可使用来改自己的密码
[root@localhost ~]# passwd [-l] [-u] [--stdin] [-S] \
> [-n 日数] [-x 日数] [-w 日数] [-i 日期]  账号  <== root功能

选项与参数:
--stdin : 可以通过来自前一个管道的数据，作为密码输入，对 shell 脚本有帮助
-l : 是 Lock 的意思，会将/etc/shadow 第二栏最前面加上 ! 使密码失效
-u : 与 -l 相对，使 Unlock 的意思
-S : 列出密码相关参数，即 shadow 文件内的大部分信息
-n : 后面接天数，shadow 的第四栏位，多久不可修改密码天数。
-x : 后面接天数, shadow 的第五栏位，多久内必须修改密码。
-w : 后面接天数, shadow 的第六栏位，密码过期的警告天数。
-i : 后面接[日期], shadow 的第七栏位，密码失效日期。
```

范例一:

```shell
# 使用 standard input 建立用户的密码
[root@localhost ~]# echo "abc543CC" | passwd --stdin vbird2
Changing password for user vbird2.
passwd : all authentication tokens updated successfully.
```

> 这个操作通常仅在通过shell 脚本大量建立用户账号时使用。

范例二:

```shell
# 管理 admin 的密码使具有60天修改、密码过期 10 天后账号失效设置。
[root@localhost ~]# passwd -S admin
admin PS 1969-12-31 0 99999 7 -1 (Password set, SHA512 crypt.)
# 上面说明密码建立时间(2015-07-20)、0 最小天数，9999 修改天数、7 警告日数与密码不会失效(-1)
[root@localhost ~]# passwd -x 60 -i 10 admin
Adjusting aging data for user admin.
passwd: Success
[root@localhost ~]# passwd -S admin
admin PS 1969-12-31 0 60 7 10 (Password set, SHA512 crypt.)
```

#### 1.4 chage

```shell
[root@localhost ~]# chage [-ldEImMW]

选项与参数:
-l : 列出该账号的详细密码参数
-d : 后面接日期，修改 shadow 第三栏位（最近一次修改密码的日期），格式 YYYY-MM-DD
-E : 后面接日期，修改 shadow 第八栏位（账号失效日），格式 YYYY-MM-DD
-I : 后面接天数，修改 shadow 第七栏位（密码失效日期）
-m : 后面接天数，修改 shadow 第四栏位（密码最短保留天数）
-M : 后面接天数，修改 shadow 第五栏位（密码多久需要进行修改）
-W : 后面接天数，修改 shadow 第六栏位（密码过期前警告日期）
```

范例一:

```shell
# 列出 admin 的详细密码参数
[root@localhost ~]# chage -l admin
Last password change					: never
Password expires					: never
Password inactive					: never
Account expires						: never
Minimum number of days between password change		: 0
Maximum number of days between password change		: 60
Number of days of warning before password expires	: 7
```

范例二:

用户在第一次登录时，强制它们一定要修改密码后才能使用系统资源

```shell
[root@localhost ~]# useradd agetest
[root@localhost ~]# echo "agetest" | passwd --stdin agetest
Changing password for user agetest.
passwd: all authentication tokens updated successfully.
[root@localhost ~]# chage -d 0 agetest
[root@localhost ~]# chage -l agetest | head -n 3
Last password change				: password must be changed
Password expires					: password must be changed
Password inactive					: password must be changed
```



#### 1.5 usermod

```shell
[root@localhost ~]# usermod [-cdegGlsuLU] username

选项与参数
-g : 后面接初始用户组，修改 /etc/passwd 的第四栏位，亦即是 GID 的栏位
-G : 后面接次要用户组，修改这个使用者能够支持的用户组，修改的是/etc/group
-l : 后面接账号名称，亦即是修改账号名称，/etc/passwd 的第一栏。
-a : 与-G合用，可【增加次要用户组的支持】而非【设置】

*********仅列出一部分参数说明，其余说明自行man usermod**********
```

#### 1.6 userdel

删除用户的相关数据，而用户的数据有:

* 用户账号/密码相关参数:  /etc/passwd、/etc/shadow
* 用户组相关参数:  /etc/group、/etc/gshadow
* 用户个人文件数据:  /home/username、/var/spool/mail/username

```shell
[root@localhost ~]# userdel [-r] username

选项与参数:
-r : 连同使用者的家目录也一起删除
```



### 2. 用户功能

#### 2.1 id

id 这个命令可以查看某人或自己的相关UID/GID等信息。

```shell
[root@localhost ~]# id [username]

```

#### 2.2 finger

finger 可以查看很多用户相关的信息(这个命令有点危险，在新的版本中已经默认不安装这个软件)

```shell
[root@localhost ~]# finger [-s] username
选项与参数:
-s : 仅列出使用者账户、全名、终端代号与登录时间等
-m : 列出与后面的账户相同者，而不是利用部分对比（包括全名部分）

范例一: 查看 admin 的使用者相关账号属性
[root@localhost ~]# finger admin
Login: admin          			Name: admin
Directory: /home/admin              	Shell: /bin/bash
On since Thu Oct  8 02:58 (EDT) on pts/0 from 192.168.81.1
   6 seconds idle
No mail.
No Plan.
```

```shell
范例二:
[root@localhost ~]# echo "I Will study Linux during this year." > /home/admin/.plan
[root@localhost ~]# finger admin
Login: admin          			Name: admin
Directory: /home/admin              	Shell: /bin/bash
On since Thu Oct  8 02:58 (EDT) on pts/0 from 192.168.81.1
   6 seconds idle
No mail.
Plan:
I Will study Linux during this year.
```

#### 2.3 chfn 

change finger 的意思。

#### 2.4 chsh 

```shell
[root@localhost ~]# chsh [-ls]
选项与参数
-l : 列出目前系统上面可用的 shell, 其实就是 /etc/shells 的内容
-s : 设置修改自己的Shell
```

范例一:

```shell
[root@localhost ~]# chsh -l
/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash

[admin@localhost ~]$ chsh -s /bin/sh; grep admin /etc/passwd
Changing shell for admin.
Password: 
Shell changed.
admin:x:1000:1000:admin:/home/admin:/bin/sh

[admin@localhost ~]$ chsh -s /bin/bash   <== 测试完毕后，立刻改回来。
```



### 3. 新增与删除用户组

#### 3.1 groupadd

```shell
[root@localhost ~]# groupadd  [-g  gid]  [-r]  用户名称
选项与参数:
-g : 后面接某个特定的GID， 用来直接设置某个 GID
-r : 建立系统用户组，与 /etc/loin.defs 内的 GID_MIN 有关。
```



#### 3.2 groupmod

```shell
[root@localhost ~]# groupmod  [-g  gid]  [-n  group_name]   用户组名
选项与参数:
-g : 修改既有的 GID 数字
-n : 修改既有的用户组名称

# 范例一:  修改建立的group1 名称改为 mygroup, GID 为 201
[root@localhost ~]# groupadd group1
[root@localhost ~]# groupmod -g 201 -n mygroup group1
[root@localhost ~]# grep mygroup /etc/group /etc/gshadow
/etc/group:mygroup:x:201:
/etc/gshadow:mygroup:!::
```



#### 3.3 groupdel

```shell
[root@localhost ~]# groupdel   [groupname]

# 范例一: 删除 mygroup
[root@localhost ~]# groupdel mygroup
```



#### 3.4 gpasswd  用户组管理员功能

<span style="color:red">关于系统管理员(root)做的操作</span> 

```shell
[root@localhost ~]#  gpasswd  groupname
[root@localhost ~]#  gpasswd  [-A  user1 ...]  [-M  user3 ...]  groupname
[root@localhost ~]#  gpasswd  [-rR]  groupname

选项与参数:
        :  若没有任何参数时，表示设置 groupname 密码(/etc/gshadow)
-A   :   将 groupname 的管理权交由后面的使用者管理(该用户组的管理员)
-M  :   将某些账号加入这个用户当中
-r    :   将 groupname 的密码删除
-R   :   将 groupname 的密码栏失效
```

<span style="color: red">关于用户组管理员(Group administrator)做的操作</span> 

```shell
[root@localhost ~]#  gpasswd  [-ad]  user  groupname
-a :  将某个使用者加入到  groupname 这个用户组当中
-A : 将某个使用者删除出  groupname 这个用户组当中
```

















