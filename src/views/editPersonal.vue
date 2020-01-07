<template>
  <div class="edit">
    <hmherder tilte="编辑个人信息">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"
        >返回</span
      >
    </hmherder>
    <div class="userimg">
      <img :src="geren.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- ------------------------------------------------------------------------------------------ -->
    <danyuange
      zuo="昵称"
      :you="geren.nickname"
      @click="isshow = true"
    ></danyuange>
    <van-dialog
      v-model="isshow"
      title="修改昵称"
      show-cancel-button
      @confirm="xiugaiName"
    >
      <van-field
        ref="inputname"
        :value="geren.nickname"
        placeholder="请输入昵称"
        required
        label="昵称"
      ></van-field>
    </van-dialog>
    <!-- --------------------------------------------------------------------------------- -->
    <danyuange
      zuo="密码"
      :you="geren.password"
      type="password"
      @click="isshow1 = true"
    ></danyuange>
    <van-dialog
      v-model="isshow1"
      title="修改密码"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field
        ref="oldpass"
        placeholder="请输入旧密码"
        required
        label="旧密码"
      ></van-field>
      <van-field
        ref="newpass"
        placeholder="请输入新密码"
        required
        label="新密码"
      ></van-field>
    </van-dialog>

    <!-- ...................................................................................... -->
    <danyuange
      zuo="性别"
      :you="geren.gender === 0 ? '女' : '男'"
      @click="isshow2 = true"
    >
    </danyuange>
    <van-dialog
      v-model="isshow2"
      title="修改性别"
      show-cancel-button
      @confirm="beforeClose1"
    >
      <van-picker
        :columns="['女', '男']"
        :default-index="geren.gender"
        @change="onChange"
      />
    </van-dialog>
  </div>
</template>

