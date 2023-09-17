<script setup>
    
</script>

<template>
   <div class="alerta">
    <slot></slot> 
   </div>
</template>

<style  scoped>

.alerta{
    text-align: center;
    margin-bottom: 2rem;
    color: #fff;
    background-color: rgb(175, 0, 0);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.4rem;
    padding: .5rem;
}

</style>