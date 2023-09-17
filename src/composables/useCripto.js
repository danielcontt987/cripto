import { ref, onMounted, computed } from 'vue';

export default function useCripto() {

    const criptoCoins = ref([]);
    const cotizacion = ref({});
    const cargando = ref(false);

    const monedas = ref([
        { codigo: 'USD', texto: "Dólar Americano" },
        { codigo: 'MXN', texto: "Peso Mexicano" },
        { codigo: 'EUR', texto: "Euro" },
        { codigo: 'GBP', texto: "Libra Esterlina" }
    ]);

    //methods

    const obtenerCotizacion = async (cotizar) => {
        cargando.value = true;
        const {criptomoneda, moneda} = cotizar
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const res = await fetch(url);
        const data = await res.json();
        cotizacion.value = data.DISPLAY[criptomoneda][moneda] 
        cargando.value = false;
    }

    //Mounted

    onMounted(() => {
        fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD')
            .then(res => res.json())
            .then(({ Data }) => criptoCoins.value = Data)
    })

    // computed

    const mostrarCotizacion = computed(() => {
        return Object.values(cotizacion.value).length > 0;
  });
  

    return {
        monedas,
        criptoCoins,
        cotizacion,
        cargando,
        mostrarCotizacion,
        obtenerCotizacion,
    }
}