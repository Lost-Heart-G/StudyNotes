### MySQL 安装 -- Yum仓库

 #### 1. MySQL 安装步骤

##### 1.1 添加MySQL Yum 存储库

首先， 在你的系统库列表中年添加MySQL Yum 存储库， 这是一次性操作，可以通过安装MySQL提供的RPM来执行。 跟着这些步骤：

​	a. 在MySQL Developer Zone 下载MySQL Yum 存储库包(https://dev.mysql.com/downloads/repo/yum/)

​	b. 根据你的平台选择并下载发行的包

​	c. 用下列命令安装下载发行的包， 用你下在的 RPM 包名替换*platform-and-version-specific-package-name*

```
$ sudo yum localinstall platform-and-version-specific-package-name.rpm
```

​	 您可以通过以下命令检查MySQL Yum存储库是否已成功添加（对于Fedora，使用dnf替换命令中的yum）：

```
$ yum repolist enabled | grep "mysql.*-community.*"
```

##### 1.2 选择发布系列

​	当使用MySQL Yum 仓库，默认情况会选择安装最新的GA系列。 

​	在MySQL Yum存储库中，MySQL社区服务器的不同发行版系列托管在不同的子存储库中。 默认情况下启用最新GA系列（当前为MySQL 5.7）的子存储库，默认情况下禁用所有其他系列（例如，MySQL 5.6系列）的子存储库。 使用此命令查看MySQL Yum存储库中的所有子存储库，并查看哪些子存储库已启用或禁用：

```
$ yum repolist all |grep mysql
```

​	要从最新的GA系列安装最新版本，无需进行任何配置。 要从最新GA系列以外的特定系列安装最新版本，请在运行安装命令之前禁用最新GA系列的子存储库并启用特定系列的子存储库。 如果您的平台支持yum-config-manager，您可以通过发出这些命令来执行此操作：

```
$ sudo yum-config-manager --disable mysql57-community   # 禁用mysql 5.7版本的存储库
$ sudo yum-config-manager --enable mysql56-community    # 启用mysql 5.6版本的存储库
```

​	除了使用 **`yum-config-manager`** 命令外，您还可以通过手动编辑 **`/etc/yum.repos.d/mysql-community.repo`**** 文件来选择发布系列。 这是文件中发布系列的子存储库的典型条目：

```
[mysql57-community]
name=MySQL 5.7 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```

​	找到要配置的子存储库的条目，然后编辑已启用的选项。 指定 **enabled = 0** 以禁用子存储库，或者**enabled = 1** 以启用子存储库。 例如，要安装MySQL 5.6，请确保为MySQL 5.7的上述子存储库条目启用了= 0，并且对于5.6系列的条目启用了= 1：

```
# Enable to use MySQL 5.6
[mysql56-community]
name=MySQL 5.6 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.6-community/el/6/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```

通过运行以下命令并检查其输出来验证是否已启用和禁用了正确的子存储库：

```
$ yum repolist enabled | grep mysql
```

##### 1.3 安装MySQL

通过以下命令安装MySQL

```
$ sudo yum install mysql-community-server
```

这将安装MySQL服务器（mysql-community-server）的软件包以及运行服务器所需组件的软件包，包括客户端软件包（mysql-community-client），客户端和服务器的常见错误消息和字符集 （mysql-community-common）和共享客户端库（mysql-community-libs）。

##### 1.4 启用MySQL 服务器

用一下命令启动MySQL 服务器

```
$ sudo service mysqld start
Starting mysqld:[OK]
```

你可以用以下命令查看MySQL 服务器运行状态

```
$ sudo service mysqld status
mysqld (pid 3306) is running
```

在服务器初始启动时，如果服务器的数据目录为空，则会发生以下情况：

* 服务器已初始化。

* SSL证书和密钥文件在数据目录中生成。

* validate_password已安装并启用。

* 创建超级用户帐户“root”@“localhost”。 设置超级用户的密码并将其存储在错误日志文件中。 要显示它，请使用以下命令：

```
$ sduo grep 'temporary password' /var/log/mysqld.log
```

通过使用生成的临时密码登录并为超级用户帐户设置自定义密码，尽快更改root密码：

```
$ mysql -uroot -p
```

```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';
```

> 注意
> 默认情况下安装validate_password。 validate_password实现的默认密码策略要求密码至少包含一个大写字母，一个小写字母，一个数字和一个特殊字符，并且密码长度至少为8个字符。

#### 2. 使用Yum安装其他MySQL产品和组件
​	您可以使用Yum来安装和管理MySQL的各个组件。 其中一些组件托管在MySQL Yum存储库的子存储库中：例如，MySQL连接器可以在MySQL Connectors社区子存储库中找到，而MySQL Workbench可以在MySQL工具社区中找到。 您可以使用以下命令从MySQL Yum存储库列出适用于您的平台的所有MySQL组件的软件包：

```
$ sudo yum --disablerepo=\* --enablerepo='mysql*-community*' list available
```

使用以下命令安装您选择的任何软件包，将package-name替换为软件包的名称：

```
$ sudo yum install package-name
```

要安装共享客户端库：

```
$ sudo yum install mysql-community-libs
```

#### 3. 开机自动启动

```
vim /etc/rc.local
添加 service mysqld start
```

