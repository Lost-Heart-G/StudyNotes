### MySQL 配置文件 (my.cnf)

​	大多数MySQL程序都可以从选项文件（有时称为配置文件）中读取启动选项。选项文件提供了一种指定常用选项的便捷方式，因此每次运行程序时都无需在命令行中输入这些选项。

​	许多选项文件都是纯文本文件，使用任何文本编辑器创建。例外是`.mylogin.cnf` 包含登录路径选项的文件。这是 **mysql_config_editor**  实用程序创建的加密文件。一个“ 登录路径 ”是一个选项组只允许特定的选项：`host`，`user`， `password`，`port`和 `socket`。客户端程序`.mylogin.cnf`使用该 `--login-path`选项指定要读取的登录路径。

​	要指定备用登陆路径文件名，请设置 MYSQL_TEST_LOGIN_FILE 环境变量。此变量由 **mysql-test-run.pl** 测试实用程序使用, 但也可以由 **mysql_config_editor ** 和MySQL 客户端(如 **mysql** , **mysqladmin** 等)识别。

#### 1. 选项文件处理顺序(unix和类unix系统)

| File Name             | Purpose                                                      |
| --------------------- | ------------------------------------------------------------ |
| `/etc/my.cnf`         | Global options                                               |
| `/etc/mysql/my.cnf`   | Global options                                               |
| `*SYSCONFDIR*/my.cnf` | Global options                                               |
| `$MYSQL_HOME/my.cnf`  | Server-specific options (server only)                        |
| `defaults-extra-file` | The file specified with [`--defaults-extra-file`](https://dev.mysql.com/doc/refman/5.7/en/option-file-options.html#option_general_defaults-extra-file), if any |
| `~/.my.cnf`           | User-specific options                                        |
| `~/.mylogin.cnf`      | User-specific login path options (clients only)              |

在上表中，`~`表示当前用户的主目录（值 `$HOME`）。

SYSCONFDIR 表示在构建 MySQL 时 **SYSCONFDIR** 使用 **CMake** 选项指定的目录。默认情况下，这是 etc 编译安装目录下的目录。

MYSQL_HOME 是一个环境变量，包含特定于服务器的 my.cnf 文件所在目录的路径。如果 MYSQL_HOME 未设置并使用 **mysqld_safe** 程序启动服务器，则 **mysqld_safe** 将其设置 BASEDIR 为 MYSQL 基本安装目录。

DATADIR 通常是 / usr / local / mysql / data，尽管这可能因平台或安装方法而异。该值是编译MySQL时内置的数据目录位置，而不是 **mysqld** 启动 --datadir 时使用该选项指定的位置。在运行时使用 --datadir 不会影响服务器在处理任何选项之前查找其读取的选项文件的位置。

如果找到给定选项的多个实例，则最后一个实例优先，但有一个例外：对于 mysqld, 该选项的第一个实例 --user 用作安全预防措施，以防止在选项文件中指定的用户被覆盖在命令行。

#### 2. 选项文件语法

选项文件语法的以下说明适用于你手动编辑的文件。这排除了 .mylogin.cnf，它是使用mysql_config_editor 创建的， 并且是加密的。

运行 MySQL 程序时可以在命令行上给出的任何长选项也可以在选项文件中给出。要获取程序的可用选项列表，请使用 --help 选项运行它。（对于 mysqld, 使用 --verbose 和 --help)

在选项文件中指定选项的语法类似于命令行语法。但是，在选项文件中，省略选项名称中的前两个破折号，并且每行只指定一个选项。例如, 命令行上的--quick 与 --host=localhost  应在选项文件中的单独行上指定为quick 和 host=localhost。在选项文件中指定--loose-opt_name形式的选项，将其写为loose-opt_name。

在选项文件中的空行被忽略。非空行可以采用以下任何一种形式:

* #comment,  ;comment

  注释行以 "#" 或 ";" 开头。一个 "#" 注释也可以从行的中部开始。

* [group]

  group 是要为其设置选项的程序或组的名称。在组行之后，任何选项设置行都应用于命名组，直到选项文件的末尾或另一个组行为为止。选项名称不区分大小写。

* opt_name

  这相当于命令行上的 --opt_name。

* opt_name=value

  这相当于命令行上的 --opt_name = value, 在选项文件中，您可以在=字符周围添加空格，这在命令行中是不正确的。该值可以包含在单引号或双引号中，如果值包含#comment字符，则该值很有用。

