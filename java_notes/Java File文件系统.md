# Java File文件系统

## 一、File 类

File类包含了获得一个文件/目录的属性，以及对文件/目录进行改名和删除的方法

### java.io.File

| 方法                                | 说明                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| File(pathname: String)              | 为一个指定的路径名创建一个File对象。                         |
| File(parent: String, child: String) | 在目录parent下创建一个子路径的File对象。                     |
| File(parent: File, child: String)   | 在目录parent下创建一个子路劲的File对象。parent是一个File对象 |
|                                     |                                                              |

