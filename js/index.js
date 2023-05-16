// 等待页面结构加载完毕之后，再去执行相应的方法
document.addEventListener('DOMContentLoaded', function () {
  initCrumbData()
  leftTabClick()
  bottomTabClick()
  rightPanelClick()
  rightMenu()
  renderSmallAndThumb()
  thumbClick()
  arrowThumbClick()
  zoomGlass()
  renderGoodsBaseInfo()
  renderGoodsParamInfo()
  goodsParamClick()
  choosedClick()
  footerInputClick()
})

// 1.实现面包屑导航
function initCrumbData() {
  // 获取节点
  let container = document.querySelector('.wrap .con .conPoin')
  //   1. 获取数据源
  let pathData = goodData.path
  // 2. 根据数据源创建相应的节点
  pathData.forEach(function (item, index) {
    // 创建a节点,设置内容和href属性
    let aNode = document.createElement('a')
    aNode.innerText = item.title
    // 方式1：不是最后一项则添加href属性
    // if (index !== pathData.length - 1) {
    //   aNode.href = item.url
    // }
    // 方式2：
    if (item.url) {
      aNode.href = item.url
    }
    // 3. 将节点追加到指定的容器中（上树）
    container.appendChild(aNode)
  })
}

// 2.实现左侧选项卡单击的切换效果
function leftTabClick() {
  // 1. 找到对应的节点h4
  let h4Eles = document.querySelectorAll(
    '.wrap .productDetail .aside .tabWrap h4'
  )
  let tabsContent = document.querySelectorAll(
    '.wrap .productDetail .aside .tabContent > div'
  )
  // 2. 循环绑定单击事件
  h4Eles.forEach(function (h4Node, index) {
    h4Node.onclick = function () {
      // 2-1： 通过排他思想给当前元素添加类名
      h4Eles.forEach(function (item) {
        item.classList.remove('active')
      })
      this.classList.add('active')
      // 2-2： 通过相应的下标，找到对应div节点，通过排他思想添加类名
      tabsContent.forEach(function (item) {
        item.classList.remove('active')
      })
      tabsContent[index].classList.add('active')
    }
  })
}

// 3.实现底部选项卡单击的切换效果
function bottomTabClick() {
  // 1. 获取相应的li节点集合
  let lis = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabWrap li'
  )
  let tabsContent = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabContent > div'
  )
  // 2. 循环集合绑定单击事件
  lis.forEach(function (liNode, index) {
    liNode.onclick = function () {
      //  2-1：通过排他思想，给当前单击的li添加类名active
      lis.forEach(function (item) {
        item.classList.remove('active')
      })
      this.classList.add('active')
      //  2-2: 通过排他思想，通过指定下标找到对应tab的div节点添加类名active
      tabsContent.forEach(function (item) {
        item.classList.remove('active')
      })
      tabsContent[index].classList.add('active')
    }
  })
}

// 4.实现右侧面板单击折叠展开效果
function rightPanelClick() {
  // 1. 找到类名为but的元素
  let but = document.querySelector('.wrap .toolBar .but')
  let toolBar = document.querySelector('.wrap .toolBar')
  // 2. 给其绑定单击事件
  let isClose = true // 定义一个开关变量,默认是折叠状态
  but.addEventListener('click', function () {
    // 然后不同的变量设置不同类名，最后开关进行取反
    if (isClose) {
      // 改成展开状态
      but.classList.replace('list', 'cross')
      toolBar.classList.replace('toolWrap', 'toolOut')
      // isClose = false
    } else {
      // 改成折叠状态
      but.classList.replace('cross', 'list')
      toolBar.classList.replace('toolOut', 'toolWrap')
      // isClose = true
    }
    // 取反状态
    isClose = !isClose
  })
}

