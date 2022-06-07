### mysqlimport 数据库导入程序

**Usage: mysqlimport [OPTIONS] databases textfile ...** 

​	mysqlimport 程序是一个将以特定格式存放的文本数据（如通过“select * into OUTFILE from ...”所生成的数据文件）导入到指定的MySQL Server 中的工具程序，比如将一个标准的csv 文件导入到某指定数据库的指定表中。mysqlimport 工具实际上也只是“**load data infile**”命令的一个包装实现。

默认从以下路径中文件读取默认参数

```
/etc/mysql/my.cnf /etc/my.cnf ~/.my.cnf
```

#### 1. 常用选项

* --fields-termiated-by = 字符串: 设置字符串为字段之间的分隔符，可以为单个或多个字符。默认值为制表符"\t"。
* -L, --local: 表示从客户端任意路径读取文件导入表中，未设置该选项时，默认从datadir下同名数据库目录下读取文件导入
* --ignore-lines=n: 表示可以忽略前n行。
* -l, --lock-tables: 写入时锁定所有表
* -p, --password[=name]: 指定用户密码
* -u, --user=name: 指定登入MySLQ用户名
* -h, --host=name: 指定远程连接的服务器
* -c, --columns=name: 往表里导入指定字段，如：--cloumns="Name, Age, Gender"
* -C, --compress: 在客户端和服务器之间启用压缩传递所有信息

其它可用选项和默认参数设置可以使用 **mysqlimport -help** 查询

#### 2. 用法示例：

##### 例1：基本用法

```
mysql> SELECT * FROM shirt INTO OUTFILE 'tmp/shirt1';
Query OK, 7 rows affected (0.00 sec)
mysql> CREATE TABLE shirt1 LIKE shirt;
Query OK, 0 rows affected (0.00 sec)
[admin@localhost sql_data]$ mysqlimport -uroot -p --local menagerie /tmp/shirt1 --fiedls-terminated-by="|"
Enter password: 
menagerie.shirt1: Records: 7  Deleted: 0  Skipped: 0  Warnings: 0
mysql> SELECT * FROM shirt1;
+----+---------+--------+-------+
| id | style   | color  | owner |
+----+---------+--------+-------+
|  1 | polo    | blue   |     1 |
|  2 | dress   | white  |     1 |
|  3 | t-shirt | blue   |     1 |
|  4 | dress   | orange |     2 |
|  5 | polo    | red    |     2 |
|  6 | dress   | blue   |     2 |
|  7 | t-shirt | white  |     2 |
+----+---------+--------+-------+
7 rows in set (0.00 sec)
```

##### 例2：指定--local 选项，可以从本机任意路径导入数据

```
mysql> SELECT * FROM shirt INTO OUTFILE 'tmp/shirt1';
Query OK, 7 rows affected (0.00 sec)
mysql> CREATE TABLE shirt1 LIKE shirt;
Query OK, 0 rows affected (0.00 sec)
[admin@localhost sql_data]$ mysqlimport -uroot -p --local menagerie /tmp/shirt1
Enter password: 
menagerie.shirt1: Records: 7  Deleted: 0  Skipped: 0  Warnings: 0
mysql> SELECT * FROM shirt1;
+----+---------+--------+-------+
| id | style   | color  | owner |
+----+---------+--------+-------+
|  1 | polo    | blue   |     1 |
|  2 | dress   | white  |     1 |
|  3 | t-shirt | blue   |     1 |
|  4 | dress   | orange |     2 |
|  5 | polo    | red    |     2 |
|  6 | dress   | blue   |     2 |
|  7 | t-shirt | white  |     2 |
+----+---------+--------+-------+
7 rows in set (0.00 sec)
```

##### 例3：未指定--local 选项，无法从my.cnf 中定义的其他路径中往表里导入数据

```
mysql> DELETE FROM shirt1;
Query OK, 7 rows affected (0.00 sec)
[admin@localhost sql_data]$ head /tmp/shirt1 -n 3
1	polo	blue	1
2	dress	white	1
3	t-shirt	blue	1
[admin@localhost sql_data]$ mysqlimport -uroot -p menagerie /tmp/shirt1
mysqlimport: Error: 29, File '/tmp/shirt1'not found (Errcode: 13), when using table: shirt1
```

