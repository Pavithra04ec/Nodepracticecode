<template>
  <div class="hello">
    <label>{{ response }}</label>
    </div>
</template>

<script>
import axios from 'axios';
export default {  
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data () {
    return {
      response:""
    }
  },
  mounted(){
    this.getHttpBinData();
  },
  methods:{
    getHttpBinData: function() {
     // console.log("Get API Data ")
      axios({ method: 'GET', url: 'http://192.168.1.78:5000/api/studentDetails' }).then((data)=>{
        //console.log(data)
        this.response = data;
       // this.arr.push(data);
       }).catch(()=> {
       //console.error(e)
       });
    }
}
}
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