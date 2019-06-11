<template>
  <div class="hello">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- <label>{{response}}</label> -->
    <table class="table created">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>age</th>
          <th>dept</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="value in arr" :key="value.id">
          <td>{{value.id}}</td>
          <td>{{value.name}}</td>
          <td>{{value.age}}</td>
          <td>{{value.dept}}</td>
          <td>
          <!-- <button @click="updateData(input=value,showModal=true)" class="button">Edit</button> -->
          <button id="show-modal" @click="updateData(input=value)" class="button"><i style="font-size:24px" class="fa">&#xf044;</i></button>
          </td>
          <td>
            <button @click="deleteData(value.id)" class="button"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="group" style="align:left">
        <input align="right" v-model="input.id" class="control" type="number" placeholder="Enter id">
      </div>
      <div class="group">
        <input v-model="input.name" class="control" type="text" placeholder="Enter Name">
      </div>
      <div class="group">
        <input v-model="input.age" class="control" type="number" placeholder="Enter your age">
      </div>
      <div class="group">
        <input v-model="input.dept" class="control" type="text" placeholder="Enter your Dept">
      </div>
      <div>
        <button @click="postData()" class="button">Add details</button>
      
        <button @click="updateDatas(input)" class="button">update details</button>
      </div>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">custom header</h3>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import modal from './modal.vue'
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    modal
  },
  data() {
    return {
      arr: [],
      input: {
        id: "",
        name: "",
        age: "",
        dept: ""
      },
      showModal: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {
      axios({
        method: "GET",
        url: "http://localhost:8000/api/studentDetails"
      })
        .then(data => {
          //console.log(data)
          this.arr = data.data;
        })
        .catch(() => {
          //console.error(e)
        });
    },
    postData: function() {
      var data = {
        id: this.input.id,
        name: this.input.name,
        age: this.input.age,
        dept: this.input.dept
      };
      //console.log(data);
      axios({
        method: "POST",
        url: "http://localhost:8000/api/studentDetails/post",
        data
      })
        .then(result => {
          this.arr.push(this.input);
          console.log("result:"+result);
        })
        .catch(() => {
          //console.log(e)
        });
    },
    updateData: function(input) {
      this.input=input;
    },
    updateDatas: function(input) {
      var Id = this.input.id;
      //this.input=input;
      //console.log(id);
      var data = {
        name: this.input.name,
        age: this.input.age,
        dept: this.input.dept
      };
      console.log(data);
      axios({
        method: "PUT",
        url: `http://localhost:8000/api/studentDetails/put/${Id}`,
        data
      })
        .then(result => {
          this.arr.push(result);
          console.log("result:"+result);
        })
        .catch(() => {
          //console.log(e)
        });
    },
    deleteData: function(id) {
      axios({
        method: "DELETE",
        url: `http://localhost:8000/api/studentDetails/${id}`
      })
        .then((result) => {
          this.arr.splice(this.arr.indexOf(id), 1);
          console.log("deleted:"+ result);
        })
        .catch(() => {
          //console.log(e)
        });
    },
  }
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>


    