<template>
  <section class="h-100 gradient-form" style="background-color: #eee;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <img src="@/assets/images/logo-svg.svg" style="height: 145px;" alt="logo">
                    <h4 class="mt-1 mb-5 pb-1">Customer Login Page</h4>
                  </div>
                    <p>Please login to your account</p>
                    <form @submit.prevent="loginUser">
                      <div class="form-outline mb-4">
                        <input type="email" id="form2Example11" v-model="login.email" class="form-control" required/>
                        <label class="form-label" for="form2Example11">Email</label>
                      </div>
                      <div class="form-outline mb-4">
                        <input type="password" id="form2Example22" v-model="login.password" class="form-control"
                               required/>
                        <label class="form-label" for="form2Example22">Password</label>
                      </div>
                      <div class="text-center pt-1 mb-5 pb-1">
                        <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log in
                        </button>
                      </div>
                    </form>
                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <RouterLink to="register">
                        <a type="button" class="btn btn-outline-danger" style="margin-right: 10px">Create New Account </a>
                      </RouterLink>
                      <RouterLink to="/">
                        <a type="button" class="btn btn-outline-danger">Login Options </a>
                      </RouterLink>
                    </div>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 class="mb-4 text-center">Bubble Bee System</h4>
                  <p class="text-center"> <i>Online loan offering system to buy items <br> and it in installments
                  </i></p>
                  <p class="small mb-0 text-justify">“Bumble bee: Buy first and pay later” is a well reputed online loan providing
                    application. This application lets any person above age 18 to make purchases online within the
                    maximum entry budget up to 15,000LKR.The loan can be paid basically in 3 interest free
                    installments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await axios.post('http://localhost:5000/api/customer/login', this.login);
        let token = response.data[0].tokens.token;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Success", "Login Successful", "success");
          this.$router.push("/customer/dashboard");
        }
      }catch (err){
        swal("Error", "Login failed! Check authentication credentials", "error");
        console.log(err.response);
      }
    }
  }
}
</script>

<style scoped>
.gradient-custom-2 {
  background: #fccb90;
  background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
  background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
}

@media (min-width: 768px) {
  .gradient-form {
    height: 100vh !important;
  }
}

@media (min-width: 769px) {
  .gradient-custom-2 {
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
  }
}
</style>