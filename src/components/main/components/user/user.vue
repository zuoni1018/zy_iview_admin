<template>
  <div class="user-avatar-dropdown">
    <Dropdown trigger="click" @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <!--        <DropdownItem name="message">-->
        <!--          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>-->
        <!--        </DropdownItem>-->
        <DropdownItem name="userCenter">个人中心</DropdownItem>

        <DropdownItem name="changePassword">修改密码</DropdownItem>

        <DropdownItem name="logout">退出登录</DropdownItem>

      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  import './user.less'
  import { mapActions } from 'vuex'
  import { setToken } from '../../../../cache/cache_utils'

  export default {
    name: 'User',
    props: {
      userAvatar: {
        type: String,
        default: ''
      },
      messageUnreadCount: {
        type: Number,
        default: 0
      }
    },
    methods: {
      ...mapActions([
        'handleLogOut'
      ]),
      logout () {
        setToken('')
        this.$router.push({
          name: 'login'
        })
      },

      userCenter () {
        this.$router.push({
          name: 'user_center_page'
        })
      },
      message () {
        this.$router.push({
          name: 'message_page'
        })
      },
      handleClick (name) {
        switch (name) {
          case 'logout':
            this.logout()
            break
          case 'message':
            this.message()
            break
          case 'userCenter':
            this.userCenter()
            break

          case 'changePassword':
            this.$router.push({
              name: 'change_pass'
            })
            break
        }
      }
    }
  }
</script>