// 5.实现右侧悬浮菜单功能
function rightMenu() {
  // 1. 找到对应的li集合
  let lis = document.querySelectorAll('.wrap .toolBar .toolList li')
  // 2. 循环li集合，给他们依次绑定鼠标悬浮和离开事件
  lis.forEach(function (li) {
    let em = li.querySelector('em')
    let i = li.querySelector('i')
    // 2-1：悬浮：找到当前li下面的i和em标签，
    li.onmouseenter = function () {
      // 找到当前li下面的em和i标签
      // let em = this.querySelector('em')
      // let i = this.querySelector('i')
      // i变背景色，em变left
      i.style.backgroundColor = 'rgb(200,17,34)'
      em.style.left = '-62px'
    }
    // 2-2：离开：找到当前li下面的i和em标签，
    li.onmouseleave = function () {
      // 找到当前li下面的em和i标签
      // let em = this.querySelector('em')
      // let i = this.querySelector('i')
      // i变背景色，em变left
      i.style.backgroundColor = 'rgb(122,110,110)'
      em.style.left = '35px'
    }
  })
}

// 6.实现渲染小图和缩略图
function renderSmallAndThumb() {
  // 渲染小图思路：
  // 1. 默认取出第一张小图，
  let smallImgSrc = goodData.imgsrc[0].s
  // 2. 创建图片节点,上树到指定容器
  let imgNode = new Image()
  imgNode.src = smallImgSrc
  // 小图容器
  let zoom = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  )
  // 缩略图容器
  let list = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  )
  zoom.appendChild(imgNode)
  // 渲染缩略图思路：
  // 1. 循环所有的小图数组
  let smallData = goodData.imgsrc
  smallData.forEach(function (item) {
    // 2. 创建li节点和img节点，把img作为li的子节点
    let li = document.createElement('li')
    let img = new Image()
    img.src = item.s
    li.appendChild(img)
    // 3. 将li上树到指定容器
    list.appendChild(li)
  })
}

// 7.单击缩略图呈现相应的小图
let index = 0 // 记录单击下标，默认为0
function thumbClick() {
  // 1. 找到对应li节点集合
  let lis = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  )
  let smallImg = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom img'
  )
  // 2. 循环li集合，绑定单击事件
  lis.forEach(function (li, i) {
    li.onclick = function () {
      //  2-1： 找到当前节点下面的img节点
      let thumbImg = this.firstElementChild
      //  2-2： 取出img节点src属性值,将src的值赋值给小图片src即可
      smallImg.src = thumbImg.src
      // 将下标存储起来，后面大图要用到
      index = i
    }
  })
}

// 8.缩略图左右箭头单击事件
function arrowThumbClick() {
  // 1. 获取右箭头元素
  let rightArrow = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .next'
  )
  let leftArrow = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .prev'
  )
  let ul = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  )
  // 获取所有li的子元素
  let lis = ul.children

  // 2. 右箭头绑定单击事件
  let ulMoveLeft = 0 // 记录ul走过的距离
  let liWidth = lis[0].offsetWidth // li外宽
  let liMarginRight = parseInt(window.getComputedStyle(lis[0]).marginRight) // li右外边距
  let moveStep = liWidth + liMarginRight // 每次移动的步长（li外宽 + li右外边距）

  // 计算ul能移动的最大left偏移量 = (lis长度 - 默认展示的5张) * 移动步长
  let ulMaxMoveLeft = (lis.length - 5) * moveStep
  rightArrow.onclick = function () {
    // 如果超过了ul的最大偏移量，则将最大偏移量赋值给它
    if (ulMoveLeft >= ulMaxMoveLeft) {
      return // 退出函数，不走了
    }
    //  让ul进行偏移（left）,每次移动步长75px
    ulMoveLeft += moveStep
    ul.style.left = -ulMoveLeft + 'px'
  }

  // 3. 左箭头单击事件
  leftArrow.onclick = function () {
    if (ulMoveLeft === 0) {
      return // 停在第一张，不走了
    }
    ulMoveLeft -= moveStep
    ul.style.left = -ulMoveLeft + 'px'
  }
}

