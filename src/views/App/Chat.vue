<template>
  <div class="body" align-v="center">
    <b-row align-v="stretch">
      <b-col class="left" lg="4" md="5" cols="6">
        <Profile />
        <RoomList />
      </b-col>
      <b-col class="right" lg="8" md="7" cols="6">
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
  data() {
    return {
      location: '',
      coordinate: {
        lat: 10,
        lng: 10
      }
    }
  },
  components: {
    Profile,
    RoomChat,
    RoomList
  },
  created() {
    this.setMyId(this.user.user_id)
    this.getRoomListVuex()
    this.getMyProfile(this.user.user_id)
    this.$getLocation()
      .then(coordinates => {
        console.log('coordinates')
        console.log(coordinates)
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        if (coordinates.accuracy <= 5000) {
          this.location = `${this.coordinate.lat}, ${this.coordinate.lng}`
          this.updateLocation({
            user_location: this.location,
            user_id: this.user.user_id
          })
        }
      })
      .catch(error => {
        alert(error)
      })
  },
  methods: {
    ...mapActions(['getRoomListVuex', 'getMyProfile', 'updateLocation']),
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
