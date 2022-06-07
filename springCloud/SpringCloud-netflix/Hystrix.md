# 熔断

## 一、概念

### 1. 概述

在分布式系统下，微服务之间不可避免地会发生相互调用，但每个系统都无法百分之百保证自身运行不出问题。在服务调用中，很可能面临依赖服务失效的问题（网络延时，服务异常，负载过大无法及时响应）。因此需要一个组件，能提供强大的容错能力，为服务间调用提供保护和控制。



目的：***当我自身 依赖的服务不可用时，服务自身不会被拖垮。防止微服务级联异常***。

>  本质：就是隔离坏的服务，不让坏服务拖垮其他服务（调用坏服务的服务）。



### 2.  舱壁模式

舱壁模式（Bulkhead）隔离了每个工作负载或服务的关键资源，如连接池、内存和CPU，硬盘。每个工作单元都有独立的 连接池，内存，CPU。

使用舱壁避免了单个服务消耗掉所有资源，从而导致其他服务出现故障的场景。
这种模式主要是通过防止由一个服务引起的级联故障来增加系统的弹性。



据说泰坦尼克原因：泰坦尼克号上有16个防水舱，设计可以保障如果只有4个舱进水，密闭和隔离可以阻止水继续进入下一个防水舱，从而保证船的基本浮力。

但是当时冰山从侧面划破了船体，从而导致有5个防水舱同时进水，而为了建造豪华的头等舱大厅，也就是电影里杰克和罗斯约会的地方，5号舱的顶部并未达到密闭所需要的高度，水就一层层进入了船体，隔离的失败导致了泰坦尼克的沉没。

> 舱壁模式



给我们的思路：可以对每个请求设置，单独的连接池，配置连接数，不要影响 别的请求。就像一个一个的防水舱。



对在公司中的管理也一样：给每个独立的 小组，分配独立的资源，比如产品，开发，测试。在小公司，大多数情况 这些资源都是共享的，有一个好处是充分利用资源，坏处是，如果一个项目延期，会影响别的项目推进。自己权衡利弊。

最近比较火的一句话： 真正的知识，是 产品提高一个等级和成本提高0.2元的 痛苦抉择。



### 3. 雪崩效应

​		每个服务 发出一个HTTP请求都会 在 服务中 开启一个新线程。而下游服务挂了或者网络不可达，通常线程会阻塞住，直到Timeout。如果并发量多一点，这些阻塞的线程就会占用大量的资源，很有可能把自己本身这个微服务所在的机器资源耗尽，导致自己也挂掉。

​		如果服务提供者响应非常缓慢，那么服务消费者调用此提供者就会一直等待，直到提供者响应或超时。在高并发场景下，此种情况，如果不做任何处理，就会导致服务消费者的资源耗竭甚至整个系统的崩溃。一层一层的崩溃，导致所有的系统崩溃。

> 《雪崩示意图》

​		雪崩：由基础服务故障导致级联故障的现象。描述的是：提供者不可用 导致消费者不可用，并将不可用逐渐放大的过程。像滚雪球一样，不可用的服务越来越多。影响越来越恶劣。



雪崩三个流程：

服务提供者不可用

重试会导致网络流量加大，更影响服务提供者。

导致服务调用者不可用，由于服务调用者 一直等待返回，一直占用系统资源。

（不可用的范围 被逐步放大）



服务不可用原因：

服务器宕机

网络故障

宕机

程序异常

负载过大，导致服务提供者响应慢

缓存击穿导致服务超负荷运行



总之 ： 基础服务故障  导致 级联故障   就是  雪崩。



### 4. 容错机制

1. 为网络请求设置超时。

   必须为网络请求设置超时。一般的调用一般在几十毫秒内响应。如果服务不可用，或者网络有问题，那么响应时间会变很长。长到几十秒。

   每一次调用，对应一个线程或进程，如果响应时间长，那么线程就长时间得不到释放，而线程对应着系统资源，包括CPU,内存，得不到释放的线程越多，资源被消耗的越多，最终导致系统崩溃。

   因此必须设置超时时间，让资源尽快释放。

