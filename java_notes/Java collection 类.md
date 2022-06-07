# Java collection 类

## 一、Collection 之继承体系

> `Collection<E>` 接口是所有单列集合的共同父接口，下面列出了常用的Collection子类集合及其继承关系。

**Collection**    

* **List**  有序(存储顺序和取出顺序一致)，可重复 

  * **ArrayList** ，线程不安全，底层使用数组实现，查询快，增删慢。效率高。

    每次容量不足时，自增长度的一半，如下源码可知                  

    `int newCapacity = oldCapacity + (oldCapacity >> 1); `     
    
  * **LinkedList** ， 线程不安全，底层使用链表实现，查询慢，增删快。效率高        

  * **Vector** ， 线程安全，底层使用数组实现，查询快，增删慢。效率低                

    每次容量不足时，默认自增长度的一倍（如果不指定增量的话），如下源码可知 

    `int newCapacity = oldCapacity + ((capacityIncrement > 0) ? capacityIncrement : oldCapacity);`     

* **Set **  元素唯一    

  一个不包含重复元素的 collection。更确切地讲，set 不包含满足 e1.equals(e2) 的元素对 e1 和 e2，并且最多包含一个 null 元素。         

  * **HashSet** 底层是由HashMap实现的，通过对象的hashCode方法与equals方法来保证插入元素的唯一性，无序(存储顺序和取出顺序不一致)。             
  * **LinkedHashSet** 底层数据结构由哈希表和链表组成。哈希表保证元素的唯一性，链表保证元素有序。(存储和取出是一致)         
  * **TreeSet** 基于 TreeMap 的 NavigableSet 实现。使用元素的自然顺序对元素进行排序，或者根据创建 set 时提供的 Comparator 进行排序，具体取决于使用的构造方法。 元素唯一。



##  二、Collection 泛型接口

### 1. 方法摘要

```java
 boolean add(E e) 
              确保此 collection 包含指定的元素（可选操作）。 
     boolean addAll(Collection<? extends E> c) 
              将指定 collection 中的所有元素都添加到此 collection 中（可选操作）。 
     void clear() 
              移除此 collection 中的所有元素（可选操作）。 
     boolean contains(Object o) 
              如果此 collection 包含指定的元素，则返回 true。 
     boolean containsAll(Collection<?> c) 
              如果此 collection 包含指定 collection 中的所有元素，则返回 true。 
     boolean equals(Object o) 
              比较此 collection 与指定对象是否相等。 
     int hashCode() 
              返回此 collection 的哈希码值。 
     boolean isEmpty() 
              如果此 collection 不包含元素，则返回 true。 
     Iterator<E> iterator() 
              返回在此 collection 的元素上进行迭代的迭代器。 
     boolean remove(Object o) 
              从此 collection 中移除指定元素的单个实例，如果存在的话（可选操作）。 
     boolean removeAll(Collection<?> c) 
              移除此 collection 中那些也包含在指定 collection 中的所有元素（可选操作）。 
     boolean retainAll(Collection<?> c) 
              仅保留此 collection 中那些也包含在指定 collection 的元素（可选操作）。 
     int size() 
              返回此 collection 中的元素数。 
     Object[] toArray() 
              返回包含此 collection 中所有元素的数组。 
    <T> T[] 
     toArray(T[] a) 
```



## 三、List 泛型接口

特有方法(相对于 Collection)

```java
void add(int index, E element) 
          在列表的指定位置插入指定元素（可选操作）。 
 boolean addAll(int index, Collection<? extends E> c) 
          将指定 collection 中的所有元素都插入到列表中的指定位置（可选操作）。  
 E get(int index) 
          返回列表中指定位置的元素。  
 int indexOf(Object o) 
          返回此列表中第一次出现的指定元素的索引；如果此列表不包含该元素，则返回 -1。  
 int lastIndexOf(Object o) 
          返回此列表中最后出现的指定元素的索引；如果列表不包含此元素，则返回 -1。 
 ListIterator<E> listIterator() 
          返回此列表元素的列表迭代器（按适当顺序）。 
 ListIterator<E> listIterator(int index) 
          返回列表中元素的列表迭代器（按适当顺序），从列表的指定位置开始。 
 E remove(int index) 
          移除列表中指定位置的元素（可选操作）。 
 E set(int index, E element) 
          用指定元素替换列表中指定位置的元素（可选操作）。 
 List<E> subList(int fromIndex, int toIndex) 
          返回列表中指定的 fromIndex（包括 ）和 toIndex（不包括）之间的部分视图。 
```

### 1. ArrayList 类

> 继承自AbstractList，实现了Iterable, Collection, List，Cloneable, Serializable

#### 1.1 构造方法

```java
    ArrayList() 
          构造一个初始容量为 10 的空列表（每次递增容量的一半）
    ArrayList(Collection<? extends E> c) 
          构造一个包含指定 collection 的元素的列表，这些元素是按照该 collection 的迭代器返回它们的顺序排列的 
    ArrayList(int initialCapacity) 
          构造一个具有指定初始容量的空列表
```

#### 1.2 特有方法(相对于List)

```java
void ensureCapacity(int minCapacity) 
          如有必要，增加此 ArrayList 实例的容量，以确保它至少能够容纳最小容量参数所指定的元素数。 
          返回此列表中最后一次出现的指定元素的索引，或如果此列表不包含索引，则返回 -1。 
 protected  void removeRange(int fromIndex, int toIndex) 
          移除列表中索引在 fromIndex（包括）和 toIndex（不包括）之间的所有元素。 
```





































