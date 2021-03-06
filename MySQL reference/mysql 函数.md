# mysql 函数

## 一、常用 MySQL 函数

### 1. 算术函数

| 函数名  | 定义                                                         |
| ------- | ------------------------------------------------------------ |
| ABS()   | 取绝对值                                                     |
| MOD()   | 取余                                                         |
| ROUND() | 四舍五入指定的小数位数，需要有两个参数，分别为字段名称、小数位数 |

### 2.  字符串函数

常用的字符串函数操作包括了字符串拼接，大小写转换，求长度以及字符串替换和截取等。

| 函数名        | 定义                                                         |
| ------------- | ------------------------------------------------------------ |
| CONCAT()      | 将多个字符串拼接起来                                         |
| LENGTH()      | 计算字段的长度，一个汉字算三个字符，一个数字或字母算一个字符 |
| CHAR_LENGTH() | 计算字段的长度，汉字、数字、字母都算一个字符                 |
| LOWER()       | 将字符串中的字符转化为小写                                   |
| UPPER()       | 将字符串中的字符转化为大写                                   |
| REPLACE()     | 替换函数，有3个参数，分别为；要替换的表达式或字段名、想要查找的被替换字符串。替换成哪个字符串 |
| SUBSTRING()   | 截取字符串，有3个参数，分别为：待截取的表达式或字段名，开始截取的位置，想要截取的字符串长度 |

```mysql
mysql> SELECT REPLACE('fabcd', 'abc', 123);
+------------------------------+
| REPLACE('fabcd', 'abc', 123) |
+------------------------------+
| f123d                        |
+------------------------------+
1 row in set (0.00 sec)

mysql> SELECT SUBSTRING('fabcd', 1, 3);
+--------------------------+
| SUBSTRING('fabcd', 1, 3) |
+--------------------------+
| fab                      |
+--------------------------+
1 row in set (0.00 sec)
```



### 3.  日期函数

日期函数是对数据表中的日期进行处理

| 函数名              | 定义                              |
| ------------------- | --------------------------------- |
| CURRENT_DATE()      | 系统当前日期                      |
| CURRENT_TIME()      | 系统当前时间，没有具体的日期      |
| CURRENT_TIMESTAMP() | 系统当前时间，包括具体的日期+时间 |
| EXTRACT()           | 抽象具体的年、月、日              |
| DATE()              | 返回时间的日期部分                |
| YEAR()              | 返回时间的年份部分                |
| MONTH()             | 返回时间的月份部分                |
| DAY()               | 返回时间的天数部分                |
| HOUR()              | 返回时间的小时部分                |
| MINUTE()            | 返回时间的分钟部分                |
| SECOND()            | 返回时间的秒部分                  |

```mysql
mysql> SELECT CURRENT_DATE();
+----------------+
| CURRENT_DATE() |
+----------------+
| 2020-09-21     |
+----------------+
1 row in set (0.00 sec)

mysql> SELECT CURRENT_TIME();
+----------------+
| CURRENT_TIME() |
+----------------+
| 15:11:30       |
+----------------+
1 row in set (0.00 sec)

mysql> SELECT CURRENT_TIMESTAMP();
+---------------------+
| CURRENT_TIMESTAMP() |
+---------------------+
| 2020-09-21 15:12:07 |
+---------------------+
1 row in set (0.00 sec)

mysql> SELECT EXTRACT(YEAR FROM '2020-09-21');
+---------------------------------+
| EXTRACT(YEAR FROM '2020-09-21') |
+---------------------------------+
|                            2020 |
+---------------------------------+
1 row in set (0.00 sec)

mysql> SELECT DATE('2020-09-21 12:00:05');
+-----------------------------+
| DATE('2020-09-21 12:00:05') |
+-----------------------------+
| 2020-09-21                  |
+-----------------------------+
1 row in set (0.00 sec)
```

> DATE 日期格式必须是  yyyy-mm-dd 的形式。如果要进行日期比较，就要使用 DATE 函数，不要直接使用日期与字符串进行比较。

### 4. 转换函数

| 函数名     | 定义                                                         |
| ---------- | ------------------------------------------------------------ |
| CAST       | 数据类型转换，参数是一个表达式，表达式通过AS关键词分割了2个参数，分别是原始数据和目标数据类型 |
| COALESCE() | 返回第一个非空数值                                           |

```mysql
mysql> SELECT CAST(123.123 AS INT);    # 运行会报错

mysql> SELECT CAST(123.123 AS DECIMAL(8, 2));
+--------------------------------+
| CAST(123.123 AS DECIMAL(8, 2)) |
+--------------------------------+
|                         123.12 |
+--------------------------------+
1 row in set (0.00 sec)

mysql> SELECT COALESCE(null, 1, 2);
+----------------------+
| COALESCE(null, 1, 2) |
+----------------------+
|                    1 |
+----------------------+
1 row in set (0.00 sec)
```

> CAST 函数在转换数据类型的时候，不会四舍五入，如果原数值有小数，那么转换为整数类型的时候就会报错。不过可以指定转换的小数类型，在 MySQL 和 SQL Server 中，你可以用DECIMAL(a, b) 来指定，其中  a 代表整数部分和小数部分加起来最大的位数，b 代表小数位数。