2. 使用断路器模式。

   想一下家里的保险丝，跳闸。如果家里有短路或者大功率电器使用，超过电路负载时，就会跳闸，如果不跳闸，电路烧毁，波及到其他家庭，导致其他家庭也不可用。通过跳闸保护电路安全，当短路问题，或者大功率问题被解决，在合闸。

   自己家里电路，不影响整个小区每家每户的电路。



### 5. 断路器

 		如果对某个微服务请求有大量超时（说明该服务不可用），再让新的请求访问该服务就没有意义，只会无谓的消耗资源。例如设置了超时时间1s，如果短时间内有大量的请求无法在1s内响应，就没有必要去请求依赖的服务了。

1. 断路器是对容易导致错误的操作的代理。这种代理能统计一段时间内的失败次数，并依据次数决定是正常请求依赖的服务还是直接返回。

2. 断路器可以实现快速失败，如果它在一段时间内检测到许多类似的错误（超时），就会在之后的一段时间，强迫对该服务的调用快速失败，即不再请求所调用的服务。这样对于消费者就无须再浪费CPU去等待长时间的超时。

3. 断路器也可自动诊断依赖的服务是否恢复正常。如果发现依赖的服务已经恢复正常，那么就会恢复请求该服务。通过重置时间来决定断路器的重新闭合。

   这样就实现了微服务的“自我修复”：当依赖的服务不可用时，打开断路器，让服务快速失败，从而防止雪崩。当依赖的服务恢复正常时，又恢复请求。

> 断路器开关时序图



```sh
第一次正常

第二次提供者异常

提供者多次异常后，断路器打开

后续请求，则直接降级，走备用逻辑。
```



​	断路器状态转换的逻辑：

```
关闭状态：正常情况下，断路器关闭，可以正常请求依赖的服务。

打开状态：当一段时间内，请求失败率达到一定阈值，断路器就会打开。服务请求不会去请求依赖的服务。调用方直接返回。不发生真正的调用。重置时间过后，进入半开模式。

半开状态：断路器打开一段时间后，会自动进入“半开模式”，此时，断路器允许一个服务请求访问依赖的服务。如果此请求成功(或者成功达到一定比例)，则关闭断路器，恢复正常访问。否则，则继续保持打开状态。

断路器的打开，能保证服务调用者在调用异常服务时，快速返回结果，避免大量的同步等待，减少服务调用者的资源消耗。并且断路器能在打开一段时间后继续侦测请求执行结果，判断断路器是否能关闭，恢复服务的正常调用。
```

> 《熔断.doc》《断路器开关时序图》《状态转换》



### 6. 降级

为了在整体资源不够的时候，适当放弃部分服务，将主要的资源投放到核心服务中，待渡过难关之后，再重启已关闭的服务，保证了系统核心服务的稳定。当服务停掉后，自动进入fallback替换主方法。

用fallback方法代替主方法执行并返回结果，对失败的服务进行降级。当调用服务失败次数在一段时间内超过了断路器的阈值时，断路器将打开，不再进行真正的调用，而是快速失败，直接执行fallback逻辑。服务降级保护了服务调用者的逻辑。

```sh
熔断和降级：
共同点：
	1、为了防止系统崩溃，保证主要功能的可用性和可靠性。
	2、用户体验到某些功能不能用。
不同点：
	1、熔断由下级故障触发，主动惹祸。
	2、降级由调用方从负荷角度触发，无辜被抛弃。

```



19年春晚 百度 红包，凤巢的5万台机器熄火4小时，让给了红包。





## 二、Hystrix

spring cloud 用的是 hystrix，是一个容错组件。

Hystrix实现了 超时机制和断路器模式。

Hystrix是Netflix开源的一个类库，用于隔离远程系统、服务或者第三方库，防止级联失败，从而提升系统的可用性与容错性。主要有以下几点功能：

