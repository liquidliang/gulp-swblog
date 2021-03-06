const m_article = require('model/article');
const m_recommend = require('helper/recommend');
const c_pannel = require('card/blog/pannel');
module.exports = (view) => {
  let viewPannelBook = c_pannel({
    data: {
      title: '书籍',
      list: m_article.getBooks().map(o => {
        return {
          href: o.href,
          title: o.title,
          time: o.time
        }
      })
    }
  });
  let viewPannelCatalog = c_pannel({
    data: {
      title: '分类',
      list: m_article.getCatalogs().filter(o => o.tagList.length === 1).map(o => {
        return {
          title: o.title,
          href: o.href
        }
      })
    }
  });
  let viewPannelTag = c_pannel({
    data: {
      isInline: true,
      title: '标签',
      list: m_article.getTags()
    }
  });

  let viewPannelRecommendPost = c_pannel({
    delay: true
  });
  m_recommend.getRecommend(function(list){
    viewPannelRecommendPost.reset({
      title: '推荐阅读',
      list: list.map(o => {
        return {
          href: o.href,
          title: o.title,
          time: o.time
        }
      })
    });
  });

  return view.setView({
    viewList: [viewPannelBook, viewPannelCatalog, viewPannelTag, viewPannelRecommendPost]
  });
}
