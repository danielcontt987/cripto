<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import Alerta from './components/Alert.vue';
import SpinnerVue from './components/Spinner.vue';
import useCripto from './composables/useCripto.js'
import Cotizacion from './components/Cotizacion.vue';


// Variables

const error = ref('');

const cotizar = reactive({
  criptomoneda: '',
  moneda: '',
});



// Methods
const cotizarCripto = () => {
  if (Object.values(cotizar).includes('')) {
    error.value = 'Todos los campos son requeridos';
    return;
  }
  error.value = '';
  obtenerCotizacion(cotizar);
}

//Composables
const {monedas, criptoCoins, cotizacion, cargando, mostrarCotizacion, obtenerCotizacion} = useCripto()


</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <alerta v-if="error">{{ error }}</alerta>
      <form class="formulario" @submit.prevent="cotizarCripto">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select v-model="cotizar.moneda" id="moneda">
            <option value="">--Selecciona---</option>
            <option v-for="moneda in monedas" :key="moneda.codigo" :value="moneda.codigo">{{ moneda.texto }}</option>
          </select>
        </div>
        <div class="campo">
          <label for="moneda">Criptomoneda:</label>
          <select v-model="cotizar.criptomoneda" id="cripto">
            <option value="">--Seleccionar---</option>
            <option v-for="cripto in criptoCoins" :key="cripto.CoinInfo.Id" :value="cripto.CoinInfo.Name">{{
              cripto.CoinInfo.FullName }}</option>
          </select>
        </div>
        <input type="submit" value="Cotizar">
      </form>
      <spinner-vue v-if="cargando"/>
      <cotizacion 
          v-if="mostrarCotizacion"
          :cotizacion="cotizacion"
      />
    </div>
  </div>
</template>