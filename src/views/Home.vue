<template>
  <!-- //pc端 -->
  <div v-if="client === 'pc'">
    <div class="common-layout">
      <el-container class="pc_container">
        <el-container class="pc_main">
          <el-header>PERESONAL-BLOG</el-header>
          <el-main>
            <ul class="lbImg">
              <div class="container">
                <li class="lbT"></li>
                <li class="lbT"></li>
                <li class="lbT"></li>
                <li class="lbT"></li>
              </div>

            </ul>
            <!-- <component class="cards" :is="HomeConent"></component> -->
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
        <el-aside class="pc_aside" width="33.3rem">
          Aside
          <!-- 账号密码表单 -->
          <el-form label-width="50px" status-icon>
            <el-form-item class="" label="账号">
              <el-input v-model="username" placeholder="请输入账号">
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input @keyup.enter="log" v-model="password" type="password" placeholder="请输入密码" maxlength="10" clearable
                show-password />
            </el-form-item>
          </el-form>
          <!-- 登陆注册按钮 -->
          <div class="action">
            <el-button type="success" @click="reg">注册</el-button>
            <el-button type="primary" @click="log">登陆</el-button>
          </div>

        </el-aside>
      </el-container>
      <!-- <el-button type="danger" plain>Danger</el-button> -->
    </div>
  </div>
  <!-- //手机端 -->
  <div v-else>
    <div class="login_box">
      <div class="content">
        <h2>PERESONAL-BLOG</h2>
        <div class="input_box">
          <span>账号:</span><el-input v-model="username" max="1" placeholder="请输入用户名" />
        </div>
        <div class="input_box">
          <span>账号:</span><el-input v-model="password" type="password" placeholder="请输入密码" maxlength="10" clearable
            show-password />
        </div>
        <div class="actions">
          <button @click="reg" class="reg">注册</button>
          <button @click="log" class="log">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomeConent from '../component/content.vue'
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { login, register } from '../api/home/register_login'
import { setToken } from '../untils/setToken'
import { ElMessage } from 'element-plus'
import router from '../router'
export default {
  setup() {
    const usr = localStorage.getItem('username')
    const user = reactive({
      username: usr,
      password: ''
    })
    const store = useStore()
    const client = store.state.client
    //  computed(() => {
    // console.log(store.state.client)

    // })

    //注册 api
    const reg = () => {
      if (user.username && user.password) {
        register(user).then(res => {
          if (!(res.data.status)) {
            ElMessage({
              message: '注册成功!',
              type: 'success'
            })
          }
          else {
            ElMessage({
              message: `注册失败!${res.data.message}`,
              type: 'error'
            })
          }
        }).catch(error => {
          return error
        })
      } else {
        ElMessage({
          message: '请先输入用户名及密码!',
          type: 'warning'
        })
      }
    }
    //登录 api
    // console.log(1,store.state.islogin)
    const log = () => {
      if (user.username && user.password) {
        login(user).then(res => {
          //登陆成功状态为0，状态码200
          if (!res.data.status) {
            setToken('username', user.username)
            setToken(`PB_token`, res.data.token)
            setToken('startTime', new Date().getTime())
            store.state.islogin = true;
            store.state.username = user.username;
            // console.log(store.state.username)
            ElMessage({
              message: '登录成功!',
              type: 'success'
            })
            //路由跳转
            // $route.params.username
            router.push('/square')
          }
          else {
            ElMessage({
              message: `登录失败!${res.data.message}`,
              type: 'error'
            })
          }
        })
      }
      else {
        ElMessage({
          message: '请先输入用户名及密码!',
          type: 'warning'
        })
      }
    }
    return {
      client,
      HomeConent,
      ...toRefs(user),
      reg,
      log,
      // ElMessage

    }

  }
}

</script>
<style lang="less" scoped>
.transition {
  position: fixed;
  margin-bottom: 0;
}

.pc_container {
  .pc_main {

    height: 100vh;

    // background: rgb(134, 144, 206) linear-gradient(to right, rgba(0, 255, 0, 0), rgba(10, 33, 233, 0.5));
    .el-header {
      text-align: center;
      font-size: 50px;
    }

    .el-main {
      height: 100vh;

      .lbImg {
        background: url(../assets/OIP-C.jpg) no-repeat;
        font-size: 0;
        width: 30rem;
        height: 60vh;
        // overflow: hidden;
        // border: 1px #cc55cc solid;
        cursor: pointer;
        border: 1px #cc55cc solid;


        .container {
          border: 1px #cc55cc solid;
          width: 100vw;

          animation: move 3s infinite;

          li {
            // animation: move;
            float: left;
          }

          :nth-child(1) {

            // background: #425693;
            background-image: url(../assets/lb1.jpg);

          }

          :nth-child(2) {
            // background: #cc55cc;
            background-image: url(../assets/lb2.jpg);
          }

          :nth-child(3) {
            // background: #3d263d;
            background-image: url(../assets/lb3.jpg);
          }

          :nth-child(4) {
            // background: #425693;
            background-image: url(../assets/lb1.jpg);
          }
        }




        /* 定义动画关键帧 */
        @keyframes move {
          0% {
            transform: translateX(0);
          }

          33.3% {
            transform: translateX(-30rem);
          }

          66.6% {
            transform: translateX(-60rem);
          }

          100% {
            transform: translateX(-90rem);
          }

        }

        /* 应用动画效果 */
        // li {
        //   animation: move 1s ;
        //   // animation-duration: 1s;
        //   // animation-fill-mode: infinite;
        // }
      }

      .lbImg:hover {

        transform: rotate(360deg);
        transition: transform 2s infinite;
      }

      .cards {
        margin: 0 auto;
      }
    }

    .el-footer {
      background-color: forestgreen;
    }
  }

  .pc_aside {
    z-index: 1;
    position: absolute;
    right: 0;

    .el-form {

      margin: 0 auto;
      width: 26.6rem;
    }

    .action {
      text-align: center;

      // display: flex;
    }
  }
}

.login_box {
  // background: url('../assets/image/bg-mobile.jpg') no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-color: #00000060;
  text-align: center;
  border-radius: 10px;
  padding: 80px 50px;




  .content {
    span {
      display: inline-block;
      line-height: 50%;
      font-size: 15px;
      color: white;
    }

    h2 {
      color: #ffffff90;
      margin-top: 5%;
      margin-bottom: 10%;
    }

    .input-box {
      text-align: center;
      margin-top: 5%;
    }

    span {
      color: #fff;
    }

    .el-input {
      border: 0;
      width: 60%;
      height: 40px;
      font-size: 15px;
      color: #fff;
      background: transparent;
      // border-bottom: 2px solid #fff;
      padding: 5px 10px;
      outline: none;
      margin-top: 10px;
    }

    .actions {
      padding-left: 10px;

      button {
        display: inline-block;
        margin: 50px 15px;
        width: 25%;
        height: 30px;
        border-radius: 8px;
        border: 0;
        color: #617ae9;
        text-align: center;
        line-height: 30px;
        font-size: 15px;
      }

      .register {
        background-image: linear-gradient(to left, #7898C7, #425693);

      }

      .login {
        background-image: linear-gradient(to right, #7898C7, #425693);

      }

    }
  }


}
</style>

