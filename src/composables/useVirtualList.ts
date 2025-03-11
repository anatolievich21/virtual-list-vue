import { computed, ref, type Ref } from 'vue';

export function useVirtualList<T>(
    items: Ref<T[]>,
    itemHeight: number,
    containerHeight: number,
    buffer = 3
) {
    const scrollTop = ref(0);

    const totalHeight = computed(() => items.value.length * itemHeight);

    const startIndex = computed(() =>
        Math.max(0, Math.floor(scrollTop.value / itemHeight) - buffer)
    );

    const endIndex = computed(() =>
        Math.min(
            items.value.length,
            Math.ceil((scrollTop.value + containerHeight) / itemHeight) + buffer
        )
    );

    const visibleItems = computed(() =>
        items.value.slice(startIndex.value, endIndex.value).map((item, index) => ({
            ...item,
            offset: (startIndex.value + index) * itemHeight,
        }))
    );

    const handleScroll = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target) {
            scrollTop.value = target.scrollTop;
        }
    };

    return {
        totalHeight,
        visibleItems,
        handleScroll,
    };
}