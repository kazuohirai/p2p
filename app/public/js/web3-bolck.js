var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
var accounts = web3.eth.accounts;
var from = web3.eth.accounts[0];
//web3.eth.defaultAccount = from;
web3.eth.defaultAccount = "0xe424a1165f7beb6ccf0942ea2faa1a2bffbfac69";
var coindbContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"name","type":"bytes32"},{"name":"_target","type":"address"},{"name":"_proxy","type":"address"}],"name":"isApprovedFor","outputs":[{"name":"_r","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_offerCurrency","type":"bytes32"},{"name":"_offerValue","type":"uint256"},{"name":"_wantCurrency","type":"bytes32"},{"name":"_wantValue","type":"uint256"}],"name":"placeOrder","outputs":[{"name":"_offerId","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"isInit","outputs":[{"name":"_r","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_offerId","type":"uint256"}],"name":"cancelOrder","outputs":[{"name":"_success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"status","outputs":[{"name":"_r","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"},{"name":"_a","type":"address"}],"name":"coinBalanceOf","outputs":[{"name":"_r","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"getSender","outputs":[{"name":"_r","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"note","type":"string"},{"name":"starttime","type":"uint256"},{"name":"endtime","type":"uint256"},{"name":"value","type":"uint256"},{"name":"ratetpl","type":"uint256"},{"name":"ratevalue","type":"uint256"}],"name":"newCoin","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"coinRateValue","outputs":[{"name":"_r","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_offerId","type":"uint256"}],"name":"matchOrder","outputs":[{"name":"_success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"canTrade","outputs":[{"name":"_r","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"_from","type":"address"},{"name":"_val","type":"uint256"},{"name":"_to","type":"address"}],"name":"sendCoinFrom","outputs":[{"name":"_success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"},{"name":"_proxy","type":"address"}],"name":"isApproved","outputs":[{"name":"_r","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orders","outputs":[{"name":"creator","type":"address"},{"name":"offerCurrency","type":"bytes32"},{"name":"offerValue","type":"uint256"},{"name":"wantCurrency","type":"bytes32"},{"name":"wantValue","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"name":"_r","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"_a","type":"address"}],"name":"approve","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"coinRateTpl","outputs":[{"name":"_r","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"coins","outputs":[{"name":"starttime","type":"uint256"},{"name":"endtime","type":"uint256"},{"name":"name","type":"bytes32"},{"name":"note","type":"string"},{"name":"owner","type":"address"},{"name":"ratetpl","type":"uint256"},{"name":"ratevalue","type":"uint256"},{"name":"status","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"ids","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"coinBalance","outputs":[{"name":"_r","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"value","type":"uint256"}],"name":"purchase","outputs":[{"name":"_success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"_val","type":"uint256"},{"name":"_to","type":"address"}],"name":"sendCoin","outputs":[{"name":"_success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"setCount","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"},{"name":"_a","type":"address"}],"name":"coinValueOf","outputs":[{"name":"_r","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Sent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"id","type":"uint256"}],"name":"Create","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Purchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"currencyPair","type":"bytes32"},{"indexed":true,"name":"seller","type":"address"},{"indexed":false,"name":"offerValue","type":"uint256"},{"indexed":true,"name":"buyer","type":"address"},{"indexed":false,"name":"wantValue","type":"uint256"}],"name":"Traded","type":"event"}]);

var address = "0x3254e06c3307d35cd7718909d134c8f540b7f16a";
var coindb = coindbContract.at(address);

window.onload = function () {
    var filter = coindb.Create();
    filter.watch(function (err, event) {
    	if(err){
    		$("#apply").attr("disabled", false);
    		openMacoinDialog('dialog', {'msg':"对不起,操作失败"});
    	}else{
    		openMacoinDialog('dialog', {'msg':"操作成功"});
    		window.location.href = "/list";
    	}
        console.log(event);
        console.log(err);
    });
};

function getDefaultAccount(){
    var account = -1;
    try{
        account =  web3.db.getString("p2pdb", "defaultAccount");
    }catch(e){
        account = -1;
    }
    return account;
}

function checkDefaultAccount(){
    var flag = 1;
   if(!$.isArray(accounts) || accounts.length<=0){
        flag = -1;//没有可选账户
    }else if(getDefaultAccount() == -1){
        flag = -2;//没有选择可选账户
    }
    return flag;
}

function setDefaultAccount(account){
    var flag = web3.db.putString("p2pdb", "defaultAccount", account);
    return flag;
}

function newCoin() {
    var name = $('#name').val();
    var accounts = $('#accounts').val();
    var create_note = $('#mark').val();
    var end_time = $('#endtime').val();
    var amount = $('#amount').val();
    var ratetpl = $('#jxtypr').val();
    var rate =$('#lx').val();
    amount = parseFloat(amount);
    rate = parseFloat(rate) * 1000;
    var a = /^(\d{4})-(\d{2})-(\d{2})$/
    if(!name || name == ""){
    	alert("名称不能为空");
    }else if(accounts == ""){
    	alert("账号不能为空");
    }else if(isNaN(rate) || rate <=0){
    	alert("利息不正确");
    }else if(isNaN(amount) || amount <=0){
    	alert("金额不正确");
    }else if(!a.test(end_time)){
    	alert("还款日期格式不正确");
    }else{
    	end_time = Date.parse(end_time)/1000;
    	$("#apply").attr("disabled", true);
    	openMacoinDialog('dialog', {'msg':"用时较长,请耐心等待，系统处理中...."});
    	var tx = coindb.newCoin.sendTransaction(name, create_note, 0, end_time, amount, ratetpl, rate, {gas:1000000, from:"0xe424a1165f7beb6ccf0942ea2faa1a2bffbfac69"});
    }
};

function buy(am, name){
	var tid = coindb.purchase(name, am);
	var q = web3.eth.getTransaction(tid);
	console.log(q);
}

/*function onRegisterOwnerKeyUp() {
    var name = document.getElementById('registerOwner').value;
    var id = coindb.ids(name);
    if (id.greaterThan(0)) {
        document.getElementById('nameAvailability').innerText = "This name is already register";
    } else {
        document.getElementById('nameAvailability').innerText = "This name is available. You can register it.";
    }
};*/

function openMacoinDialog(id, params)
{
	var msg = '系统处理中,请稍候....'
	//$("#"+id).dialog('destroy');
	var defaults = {
		'width':550,
		'height':350,
		'modal': true,
		'title':'操作提示',
		'autoOpen': false
	};
	if(typeof(params) != 'undefined' && typeof(params) == 'object'){
		for(key in params){
			if(typeof(defaults[key]) != 'undefined') defaults[key] = params[key];
			if(key == 'msg') msg = params['msg'];
		}
	}
	$("#" + id).dialog(defaults);
	$("#" + id).dialog('open');
 	$("#" + id).html(msg);
}


function getLocalTime(tm){
    var date = new Date(tm*1000); //转换成时间对象，这就简单了
    var year = date.getFullYear();  //获取年
    var month = date.getMonth();  //获取年
    var day = date.getDate(); 
    return year+"-"+month+"-"+day; 
}

function getJxType(t){
	var type = {
		1 : "按天复利",
		2 : "按年复利",
		3 : "固定利率"
	};
	return type[t];
}

