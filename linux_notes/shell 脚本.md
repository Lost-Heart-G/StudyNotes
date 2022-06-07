# shell 脚本

## 一、简单范例

### 1. 数值运算: 简单的加减乘除

`$((计算式))` 

```shell
[admin@localhost bin]$ vim multiplying.sh
  1 #!/bin/bash
  2 # Program:
  3 #    User inputs 2 integer numbers; program will cross these two numbers.
  4 # History:
  5 # 2020-5-16     VBird    First release
  6 
  7 echo -e "You should input 2 numbers, I will multiplying them! \n"
  8 read -p "first number: " firstnu
  9 read -p "second number: " secnu
 10 
 11 total=$((${firstnu}*${secnu}))
 12 # declare -i total=${firstnu}*${secnu}
 13 
 14 echo -e "\nThe result of  ${firstnu} x ${secnu} is ==> ${total}"
```

计算含有小数点的数据时，可以通过 `bc` 这个命令的协助

```shell
[admin@localhost bin]$ echo "123.123*55.9" | bc
6882.575
```

### 2. 数值运算: 通过 bc 计算 Pi (圆周率)

```shell
[admin@localhost bin]$ vim cal_pi.sh
  1 #!/bin/bash
  2 # Program:
  3 #    User input a scale number to calculate pi number:
  4 # History:
  5 # 2020-5-16 13:50    VBird   First release
  6 
  7 echo -e "This program will calculate pi value. \n"
  8 echo -e "You should input a float number to calculate pi value.\n"
  9 
 10 read -p "The scale number (10~10000) ? " checking
 11 num=${checking:-"10"}
 12 echo -e "Starting calculate pi value. Be patient."
 13 time echo "scale=${num}; 4*a(1)" | bc -lq                                           
```

上述数据中, 那个 `4*a(1)` 是 bc 主动提供的一个计算 Pi 的函数，至于 scale 就是要 bc 计算几个小数点位数的意思。

## 二、判断式

### 1 利用 `test` 命令的测试功能

#### 1.1 关于某个文件名的【文件类型】判断，如 test -e filename 表示存在否

| 测试的参数 | 代表意义                                       |
| ---------- | ---------------------------------------------- |
| -e         | 该文件名是否存在                               |
| -f         | 该文件名是否存在且为文件(file)                 |
| -d         | 该文件名是否存在且为目录(directory)            |
| -b         | 该文件名是否存在且为一个 block device 设备     |
| -c         | 该文件名是否存在且为一个 character device 设备 |
| -S         | 该文件名是否存在且为一个 socket 文件           |
| -p         | 该文件名是否存在且为一个 FIFO (pipe) 文件      |
| -L         | 该文件名是否存在且为一个连接文件               |

#### 1.2 关于文件的权限检测

| 测试的参数 | 代表的意义                                     |
| ---------- | ---------------------------------------------- |
| -r         | 检测该文件名是否存在且具有【可读】的权限       |
| -w         | 检测该文件名是否存在且具有【可写】的权限       |
| -x         | 检测该文件名是否存在且具有【可执行】的权限     |
| -u         | 检测该文件名是否存在且具有【SUID】的属性       |
| -g         | 检测该文件名是否存在且具有【SGID】的属性       |
| -k         | 检测该文件名是否存在且具有【Sticky bit】的属性 |
| -s         | 检测该文件名是否存在且为【非空文件】           |

#### 1.3 两个文件之间的比较

| 测试的参数 | 代表的意义                                                   |
| ---------- | ------------------------------------------------------------ |
| -nt        | (newer than) 判断 file1 是否比 file2 新                      |
| -ot        | (older than) 判断 file1 是否比 file2 旧                      |
| -ef        | 判断 file 1 与 file2 是否为同一个文件，可用在判断 hard link 的判断上，主要意义在于判定，两个文件是否均指向同一个 inode |

#### 1.4 关于两个整数之间的判定

| 测试的参数 | 代表的意义                            |
| ---------- | ------------------------------------- |
| -eq        | 两数值相等(equal)                     |
| -ne        | 两数值不相等(not equal)               |
| -gt        | n1 大于 n2 (greater than)             |
| -lt        | n1 小于 n2 (less than)                |
| -ge        | n1 大于等于 n2(greater than or equal) |
| -le        | n1 小于等于 n2(less than or equal)    |

#### 1.5 判定字符串的数据

