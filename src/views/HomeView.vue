<script setup>
import { onMounted, computed } from 'vue';

import pastries from '@/data/pastries.json';

const currentPasteries = computed(() => {
    return pastries['items'] || [];
});

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        },
        { threshold: 0.1 },
    );

    document
        .querySelectorAll('.fade-in, .slide-in-right, .slide-in-left')
        .forEach((el) => observer.observe(el));
});
</script>

<template>
    <div class="min-h-screen w-full col-center">
        <div
            class="center lg:h-screen w-full h-[500px] relative text-[#e8e8e8] bg-center bg-cover"
            style="background-image: url('/ImagesWebp/bg-img.webp')"
        >
            <div class="inset-0 absolute bg-black/60 z-10"></div>
            <div class="e w-full h-full z-50 center">
                <div class="col-center text-center space-y-2">
                    <div class="fade-in space-y-2">
                        <h1 class="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-medium mb-1">
                            Celine's Treats
                        </h1>
                        <h2 class="text-xl md:text-3xl">Simple. Quality. Essential</h2>
                        <p class="md:text-sm text-xs md:px-3 px-6 text-[#f4f4f4]">
                            <i
                                >Turning simple beginings into timeless flavors, one pastry at a
                                time...</i
                            >
                        </p>
                    </div>
                    <RouterLink
                        to="/shop"
                        class="md:px-3 px-2 py-1 border border-white/30 rounded-lg hover:text-black backdrop-blur-3xl md:text-base hover flex items-center hover:bg-[#d0d0d032] gap-1"
                        >SHOP NOW
                        <span
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentcolor"
                                class="bi bi-arrow-right"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                /></svg></span
                    ></RouterLink>
                </div>
            </div>
        </div>

        <div class="col-center w-full min-h-96 primary-bg">
            <section class="min-h-96 w-full py-5 md:py-16 px-1">
                <div class="col-center h-full md:p-5 md:py-0 px-0 py-5 space-y-8">
                    <h2 class="sm:text-[2.5rem] text-2xl fade-in font-sans font-medium">
                        Why Choose Us?
                    </h2>
                    <section class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                        <div
                            id="trd"
                            class="h-72 flex flex-col justify-between items-center space-y-5 max-w-[350px] px-2 py-4 text-center shadow-xs rounded-2xl fade-in prod-cards"
                        >
                            <div
                                class="group h-24 w-24 rounded-full flex items-center justify-center bg-blue-100 hover:bg-[#3B82F6E6] transition-transform duration-700 hover:scale-x-[-1] text-[#3B82F6E6] hover:text-blue-100"
                                id="trdd"
                            >
                                <span class="text-4xl mt-2 transition-transform duration-700 in"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="45"
                                        height="45"
                                        viewBox="0 0 24 24"
                                    >
                                        <g fill="none" fill-rule="evenodd">
                                            <path
                                                d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M14.194 2.885c2.3-.299 4.458.21 5.645 1.397c.79.791 1.18 1.711 1.16 2.72c-.017.961-.405 1.894-.938 2.764c-.762 1.245-1.952 2.563-3.27 3.915l-.729.74l-1.616 1.617l-.691.682c-1.378 1.346-2.722 2.566-3.989 3.341c-.87.533-1.803.92-2.764.939c-1.009.02-1.929-.37-2.72-1.161c-1.187-1.187-1.696-3.344-1.397-5.645c.307-2.36 1.471-5.035 3.872-7.437c2.402-2.4 5.078-3.565 7.437-3.872m-8.503 8.78a9.8 9.8 0 0 0-.742 2.283q.631.541 1.492.83a1 1 0 0 0 .633-1.898c-.667-.222-1.112-.612-1.383-1.216Zm3-3.986a14 14 0 0 0-1.406 1.468c.194.251.406.489.621.704c.585.584 1.333 1.145 2.07 1.39a1 1 0 0 0 .742-1.854l-.109-.043c-.323-.107-.812-.43-1.288-.907a5 5 0 0 1-.63-.758m4.42-2.53c-.618.178-1.259.43-1.907.768c.52.847 1.299 1.452 2.308 1.789a1 1 0 1 0 .633-1.897c-.434-.145-.774-.36-1.034-.66"
                                            />
                                        </g></svg
                                ></span>
                            </div>
                            <div class="space-y-2">
                                <h3 class="text-[1.5rem]">Fresh Out the Oven</h3>
                                <p class="text-[0.8rem]">
                                    We don't do day-old. Every pastry is baked the same day you get
                                    it — soft, warm, and full of flavor.
                                </p>
                            </div>
                        </div>
                        <div
                            class="h-72 flex flex-col justify-between items-center space-y-5 max-w-[350px] px-2 py-4 text-center shadow-xs rounded-2xl fade-in prod-cards bg-blue-400 hover:bg-white hover:text-neutral-600 text-white"
                            id="sec"
                        >
                            <div
                                id="secd"
                                class="group h-24 w-24 rounded-full flex items-center justify-center bg-[#FFF] hover:bg-blue-100 transition-transform duration-700 hover:scale-x-[-1] text-[#3B82F6E6]"
                            >
                                <span class="text-4xl mt-2 transition-transform duration-700 in"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="45"
                                        height="45"
                                        viewBox="0 0 24 24"
                                    >
                                        <g fill="none" fill-rule="evenodd">
                                            <path
                                                d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M16.617 3a2 2 0 0 1 1.985 1.752L18.758 6h.668a2.29 2.29 0 0 1 2.246 2.74l-.201 1.005a4.05 4.05 0 0 1-2.972 3.13a7.18 7.18 0 0 1-5.5 4.056V19h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-2.069a7.18 7.18 0 0 1-5.498-4.056a4.05 4.05 0 0 1-2.972-3.13l-.201-1.006A2.29 2.29 0 0 1 4.574 6h.668l.156-1.248A2 2 0 0 1 7.383 3zm0 2H7.383L6.86 9.178a5.18 5.18 0 1 0 10.28 0zm2.81 3h-.42l.117.93q.075.61.05 1.203q.197-.276.294-.61l.042-.17l.2-1.006a.29.29 0 0 0-.217-.34zM4.991 8h-.418a.29.29 0 0 0-.285.347l.201 1.005c.058.289.174.553.336.78q-.025-.592.05-1.202z"
                                            />
                                        </g></svg
                                ></span>
                            </div>
                            <div class="space-y-2">
                                <h3 class="text-[1.5rem]">Quality You Can Taste</h3>
                                <p class="text-[0.8rem]">
                                    From real butter to rich chocolate, we use ingredients that
                                    actually make a difference in every bite.
                                </p>
                            </div>
                        </div>
                        <div
                            id="trd"
                            class="h-72 flex flex-col justify-between items-center space-y-5 max-w-[350px] px-2 py-4 text-center shadow-xs rounded-2xl fade-in prod-cards"
                        >
                            <div
                                class="group h-24 w-24 rounded-full flex items-center justify-center bg-blue-100 hover:bg-[#3B82F6E6] transition-transform duration-700 hover:scale-x-[-1] text-[#3B82F6E6]"
                                id="trdd"
                            >
                                <span class="transition-transform duration-700 text-4xl mt-2 in"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="45"
                                        height="45"
                                        viewBox="0 0 24 24"
                                    >
                                        <g fill="none">
                                            <path
                                                d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M9.498 5.793c1.42-1.904 3.555-2.46 5.519-1.925c2.12.577 3.984 2.398 4.603 4.934q.048.195.083.39a4.45 4.45 0 0 0-2.774-.07c-1.287-.952-2.881-1.112-4.298-.59c-1.775.655-3.161 2.316-3.482 4.406c-.41 2.676 1.22 5.08 3.525 7.124l.388.336c-.313.022-.631-.027-.935-.092a10 10 0 0 1-.466-.112l-.537-.15C6.35 18.701 3.154 16.6 2.237 13.46c-.732-2.506-.028-5.015 1.52-6.575c1.434-1.445 3.56-2.031 5.741-1.092m1.628 7.448c.428-2.792 3.657-4.168 5.315-1.772a.104.104 0 0 0 .144.025c2.377-1.684 4.94.713 4.387 3.483q-.48 2.41-4.47 4l-.435.17l-.263.108c-.227.089-.467.16-.684.122c-.216-.038-.417-.188-.6-.348l-.31-.28q-3.47-2.986-3.084-5.508"
                                            />
                                        </g></svg
                                ></span>
                            </div>
                            <div class="space-y-2">
                                <h3 class="text-[1.5rem]">Made with Love</h3>
                                <p class="text-[0.8rem]">
                                    We love what we bake — and it shows. Every pastry's made to
                                    bring a little happiness your way.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <section
                id="About"
                class="fade-in min-h-[300px] w-full flex flex-col items-center gap-3 p-4 secondary-bg"
            >
                <h1 class="text-center text-4xl md:text-5xl lg:text-6xl py-4 fade-in font-sans">
                    About Celine's treats
                </h1>
                <div
                    class="flex md:flex-row gap-5 flex-col items-center justify-evenly space-y-4 w-full lg:w-[70%] xl:w-[60%] py-4 h-full"
                >
                    <div
                        class="h-full flex justify-center w-[70%] sm:w-[50%] md:w-[35%] transition-transform duration-500 ease-in-out transform hover:scale-105"
                    >
                        <img
                            src="/ImagesWebp/celine-2.webp"
                            alt="CEO"
                            class="h-80 w-full border rounded-br-3xl rounded-tl-3xl"
                        />
                    </div>
                    <div class="w-full md:w-1/2 slide-in-right">
                        <p class="md:text-base text-sm text-center">
                            <span class="text-lg">&quot;</span>I never actually planned on starting
                            a business. Most times when I get an idea, I focus too much on the big
                            picture — the finished product I imagine, that often made me stall, and
                            many of my ideas ended up being set aside, but this time was different.
                            When the idea for Celine’s Treats came, I realized that big things
                            happen when you’re bold enough to start small, so here I am. I’ve always
                            been passionate about pastries and food. In a world where so many things
                            come and go, food remains — it brings comfort, joy, and connection. For
                            me, pastries are more than just desserts; they’re little pieces of
                            happiness, and through Celine’s Treats, I want to share that happiness
                            with as many people as possible.<span class="text-xl">&quot;</span>
                        </p>
                    </div>
                </div>
            </section>
            <section class="min-h-92 w-full center py-5 md:py-10 secondary-bg">
                <div class="col-center w-[88%] sm:w-[90%] xl:w-[80%] h-full space-y-5 p-2">
                    <h3 class="sm:text-[2.5rem] text-2xl font-medium text-center font-sans">
                        Featured Products
                    </h3>
                    <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full">
                        <div
                            v-for="items in currentPasteries"
                            :key="items.id"
                            class="fade-in prod-cards hover w-full rounded-xl p-2 shadow min-h-68"
                        >
                            <img
                                :src="items.img"
                                :alt="items.name"
                                class="h-52 w-full rounded-t-xl"
                            />
                            <div
                                class="pt-2 pb-1 flex lg:flex-row flex-col lg:space-y-0 space-y-2 lg:items-center justify-between w-full"
                            >
                                <div>
                                    <p class="text-[14px]">{{ items.name }}</p>
                                    <p class="text-xs font-light">
                                        {{ items.price.toLocaleString() }}
                                    </p>
                                </div>
                                <button class="px-3 py-2 rounded-3xl btn-1 hover text-sm">
                                    <RouterLink to="/shop">Shop Now</RouterLink>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
