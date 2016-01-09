# P2P 借贷系统设计

#角色： 
* 管理员:
* 银行：
* P2P借贷公司
* 个人 或 公司

##管理员的接口

* 1. approveBank(address, name) 认证银行
* 2. approveP2P(address, name)  认证P2P借贷公司

##银行的接口

发行人民币，在我们这个演示系统中，比特人民币预先发行。
sendCNY(address, amount) 给用户发比特人民币

注意因为政策问题：
用户之间不能转移比特人民币，
比特人民币只能用于购买债券，
以及和银行之间进行兑换。

##P2P借贷公司的接口

* 1. 负责审核用户资料
approveAccount(address)  对用户做实名认证

* 2. 负责审核借贷是否合法
approveCoin(id) 对债券做审核

## 借方（有闲钱的人）

* register(name, id, note)  去P2P公司注册资料，实名认证，数据只存hash，用于验证。反正隐私泄漏。
* check(name, id, note)     检查某个用户资料是否正确
* getCNY(amount)  把钱存到银行，获取比特人民币的代币，银行会调用sendCNY 发送给用户币. 
* purchase(bytes32 name, uint value) 认购某个债券

## 贷方（要借钱的人）

* register(name, id, note)  去P2P公司注册资料，实名认证
* newCoin(...) 发行债券, 可能需要抵押。
* sendCNY(bankaddress, amount) 贷方拿着比特人民币去银行换成资金，用于生产活动。
* redeem(name, user) 债券到期，赎回对方的债券。


## 交易 债券之间的转让

* placeOrder(bytes32 _offerCurrency, uint _offerValue, bytes32 _wantCurrency, uint _wantValue) 放入订单
* matchOrder(uint _offerId) 配对
* cancelOrder(uint _offerId) 撤单
* orders() 订单列表


##All  Pages：

####帐户

1. 注册 
2. 检查 
3. 个人帐户中心（人民币的余额）
   个人帐户的信息
   个人发行的债券
   个人购买的债券

####银行

1. 每个人可以申请领取1000元测试比特人民币。
2. 管理后台检查到这个申请，发送1000比特人民币给对方。

####债券

1. 债券列表
2. 认购
3. 添加债券

####交易

1. 卖出债券
2. 可购买列表
3. 买入债券

#背景说明

###P2P 小额贷款 区块链实现：

现在P2P小额贷款公司存在的问题：

1. 经手资金，内部猫腻多。存在圈钱跑路的风险。
2. 数据不公开透明，存在篡改风险。
一旦跑路还可能销毁数据库，使得证据缺失。
3. 流动性差，购买的债券只等等待到期兑现，没有一个市场进行转让

###区块链版本可以很好的解决上面的三个问题：

1. P2P公司不经手用户资金，用户资金完全和银行对接，和P2P公司无关。而且，用户资金冲入银行后，换成的比特人民币可以投资多家P2P公司。
2. 数据完全公开透明，P2P公司主要负责牵线搭桥，审核用户资料，无法凭空产生数据，也无法修改数据。
3. 有一个统一的债券转让市场，急用钱的时候可以在这里抛售转让。

