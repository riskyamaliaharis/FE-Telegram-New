<template>
  <div>
    <div class="searchMessage">
      <b-form-input placeholder="Search"></b-form-input>
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
                <b-img
                  style="border-radius:10px"
                  :src="'http://localhost:3000/users/' + item.user_photo"
                  width="64"
                  :alt="profile"
                ></b-img>
              </template>
              <h5 class="mt-0">{{ item.user_name }}</h5>
              Fusce condimentum nunc ac nis ...
            </b-media>
            <small>3 days ago</small>
          </div>
          <div class="d-flex w-100 justify-content-end">
            <i
              class="fa fa-trash fa-lg delete"
              @click="deleteThisChat(item)"
            ></i>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({ rooms: 'setRoomListGetters' })
  },
  methods: {
    ...mapMutations(['changeDataItem']),
    ...mapActions(['getChatsVuex', 'deleteChatVuex']),
    sendDataThisRoom(item) {
      this.changeDataItem(item)
      this.getChatsVuex(item.room_random_number)
    },
    deleteThisChat(item) {
      this.deleteChatVuex(item.room_random_number)
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
  padding: 7px;
  box-sizing: border-box;
}
.searchMessage,
.card-chat,
.messages-list {
  margin-left: 10px;
}
</style>