#sec {
    background: #60a5fa;
}

#sec:hover {
    background: #fff;
}

#sec:hover > #secd {
    background: #60a5fa;
}
#sec:hover > #secd > .in {
    color: #fff;
}
#trd {
    background: #fff;
}

#trd:hover {
    background: #60a5fa;
    color: #fff;
}

#trd:hover > #trdd {
    background: #fff;
}
#trd:hover > #trdd > .in {
    color: #60a5fa;
}

.prod-cards {
    background-color: #ffffff;
    /* border: 2px solid #dfdfdf;*/
    /* box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2); */
}

.prod-cards:hover {
    cursor: pointer;
    /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
    /* border: 1px solid #5b95f2e6; */
    transform: translateY(-5px);
}

.slide-in-left {
    opacity: 0;
    transform: translateY(-50px); /* negative for left */
    transition:
        opacity 0.8s ease-out,
        transform 0.8s ease-out;
}

.slide-in-left.show {
    opacity: 1;
    transform: translateX(0);
}

.slide-in-right {
    opacity: 0;
    transform: translateY(50px); /* positive for right */
    transition:
        opacity 0.8s ease-out,
        transform 0.8s ease-out;
}

.slide-in-right.show {
    opacity: 1;
    transform: translateX(0);
}

.cards {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    transition: all 0.3s ease;
}
</style>
