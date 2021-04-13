<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
        <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
        <el-button style="margin-left: 10px" icon="el-icon-share" type="warning" plain circle></el-button>
        <el-button type="primary" icon="el-icon-edit" round plain style="float: right;">写博文</el-button>
      </el-card>

      <div v-if="$page.posts.edges&&$page.posts.edges.length>0">
        <el-card shadow="hover" v-for="edge in $page.posts.edges" :key="edge.node.id" style="margin-bottom: 20px" >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                            <span>
                                <g-link  style="text-decoration:none;cursor:pointer" :to="'/' + edge.node.id">
                                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{edge.node.title}}
                                </g-link>
                            </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right;">
                  <el-button  style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                  <el-button @click="editBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token"></el-button>
                  <el-button @click="deleteBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-delete" v-if="token"></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
            最近更新 {{edge.node.updated_at}}
          </div>
          <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
            {{edge.node.desc}}
          </div>
        </el-card>
        <div style="text-align: center">
<!--          <el-pagination @current-change="list" background layout="prev, pager, next" :current-page.sync="query.page" :page-size="query.pageSize"-->
<!--                         :total="query.pageNumber*query.pageSize">-->
<!--          </el-pagination>-->
        </div>

      </div>

      <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!$page.posts.edges||$page.posts.edges.length==0">
        <font style="font-size: 30px;color:#dddddd ">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query{
posts: allStrapiPosts{
    edges{
      node{
        id
        desc
        title
        content
        updated_at
        published_at
      }
    }
  }
}
</page-query>
<script>
export default {
  data() {
    return {
      query: {
        page: 1,
        pageSize: 5,
        pageNumber: 1
      },
      loading: false,
      searchKey: "",
      blogs: [],
      token: ''
    }
  },
  created() {
    console.log(this.$page.posts.edges)
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      this.blogs = []
    },
    search() {
      // for (let i = 0; i < this.blogs.length; i++) {
      //   this.blogs[i].hide = this.blogs[i].title.indexOf(this.searchKey) < 0
      // }
    },
    editBlog(index) {
      if (!this.token) {
        this.$message({
          message: '请绑定有效的Token',
          type: 'warning'
        })
        return
      }
      this.$router.push('/user/blog/edit/' + this.blogs[index].id)
    },
    deleteBlog(index) {
      this.$confirm('是否永久删除该博客?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let blog = this.blogs[index]
        GistApi.delete(blog.id).then((result) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.blogs.splice(index, 1)
        })
      })
    },
    goAdd() {
      if (!this.token) {
        this.$message({
          message: '请绑定有效的Token',
          type: 'warning'
        })
        return
      }
      this.$router.push('/user/blog/add')
    },
    goDetails(id) {
      this.$router.push("/" + id)
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
