<template>
  <div class="type-nav">
    <div class="container" @mouseleave="currentIndex = -1">
      <h2 class="all" @mouseover="show = true">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" v-show="show" @mouseleave="show = false">
        <div class="all-sort-list2" @click="goSearch">
          <div
            class="item"
            v-for="(item, index) in categoryList"
            :key="item.categoryId"
            :class="{ cur: currentIndex == index }"
          >
            <h3 @mouseover="changeColor(index)">
              <a :data-categoryname="item.categoryName" :data-category1id="item.categoryId">{{
                item.categoryName
              }}</a>
            </h3>
            <div
              class="item-list clearfix"
              :style="{
                display: currentIndex == index ? 'block' : '',
              }"
            >
              <div class="subitem" v-for="item2 in item.categoryChild" :key="item2.categoryId">
                <dl class="fore">
                  <dt>
                    <a
                      :data-categoryname="item2.categoryName"
                      :data-category2id="item2.categoryId"
                      >{{ item2.categoryName }}</a
                    >
                  </dt>
                  <dd>
                    <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                      <a
                        :data-categoryname="item3.categoryName"
                        :data-category3id="item3.categoryId"
                        >{{ item3.categoryName }}</a
                      >
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// 引入Lodash
import _ from 'lodash';
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    // 通知vuex发请求，获取数据，储存于仓库中
    if (this.$route.path == '/home') {
      this.show = true;
    }
    if (this.$route.path == '/search') {
      this.show = false;
    }
    this.$store.dispatch('categoryList');
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // changeColor(index) {
    //   this.currentIndex = index;
    // },
    changeColor: _.throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    goSearch(event) {
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      if (categoryname) {
        let location = { name: 'search' };
        let query = { categoryname: categoryname };
        if (category1id) {
          query.category1id = category1id;
        }
        if (category2id) {
          query.category2id = category2id;
        } else {
          query.category3id = category3id;
        }
        location.query = query;
        this.$router.push(location);
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;
  .cur {
    background-color: #e1251b;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
  }
}
</style>
