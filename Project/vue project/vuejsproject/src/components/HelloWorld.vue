<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >
    <b-button
      :class="showCollapse ? 'collapsed' : null"
      :aria-expanded="showCollapse ? 'true' : 'false'"
      aria-controls="collapse-4"
      @click="showCollapse = !showCollapse"
    >Users list</b-button>
    <b-collapse id="collapse-4" v-model="showCollapse" class="mt-2">
      <input type="checkbox" @change="getData($event)" name="Add">
      <table class="table created">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>MobileNo</th>
            <th>Email</th>
            <th>Password</th>
            <th>ConfirmPassword</th>
            <th>Country</th>
            <th>Color</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="value in arr" :key="value.id" v-show="showTable">
            <td>{{value.id}}</td>
            <td>{{value.Name}}</td>
            <td>{{value.Gender}}</td>
            <td>{{value.MobileNo}}</td>
            <td>{{value.Email}}</td>
            <td>{{value.Password}}</td>
            <td>{{value.ConfirmPassword}}</td>
            <td>{{value.Country}}</td>
            <td>{{value.Color}}</td>
            <!-- <td><input type="checkbox" @change="showCollapse1 = true,updateData($event),form=value"></td> -->
            <td>
              <b-button @click="showCollapse1 = true,form=value" variant="info">
                <i style="font-size:24px" class="fa">&#xf044;</i>
              </b-button>
            </td>
            <td>
              <b-button @click="deleteData(value.id)" variant="danger">
                <i class="fa fa-trash"></i>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-collapse>
    <div>
      <b-button
        :class="showCollapse1 ? 'collapsed' : null"
        :aria-expanded="showCollapse1 ? 'true' : 'false'"
        aria-controls="collapse-4"
        @click="showCollapse1 = !showCollapse1"
      >Add</b-button>
      <b-collapse id="collapse-5" v-model="showCollapse1" class="mt-1">
        <b-form class="w-25" size="sm">
          <b-form-group label="Your id:">
            <b-form-input
              v-validate="'numeric|required'"
              v-model="form.id"
              name="id"
              required
              placeholder="Enter Id"
            ></b-form-input>
            <span>{{ errors.first('id') }}</span>
          </b-form-group>
          <b-form-group label="Your Name:">
            <b-form-input
              v-validate="'alpha|min:3|required'"
              v-model="form.Name"
              name="Name"
              required
              placeholder="Enter name"
            ></b-form-input>
            <span>{{ errors.first('Name') }}</span>
          </b-form-group>
          <b-form-group>
            <b-form-radio-group v-model="form.Gender">
              <b-form-radio value="Male">Male</b-form-radio>
              <b-form-radio value="Female">Female</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group label="Your MobileNo:">
            <b-form-input
              v-validate="'digits:10|required'"
              v-model="form.MobileNo"
              type="number"
              name="MobileNo"
              required
              placeholder="Enter MobileNo"
            ></b-form-input>
            <span>{{ errors.first('MobileNo') }}</span>
          </b-form-group>
          <b-form-group
            label="Email address:"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              v-validate="'email'"
              v-model="form.Email"
              type="email"
              name="Email"
              required
              placeholder="Enter email"
            ></b-form-input>
            <span>{{ errors.first('Email') }}</span>
          </b-form-group>
          <b-form-group label="Password:" description="Give your strong password">
            <b-form-input
              v-validate="'required'"
              ref="Password"
              v-model="form.Password"
              type="password"
              name="Password"
              required
              placeholder="Enter your Password"
            ></b-form-input>
            <span>{{ errors.first('Password') }}</span>
          </b-form-group>
          <b-form-group label="Confirm Password:" description="Enter your correct password.">
            <b-form-input
              v-validate="'required|confirmed:Password'"
              v-model="form.ConfirmPassword"
              type="password"
              name="ConfirmPassword"
              required
              placeholder="Password again"
            ></b-form-input>
            <span>{{ errors.first('ConfirmPassword') }}</span>
          </b-form-group>
          <b-form-group label="Country:">
            <b-form-select v-model="form.Country" :options="Countries" required></b-form-select>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox-group v-model="form.Color">
              <b-form-checkbox value="Red">Red</b-form-checkbox>
              <b-form-checkbox value="Black">Black</b-form-checkbox>
              <b-form-checkbox value="Blue">Blue</b-form-checkbox>
              <b-form-checkbox value="Green">Green</b-form-checkbox>
              <b-form-checkbox value="White">White</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <b-button variant="success" @click="postData()" class="button">Submit</b-button>
          <b-button @click="updateDatas(form)" variant="warning" class="button">Update</b-button>
        </b-form>
      </b-collapse>
      <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
      </b-card>-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      showCollapse: false,
      showCollapse1: false,
      showTable: false,
      showData: false,
      arr: [],
      form: {
        id: "",
        Name: "",
        Gender: "",
        MobileNo: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Country: null,
        Color: []
      },
      Countries: [
        { text: "Select One", value: null },
        "India",
        "China",
        "USA",
        "Singapore"
      ],
      show: true
    };
  },
  // mounted() {
  //   this.getData();
  // },
  methods: {
    getData: function(event) {
      console.log(event.target.checked);
      this.showTable = event.target.checked;
      axios({
        method: "GET",
        url: "http://localhost:5000/api/"
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
        id: this.form.id,
        Name: this.form.Name,
        Gender: this.form.Gender,
        MobileNo: this.form.MobileNo,
        Email: this.form.Email,
        Password: this.form.Password,
        ConfirmPassword: this.form.ConfirmPassword,
        Country: this.form.Country,
        Color: this.form.Color
      };
      console.log(data);
      axios({
        method: "POST",
        url: "http://localhost:5000/api/post",
        data
      })
        .then(response => {
          this.arr.push(response);
          console.log("result:" + response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateData: function(form) {
      //this.form=form;
      this.showData = form.target.checked;
    },
    updateDatas: function(form) {
      this.showData = form.target.checked;
      var Id = this.form.id;
      var data = {
        Name: this.form.Name,
        Gender: this.form.Gender,
        MobileNo: this.form.MobileNo,
        Email: this.form.Email,
        Password: this.form.Password,
        ConfirmPassword: this.form.ConfirmPassword,
        Country: this.form.Country,
        Color: this.form.Color
      };
      console.log(data);
      axios({
        method: "PUT",
        url: `http://localhost:5000/api/put/${Id}`,
        data
      })
        .then(response => {
          this.arr.push(response);
          console.log("result:" + response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteData: function(id) {
      axios({
        method: "DELETE",
        url: `http://localhost:5000/api/delete/${id}`
      })
        .then(result => {
          this.arr.splice(this.arr.indexOf(id), 1);
          console.log("deleted:" + result);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>
</style>
