// 生成10个方块，随机生成颜色

// 获取容器
var container = document.getElementById("container");

// 数组， 存储创建的方块对象
 var arr = [];
for (let i = 0; i < 10; i++){
  var r = Tools.getRandom(0, 255);
  var g = Tools.getRandom(0, 255);
  var b = Tools.getRandom(0, 255);

  var box = new Box(container, {
    backgroundColor: 'rgb('+ r + ',' + g + ',' + b + ')'
  })
  //  把创建好的方块对象，添加到数组中
  arr.push(box);
}


// 设置随机位置， 开启定时器

setInterval(randomBox, 500);
// 页面加载完成， 立即生成随机位置
randomBox();
function randomBox() {
  // 随机生成方块的坐标
  for(let i = 0; i < arr.length; i++){
    var box = arr[i];
    box.random();
  }
}

