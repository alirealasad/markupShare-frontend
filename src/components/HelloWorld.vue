<template>
  <div>
    <div class="input-group mb-3">
      <input type="text" class="form-control" v-model="token" />
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        @click="fetch()"
      >
        fetch
      </button>
    </div>

    <div class="input-group mb-3">
      <input type="text" class="form-control" v-model="line" />
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        v-if="!isfiltered"
        @click="filter()"
      >
        Filter
      </button>
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        @click="filter()"
        v-else
      >
        Unfilter
      </button>
    </div>
    <div class="text-danger" v-if="errored">
      {{ error }}
    </div>
    <div v-else>
      <div v-highlight>
        <pre class="language-markup">
              <prism-editor
                class="my-editor"
                v-model="code"
                :highlight="highlighter"
                :line-numbers="!isfiltered"
                readonly
              ></prism-editor>
            </pre>
      </div>
    </div>
  </div>
</template>

<script>
// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "bootstrap/dist/css/bootstrap.css";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

import "@/assets/themes/duotone-sea.css";
import "@/assets/themes/window.css";

import { API_URL } from "@/config";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      loading: true,
      code: "",
      errored: false,
      line: 0,
      token: "",
      isfiltered: false,
      values: [],
      error: ""
    };
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.markup);
    },
    showData(data) {
      this.code = data;
    },
    saveToken() {
      localStorage.setItem("token", this.token);
    },
    fetch() {
      if (this.token) {
        this.saveToken();
        this.isfiltered = false;
        this.$http
          .get(API_URL + "token/" + this.token)
          .then(response => {
            this.loading = true;
            if (response.data.markup) {
              this.values = response.data.markup;
              this.showData(this.values.join("\n"));
              this.errored = false;
            } else {
              this.errored = true;
              this.error = response.data.error;
            }
            this.loading = false;
          })
          .catch(err => {
            this.error = err;
            this.loading = true;
            this.errored = true;
            this.loading = false;
          });
      }
    },
    filter() {
      if (!this.isfiltered) {
        this.showData(this.values[this.line - 1]);
      } else {
        this.showData(this.values.join("\n"));
      }
      this.isfiltered = !this.isfiltered;
    }
  },
  components: {
    PrismEditor
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetch();
  }
};
</script>

<style>
pre {
  color: #57718e;
}
</style>
