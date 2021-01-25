<template>
  <div>
    <b-container fluid class="container-header">
      <div class="header">
        <b-row>
          <b-col cols="1">
            <b-img
              :src="'http://localhost:3000/users/' + itemChat.user_photo"
              width="64"
              alt=""
            ></b-img>
          </b-col>
          <b-col cols="5">
            <div>
              <h5 style="color: white">{{ itemChat.user_name }}</h5>
            </div>
            <div><p style="color: #5fff7a;">Online</p></div>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <div class="chat-area">
      <div class="container">
        <img
          src="https://vignette.wikia.nocookie.net/upinipin/images/9/95/6_mail.png/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/250/window-height/250?cb=20180206072414"
          alt="Avatar"
        />
        <p>{{ itemChat }}</p>
        <span class="time-right">11:00</span>
      </div>

      <div class="container darker">
        <img
          src="https://i.pinimg.com/236x/d1/8d/58/d18d5895ecf31209b6790609a4e2648a.jpg"
          alt="Avatar"
          class="right"
        />
        <p>{{ profile }}</p>
        <span class="time-left">11:01</span>
      </div>

      <div class="container">
        <img
          src="https://vignette.wikia.nocookie.net/upinipin/images/9/95/6_mail.png/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/250/window-height/250?cb=20180206072414"
          alt="Avatar"
        />
        <p>{{ chatsMsg[0].room_message }}</p>
        <span class="time-right">11:02</span>
      </div>

      <div class="container darker">
        <img
          src="https://i.pinimg.com/236x/d1/8d/58/d18d5895ecf31209b6790609a4e2648a.jpg"
          alt="Avatar"
          class="right"
        />
        <p>{{ chatsMsg }}</p>
        <span class="time-left">11:05</span>
      </div>
    </div>
    <div class="input-area">
      <b-row class="right-bottom justify-content-md-center" align-v="center">
        <b-col cols="10">
          <div>
            <b-form-input
              v-model="formMessages.message"
              placeholder="Write a message"
            ></b-form-input>
          </div>
        </b-col>
        <b-col cols="1">
          <i
            style="color:rebeccapurple"
            class="fa fa-send fa-lg sending"
            @click="sendMessage"
          ></i>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      formFriend: {
        id_a: '',
        id_b: '',
        random_number: ''
      },
      formMessages: {
        random_number: '',
        message: '',
        sender: '',
        receiver: ''
      }
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
    ...mapMutations(['updateFormFriend', 'updateFormMessages']),
    ...mapActions(['addRoomListForFriendVuex', 'addChatVuex']),
    sendMessage() {
      this.formFriend.id_a = this.itemChat.user_b
      this.formFriend.id_b = this.itemChat.user_a
      this.formFriend.random_number = this.itemChat.room_random_number
      this.updateFormFriend(this.formFriend)
      this.addRoomListForFriendVuex()
      this.formMessages.random_number = this.itemChat.room_random_number
      this.formMessages.sender = this.itemChat.user_a
      this.formMessages.receiver = this.itemChat.user_b

      this.updateFormMessages(this.formMessages)
      this.addChatVuex()
      this.formMessages.message = ''
    }
  }
}
</script>

<style scoped>
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
  opacity: 0.8;
}
.chat-area {
  height: 500px;
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
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
}
</style>
