import {computed, onMounted, onUnmounted, ref} from "vue";

export function windowUtils() {

    const windowWidth = ref(window.innerWidth)

    const isDesktopOrLarger = computed(()=>{
        return windowWidth.value >= 1200
    })

    function handleResize(){
        windowWidth.value = window.innerWidth
    }

    onMounted(()=> {
        window.addEventListener('resize', handleResize)
    })

    onUnmounted(()=> {
        window.removeEventListener('resize', handleResize)
    })

    return {
        windowWidth, isDesktopOrLarger
    }
}