1. 为系统提供保护机制。在依赖的服务出现高延迟或失败时，为系统提供保护和控制。
2. 防止雪崩。
3. 包裹请求：使用HystrixCommand（或HystrixObservableCommand）包裹对依赖的调用逻辑，每个命令在独立线程中运行。
4. 跳闸机制：当某服务失败率达到一定的阈值时，Hystrix可以自动跳闸，停止请求该服务一段时间。
5. 资源隔离：Hystrix为每个请求都的依赖都维护了一个小型线程池，如果该线程池已满，发往该依赖的请求就被立即拒绝，而不是排队等候，从而加速失败判定。防止级联失败。
6. 快速失败：Fail Fast。同时能快速恢复。侧重点是：（不去真正的请求服务，发生异常再返回），而是直接失败。
7. 监控：Hystrix可以实时监控运行指标和配置的变化，提供近实时的监控、报警、运维控制。
8. 回退机制：fallback，当请求失败、超时、被拒绝，或当断路器被打开时，执行回退逻辑。回退逻辑我们自定义，提供优雅的服务降级。
9. 自我修复：断路器打开一段时间后，会自动进入“半开”状态，可以进行打开，关闭，半开状态的转换。前面有介绍。

### 1.  hystrix独立使用脱离spring cloud

```java
package com.example;

import com.netflix.hystrix.HystrixCommand;
import com.netflix.hystrix.HystrixCommandGroupKey;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class HystrixTest extends HystrixCommand {
    protected HystrixTest(HystrixCommandGroupKey group) {
        super(group);
    }

    public static void main(String[] args) {
        HystrixTest hystrixTest = new HystrixTest(HystrixCommandGroupKey.Factory.asKey("ext"));
        /**
         * execute() : 以同步阻塞方式执行run()。以demo为例，调用execute()后，
         * hystrix先创建一个新线程运行run(),
         * 接着调用程序要在execute()调用处一直阻塞着，直到run()运行完成
         */

        System.out.println("result: " + hystrixTest.execute());

        /**
         * queue()： 以异步非阻塞方式执行run()。以demo为例，
         * 一调用queue()就直接返回一个Future对象，
         * 同时hystrix创建一个新线程运行run(),
         * 调用程序通过Future.get()拿到run()的返回结果，
         * 而Future.get()是阻塞执行的
         *
         */
        Future<String> futureResult = new HystrixTest(HystrixCommandGroupKey.Factory.asKey("ext")).queue();

        String result = "";
        try {
            result = futureResult.get();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        System.out.println("程序结果："+result);

    }

    @Override
    protected Object run() throws Exception {

        System.out.println("执行逻辑");
        int i = 1 / 0;
        return "ok";
    }

    @Override
    protected Object getFallback() {


        return "getFallbackGetFallback";
    }
}
```



### 2. 整合RestTemplate

在User-Consumer(服务消费端) 中: 

pom.xml

```xml
<!-- 引入hystrix依赖 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
```

启动类

```java
@EnableCircuitBreaker
```

Service

```java
package com.example.service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ConsumerService {

    @Autowired
    private RestTemplate restTemplate;

    @HystrixCommand(fallbackMethod = "back")
    public String alive() {
        // 自动处理URL
        String url = "http://user-provider/isAlive";

        String forObject = restTemplate.getForObject(url, String.class);

        return forObject;
    }

    public String back() {
        return "请求失败.....";
    }

}
```

Controller

```java
package com.example.controller;

import com.example.service.ConsumerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ConsumerController {

    @Autowired
    private ConsumerService rest;

    @GetMapping("alive")
    public String alive() {

        return rest.alive();
    }
}
```



### 3. 整合Feign

**配置** 

```properties
feign.hystrix.enabled=true
```

**接口** 

```java
@FeignClient(name = "user-provider",fallback = AliveBack.class)
public interface ConsumerApi {

	@RequestMapping(value = "/User/alive",method = RequestMethod.GET)
	public String alive();
	
	@RequestMapping(value = "/User/getById",method = RequestMethod.GET)
	public String getById(Integer id);
}
```

**实现** 

```java
package com.mashibing.UserConsumer;

import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
@Component
public class AliveBack implements ConsumerApi{

	@Override
	public String alive() {
		// TODO Auto-generated method stub
		return "降级了";
	}

	@Override
	public String getById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}
}
```



### 4.  使用fallbackFactory检查具体错误

**接口** 