从选项名称和值中自动删除前导和尾随空格。

您可以使用转义序列`\b`， `\t`，`\n`， `\r`，`\\`，并 `\s`在选项值来表示退格，制表符，换行符，回车，回车，和空格字符。在选项文件中，这些转义规则适用：

- 反斜杠后跟有效的转义序列字符将转换为序列表示的字符。例如，`\s`转换为空格。
- 反斜杠后面没有有效的转义序列字符保持不变。例如， `\S`保留原样。

前面的规则意味着可以给出一个字面反斜杠`\\`，或者`\`好像它没有后跟一个有效的转义序列字符。

选项文件中的转义序列规则与SQL语句中字符串文字中的转义序列规则略有不同。在后一种情况下，如果 “ *x*”不是有效的转义序列字符，则 变为 “X ”而不是  \x。

如果选项组名称与程序名称相同，则组中的选项将专门应用于该程序。例如，[mysqld] 和 [mysql] 组分别应用于 mysqld 服务器和 mysql 客户端程序。

[client]选项组由MySQL发行版中提供的所有客户端程序读取（但不是由mysqld）

[client]组使您可以指定适用于所有客户端的选项。例如，[client] 是用于指定连接到服务器的密码的适当组。（但请确保选项文件只能由您自己访问，以便其他人无法发现您的密码）。除非您使用的所有客户端程序都能识别，否则请确保不在[client]组中添加选项。如果尝试运行错误消息，则在显示错误消息后，不理解该选项的程序将退出。

稍后列出更多通用选项组和更具体的组。。例如，一个`[client]`组更通用，因为它被所有客户端程序读取，而一个`[mysqldump]`组只能由 **mysqldump** 读取。稍后指定的选项会覆盖先前指定的选项，因此按[client]，[mysqldump]的顺序放置选项组会启用特定于mysqldump的选项来覆盖[client]选项。

这是一个典型的全局选项文件:

```
[client]
port = 3306
socket = /tmp/mysql.sock

[mysqld]
port = 3306
socket = /tmp/mysql.sock
key_buffer_size = 16M
max_allwoed_packet = 8M

[mysqldump]
quick
```

这是一个典型的用户选项文件:

```
[client]
# The following password will be sent to all standart MySQL clients
password = "my password"

[mysql]
no-auto-rehash
connect_timeout = 2
```

要创建仅由特定MySQL 发行版系列中的 mysqld 服务器读取选项组，请使用名称为 [mysqld-5.6]， [mysqld-5.7]等的组，以下表示该 sql_mode 设置仅应由具体有5.7.x版本号的MySQL 服务器使用:

```
[mysqld-5.7]
sql_mode = TRADITIONAL
```

#### 3. 选项文件包含

可以在选项文件中使用 "! include" 指令包含其他选项文件，并使用 "! includedir" 搜索选项文件的特定目录。例如，要包含/home/mydir/myopt.cnf文件，请使用以下指令：

```
!include /home/mydir/myopt.cnf
```

要搜索/ home / mydir目录并读取那里找到的选项文件，请使用以下指令：

```
!includedir /home/mydir
```

MySQL不保证读取目录中选项文件的顺序。

> 注意:
>
> 在Unix操作系统上使用！includedir指令找到和包含的任何文件必须具有以.cnf结尾的文件名

像任何其他选项文件一样写入包含的选项文件的内容。 也就是说，它应该包含选项组，每个选项前面都有一个[group]行，表示选项适用的程序。

在处理包含文件时，仅使用当前程序正在查找的组中的那些选项。 其他组被忽略。 假设my.cnf文件包含以下行：

```
!include /home/mydir/myopt.cnf
```

并假设/home/mydir/myopt.cnf看起来像这样：

```
[mysqldamin]
force

[mysqld]
key_buffer_size = 16M
```

如果my.cnf 由 **mysqld** 处理, 则仅使用 /home/mydir/myopt/cnf 中的[mysqld]组。如果文件由mysqladmin处理，则仅使用[mysqladmin]组。 如果文件由任何其他程序处理，则不使用/home/mydir/myopt.cnf中的选项。

除了读取指定目录中的所有选项文件之外，！includedir指令的处理方式类似。

如果选项文件包含！include或！includedir指令，那么只要处理选项文件，就会处理由这些指令命名的文件，无论它们出现在文件中的哪个位置。