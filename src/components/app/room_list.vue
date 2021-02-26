<template>
  <div>
    <div class="searchMessage">
      <b-form-input
        v-model="search"
        @change="searching"
        placeholder="Search"
      ></b-form-input>
    </div>
    <div class="messages-list">
      <b-list-group>
        <b-list-group-item
          class="flex-column align-items-start"
          v-for="(item, index) in rooms"
          :key="index"
        >
          <div
            class="d-flex w-100 justify-content-between"
            @click="sendDataThisRoom(item)"
          >
            <b-media>
              <template #aside>
                <img
                  width="64"
                  v-if="item.user_photo === ''"
                  src="../../assets/icon-profile.png"
                  alt=""
                  style="border-radius:10px"
                />
                <b-img
                  v-else
                  style="border-radius:10px"
                  :src="`${url}users/${item.user_photo}`"
                  width="64"
                  alt="profile"
                ></b-img>
              </template>
              <h5 class="mt-0">{{ item.user_name }}</h5>
              {{ item.last_message.substring(0, 30) }} ...
            </b-media>
            <small style="text-align:right">{{
              formatTime(item.updated_at)
            }}</small>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import io from 'socket.io-client'
import moment from 'moment'
export default {
  data() {
    return {
      socket: io(process.env.VUE_APP_URL3, {
        path: '/chatapi/socket.io'
      }),
      oldRoom: '',
      search: '',
      url: process.env.VUE_APP_URL
    }
  },
  created() {
    this.socket.on('chatMessage', data => {
      this.setChat(data)
    })
  },
  computed: {
    ...mapGetters({ rooms: 'setRoomListGetters' })
  },
  methods: {
    ...mapMutations(['changeDataItem', 'setMySearch', 'setChat']),
    ...mapActions(['getChatsVuex', 'deleteChatVuex', 'getRoomListVuex']),
    sendDataThisRoom(item) {
      this.changeDataItem(item)

      if (!this.oldRoom) {
        this.socket.emit('joinRoom', {
          room_chat: item.room_random_number
        })
        this.oldRoom = item.room_random_number
      } else {
        this.socket.emit('changeRoom', {
          room_chat: item.room_random_number,
          oldRoom: this.oldRoom
        })
        this.oldRoom = item.room_random_number
      }
      this.getChatsVuex(item.room_random_number).then(() => {
        this.oldRoom = item.room_random_number
      })
    },
    searching() {
      this.setMySearch(this.search)
      this.getRoomListVuex()
    },
    formatTime(value) {
      moment.locale('en')
      return moment(String(value)).format('ll')
    }
  }
}
</script>

<style scoped>
.messages-list {
  background-color: white;
  height: 480px;
  overflow: auto;
}
.delete {
  cursor: pointer;
}
.card-chat {
  width: 100%;
  height: 100px;
  background-color: white;
  /* padding: 7px; */
  box-sizing: border-box;
}
.searchMessage,
.card-chat,
.messages-list {
  /* margin-left: 10px; */
}
</style>
