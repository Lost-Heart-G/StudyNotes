var Tools = {
  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //不含最大值，含最小值
  }
}