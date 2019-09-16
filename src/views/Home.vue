<template>
  <div class="home">
    <Stepper step="1"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Stepper from '@/components/Stepper.vue'

export default {
  name: 'home',
  components: {
    Stepper
  }
}
</script>