| 测试的参数        | 代表的意义                                         |
| ----------------- | -------------------------------------------------- |
| test -z string    | 判定字符串是否为$? 若 string 为空字符串，则为 true |
| test -n string    | 判定字符串是否为 0?  若 string 为空, 则为false     |
| test str1 == str2 | 判定 str1 是否等于 str2, 若相等，则返回true        |
| test str1 != str2 | 判定 str1 是否不等于 str2, 若相等，则返回false     |

#### 1.6 多重条件判断

| 测试的参数 | 代表的意义                                                   |
| ---------- | ------------------------------------------------------------ |
| -a         | (and) 两条件同时成立。例如 test -r file -a -x file,  则 file 同时具有r 与 x 权限时，才返回 true |
| -o         | (or) 两条件任何一个成立。                                    |
| ！         | 反相状态。                                                   |



### 2. 利用判断符号

可以使用【[]】(就是中括号) 来进行数据判断

中括号的使用方法与 test 几乎一模一样

```shell
[admin@bogon ~]$ [ -z "${HOME}" ]; echo $?
# 查看${HOME} 这个变量是否为空
```

```shell
[ "${HOME}" == "${MALL}" ]
```

> 注意:   
>
> 在中括号 [] 内的每个组件都需要有空格来分隔；
>
> 在中括号 [] 内的变量，最好都以双引号括起来；
>
> 在中括号内的常数，最好都以单或双引号括起来。

案例: 

```shell
[admin@bogon ~]$ name="VBird Tsai"
[admin@bogon ~]$ [ ${name} == "VBird" ]
-bash: [: too many arguments
```

出现这个错误是由于 \${name} 没有被双引号括起来，那上面的判定试就会变成:

```shell
[ VBird Tsai == "VBird" ]
```

这肯定不对，因为一个判定式仅能有两个数据的对比，上面 VBird 和 Tsai 还有 "VBird" 就有三个数据，这不是我们想要的，我们要的应该是下面这个样子:

```shell
[ "VBird Tsai" == "VBird" ]
```



### 3. shell 脚本的默认变量

脚本对参数已经设置好了一些变量名称，对应如下:

```shell
/path/to/scriptname    opt1    opt2    opt3    opt4
      $0                 $1      $2      $3      $4
```

执行脚本名为 `$0`  这个变量  第一个参数就是  `$1` 

除了这些数字的变量之外，还有一些较为特殊的变量可以在脚本内使用来调用这些参数。

* `$#` : 代表后接的参数【个数】, 以上表为例这里显示为【4】
* `$@` : 代表【"\$1" "\$2" "\$3" "\$4"】之意，每个变量是独立的（用双引号括起来）；
* `$*` : 代表【"\$1c\$2c\$3c\$4c"】，其中 c 为分隔字符，默认为空格，所以本例中代表【"\$1 \$2 \$3 \$4"】之意

> 那个 `$@` 与 `$*` 基本上还是有所不同，不过，一般使用情况下可以直接记忆 `$@`。

案例:

* 程序的文件名是什么
* 共有几个参数
* 若参数的个数小于 2 则告知用户参数数量太少
* 全部的参数内容是什么
* 第一个参数是什么
* 第二个参数是什么

```shell
[admin@bogon bin]$ vim how_parss.sh
#!/bin/bash
# Program
#   Program shows the script name, parameters...
# History:
# 2020年7月18日     VBird     First release

export PATH=${PATH}:~/bin
 
echo "The script name is         ==> ${0}" 
echo "Total parameter number is  ==> $#"
[ "$#" -lt 2 ] && echo "The number of parameter is less than 2. Stop here." && exit 0
echo "Your whole parameter is    ==> '$@' "
echo "The lst parameter          ==${1}"
echo "The 2nd parameter          ==${2}"
```

执行结果:

```shell
[admin@bogon bin]$ sh how_parss.sh theone hahah quot
The script name is         ==> how_parss.sh
Total parameter number is  ==> 3
Your whole parameter is    ==> 'theone hahah quot' 
The lst parameter          ==theone
The 2nd parameter          ==hahah
```

#### 1. shift 造成参数变量号码偏移

```shell
#!/bin/bash
# Program
#   Program shows the script name, parameters...
# History:
# 2020年7月18日     VBird     First release
 
export PATH=${PATH}:~/bin
 
echo "Total parameter number is  ==> $#"
echo "Your whole parameter is    ==> '$@'"
shift   # 进行第一次【一个变量的 shift】
 
echo "Total parameter number is  ==> $#"
echo "Your whole parameter is    ==> '$@'"
shift 3  # 进行第二次【三个个变量的 shift】
echo "Total parameter number is  ==> $#"
echo "Your whole parameter is    ==> '$@'"
```