<script>
import hmherder from "../components/hmherder";
import danyuange from "../components/danyuange";
import { getById, updateUserById } from "../apis/user";
import { uploadFile } from "../apis/upload";
export default {
  components: {
    hmherder,
    danyuange
  },
  data() {
    return {
      geren: {},
      isshow: false,
      isshow1: false,
      isshow2: false,
      //用来存性别的
      xinbie: ""
    };
  },
  methods: {
    async afterRead(file) {
      //   console.log(file);
      // // console.log(file.file);field是当前的文件对象
      //还是和以前上传图片的一样  先转流
      let formData = new FormData();
      //这个键（file）是有规定的  后台这样给的 得和他一致
      formData.append("file", file.file);
      let res = await uploadFile(formData);
      //  console.log(res);
      if (res.data.message === "文件上传成功") {
        //如果上传成功  先修改本修改页的图片
        this.geren.head_img = "http://localhost:3000" + res.data.data.url;
        //但是  刷新了还是没有了  因为服务器的图片没修改（head_img看后台）
        let res1 = await updateUserById(this.geren.id, {
          head_img: res.data.data.url
        });
        if (res1.data.message === "修改成功") {
          this.$toast.success("修改成功");
        } else {
          this.$toast.fail("修改失败");
        }
      } else {
        this.$toast.fail("文件上传失败");
      }
    },
    //点击
    dianji() {
      this.isshow = true;
    },
    async xiugaiName() {
      //点击弹框出来的确认  我们就获取框中的input的修改过的值
      //严重注意  ref 以前是用$refs来呼应取值，由于现在在组件中  得使用
      //   this.$refs.inputname(相当于我们平常使用的this$erfs)  再点 input（框架定义的：输入框内容变化时触发）value
      let name = this.$refs.inputname.$refs.input.value;
      console.log(name);

      //取到这个修改的值  发送编辑请求 修改
      let res3 = await updateUserById(this.geren.id, {
        nickname: name
      });
      //如果修改成功 我们只需把页面的刷新下 那么就是改掉geren里面的值就好
      if (res3.data.message === "修改成功") {
        console.log(res3);

        this.geren.nickname = name;
        this.$toast.success("修改成功");
      } else {
        this.$toast.fail("修改失败");
      }
    },

    async beforeClose(action, done) {
      if (action === "confirm") {
        let oldpass = this.$refs.oldpass.$refs.input.value;
        let newpass = this.$refs.newpass.$refs.input.value;
        if (oldpass !== this.geren.password) {
          done(false);
          this.$toast.fail("请输入正确的原格式的密码");
        } else if (!/^\S{3,16}$/.test(newpass)) {
          // this.$refs.oldpass.$refs.input.focus();
          done(false);
          this.$toast.fail("新密码格式不对");
        } else if (
          oldpass === this.geren.password &&
          /^\S{3,16}$/.test(newpass)
        ) {
          let res5 = await updateUserById(this.geren.id, {
            password: newpass
          });
          if (res5.data.message === "修改成功") {
            this.geren.password = newpass;
            done();
          } else {
            done(false);
          }
        }
      } else {
        done();
      }
    },
    onChange(picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`);
      //把当前索引赋给我们定义变量里xinbie
      this.xinbie = index;
    },
    async beforeClose1() {
      // console.log(this.xinbie); 我们选中的性别 0、1
      //拿到索引 也就是当前选中的性别 然后去发送请求 修改
      let res = await updateUserById(this.geren.id, {
        gender: this.xinbie
      });
      if(res.data.message==='修改成功'){
         this.$toast.fail("修改成功");   
      }else{
         this.$toast.fail("修改失败");   

      }
    }
  },
  //使用 钩子函数，页面加载完 就执行下面这个方法  获取数据动态渲染  使用两个关键字
  async mounted() {
    //获取id
    let id = this.$route.params.id;
    let res = await getById(id);
    if (res.data.message === "获取成功") {
      this.geren = res.data.data;
      //判断有没有携带图片地址 如果有 我们要把基地址加上  什么才可以获取存在服务器的完整地址
      if (res.data.data.head_img) {
        this.geren.head_img = "http://localhost:3000" + res.data.data.head_img;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.userimg {
  position: relative;
  width: 100/360 * 100vw;
  height: 100/360 * 100vw;
  left: 50%;
  top: 50px;
  transform: translate(-50%, -50%);
  margin-top: 30px;
  > img {
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
    border-radius: 50px;
    // display: block;
    position: absolute;
    left: 50%;
    top: 50px;
    transform: translate(-50%, -50%);
  }
}
/deep/.van-uploader__upload {
  width: 100/360 * 100vw;
  height: 100/360 * 100vw;
  border-radius: 50px;
  opacity: 0;
}

//修改密码老师的方法
// async xiugaiPass() {
//   //先获取旧密码，然后判断是不是正确的旧密码
//   let oldpass = this.$refs.oldpass.$refs.input.value;
//   //  console.log(oldpass);
//   if (oldpass === this.geren.password) {
//     //旧密码输入正确进来
//     //新密码
//     let newpass = this.$refs.newpass.$refs.input.value;
//     if (/^\S{3,16}$/.test(newpass)) {
//       let res4 = await updateUserById(this.geren.id, {
//         password: newpass
//       });
//       if (res4.data.message === "修改成功") {
//         this.geren.password = newpass;
//         this.$toast.success("修改成功");
//       } else {
//         this.$toast.fail("修改失败");
//       }
//     }
//   }
// },
// beforeClose(action, done) {
//   if (action === "confirm") {
//     //点击确认的时候  判断是不是原密码
//     let oldpass = this.$refs.oldpass.$refs.input.value;
//     if (oldpass !== this.geren.password) {
//       this.$toast.fail("原密码");
//       this.$refs.oldpass.$refs.input.focus();
//       done(false);
//     } else if (!/^\S{3,16}$/.test(this.$refs.newpass.$refs.input.value)) {
//       this.$toast.fail("请输入正确格式的密码");
//       done(false);
//     } else {
//       done();
//     }
//   } else {
//     //如果不是确认键，就不让框停留
//     done();
//   }
// }
</style>