// 9.放大镜
function zoomGlass() {
  // 给小图容器绑定鼠标悬浮和离开
  let smallBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  )
  let preview = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview'
  )
  let mask = null // 对象占位符
  let bigBox = null
  let bigImg = null
  // 悬浮：创建遮盖、大图容器和大图片
  smallBox.onmouseenter = function () {
    // 创建遮盖
    mask = document.createElement('div')
    mask.className = 'mask'
    smallBox.appendChild(mask)
    // 创建大图片容器和大图片
    bigBox = document.createElement('div')
    bigBox.className = 'bigBox'
    bigImg = new Image()
    bigImg.src = goodData.imgsrc[index].b
    // 将大图片作为大图容器的子节点
    bigBox.appendChild(bigImg)
    preview.appendChild(bigBox)
  }
  // 离开：将上面创建的元素给销毁
  smallBox.onmouseleave = function () {
    // 移除遮盖
    smallBox.removeChild(mask)
    // 移除大盒子
    preview.removeChild(bigBox)
    mask = bigBox = bigImg = null // 消除无效的DOM引用
  }
  // 移动事件
  smallBox.onmousemove = function (event) {
    // 遮盖的移动的left = event.clientX - smallBox.getBoundingClientRect().left - mask.offsetWidth / 2
    let maskMoveLeft =
      event.clientX -
      smallBox.getBoundingClientRect().left -
      mask.offsetWidth / 2
    let maskMoveTop =
      event.clientY -
      smallBox.getBoundingClientRect().top -
      mask.offsetHeight / 2

    // 防止遮盖越过小盒子的上和左边
    if (maskMoveTop < 0) {
      maskMoveTop = 0 // 贴在上边
    }

    if (maskMoveLeft < 0) {
      maskMoveLeft = 0 // 贴在左边
    }

    // 计算出遮盖最大移动距离top = 小图容器的内高 - 遮盖的外高
    let maskMaxMoveTop = smallBox.clientHeight - mask.offsetHeight
    // 计算出遮盖最大移动距离left = 小图容器的内宽 - 遮盖的外宽
    let maskMaxMoveLeft = smallBox.clientWidth - mask.offsetWidth

    if (maskMoveTop > maskMaxMoveTop) {
      maskMoveTop = maskMaxMoveTop // 贴在下边
    }

    if (maskMoveLeft > maskMaxMoveLeft) {
      maskMoveLeft = maskMaxMoveLeft // 贴在右边
    }

    // 赋值给遮盖left和top
    mask.style.left = maskMoveLeft + 'px'
    mask.style.top = maskMoveTop + 'px'

    // 大图也要移动，有比例：遮盖移动距离 / 遮盖最大的移动距离 = 大图片的移动距离 / 大图片最大移动距离
    // 大图片最大移动距离left = 大图片内宽 - 大图片容器的外宽
    let bigImgMaxMoveLeft = bigImg.clientWidth - bigBox.offsetWidth
    let bigImgMaxMoveTop = bigImg.clientHeight - bigBox.offsetHeight

    // 大图片的移动距离 = (遮盖移动距离 * 大图片最大移动距离) /  遮盖最大的移动距离
    let bigImgMoveLeft = (maskMoveLeft * bigImgMaxMoveLeft) / maskMaxMoveLeft
    let bigImgMoveTop = (maskMoveTop * bigImgMaxMoveTop) / maskMaxMoveTop

    bigImg.style.left = -bigImgMoveLeft + 'px'
    bigImg.style.top = -bigImgMoveTop + 'px'
  }
}

