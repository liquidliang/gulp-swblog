const m_util = require('common/util')
//data-on="?m=go" data-url="<%=o.href%>"
const go = (ele, option, data)=>{
  ele.on('click', function(e){
    BCD.go(ele.data('url'));
    m_util.stopBubble(e);
  })
};
BCD.addCommand('go', go);
//data-on="?m=back"
const back = (ele, option, data)=>{
  ele.on('click', function(e){
    history.back();
    m_util.stopBubble(e);
  })
};
BCD.addCommand('back', back);

const replaceHash = (ele, option, data)=>{
  ele.on('click', function(e){
    BCD.replaceHash(ele.data('url'));
    m_util.stopBubble(e);
  })
};
BCD.addCommand('replaceHash', replaceHash);
//事件绑定
module.exports = {
  go,
  back,
  replaceHash
};