这个脚本的执行结果

```shell
[admin@bogon bin]$ sh how_parss.sh one two three four five six
Total parameter number is  ==> 6   <== 最原始的参数的变量情况
Your whole parameter is    ==> 'one two three four five six'
Total parameter number is  ==> 5   <== 第一偏移，看到发现第一个 one 不见了。
Your whole parameter is    ==> 'two three four five six'
Total parameter number is  ==> 2   <== 第二次偏移掉三个, two three four 不见了。
Your whole parameter is    ==> 'five six'
```

> 由上述案例可知，`shift` 会移动变量，而且 `shift` 后可以接数字，代表拿到最前面的几个参数的意思。



## 三、条件判断式

### 1.    if...then 

* 单层、简单条件判断式

  ```shell
  if [ 条件判断式 ]; then
  	当条件判断成立时，可以进行的命令工作内容;
  fi   <== 将 if 反过来写，就成为 fi, 结束 if 之意。
  ```

* 多重、复杂条件判断式

  ```shell
  # 一个条件判断，分成功执行与失败执行(else)
  if [ 条件判断式 ]; then
  	当条件判断式成立时，可执行的命令
  else
  	当条件判断式不成立时，可执行的命令
  fi
  ```

  如果考虑更复杂的情况，则可以使用这个语法:

  ```shell
  # 多个条件判断(if ... elif .. elif ... else) 分多钟不同情况执行
  if [ 条件判断式一 ]; then
  	当条件判断式一成立时，可执行的命令
  elif [ 条件判断式二 ]; then 
  	当条件判断式二成立时，可执行的命令
  else
  	当条件判断式一与二均不成立时，可执行的命令
  fi
  ```

  > 注意:
  >
  > elif 也是个判断式，因此 elif 后面都要接 then 来处理。

案例:

* 判断 \$1 是否为 hello，如果是的话，就显示 "Hello, how are you ?"
* 如果没有加任何参数，就提示用户必须要使用参数执行法
* 而如果加入的参数不是 hello， 就提醒用户仅能使用 hello 为参数。

```shell
[admin@bogon bin]$ vim hello-2.sh
#!/bin/bash
# Program
#   Check $1 is equal to "hello"
# History     VBird      First release

export PATH=${PATH}:~/bin
 
if [ "${1}" == "hello" ]; then
    echo "Hello, how are you?"
elif [ "${1}" == "" ]; then
    echo "You MUST input parameters, ex> {${0} someword}"
else
    echo "The only parameter is 'hello', ex> {${0} hello}"
fi
```

### 2.  case...esac 判断

`case ... in ... esac` 

```shell
case $变量名称 in  <== 关键字为 case, 还有变量前有美元符号。
	"第一个变量内容")  <== 每个变量内容建议用双引号括起来，关键字则为右圆括号
		程序段
		;;     <== 每个类别结尾使用两个连续的分号来处理
	"第二个变量内容")
		程序段
		;;
	*)    <== 最后一个变量内容都会用 * 来代表所有其他值。
		  不包括第一个变量内容与第二个变量内容的其他程序执行段。
		  exit 1
		  ;;
esac	<== 最终的 case 结尾, 【反过来写】
```

案例:

```shell
[admin@bogon bin]$ vim hello-3.sh 
#!/bin/bash
# Program
#   Check $1 is equal to "hello"
# History     VBird      First release

export PATH=${PATH}:~/bin

case ${1} in
	"hello")
        echo "Hello, how are you?"
        ;;
    "")
        echo "You MUST input parameters, ex> {${0} someword}"
        ;;
    *)    # 其实相当于通配符， 0~无穷多个任意字符之意。
        echo "Usage ${0} {hello}"
        ;;
esac
```

一般来说，使用【 case \$ 变量 in 】这个语法时，当中的那个【$变量】大致有两种获取方式:

* 直接执行方式：利用 【script.sh variable】的方式来直接给予 \$1 这个变量的内容
* 交互式：通过 read 这个命令来让用户输入变量的内容。