let selectedNum = 0 // 记录底部搭配区默认的选中的商品数量
// 10. 渲染商品详情基本信息
function renderGoodsBaseInfo() {
  // 取出商品基本信息
  let goodsInfo = goodData.goodsDetail
  let goodsInfoHtml = `<h3 class="infoName">
      ${goodsInfo.title}
    </h3>
    <p class="news">
      ${goodsInfo.recommend}
    </p>
    <div class="priceArea">
      <div class="priceArea1">
        <div class="title">
          价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
        </div>
        <div class="price">
          <i>￥</i>
          <em>${goodsInfo.price}</em>
          <span>降价通知</span>
        </div>
        <div class="remark">
          <i>累计评价</i>
          <span>${goodsInfo.evaluateNum}</span>
        </div>
      </div>
      <div class="priceArea2">
        <div class="title">
          促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销
        </div>
        <div class="fixWidth">
          <i>${goodsInfo.promoteSales.type}</i>
          <span>
          ${goodsInfo.promoteSales.content}
          </span>
        </div>
      </div>
    </div>
    <div class="support">
      <div>
        <div class="title">
          支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
        </div>
        <div class="fixWidth">
          ${goodsInfo.support}
        </div>
      </div>
      <div>
        <div class="title">配&nbsp;送&nbsp;至</div>
        <div class="fixWidth">${goodsInfo.address}</div>
      </div>
    </div>`

  // 渲染搭配区域的左侧价格
  let leftPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .master p'
  )
  leftPriceEle.innerText = '¥' + goodsInfo.price

  // 上树
  let infoEle = document.querySelector('.wrap .con .mainCon .infoWrap .info1')
  infoEle.innerHTML = goodsInfoHtml

  //  获取底部搭配区已选中的商品的数量：
  // 1. 获取所有的input复选框
  let inputs = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem input'
  )
  selectedNum = 0 // 假设默认勾选的数量为0
  let selectedTotalPrice = 0 // 默认勾选商品的总价
  // 2. 循环input集合，判断checked是否为true, 则数量累加
  inputs.forEach(function (input) {
    if (input.checked) {
      selectedNum += 1
      selectedTotalPrice += parseInt(input.value)
    }
  })
  // 3. 把数量更新到指定的容器中
  let selectedEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .selected'
  )
  selectedEle.innerText = selectedNum

  //   获取底部搭配区右侧套餐价
  // 1. 获取所有已勾选的商品的总价
  // 2. 套餐价 = 商品原价 + 已勾选的商品的总价
  let rightTotalPrice = goodsInfo.price + selectedTotalPrice
  // 3. 将套餐价上树
  let rightPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  )
  rightPriceEle.innerText = '¥' + rightTotalPrice
}

// 11. 渲染商品的参数信息
function renderGoodsParamInfo() {
  // chooseArea节点
  let chooseAreaEle = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea'
  )
  let crumbData = goodData.goodsDetail.crumbData
  // 1. 根据数据crumbData，
  crumbData.forEach(function (param) {
    // 循环创建dl节点
    let dl = document.createElement('dl')
    // 2. 还要根据param.title属性创建dt节点
    let dt = document.createElement('dt')
    dt.innerText = param.title
    // dt上树
    dl.appendChild(dt)
    // 3. 在根据param.data循环创建dd节点
    param.data.forEach(function (obj) {
      let dd = document.createElement('dd')
      dd.innerText = obj.type
      // 给dd创建一个自定义属性price，记录当前条件值得一个价格
      dd.setAttribute('price', obj.changePrice)
      // 4. 将dd作为dl的子节点
      dl.appendChild(dd)
      // 5. 最后将dl上树
      chooseAreaEle.appendChild(dl)
    })
  })
}

// 12. 单击商品参数
let paramsContainer = [0, 0, 0, 0] // 条件容器，值为0，代表没有选中条件
function goodsParamClick() {
  // 功能1：当前节点dd要高亮显示
  // 1. 获取所有的dl
  let dls = document.querySelectorAll(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea dl'
  )
  let choosedEle = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed'
  )
  // 2. 循环dl集合，找到dl下面对应的dd集合
  dls.forEach(function (dl, dlIndex) {
    let dds = dl.querySelectorAll('dd')
    // 3. 循环dd集合，在每个dd节点绑定单击事件
    dds.forEach(function (dd) {
      dd.onclick = function () {
        // 排他思想，当前要变成红色，同辈dd节点要变成灰色
        dds.forEach(function (item) {
          item.style.color = 'rgb(102,102,102)'
        })
        this.style.color = 'red'

        // 功能2：
        // 2 将条件存入对应dl下标的容器中
        paramsContainer[dlIndex] = {
          text: this.innerText,
          price: parseInt(this.getAttribute('price')),
        }

        // console.log('添加条件，汇总价格:', paramsContainer)
        // 汇总价格
        calcTotalPrice()
        // 要清空原来的容器choosedEle，否则会累加
        choosedEle.innerText = ''
        //  3.循环条件容器，动态创建mark节点，将mark节点上树
        paramsContainer.forEach(function (value, dlIndex) {
          if (!value) {
            return // 因为value可能为0，直接退出当前函数
          }
          let markEle = document.createElement('mark')
          let aEle = document.createElement('a')
          markEle.innerText = value.text
          aEle.innerText = 'X'
          aEle.setAttribute('dlIndex', dlIndex) // 存储当前条件所在dl下标,便于后面删除的时候，可以找到相应的dl节点
          markEle.appendChild(aEle)
          // mark上树
          choosedEle.appendChild(markEle)
        })
      }
    })
  })
}

