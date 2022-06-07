### mysqldump -- 数据库备份

​	所述的 **mysqldump** 客户实用程序执行逻辑备份，产生一组能够被执行以再现原始数据库对象定义和表数据的SQL语句。它转储一个或多个MySQL数据库以备份或传输到另一个SQL服务器。所述的 **mysqldump** 命令也可以生成CSV输出，，其他分隔符的文本或XML格式。

**mysqldump** 至少需要 **SELECT** 转储表的特权，**SHOW VIEW** 转储视图， TRIGGER 转储触发器和LOCK TABLES如果不使用--single-transaction选项。某些选项可能需要其他权限，如选项说明中所述。

要重新加载转储文件，您必须具有执行其包含的语句所需的权限，例如`CREATE`这些语句创建的对象的相应 权限。

**mysqldump** 输出可以包含 **ALTER DATABASE** 更改数据库排序规则的语句。 这些可以在转储存储的程序以保留其字符编码时使用。要重新加载包含此类语句的转储文件，`ALTER`需要具有受影响数据库的 权限。



#### 1. 性能和可伸缩性注意事项

​	**`mysqldump`** 优点包括在恢复之前查看甚至编辑输出的便利性和灵活性。您可以克隆数据库以进行开发和DBA工作，或者生成现有数据库的轻微变体以进行测试。它不是用于备份大量数据的快速或可扩展的解决方案。对于大数据大小，即使备份步骤花费了合理的时间，恢复数据也会非常慢，因为重放SQL语句涉及用于插入，索引创建等的磁盘I / O.

* 如果你的表是主要`InnoDB` 的表，或者如果你有一个混合`InnoDB` 和`MyISAM`表，可以考虑使用**mysqlbackup** MySQL企业备份产品的命令。（作为企业订阅的一部分提供。）它`InnoDB`以最小的中断为备份提供最佳性能; 它还可以备份来自`MyISAM`其他存储引擎的表格 ; 它提供了许多方便的选项，以适应不同的备份方案。

**mysqldump** 可以逐行检索和转储表内容，或者它可以从表中检索整个内容并在转储之前将其缓冲在内存中。如果要转储大型表，则在内存中缓冲可能会出问题。要逐行转储表，请使用 **--quick** 选项( 或 **-opt** ， 启用 **--quick** )。默认情况下启用 **--opt** 选项（以及 **--quick** ), 因此要启用内存缓冲，请使用 **--skip-quick **

如果您使用最新版本的mysqldump生成要重新加载到非常旧的MySQL服务器的转储，请使用--skip-opt选项而不是--opt或--extended-insert选项。



#### 2. 调用语法

通常有三种方法可以使用 **mysqldump** 来转储一组一个或多个表，一组一个或多个完整的数据库，或整个MySQL服务器 - 如下所示：

```
$ mysqldump [options] db_name [tbl_name ...]
$ mysqldump [options] --databses db_name ...
$ mysqldump [options] --all-databases
```

要转储整个数据库，请不要在db_name之后命名任何表，也不要使用--databases或--all-databases选项。

要查看mysqldump支持的选项列表，请使用命令mysqldump --help。

#### 3. 例子

要备份整个数据库:

```
$ mysqldump db_name >  backup-file.sql
```

要将转储文件加载回服务器:

```
$ mysql db_name < back-file.sql
```

另一种重新加载转储文件的方法:

```
mysql -e "source /path-to-backup/backup-file.sql" db_name
```

mysqldump 对于通过将数据从一个MySQL 服务器复制到另一个MySQL 服务器来填充数据库非常有用:

```
mysqldump --opt db_name | mysql --host=remote_host -C db_name
```

你可以使用一个命令转储多个数据库：

```
mysqldump --databases db_name1 [db_name2 ...] > my_databases.sql
```

要转储所有数据库，请使用一下 --all-databases 选项：

```
mysqldump --all-databases > all_databases.sql
```

对于InnoDB表，mysqldump 提供了一种进行在线备份的方法：

```
mysqldump --all-databases --master-data --single-transaction > all_databases.sql
```

 此备份在转储开始时获取所有表的全局读锁（使用FLUSH TABLES WITH READ LOCK）。获取此锁定后，将读取二进制日志坐标并释放锁定。如果在发出FLUSH语句时正在运行长更新语句，则MySQL服务器可能会停止，直到这些语句完成。之后，转储变为无锁，并且不会干扰对表的读取和写入。 如果MySQL服务器收到的更新语句很短（就执行时间而言），即使有很多更新，初始锁定时间也不应该很明显。

对于时间点恢复（也称为“前滚”，当您需要恢复旧备份并重放自该备份以来发生的更改时），旋转二进制日志通常很有用。 4，“二进制日志”）或至少知道转储对应的二进制日志坐标：

```
mysqldump --all-databases --master-data=2 > all_databases.sql
```