```shell
[admin@bogon bin]$ vim show123.sh
#!/bin/bash
# Program
#   This script only accepts the flowing parameter: one, two, three.
# History:
# 2020年7月19日      VBird    First release
export PATH=${PATH}~/bin
 
echo "This program will print your selection!"
# read -p "Input your choice: " choice   # 暂时取消，可以替换
# case ${choice} in        # 暂时取消，可以替换
case ${1} in
    "one")
        echo "your choice is ONE"
        ;;
    "two")
        echo "your choice is TWO"
        ;;
    "three")
        echo "your choice is THREE"
        ;;
    *)
        echo "Usage ${0} {one|two|three}"
        ;;
esac
```

> 此时，使用【sh show123.sh】的方式来执行命令，就可以收到相应的响应了。上面使用的是直接执行的方式，而如果使用的是交互时，那么将上面第 10、11 行的 "#" 拿掉，并将第 12 行加上注释(#)，就可以让用户输入参数。

### 3. function 功能

语法:

```shell
function fname() {
	程序段
}
```

> 注意:
>
> 因为 shell 脚本的执行方式是由上而下、由左而右，因此在 shell 脚本当中的 function 的设置一定要在程序的最前面。

案例:

```shell
[admin@bogon bin]$ vim show123-2.sh 
#!/bin/bash
# Program
#   This script only accepts the flowing parameter: one, two, three.
# History:
# 2020年7月19日      VBird    First release
export PATH=${PATH}~/bin

function printit(){
    echo -n "Your choice is "  # 加上 -n 可以不换行继续在同一行显示
}

echo "This program will print your selection!"
case ${1} in
    "one")
        printit; echo "${1}" | tr 'a-z' 'A-Z'  # 将参数做大小写转化
        ;;
    "two")
        printit; echo "${1}" | tr 'a-z' 'A-Z'  
        ;;
    "three")
        printit; echo "${1}" | tr 'a-z' 'A-Z'  
        ;;
    *)  
        echo "Usage ${0} {one|two|three}"
        ;;
esac
```

> function 也拥有内置变量，它的变量与 shell 脚本很类似，函数名称代表是 \$0, 而后续的变量也是以 \$1、\$2 ... 来替换的。

### 4. 循环 (loop)

#### 4.1 while do done、until do done (不定循环)

* while do done

  ```shell
  while [ condition ]   <==中括号内的状态就是判断式
  do			<== do是循环的开始。
  	程序段落
  done		<== done是循环结束
  ```

  当 condition 条件成立时，就进行循环，知道 condition 的条件不成立才停止

* until do done

  ```shell
  until [ condition ]
  do 
  	程序段落
  done
  ```

  当 condition 条件成立时，就终止循环，否则就持续进行循环的程序段。

#### 4.2 for ... do ... done (固定循环)

```shell
for var in con1 con2 con3 ...
do 
	程序段
done
```

案例:

```shell
[admin@bogon bin]$ vim show_animal.sh
#!/bin/bash
# Program
#   This script only accepts the flowing parameter: one, two, three.
# History:
# 2020年7月19日      VBird    First release
export PATH=${PATH}~/bin
 
for animal in dog cat elephant
do
    echo "There are ${animal}s ..."
done
```

#### 4.3 for ... do ... done 的数值处理

```shell
for (( 初始值; 限制值; 赋值运算 ))
do 
	程序段
done
```

* 初始值:   某个变量在循环当中的起始值，直接以类似 i=1 设置好
* 限制值 :   当变量的值在这个限制值的范围内，就继续进行循环，例如 i <= 100
* 赋值运算:  每做一次循环时，变量也变换，例如 i=i+1

```shell
[admin@bogon bin]$ vim cal_1_100-2.sh
#!/bin/bash
# Program
#   Try do calculate 1+2+...+${your_input}
# History:
# 2020年7月19日      VBird    First release
export PATH=${PATH}~/bin

read -p "Please input a number, I will count for 1+2+..your_input: " nu
s = 0
for (( i=1; i<=${nu}; i=i+1))
do
	s=$((${s} + ${i}))
done
echo "The result of '1+2+3+...+${nu}' is ==> ${s}"
```



## 四、shell 脚本的跟踪与调试

```shell
[admin@bogon ~]$ sh [-nvx] script.sh

选项与参数：
-n : 不要执行脚本，仅查询语法的问题
-v : 再执行脚本前，先将脚本文件的内容输出到屏幕上
-x : 将使用到的脚本内容显示到屏幕上，这是很有用的参数
```



