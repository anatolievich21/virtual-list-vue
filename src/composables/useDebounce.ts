import { ref, watch, type Ref } from 'vue';

export function useDebounce<T>(value: Ref<T>, delay = 900): Ref<T> {
    const debouncedValue = ref(value.value) as Ref<T>;
    let timeoutId: number;

    watch(value, (newValue) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            debouncedValue.value = newValue;
        }, delay);
    });

    return debouncedValue;
}