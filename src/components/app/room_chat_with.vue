<template>
  <div>
    <div class="container">
      <img
        src="https://vignette.wikia.nocookie.net/upinipin/images/9/95/6_mail.png/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/250/window-height/250?cb=20180206072414"
        alt="Avatar"
      />
      <p>Meiii</p>
      <span class="time-right">11:00</span>
    </div>

    <div class="container darker">
      <img
        src="https://i.pinimg.com/236x/d1/8d/58/d18d5895ecf31209b6790609a4e2648a.jpg"
        alt="Avatar"
        class="right"
      />
      <p>Ape? Kau mau jualan lagi keh?</p>
      <span class="time-left">11:01</span>
    </div>

    <div class="container">
      <img
        src="https://vignette.wikia.nocookie.net/upinipin/images/9/95/6_mail.png/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/250/window-height/250?cb=20180206072414"
        alt="Avatar"
      />
      <p>No. Nak PR. Ade?</p>
      <span class="time-right">11:02</span>
    </div>

    <div class="container darker">
      <img
        src="https://i.pinimg.com/236x/d1/8d/58/d18d5895ecf31209b6790609a4e2648a.jpg"
        alt="Avatar"
        class="right"
      />
      <p>Tak nak</p>
      <span class="time-left">11:05</span>
    </div>
    <b-row class="right-bottom justify-content-md-center" align-v="center">
      <b-col cols="10">
        <div>
          <b-form-input placeholder="Write a message"></b-form-input>
        </div>
      </b-col>
      <b-col cols="1">
        <i style="color:rebeccapurple" class="fa fa-send fa-lg"></i>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.right-bottom {
  padding-top: 200px;
  margin-bottom: 20px;
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
