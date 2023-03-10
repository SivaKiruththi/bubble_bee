<template>
  <section class="h-100 gradient-form" style="background-color: #eee;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-2 mx-md-4">
                  <div class="text-center mt-2 pt-2">
                    <img src="@/assets/images/logo-svg.svg" style="height: 100px;" alt="logo">
                  </div>
                  <form @submit.prevent="registerUser">
                    <div class="form-outline mb-4">
                      <input type="text" id="form2Example22" v-model="register.username" class="form-control" required/>
                      <label class="form-label" for="form2Example22">User Name</label>
                    </div>
                    <div class="form-outline mb-4">
                      <input type="text" id="form2Example22" v-model="register.firstName" class="form-control"
                             required/>
                      <label class="form-label" for="form2Example22">First Name</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="text" id="form2Example22" v-model="register.lastName" class="form-control" required/>
                      <label class="form-label" for="form2Example22">Last Name</label>
                    </div>
                    <div class="form-outline mb-4">
                      <input type="text" id="form2Example22" v-model="register.email" class="form-control" required/>
                      <label class="form-label" for="form2Example22">Email</label>
                    </div>
                    <div class="form-outline mb-4">
                      <input type="date" id="form2Example22" v-model="register.dateOfBirthday" class="form-control"
                             required/>
                      <label class="form-label" for="form2Example22">Date of birthday</label>
                    </div>
                    <div class="form-outline mb-4">
                      <input type="password" id="form2Example22" v-model="register.password" class="form-control"
                             required/>
                      <label class="form-label" for="form2Example22">Password</label>
                    </div>
                    <div class="text-center pt-1 mb-5 pb-1">
                      <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Register
                      </button>
                    </div>
                  </form>
                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <RouterLink to="login">
                      <a type="button" class="btn btn-outline-danger" style="margin-right: 10px">Login </a>
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
                  <h5 class="mb-4 text-center bg-gradient p-3 rounded-5">New Customer Registration</h5>
                  <p class="text-center"><i>Online loan offering system to buy items <br> and it in installments
                  </i></p>
                  <p class="small mb-0 text-justify">“Bumble bee: Buy first and pay later” is a well reputed online loan
                    providing
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
  name: "RegistrationView",
  data() {
    return {
      register: {
        username: "",
        firstName: "",
        lastName: "",
        dateOfBirthday: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async registerUser() {

      let age = Math.floor((new Date() - new Date(this.register.dateOfBirthday)) / 31557600000);

      if (age > 18) {
        try {
          let response = await axios.post('http://localhost:5000/api/customer/registration', this.register);
          let token = response.data[0].tokens.token;

          if (token) {
            localStorage.setItem("jwt", token);
            swal("Success", "Registration Was successful", "success");
            this.$router.push("/customer/dashboard");
          } else {
            swal("Error", "Something Went Wrong", "error");
          }
        } catch (err) {

          swal("Error","Failed to register", "error");

        }
      } else {
        swal("Error", "You are not eligible to signup this system", "error");
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