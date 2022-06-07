### mysqlpump -- 数据备份程序

​	mysqlpump客户端实用程序执行逻辑备份，生成一组SQL语句，可以执行这些语句来重现原始数据库对象定义和表数据。 它转储一个或多个MySQL数据库以备份或传输到另一个SQL服务器。

mysqlpump功能包括：

* 并行处理数据库和数据库中的对象，以加速转储过程

* 更好地控制要转储的数据库和数据库对象（表，存储程序，用户帐户）

* 将用户帐户转储为帐户管理语句（CREATE USER，GRANT）而不是插入mysql系统数据库

* 创建压缩输出的能力

* 进度指标（值是估计值）

* 对于转储文件重新加载，通过在插入行之后添加索引来为InnoDB表创建更快的二级索引

​	如果不使用--single-transaction选项，mysqlpump至少需要转储表的SELECT权限，转储视图的SHOW VIEW，转储触发器的TRIGGER和LOCK TABLES。 要转储用户定义，需要mysql系统数据库的SELECT权限。 某些选项可能需要其他权限，如选项说明中所述。

​	要重新加载转储文件，您必须具有执行其包含的语句所需的权限，例如由这些语句创建的对象的相应CREATE权限。

#### mysqlpump调用语法

​	默认情况下，mysqlpump会转储所有数据库（在mysqlpump限制中注明某些例外）。 要显式指定此行为，请使用--all-databases选项：

```
$ mysqlpump --all-databases
```

​	要转储单个数据库或该数据库中的某些表，请在命令行上命名数据库，可选地后跟表名：

```
$ mysqlpump db_name
$ mysqlpump db_name tbl_name1 tbl_name2 ...
```

要将所有名称参数视为数据库名称，请使用--databases选项：

```
$ mysqlpump --databases db_name1 db_name2 ...
```

​	默认情况下，即使您转储包含授权表的mysql系统数据库，mysqlpump也不会转储用户帐户定义。 要以CREATE USER和GRANT语句的形式将授权表内容转储为逻辑定义，请使用--users选项并禁止所有数据库转储：

```
$ mysqlpump --exclude-database=% --user
```

在上面的命令中，％是一个通配符，它匹配--exclude-databases选项的所有数据库名称。

mysqlpump支持包含或排除数据库，表，存储程序和用户定义的几个选项。

要重新加载转储文件，请执行它包含的语句。 例如，使用mysql客户端：

```
$ mysqlpump [options] > dump.sql
$ mysql < dump.sql
```

以下讨论提供了其他mysqlpump用法示例。

要查看mysqlpump支持的选项列表，请使用 mysqlpump --help