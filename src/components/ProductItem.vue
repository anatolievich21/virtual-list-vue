<template>
  <article class="product-item">
    <div class="image-wrapper">
      <img
          :src="product.thumbnail"
          :alt="product.title"
          class="product-thumbnail"
          :class="{ loaded: imageLoaded }"
          loading="lazy"
          @load="onImageLoad"
      >
      <div v-if="!imageLoaded" class="image-placeholder"></div>
    </div>

    <div class="product-details">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-description">{{ truncateDescription }}</p>

      <div class="product-meta">
        <span class="product-discount">Discount {{ product.discountPercentage }}%</span>
        <span class="product-brand">{{ product.brand }}</span>
      </div>

      <div class="product-info">
        <span class="product-price">${{ formattedPrice }}</span>
        <span class="product-rating" v-if="product.rating !== undefined && product.rating !== null">
          {{ formattedRating }}
        </span>
        <span class="product-category">{{ product.category }}</span>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue';
import { Product } from '@/types';

export default defineComponent({
  name: 'ProductItem',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    }
  },
  setup(props) {
    const imageLoaded = ref(false);

    const onImageLoad = () => {
      imageLoaded.value = true;
    };

    const formattedPrice = computed(() =>
        props.product.price?.toFixed(2)
    );

    const formattedRating = computed(() =>
        props.product.rating?.toFixed(2)
    );

    const truncateDescription = computed(() => {
      const maxLength = 100;
      const description = props.product.description || '';
      if (description.length <= maxLength) {
        return description;
      }
      let lastSpaceIndex = description.lastIndexOf(' ', maxLength);

      let truncated = '';

      if(lastSpaceIndex !== -1){
        truncated = description.substring(0, lastSpaceIndex)
      }
      else{
        truncated = description.substring(0, maxLength);
      }

      return truncated + '...';
    });

    return {
      imageLoaded,
      onImageLoad,
      formattedPrice,
      formattedRating,
      truncateDescription
    };
  }
});
</script>

<style scoped>
.product-item {
  display: flex;
  gap: 16px;
  padding: 8px;
  background: #fff;
  border-bottom: 1px solid #eee;
  contain: content;
}

.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  width: 180px; /* Збільшили ширину */
  height: 125px; /* Залишаємо висоту незмінною */
  position: relative;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f8f8, #e0e0e0);
}

.product-thumbnail {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-thumbnail.loaded {
  opacity: 1;
}

.product-details {
  flex: 1;
  min-width: 0;

  flex-direction: column;
  justify-content: space-between;
}

.product-title {
  font-size: 16px;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000000;
  margin: 0 0 5px 0;
}

.product-description {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin: 0 0 5px 0;
  max-width: 90%;
}

.product-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 5px;
}

.product-discount {
  color: #dc3545;
  font-size: 13px;
  font-weight: 800;
}

.product-brand {
  color: #2b8f92;
  font-size: 14px;
  font-weight: 700;
}
.product-info{
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.product-price {
  color: #2b8f92;
  font-size: 14px;
  font-weight: 700;
}

.product-rating {
  color: #2b8f92;
  font-size: 14px;
  font-weight: 700;
}

.product-rating::before {
  content: "⭐";
  margin-right: 1px;

}

.product-category {
  font-size: 12px;
  color: #2ea247;
  background-color: #0f2a15;
  padding: 4px 8px;
  border-radius: 16px;
}
</style>