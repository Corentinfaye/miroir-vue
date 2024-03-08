<template>
  <footer class="footer">
    <div class="content has-text-centered is-flex">
      <a
        target="_blank"
        href="https://www.chartes.psl.eu/"
      >
        <img
        class="enc-logo"
        alt="Logo de l'École nationale des chartes"
        src="@/assets/images/footer_logo.png"
        />
      </a>
      <a
        target="_blank"
        href="https://biblissima.fr/"
      >
        <img
          class="biblissima-logo"
          alt="Logo de Biblissima+"
          src="@/assets/images/biblissima-logo.png"
        />
      </a>
      <a
        target="_blank"
        href="https://www.huma-num.fr/"
      >
        <img
          class="humanum-logo"
          alt="Logo de Huma-num"
          src="@/assets/images/humanum-logo.png"
        />
      </a>
    </div>
  </footer>
</template>
<style>
.footer {
  background-color: #4C4949;
  border-top: #BA0F29 solid 4px;
  max-height: 400px;
  text-align: center;
  padding: 50px 10%;
  transform: rotateZ(0);
}
.footer .content {
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.enc-logo {
  width: auto;
  height: 70px;
}
.biblissima-logo {
  width: auto;
  height: 70px;
}
.humanum-logo {
  width: auto;
  height: 70px;
}
@media screen and (max-width: 800px) {
  .footer {
    padding: 50px 10% 80px !important;
  }
  .footer .content {
    flex-direction: column;
    gap: 50px;
  }
}
@media screen and (max-width: 640px) {
  .footer {
    padding: 30px 10% 50px !important;
    height: 200px;
  }
  .enc-logo {
    height: 40px;
  }
  .humanum-logo {
    height: 40px;
  }
}
</style>
<script setup>
</script>