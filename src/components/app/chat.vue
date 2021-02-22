<template>
  <div>
    <b-container fluid class="bv-example-row bv-example-row-flex-cols">
      <div class="wrapper">
        <div class="navbar">
          <div class="logo">
            <a href="#">Telegram</a>
          </div>
          <div class="nav_right">
            <ul>
              <li class="nr_li dd_main">
                <button class="menubar" style="font-size:24px" @click="show">
                  <i class="fa fa-align-left nr_li"></i>
                </button>
                <div class="dd_menu" v-show="isNav">
                  <div class="dd_left">
                    <ul>
                      <li><i class="fa fa-cog"></i></li>
                      <li><i class="fa fa-address-book-o"></i></li>
                      <li><i class="fa fa-phone"></i></li>
                      <li><i class="fa fa-bookmark-o"></i><br /></li>
                      <li><i class="fa fa-user-plus"></i> <br /></li>
                      <li><i class="fa fa-question-circle-o"></i></li>
                      <li><i class="fa fa-sign-out"></i></li>
                    </ul>
                  </div>
                  <div class="dd_right">
                    <ul>
                      <li v-b-modal.modal-tall>
                        Settings
                      </li>
                      <b-modal id="modal-tall" title="Profile" hide-footer>
                        <b-button
                          style="background-color:#7e98df;;position: absolute; right: 15px; box-shadow: 5px 5px 5px #888888;"
                          @click="handleLogout"
                          ><i class="fa fa-sign-out fa-2x"></i
                        ></b-button>
                        <div class="picture centered">
                          <div v-if="!image">
                            <img
                              v-if="profile.user_photo === ''"
                              src="../../assets/icon-profile.png"
                              alt=""
                            />

                            <img
                              v-else
                              :src="
                                'http://localhost:3000/users/' +
                                  profile.user_photo
                              "
                              alt=""
                            />

                            <input
                              type="file"
                              id="files"
                              class="hidden"
                              @change="onFileChange($event)"
                              style="display:none"
                            />
                            <label class="uploadimg " for="files"
                              ><i class="fa fa-upload fa-2x"></i
                            ></label>
                          </div>
                          <div v-else>
                            <img :src="image" />
                            <b-button
                              class="upload-btn"
                              style="width:150px"
                              @click="removeImage"
                              >Remove Image</b-button
                            >
                          </div>
                        </div>
                        <div>
                          <b-form-group
                            id="input-group-3"
                            label="Your Name:"
                            label-for="input-3"
                          >
                            <b-form-input
                              id="input-3"
                              v-model="profile.user_name"
                              placeholder="Enter your name"
                              required
                            ></b-form-input>
                          </b-form-group>

                          <b-form-group
                            id="input-group-1"
                            label="Email address:"
                            label-for="input-1"
                            description="We'll never share your email with anyone else."
                          >
                            <b-form-input
                              id="input-1"
                              v-model="profile.user_email"
                              type="email"
                              placeholder="Enter email"
                              required
                            ></b-form-input>
                          </b-form-group>

                          <b-form-group
                            id="input-group-2"
                            label="Location :"
                            label-for="input-2"
                          >
                            <b-button
                              id="input-2"
                              variant="primary"
                              @click="currentLocation"
                              style="background-color:#7e98df;"
                              >Change to Current Location</b-button
                            >
                          </b-form-group>
                        </div>
                        <div class="maps">
                          <GmapMap
                            :center="coordinate"
                            :zoom="10"
                            map-type-id="terrain"
                            style="width: 100%; height: 300px; margin-bottom: 10px"
                          >
                            <GmapMarker
                              :position="coordinate"
                              :clickable="true"
                              :draggable="true"
                              @click="clickMarker"
                              icon="https://img.icons8.com/dusk/64/000000/map-pin.png"
                            />
                          </GmapMap>
                        </div>
                        <div style="text-align:right">
                          <b-button
                            @click="updateForm"
                            style="background:#7e98df;"
                            >Save Changes</b-button
                          >
                        </div>
                      </b-modal>
                      <li v-b-toggle.sidebar-1 @click="showMyContacts">
                        Contacts
                      </li>
                      <b-sidebar id="sidebar-1" title="Contacts" shadow>
                        <div class="px-3 py-2">
                          <div v-for="(item, index) in myContacts" :key="index">
                            <b-row>
                              <b-col cols="2">
                                <img
                                  v-if="!item.user_photo"
                                  src="../../assets/icon-profile.png"
                                  alt=""
                                />

                                <img
                                  v-else
                                  :src="
                                    'http://localhost:3000/users/' +
                                      item.user_photo
                                  "
                                  alt=""
                                />
                              </b-col>
                              <b-col cols="10"
                                ><b-button
                                  v-b-modal="modalId(index)"
                                  style="margin-bottom:5px; width: 100%; background:#7e98df;"
                                >
                                  {{ item.user_name }}
                                </b-button></b-col
                              >
                            </b-row>

                            <b-modal
                              :id="'modal' + index"
                              :title="item.user_name"
                              style="width:300px"
                              hide-footer
                            >
                              <img
                                class="modal-contact"
                                v-if="item.user_photo === ''"
                                src="../../assets/icon-profile.png"
                                alt=""
                                style="width:200px"
                              />

                              <img
                                v-else
                                :src="
                                  'http://localhost:3000/users/' +
                                    item.user_photo
                                "
                                alt=""
                                style="width:200px; margin-left: 130px"
                              />
                              <div class="centered">
                                <p>{{ item.user_email }}</p>
                              </div>
                              <br />
                              <div class="centered">
                                <button
                                  class="btn"
                                  @click="goToChatList(item.user_id)"
                                >
                                  <i class="	fa fa-commenting fa-lg"></i>
                                  Chat
                                </button>
                                <button class="btn">
                                  <i class="fa fa-phone fa-lg"></i> Call
                                </button>
                                <button class="btn">
                                  <i class="fa fa-video-camera fa-lg"></i>
                                  Video Call
                                </button>
                              </div>
                              <br />
                              <div class="text-center">
                                <b-button
                                  style="margin:auto"
                                  @click="friendsLoc(item.user_location)"
                                  >{{ item.user_name.split(' ')[0] }}'s
                                  Location</b-button
                                >
                              </div>

                              <br /><br />
                              <div class="maps" v-show="isShowMaps">
                                <GmapMap
                                  :center="coordinate"
                                  :zoom="10"
                                  map-type-id="terrain"
                                  style="width: 80%; height: 300px; margin-bottom: 10px; margin: auto"
                                >
                                  <GmapMarker
                                    :position="coordinate"
                                    :clickable="true"
                                    :draggable="true"
                                    @click="clickMarker"
                                    icon="https://img.icons8.com/dusk/64/000000/map-pin.png"
                                  />
                                </GmapMap>
                              </div>
                            </b-modal>
                          </div>
                        </div>
                      </b-sidebar>
                      <li>Calls</li>
                      <li>Save Messages</li>
                      <li @click="showModal = !showModal">
                        Invite Friends
                      </li>
                      <b-modal v-model="showModal" hide-footer>
                        <b-form-group
                          id="input-group-email"
                          label="Invite your friends through their email"
                          label-for="input-email"
                        >
                          <b-form-input
                            id="input-email"
                            v-model="inviteEmail"
                            type="email"
                            placeholder="Enter your friend's email"
                            required
                          ></b-form-input>
                        </b-form-group>
                        <div style="text-align: right">
                          <b-button
                            @click="goToAddFriend"
                            style="background: #7e98df;"
                            >Add Friend</b-button
                          >
                        </div>
                      </b-modal>
                      <li>Telegram FAQ</li>
                      <li @click="handleLogout">
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { alert } from '../../mixins/alert'
export default {
  mixins: [alert],
  data() {
    return {
      form: {
        username: '',
        email: '',
        photo: '',
        location: ''
      },
      isNav: false,
      image: false,
      isShowMaps: false,
      coordinate: {
        lat: 10,
        lng: 10
      },
      modalShow: false,
      showModal: false,
      inviteEmail: '',
      formList: {
        id_user_a: '',
        id_user_b: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'setUser',
      profile: 'setProfileMine',
      myContacts: 'setMyContactsGetters'
    })
  },
  methods: {
    ...mapActions([
      'logout',
      'editMyProfile',
      'getContactsVuex',
      'addFriendVuex',
      'addRoomListVuex'
    ]),
    ...mapMutations([
      'sendMyUpdatedData',
      'sendEmailInvitation',
      'setRequestBodyAddRoomList'
    ]),
    show() {
      if (this.isNav) {
        this.isNav = false
      } else {
        this.isNav = true
      }
      this.goToProfile()
    },
    friendsLoc(loc) {
      if (this.isShowMaps) {
        this.isShowMaps = false
      } else {
        this.isShowMaps = true
      }

      if (loc !== '') {
        const getLatLng = loc.split(',')
        this.coordinate.lat = Number(getLatLng[0])
        this.coordinate.lng = Number(getLatLng[1])
      } else {
        this.coordinate.lat = 10
        this.coordinate.lng = 10
      }
    },
    modalId(index) {
      return 'modal' + index
    },
    handleLogout() {
      this.logout()
        .then(() => {
          this.successAlert('Thank you for using Telegram')
          this.$router.push('/')
        })
        .catch(() => {
          this.errorAlert('Sorry')
        })
    },
    goToProfile() {
      if (this.profile.user_location !== '') {
        const getLatLng = this.profile.user_location.split(',')
        this.coordinate.lat = Number(getLatLng[0])
        this.coordinate.lng = Number(getLatLng[1])
        console.log(this.coordinate.lat)
        console.log('this.coordinate.lat')
      } else {
        this.coordinate.lat = 10
        this.coordinate.lng = 10
      }
    },
    onFileChange(e) {
      this.form.photo = e.target.files[0]
      var files = e.target.files || e.dataTransfer.files
      console.log(files)
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage(file) {
      var reader = new FileReader()
      reader.onload = e => {
        this.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function() {
      this.image = false
    },
    clickMarker(position) {
      console.log('clicked marker')
      console.log(position)
      console.log(position.latLng.lat())
      console.log(position.latLng.lng())
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
    },
    currentLocation() {
      this.$getLocation()
        .then(coordinates => {
          this.coordinate = {
            lat: coordinates.lat,
            lng: coordinates.lng
          }
          this.form.location = `${this.coordinate.lat}, ${this.coordinate.lng}`
        })
        .catch(error => {
          alert(error)
        })
    },
    showMyContacts() {
      this.getContactsVuex(this.user.user_id)
    },
    updateForm() {
      this.form.username = this.profile.user_name
      this.form.email = this.profile.user_email
      console.log('this.form')
      console.log(this.form)
      this.sendMyUpdatedData(this.form)
      this.editMyProfile(this.user.user_id)
    },
    goToAddFriend() {
      console.log('send data email one')
      this.sendEmailInvitation(this.inviteEmail)
      console.log('three')
      this.addFriendVuex(this.user.user_id)
    },
    goToChatList(id) {
      // this.$router.push({
      //   name: 'ListRoom',
      //   params: { id_user_a: this.user.user_id, id_user_b: id }
      // })
      this.formList.id_user_a = this.user.user_id
      this.formList.id_user_b = id
      this.setRequestBodyAddRoomList(this.formList)
      this.addRoomListVuex()
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: 'Jost', sans-serif;
}
.menubar {
  background: none;
  border: none;
  color: white;
}

.navbar {
  background: #7e98df;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

.navbar .logo a {
  display: block;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 25px;
  /* text-transform: uppercase; */
}

.navbar .nav_right > ul {
  display: flex;
  align-items: center;
}

.navbar .nav_right ul li.nr_li {
  margin-left: 25px;
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  position: relative;
}

.navbar .nav_right ul li.nr_li:hover {
  color: #cefffc;
}

.navbar .nav_right ul li img {
  width: 35px;
  vertical-align: middle;
}

.navbar .dd_menu {
  position: absolute;
  right: -25px;
  top: 47px;
  display: flex;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);
  z-index: 10;
}

.navbar .dd_menu .dd_left {
  background: #7e98df;
  padding: 15px 20px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.navbar .dd_menu .dd_left li {
  color: #fff;
}

.navbar .dd_menu .dd_right {
  padding: 15px 20px;
  width: 180px;
}

.navbar .dd_menu li {
  margin-bottom: 10px;
  color: #868686;
}

.navbar .dd_menu:before {
  content: '';
  position: absolute;
  top: -20px;
  right: 30px;
  border: 10px solid;
  border-color: transparent transparent #fff transparent;
}

.navbar .dd_main.active .dd_menu {
  display: flex;
}

.picture img {
  width: 200px;
  height: 200px;
  margin: auto;
  display: block;
  margin-bottom: 5px;
  border-radius: 50%;
}
label.uploadimg {
  background-color: #7e98df;
  color: white;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  padding-top: 8px;
}
div.centered {
  text-align: center;
}
div.centered img {
  width: 200px;
}
div.centered .upload-btn {
  width: 300px;
}

.hiddenFileInput > input {
  height: 100%;
  width: 100;
  opacity: 0;
  cursor: pointer;
}
.hiddenFileInput {
  border: 1px solid #ccc;
  width: 80px;
  height: 60px;
  display: inline-block;
  overflow: hidden;
  cursor: pointer;
  background-color: #7e98df;
}
</style>