// 13. 功能3：删除已选的条件
function choosedClick() {
  //   因为商品参数是属于后续动态添加的，我们希望其也有单击删除事件，所以我们可以采用事件委托去绑定。
  // 将单击事件委托给其公共祖先.choosed
  // 1. 找到.choosed元素，绑定单击事件
  let choosedEle = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed'
  )
  let dls = document.querySelectorAll(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea dl'
  )
  choosedEle.addEventListener('click', function (event) {
    // 2. 只有单击的目标元素target是a节点，才执行删除当前所在mark节点
    // console.log(event.target.localName) // 获取节点名称
    if (event.target.localName !== 'a') {
      return
    }
    // 走到这里一定是a节点
    let aNode = event.target
    let markNode = aNode.parentNode
    choosedEle.removeChild(markNode)

    // 重置默认的条件
    let dlIndex = aNode.getAttribute('dlIndex')
    // 通过dlIndex找到相应的dl节点
    let dlEle = dls[dlIndex]
    // 在去找dl下面所有的dd
    let dds = dlEle.querySelectorAll('dd')
    // 把所有dd改成灰色，下标为0改成红色
    dds.forEach(function (item) {
      item.style.color = 'rgb(102,102,102)'
    })
    dds[0].style.color = 'red'
    // 将对应的条件容器中的值置为0
    paramsContainer[dlIndex] = 0

    // 汇总价格
    calcTotalPrice()
  })
}

// 添加删除条件要汇总价格（商品原价 和 条件容器中的价格做相加即可）
function calcTotalPrice() {
  // 商品原价
  let originPrice = goodData.goodsDetail.price
  // 记录条件容器中的总价格
  let paramTotalPrice = 0
  paramsContainer.forEach(function (obj) {
    // 排除0
    if (!obj) {
      return
    }
    paramTotalPrice += obj.price
  })

  // 汇总价格（商品原价 和 条件容器中的价格做相加即可）
  let totalPrice = originPrice + paramTotalPrice
  // 价格呈现在页面中
  let totalPriceEle = document.querySelector(
    '.wrap .con .mainCon .infoWrap .info1 .priceArea .priceArea1 .price em'
  )
  totalPriceEle.innerText = totalPrice

  // 底部搭配区价格也要联动
  // 左边价格 = 和上面商品详情价格保持一致
  let leftPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .master p'
  )
  leftPriceEle.innerText = '¥' + totalPrice

  let inputs = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits input'
  )
  let checkedTotalPrice = 0 // 已勾选商品的总价
  inputs.forEach(function (input) {
    if (input.checked) {
      checkedTotalPrice += parseInt(input.value)
    }
  })
  // 右边套餐价 = 左边价格 + 已勾选商品的总价
  let rightPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  )
  rightPriceEle.innerText = '¥' + (totalPrice + checkedTotalPrice)
}

// 14. 单击搭配区input元素事件处理
function footerInputClick() {
  // 1. 获取所有input元素
  let inputs = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits input'
  )
  let selectedEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .selected'
  )
  let rightPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  )
  // 2. 循环input元素，绑定单击事件
  inputs.forEach(function (input) {
    input.onclick = function () {
      // 获取原套餐价(先从下标1开始截取到末尾，在转成number数值型)
      let rightTotalPrice = parseInt(rightPriceEle.innerText.substring(1))
      //    2-1：判断当前元素的选中状态
      if (this.checked) {
        // 选中： 拿着原来已勾选的数量++，拿着原套餐价和当前的选中的input价格相加
        selectedNum++
        rightTotalPrice += parseInt(this.value)
      } else {
        // 未选中： 拿着原来已勾选的数量--，拿着原套餐价减去当前未选中的input元素的价格
        selectedNum--
        rightTotalPrice -= parseInt(this.value)
      }
      // 数量上树
      selectedEle.innerText = selectedNum
      // 套餐价上树
      rightPriceEle.innerText = '¥' + rightTotalPrice
    }
  })
}
