<template>
  <div>
    <main class="main-content">
      <FeaturedRestaurants />

      <section class="container-hero">
        <div class="hero">
          <h1>Peça sua comida favorita sem sair de casa</h1>
          <p>Entrega rápida, pratos variados e promoções exclusivas.</p>
        </div>

        <AppButton text="Pedir agora" path="/buscar" icon="radix-icons:arrow-right" />
      </section>

      <section class="showcase">
        <h2>Seu restaurante favorito a um clique</h2>
        <FeaturedProducts :products="products"/>
      </section>
    </main>
  </div>
  <MainFooter />

</template>

<script setup>
import FeaturedRestaurants from '@/components/restaurant/FeaturedRestaurants.vue';
import FeaturedProducts from '@/components/ui/FeaturedProducts.vue'
import AppButton from '@/components/ui/AppButton.vue';
import MainFooter from '@/components/ui/MainFooter.vue'

const products = [
  {
    id: 1007,
    restaurant_id: 1,
    name: "Combo Mix",
    duration: "35",
    base_price: 34.99,
    description: "Escolha uma pizza média e um açaí de 500ml",
    image: "https://scontent.fpcs1-1.fna.fbcdn.net/v/t39.30808-6/483665471_2986263421524920_120209351972226674_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=S2KUYM0aHvIQ7kNvwEIfgPL&_nc_oc=AdnpYq1ON08HW2Tn6B3YPsjJ3weYfZQy6IiHm6D7V_1s5cyR2E9Jdg3F68QmPTolr80JUf89f7LasFNkFx-S9fvw&_nc_zt=23&_nc_ht=scontent.fpcs1-1.fna&_nc_gid=3Xe5DdBg0mJPA61BFfXjXg&oh=00_AfXO1stH2sRYYy_pQOumQSSBnf3IMZrgZcYUTmTyH2pxaw&oe=68A2851F",
    category: "Pizza",
    rating: 4.5,
  },
  {
    id: 3001,
    restaurant_id: 2,
    name: "Combo Angus",
    base_price: 39.99,
    duration: "8-12",
    description: "Hambúrguer artesanal + batata + refri",
    image: "https://www.cidadeoferta.com.br/storage/offers/9255-combo-angus-bacon-2.jpg",
    category: "Combo",
    rating: 4.9,
  },
  {
    id: 3102,
    restaurant_id: 3,
    name: "Açaí 500ml",
    duration: "10",
    base_price: 14.00,
    description: "Açaí cremoso com até 4 adicionais",
    image: "https://flordejambu.com/wp-content/uploads/2022/05/acai.png",
    category: "Açaí",
    rating: 4.9,
    modifier_groups: [
      {
        id: 8002,
        name: "Escolha até 4 adicionais",
        type: "product",
        input_type: "quantity",
        min: 0,
        max: 4,
        free_limit: 2,
        modifiers: [
          {
            id: 8101,
            name: "Granola",
            image: "https://conteudo.imguol.com.br/c/entretenimento/20/2017/11/10/granola-1510338231101_v2_450x450.jpg",
            base_price: 2.00
          },
          {
            id: 8102,
            name: "Leite em pó",
            image: "https://ecila.com.br/wp-content/uploads/2018/01/leite-em-po.png",
            base_price: 1.00
          },
          {
            id: 8103,
            name: "Paçoca",
            image: "https://revistaabm.com.br/storage/2019/06/19/029bd48170e74f21fe9f86e711964fe54fb2c959.jpg",
            base_price: 1.50
          },
          {
            id: 8104,
            name: "Banana",
            image: "https://cdn.pixabay.com/photo/2018/01/03/09/09/bananas-3050728_1280.jpg",
            base_price: 2.00
          }
        ]
      }
    ]
  }
]
</script>

<style scoped>
.main-content {
  padding: 2rem;
  text-align: center;
  background-color: var(--bg-color);
}

.container-hero {
  background-color: #f9fafb;
  padding: 3rem;
}
.hero {
  margin-bottom: 3rem;
}

.hero h1 {
  color: var(--color-text);
}

.hero p {
  color: var(--color-text);
}

.showcase h2 {
  color: var(--color-black);
  margin-bottom: 1.5rem;
}

@media (max-width: 758px){
  .main-content {
    padding: 0;
  }

  .hero h1 {
    font-size: 1.5rem;
  }

  .hero p {
    font-size: 0.7rem;
  }

  .showcase h2 {
    font-size: 1.2rem;
  }

  .container-hero {
    padding: 1rem 0;
  }
}
</style>
