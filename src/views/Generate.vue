<template>
  <div class="about">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Type a unique Username to get a token"
        v-model="username"
      />
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click="generate()"
      >
        Generate
      </button>
    </div>
    <div v-if="status">
      <p :class="{ 'text-danger': alreadyExist }">
        {{ statusValue }}<br />
        {{ token }}
      </p>
    </div>
    <p class="text-danger" v-if="err">{{ err }}</p>
  </div>
</template>

<script>
import { API_URL } from "@/config";

export default {
  name: "generate",
  data() {
    return {
      username: "",
      token: "",
      status: false,
      alreadyExist: false,
      statusValue: "token suceesfully generated.",
      errored: false,
      err: null
    };
  },
  methods: {
    generate() {
      this.$http
        .post(API_URL + "generate", {
          username: this.username
        })
        .then(response => {
          this.status = true;
          if (response.data.status) {
            this.token = response.data.token;
            this.alreadyExist = false;
          } else {
            this.alreadyExist = true;
            this.statusValue = "username already exist. please try different";
            this.token = "";
          }
        })
        .catch(err => {
          this.errored = err;
        });
    }
  }
};
</script>
