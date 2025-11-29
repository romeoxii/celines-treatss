<!-- eslint-disable vue/multi-word-component-names -->
<script setup></script>

<template>
    <footer class="min-h-22 w-full primary-bg center">
        <div class="h-full w-full col-center bg-white p-2 shadow">
            <div
                class="flex sm:flex-row flex-col sm:items-center md:justify-around md:w-[70%] w-full h-full"
            >
                <div class="flex flex-col items-start justify-start md:w-1/2 h-full">
                    <img
                        src="/Images/celines-treats-logo.svg"
                        alt="Celine\'s Treats"
                        class="h-10"
                    />

                    <p class="text-[10px] font-light pl-3">
                        Complete your order with awesome flavors from us.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row md:items-center justify-evenly w-full">
                    <div class="space-y-1 p-4">
                        <h4 class="md:font-medium md:text-md">Shop</h4>
                        <a
                            class="text-[12px] font-light hover hover:text-blue-500/90"
                            href="https://celines-treatss.vercel.app/shop"
                            target="_self"
                            >All Products</a
                        >
                    </div>
                    <div class="space-y-1 p-4">
                        <h4 class="md:font-medium md:text-md">Contact</h4>
                        <a
                            class="text-[12px] font-light hover hover:text-blue-500/90"
                            href="https://celines-treatss.vercel.app/contact"
                            target="_self"
                            >Contact us</a
                        >

                        <p class="text-[12px] font-light hover:text-blue-500/90">FAQ</p>
                    </div>

                    <div class="space-y-1 p-4">
                        <h4 class="md:font-medium md:text-md">Legal</h4>
                        <p class="text-[13px] font-light hover:text-blue-500/90">Privacy Policy</p>
                        <p class="text-[13px] font-light hover:text-blue-500/90">
                            Terms of Service
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-full font-light lg:text-sm lg:font-normal">
                <hr class="text-[#bdd2ff]" />
                <div class="center w-full min-h-10 font-light text-xs hover:text-blue-500/90">
                    <p>&copy; 2025 Celine's Treats. Simple, quality, essential.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.logo-link img {
    transition: opacity 0.2s ease;
}

.logo-link:hover img {
    opacity: 0.7;
}
</style>
