<template>
  <div id="header">
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>KeyKeyV购物商城欢迎您！</p>
            <p v-if="!$store.state.user.userInfo.loginName">
              <span>请</span>
              <router-link to="/login">登录</router-link>
              <router-link class="register" to="/register">免费注册</router-link>
            </p>
            <p v-else>
              <span>{{ $store.state.user.userInfo.loginName }}</span>
              <a href="javascript:;" @click="logout"> | 退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/home">首页</router-link>

            <router-link to="/center">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" to="/home"
            ><img src="./images/keykeyv.png" alt=""
          /></router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
              placeholder="搜索一下。。。"
            />
            <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: '',
    };
  },
  mounted() {
    this.$bus.$on('clear', (num) => {
      this.keyword = '';
      console.log(num);
    });
  },
  methods: {
    goSearch() {
      // this.$router.push('/search/' + this.keyword + '?keyword=' + this.keyword.toUpperCase());
      if (this.$route.query) {
        let location = {
          name: 'search',
          params: { keyword: this.keyword || undefined },
          query: this.$route.query,
        };
        this.$router.push(location);
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('userLogout');
        this.$router.push('/home');
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
