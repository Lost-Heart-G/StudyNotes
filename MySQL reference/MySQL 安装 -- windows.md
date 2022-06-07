### MySQL 安装 -- windows

MySQL Community 5.7 Server 要求 Microsoft Visual c ++ 2013 Redistributable Package 在Windows上运行 ，在安装服务器之前，必须确保用户在该系统上已经安装这个软件包。

#### 一、MySQL 安装方法

##### 1. 下载 MySQL 

​	最简单和推荐的方法是下载MySQL Installer（适用于Windows），并让它安装和配置系统上的所有MySQL产品。 方法如下：

从https://dev.mysql.com/downloads/installer/下载MySQL安装程序并执行它。

> 与标准的MySQL安装程序不同，较小的“网络社区”版本不捆绑任何MySQL应用程序，但会下载您选择安装的MySQL产品。

##### 2. 选择安装产品

​	为您的系统选择适当的安装类型。 通常，您将选择Developer Default来安装与MySQL开发相关的MySQL服务器和其他MySQL工具，以及MySQL Workbench等有用的工具。 或者，选择自定义安装类型以手动选择所需的MySQL产品。

##### 3. 安装

按照说明完成安装过程。 这将安装几个MySQL产品并启动MySQL服务器。

MySQL现已安装。 如果您将MySQL配置为服务，则每次重新启动系统时Windows都会自动启动MySQL服务器。

此过程还会在您的系统上安装MySQL Installer应用程序，稍后您可以使用MySQL Installer来升级或重新配置MySQL产品。

###### 3.1 MySQL 安装及初始化

​	当您第一次下载MySQL安装程序时，安装向导将指导您完成MySQL产品的初始安装。 如下图所示，初始设置是整个过程中的一次性活动。 MySQL安装程序在初始设置期间检测主机上安装的现有MySQL产品，并将它们添加到要管理的产品列表中。

![MySQL安装流程](.\material\mi-process-overview.png)