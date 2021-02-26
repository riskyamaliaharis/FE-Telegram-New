<template>
  <div class="body" align-v="center">
    <b-container fluid>
      <b-row align-v="stretch" align-h="center">
        <b-col class="left" xl="4" lg="4" md="5" sm="11" cols="11">
          <Profile />
          <RoomList />
        </b-col>
        <b-col class="right" xl="7" lg="7" md="6" sm="11" cols="11">
          <RoomChat />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Profile from '../../components/app/chat'
import RoomChat from '../../components/app/room_chat_with'
import RoomList from '../../components/app/room_list'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import io from 'socket.io-client'
export default {
  name: 'Chat',

  data() {
    return {
      socket: io(process.env.VUE_APP_URL3, {
        path: '/chatapi/socket.io'
      }),
      location: '',
      coordinate: {
        lat: 10,
        lng: 10
      },
      status: 'offline'
    }
  },
  components: {
    Profile,
    RoomChat,
    RoomList
  },
  async created() {
    console.log(this.user.user_id)
    await this.setMyId(this.user.user_id)
    await this.getRoomListVuex()
    await this.getMyProfile(this.user.user_id)
    this.$getLocation()
      .then(coordinates => {
        console.log(coordinates)
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        if (coordinates.accuracy <= 15000) {
          this.location = `${this.coordinate.lat}, ${this.coordinate.lng}`
          this.updateLocation({
            user_location: this.location,
            user_id: this.user.user_id
          })
        }
      })
      .catch(error => {
        console.log(error)
      })

    await this.getMyRooms(this.user.user_id)

    this.isLogin
      ? this.socket.emit('status', { status: 'online', room: this.roomss })
      : this.socket.emit('status', { status: this.status, room: this.roomss })
  },
  methods: {
    ...mapActions([
      'getRoomListVuex',
      'getMyProfile',
      'updateLocation',
      'getMyRooms'
    ]),
    ...mapMutations(['setMyId', 'setStatus'])
  },
  computed: {
    ...mapGetters({
      user: 'setUser',
      isLogin: 'isLogin',
      roomss: 'setMyRoomss'
    })
  }
}
</script>

<style scoped>
div.body {
  background-color: white;
}

.left {
  background-color: #7e98df;
  padding: 0;
  border-right-color: white;
}

.right {
  background-color: rgb(227, 225, 230);
  padding: 0;
}
</style>
