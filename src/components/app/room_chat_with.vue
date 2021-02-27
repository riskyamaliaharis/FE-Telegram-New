<template>
  <div>
    <div v-if="!itemChat" class="no-data">
      <!-- <img
        src="../../../src/assets/icons8-web-chat-100.png"
        style="width:200px; height:200px"
        alt=""
      /> -->
    </div>
    <div v-else>
      <b-container fluid class="container-header">
        <div class="header">
          <b-row>
            <b-col xl="1" lg="2" md="2" sm="3" cols="3">
              <b-img
                v-if="itemChat.user_photo"
                :src="`${url}users/${itemChat.user_photo}`"
                width="64"
                alt=""
              ></b-img>
              <img
                width="64"
                v-else
                src="../../assets/icon-profile.png"
                alt=""
              />
            </b-col>
            <b-col xl="5" lg="5" md="5" sm="7" cols="8">
              <div>
                <h5 style="color: white">{{ itemChat.user_name }}</h5>
              </div>
              <div>
                <p style="color: white;">{{ status }}</p>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="chat-area">
        <div>
          <b-row
            v-for="(itema, index) in chatsMsg"
            :key="index"
            :align-h="itema.sender_id === profile.user_id ? 'end' : 'start'"
            style="margin-bottom:20px"
          >
            <b-col
              xl="1"
              lg="1"
              md="2"
              sm="2"
              cols="2"
              :order="itema.sender_id === profile.user_id ? 5 : 0"
            >
              <img
                v-if="itema.sender_id === profile.user_id && profile.user_photo"
                style="width:40px; border-radius:50%"
                :src="`${url}users/${profile.user_photo}`"
                alt="Avatar"
                class="right"
              />
              <img
                v-else-if="
                  itema.sender_id === profile.user_id && !profile.user_photo
                "
                style="width:40px; border-radius:50%"
                src="../../assets/icon-profile.png"
                alt="Avatar"
                class="right"
              />
              <img
                v-else-if="
                  itema.sender_id !== profile.user_id && itemChat.user_photo
                "
                style="width:40px; border-radius:50%"
                :src="`${url}users/${itemChat.user_photo}`"
                alt="Avatar"
                class="right"
              />
              <img
                v-else-if="
                  itema.sender_id !== profile.user_id && !itemChat.user_photo
                "
                style="width:40px; border-radius:50%"
                src="../../assets/icon-profile.png"
                alt="Avatar"
                class="right"
              />
            </b-col>
            <b-col xl="4" lg="5" md="6" sm="8" cols="9"
              ><div
                :class="
                  itema.sender_id === profile.user_id
                    ? 'chat-styling-a'
                    : 'chat-styling-b'
                "
              >
                <p>{{ itema.room_message }}</p>
                <span class="time-right">{{
                  itema.created_at.slice(11, 16)
                }}</span>
              </div></b-col
            >
          </b-row>
          <br /><br />
        </div>
      </div>
      <div class="input-area">
        <b-row class="right-bottom justify-content-md-center" align-v="center">
          <b-col cols="10">
            <div>
              <b-form-input
                v-model="formMessages.room_message"
                placeholder="Write a message"
              ></b-form-input>
            </div>
          </b-col>
          <b-col cols="1">
            <i
              style="color:#7e98df"
              class="fa fa-send fa-lg sending"
              @click="sendMessage"
            ></i>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import io from 'socket.io-client'
export default {
  created() {
    this.socket.on('spreadStatus', newData => {
      console.log(newData)
      this.status = newData.status
    })
  },
  data() {
    return {
      socket: io(process.env.VUE_APP_URL3, {
        path: '/chatapi/socket.io'
      }),
      status: 'offline',
      formFriend: {
        user_a: '',
        user_b: '',
        room_random_number: ''
      },
      formMessages: {
        room_random_number: '',
        room_message: '',
        sender_id: '',
        receiver_id: ''
      },
      url: process.env.VUE_APP_URL
    }
  },
  computed: {
    ...mapGetters({
      itemChat: 'setItemChatGetters',
      profile: 'setProfileMine',
      chatsMsg: 'setChatsGetters'
    })
  },
  methods: {
    ...mapActions(['addRoomListForFriendVuex', 'addChatVuex']),
    sendMessage() {
      this.formFriend.user_a = this.itemChat.user_b
      this.formFriend.user_b = this.itemChat.user_a
      this.formFriend.room_random_number = this.itemChat.room_random_number
      this.addRoomListForFriendVuex(this.formFriend)
      this.formMessages.room_random_number = this.itemChat.room_random_number
      this.formMessages.sender_id = this.itemChat.user_a
      this.formMessages.receiver_id = this.itemChat.user_b

      const setData = {
        receiver_id: this.itemChat.user_b,
        room_message: this.formMessages.room_message,
        room_random_number: this.itemChat.room_random_number,
        sender_id: this.itemChat.user_a,
        created_at: new Date()
      }
      this.addChatVuex(this.formMessages)
      this.socket.emit('roomMessage', setData)

      this.formMessages.room_message = ''
    }
  }
}
</script>

<style scoped>
.no-data {
  height: 700px;
  background-color: white;
  padding-top: 30%;
  padding-left: 40%;
}
.chat-styling-a {
  background-color: #7e98df;
  opacity: 0.8;
  min-height: 55px;
  border-radius: 16px 0 16px 16px;
  padding: 10px;
  color: white;
  word-wrap: break-word;
}
.chat-styling-b {
  background-color: white;
  min-height: 55px;
  border-radius: 0 16px 16px 16px;
  padding: 10px;
  color: black;
  word-wrap: break-word;
}
.sending {
  cursor: pointer;
}
.header {
  padding: auto;
}
.container-header {
  background-color: #7e98df;
  padding: 20px;
  width: 100%;
  height: 100px;
  margin: 0;
}
.chat-area {
  height: 550px;
  padding: 15px 30px;
  overflow: auto;
}
/* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}

/* Clear floats */
.container::after {
  content: '';
  clear: both;
  display: table;
}

/* Style images */
.container img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

/* Style the right image */
.container img.right {
  float: right;
  margin-left: 20px;
  margin-right: 0;
}

/* Style time text */
.time-right {
  float: right;
  color: white;
  position: absolute;
  bottom: 5px;
  right: 24px;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
}
</style>