```java
@FeignClient(name = "user-provider", fallbackFactory = AliveBack.class)
public interface ConsumerApi {

	@RequestMapping(value = "/User/alive",method = RequestMethod.GET)
	public String alive();
	
	@RequestMapping(value = "/User/getById",method = RequestMethod.GET)
	public String getById(Integer id);
}
```

**实现类** 

```java
package com.mashibing.UserConsumer;

import java.util.Map;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.springframework.stereotype.Component;

import com.mashibing.UserAPI.Person;

import feign.hystrix.FallbackFactory;

@Component
public class WebError implements FallbackFactory<ConsumerApi> {

	@Override
	public ConsumerApi create(Throwable cause) {
		// TODO Auto-generated method stub
		return new ConsumerApi() {
			
			@Override
			public Person postPserson(Person person) {
				// TODO Auto-generated method stub
				return null;
			}
			
			@Override
			public String getById(Integer id) {
				// TODO Auto-generated method stub
				return null;
			}
			
			@Override
			public String alive() {
				// TODO Auto-generated method stub
				System.out.println(cause.getLocalizedMessage());
				cause.printStackTrace();
				return ToStringBuilder.reflectionToString(cause);
			}
			
			@Override
			public Map<Integer, String> postMap(Map<String, Object> map) {
				// TODO Auto-generated method stub
				return null;
			}
			
			@Override
			public Map<Integer, String> getMap3(Map<String, Object> map) {
				// TODO Auto-generated method stub
				return null;
			}
			
			@Override
			public Map<Integer, String> getMap2(Integer id, String name) {
				// TODO Auto-generated method stub
				return null;
			}
			
			@Override
			public Map<Integer, String> getMap(Integer id) {
				// TODO Auto-generated method stub
				return null;
			}
		};
	}
}
```

**针对不同异常返回响应** 

```java
@Override
public String alive() {
    // TODO Auto-generated method stub
    System.out.println(cause);
    if(cause instanceof InternalServerError) {
        System.out.println("InternalServerError");
        return "远程服务报错";
    }else if(cause instanceof RuntimeException) {

        return "请求时异常：" + cause;
    }else {
        return "都算不上";
    }
}
```



### 5.  信号量隔离与线程隔离

默认情况下hystrix使用线程池控制请求隔离

线程池隔离技术，是用 Hystrix 自己的线程去执行调用；而信号量隔离技术，是直接让 tomcat 线程去调用依赖服务。信号量隔离，只是一道关卡，信号量有多少，就允许多少个 tomcat 线程通过它，然后去执行。



信号量隔离主要维护的是Tomcat的线程，不需要内部线程池，更加轻量级。

**配置** 

```
hystrix.command.default.execution.isolation.strategy 隔离策略，默认是Thread, 可选Thread｜Semaphore
thread 通过线程数量来限制并发请求数，可以提供额外的保护，但有一定的延迟。一般用于网络调用
semaphore 通过semaphore count来限制并发请求数，适用于无网络的高并发请求
hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds 命令执行超时时间，默认1000ms
hystrix.command.default.execution.timeout.enabled 执行是否启用超时，默认启用true
hystrix.command.default.execution.isolation.thread.interruptOnTimeout 发生超时是是否中断，默认true
hystrix.command.default.execution.isolation.semaphore.maxConcurrentRequests 最大并发请求数，默认10，该参数当使用ExecutionIsolationStrategy.SEMAPHORE策略时才有效。如果达到最大并发请求数，请求会被拒绝。理论上选择semaphore size的原则和选择thread size一致，但选用semaphore时每次执行的单元要比较小且执行速度快（ms级别），否则的话应该用thread。
semaphore应该占整个容器（tomcat）的线程池的一小部分。
```

**Feign下配置** 

```properties
# 配置信号量隔离
hystrix.command.default.execution.isolation.strategy=SEMAPHOR   
```

### 6. 开启dashboard

**启动类** 

```java
@EnableHystrixDashboard
```

**引入依赖** 

```xml
<dependency>
<groupId>org.springframework.cloud</groupId>
<artifactId>
spring-cloud-starter-netflix-hystrix-dashboard
</artifactId>
</dependency>
		
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

**健康上报** 

http://localhost:90/actuator/hystrix.stream

**图形化** 

http://localhost:90/hystrix





