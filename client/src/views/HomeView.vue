<template>
  <section class="h-100 gradient-form" style="background-color: #eee;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-5">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <img src="@/assets/images/logo-svg.svg" style="height: 145px;" alt="logo">
                    <h4 class="mb-2 text-center">Bubble Bee System</h4>
                    <p class="text-center mb-5">Buy First & Pay Later
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <RouterLink to="admin/login">
                      <a type="button" class="btn btn-outline-danger" style="margin-right: 10px">Login as admin </a>
                    </RouterLink>
                    <RouterLink to="customer/login">
                      <a type="button" class="btn btn-outline-danger">Login as customer</a>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

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