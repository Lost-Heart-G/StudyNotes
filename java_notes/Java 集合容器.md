# Java 集合容器

## 一、集合容器概述

### 1. 什么是集合

* **集合框架**：用于存储数据的容器。

  集合框架是为表示和操作集合而规定的一种统一的标准的体系结构。
  任何集合框架都包含三大块内容：对外的接口、接口的实现和对集合运算的算法。

* **接口**：表示集合的抽象数据类型。接口允许我们操作集合时不必关注具体实现，从而达到“多态”。在面向对象编程语言中，接口通常用来形成规范。

* **实现**：集合接口的具体实现，是重用性很高的数据结构。

* **算法**：在一个实现了某个集合框架中的接口的对象身上完成某种有用的计算的方法，例如查找、排序等。这些算法通常是多态的，因为相同的方法可以在同一个接口被多个类实现时有不同的表现。事实上，算法是可复用的函数。
  它减少了程序设计的辛劳。

集合框架通过提供有用的数据结构和算法使你能集中注意力于你的程序的重要部分上，而不是为了让程序能正常运转而将注意力于低层设计上。
通过这些在无关API之间的简易的互用性，使你免除了为改编对象或转换代码以便联合这些API而去写大量的代码。 它提高了程序速度和质量。



### 2. 集合的特点

集合的特点主要有如下两点：

- 对象封装数据，对象多了也需要存储。集合用于存储对象。
- 对象的个数确定可以使用数组，对象的个数不确定的可以用集合。因为集合是可变长度的。



### 3. 集合和数组的区别

- 数组是固定长度的；集合可变长度的。
- 数组可以存储基本数据类型，也可以存储引用数据类型；集合只能存储引用数据类型。
- 数组存储的元素必须是同一个数据类型；集合存储的对象可以是不同数据类型。



**数据结构**：就是容器中存储数据的方式。

对于集合容器，有很多种。因为每一个容器的自身特点不同，其实原理在于每个容器的内部数据结构不同。

集合容器在不断向上抽取过程中，出现了集合体系。**在使用一个体系的原则：参阅顶层内容。建立底层对象。** 































