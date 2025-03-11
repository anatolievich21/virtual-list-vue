<template>
  <div>
    <input
        v-model="searchQuery"
        placeholder="Search products..."
        class="search-input"
    />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <VirtualList
        v-if="!errorMessage && filteredProducts.length"
        :items="filteredProducts"
        :item-height="140"
        :visible-item-count="5"
        :key="searchQuery"
    />
    <p v-else-if="!errorMessage">No products found.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import VirtualList from './VirtualList.vue';
import { useDebounce } from '@/composables/useDebounce';
import { ApiProduct, ApiResponse } from '@/types';

function createDefaultProduct(): ApiProduct {
  return {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    brand: '',
    category: '',
    rating: 0,
    thumbnail: ''
  };
}

export default defineComponent({
  name: 'ProductList',
  components: { VirtualList },
  setup() {
    const products = ref<ApiProduct[]>([]);
    const searchQuery = ref('');
    const errorMessage = ref<string | null>(null);

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const filteredProducts = computed(() => {
      const query = (debouncedSearchQuery.value || '').toLowerCase().trim();
      if (!query) return products.value;

      return products.value.filter(p => {
        const title = p.title?.toLowerCase() || '';
        const brand = p.brand?.toLowerCase() || '';
        const category = p.category?.toLowerCase() || '';

        return title.includes(query) ||
            brand.includes(query) ||
            category.includes(query);
      });
    });

    onMounted(async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data: ApiResponse = await response.json();

        products.value = Array.from({ length: 10000 }, (_, index) => {
          const baseProduct: ApiProduct = data.products[index % 100] || createDefaultProduct();
          return {
            id: index + 1,
            title: baseProduct.title,
            description: baseProduct.description,
            price: baseProduct.price,
            discountPercentage: baseProduct.discountPercentage,
            brand: baseProduct.brand,
            category: baseProduct.category,
            rating: baseProduct.rating,
            thumbnail: baseProduct.thumbnail,
          };
        });
      } catch (error) {
        console.error('Error loading products:', error);
        errorMessage.value = 'Failed to load products. Please try again later.';
      }
    });

    return { searchQuery, filteredProducts, errorMessage };
  }
});
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  box-sizing: border-box;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s ease;

}

.search-input:focus {
  border-color: #42b983;
  outline: none;
}

.error-message {
  color: red;
  margin-bottom: 16px;
}
</style>