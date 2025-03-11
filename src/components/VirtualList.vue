<template>
  <div
      class="virtual-list"
      @scroll="handleScroll"
      :style="{ height: containerHeight + 'px'}"
  >
    <div
        class="list-container"
        :style="{ height: totalHeight + 'px'}"
    >
      <ProductItem
          v-for="item in visibleItems"
          :key="item.id"
          :product="item"
          class="list-item"
          :style="{
          transform: `translateY(${item.offset}px)`,
          height: itemHeight + 'px'
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import ProductItem from './ProductItem.vue';
import { useVirtualList } from '@/composables/useVirtualList';
import { Product } from '@/types';

export default defineComponent({
  name: 'VirtualList',
  components: { ProductItem },
  props: {
    items: {
      type: Array as PropType<Product[]>,
      required: true
    },
    itemHeight: {
      type: Number,
      required: true,
      validator: (h: number) => h > 0
    },
    initialVisibleItemCount: {
      type: Number,
      default: 5,
      validator: (count: number) => count > 0
    }
  },
  setup(props) {
    const containerHeight = computed(() => props.initialVisibleItemCount * props.itemHeight) ;

    const itemsRef = computed(() => props.items);

    const {
      totalHeight,
      visibleItems,
      handleScroll
    } = useVirtualList(
        itemsRef,
        props.itemHeight,
        containerHeight.value,
        3
    );

    return {
      containerHeight,
      totalHeight,
      visibleItems,
      handleScroll
    };
  }
});
</script>

<style scoped>
.virtual-list {
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 8px;

}

.list-container {
  position: relative;
}

.list-item {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box
}
</style>