<template>
  <div class="body" align-v="center">
    <b-row align-v="stretch">
      <b-col class="left" cols="4">
        <Profile />
        <RoomList />
      </b-col>
      <b-col class="right" cols="8">
        <RoomChat />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Profile from '../../components/app/chat'
import RoomChat from '../../components/app/room_chat_with'
import RoomList from '../../components/app/room_list'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Chat',
  components: {
    Profile,
    RoomChat,
    RoomList
  },
  created() {
    this.setMyId(this.user.user_id)
    this.getRoomListVuex()
  },
  methods: {
    ...mapActions(['getRoomListVuex']),
    ...mapMutations(['setMyId'])
  },
  computed: {
    ...mapGetters({ user: 'setUser' })
  }
}
</script>

<style scoped>
div.body {
  background-color: rgb(227, 225, 230);
  min-height: 700px;
}

.left {
  background-color: rebeccapurple;
  padding: 0;
}

.right {
  background-color: rgb(227, 225, 230);
}
</style>
