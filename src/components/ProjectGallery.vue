<template>
    <div class="project-container mb-16 card p-4">
        <!-- Section existante avec Swiper et description -->
        <div class="h-[400px] mt-4 flex justify-between items-center gap-4 flex-wrap">
            <Swiper :pagination="{ clickable: true }" :modules="[Pagination, Autoplay]" class="mySwiper card p-4"
                :loop="true" :autoplay="{ delay: 2500 }" navigation>
                <SwiperSlide v-for="(img, index) in images" :key="index">
                    <div class="relative group overflow-hidden rounded-lg shadow-md">
                        <img :src="img" :alt="`${title} capture ${index + 1}`"
                            class="w-full h-auto cursor-pointer transition-transform duration-300 group-hover:scale-105"
                            @click="$emit('open-image', img)" />
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all">
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div class="flex justify-center card h-auto w-1/3">
                <p class="flex flex-col items-center p-6 text-gray-600">
                    <span class="text-lg not-even:text-gray-800">- {{ title }} -</span>
                    <span>{{ description }}</span>
                </p>
            </div>
        </div>

        <!-- NOUVEAU : Section Démo Interactive -->
        <div class="demo-section mt-8">
            <div class="demo-header p-8">
                <h3 class="text-xl font-semibold text-gray-600"></h3>
                <button @click.stop="toggleDemo" class="demo-toggle-btn">
                    {{ showDemo ? 'Masquer la démo' : 'Voir la démo en action' }}
                    <span class="ml-1">{{ showDemo ? '▲' : '▼' }}</span>
                </button>
            </div>

            <transition enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 transform -translate-y-4"
                enter-to-class="opacity-100 transform translate-y-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 transform translate-y-0"
                leave-to-class="opacity-0 transform -translate-y-4">
                <div v-if="showDemo" class="demo-wrapper border rounded-xl overflow-hidden shadow-lg">
                    <!-- Différentes démos selon le projet -->
                    <div class="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2">
                        <span class="text-white text-sm font-mono">Live Demo • {{ title }}</span>
                    </div>

                    <!-- Démo FID-CONNECT (Dashboard) -->
                    <div v-if="demoType === 'fid-connect'" class="p-6 bg-gray-50">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800">Simulateur de Dashboard</h4>
                                <div class="bg-white p-4 rounded-lg shadow">
                                    <div class="text-sm text-gray-600">Chiffre d'affaires</div>
                                    <div class="text-2xl font-bold text-violet-600">{{ formatCurrency(demoData.revenue)
                                        }}</div>
                                    <input type="range" v-model="demoData.revenue" min="0" max="100000" step="1000"
                                        class="w-full mt-2">
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow">
                                    <div class="text-sm text-gray-600">Clients actifs</div>
                                    <div class="text-2xl font-bold text-violet-600">{{ demoData.clients }}</div>
                                    <input type="range" v-model="demoData.clients" min="0" max="500"
                                        class="w-full mt-2">
                                </div>
                            </div>
                            <div class="bg-white p-4 rounded-lg shadow">
                                <h4 class="font-bold mb-3">Performances</h4>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span>Taux de croissance</span>
                                        <span class="font-semibold text-green-600">+{{ growthRate }}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-green-500 rounded-full h-2" :style="{ width: growthRate + '%' }">
                                        </div>
                                    </div>
                                </div>
                                <button @click="simulateAction"
                                    class="mt-4 w-full bg-violet-500 text-white py-2 rounded hover:bg-violet-600 transition">
                                    Actualiser les données
                                </button>
                                <p v-if="actionMessage" class="text-sm text-green-600 mt-2 text-center">{{ actionMessage
                                    }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Démo QCP (Calculateur d'amortissement) -->
                    <div v-else-if="demoType === 'qcp'" class="p-6 bg-gray-50">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800">Simulateur de crédit</h4>
                                <div>
                                    <label class="text-sm text-gray-600">Montant du prêt</label>
                                    <input type="range" v-model="loan.amount" min="5000" max="500000" step="5000"
                                        class="w-full">
                                    <div class="text-right font-semibold">{{ formatCurrency(loan.amount) }}</div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-600">Taux d'intérêt (%)</label>
                                    <input type="range" v-model="loan.rate" min="1" max="15" step="0.1" class="w-full">
                                    <div class="text-right font-semibold">{{ loan.rate }}%</div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-600">Durée (années)</label>
                                    <input type="range" v-model="loan.years" min="1" max="30" class="w-full">
                                    <div class="text-right font-semibold">{{ loan.years }} ans</div>
                                </div>
                            </div>
                            <div class="bg-white p-4 rounded-lg shadow">
                                <h4 class="font-bold mb-3">Résultats</h4>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span>Mensualité</span>
                                        <span class="font-bold text-violet-600">{{ formatCurrency(monthlyPayment)
                                            }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Total payé</span>
                                        <span>{{ formatCurrency(totalPayment) }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Intérêts totaux</span>
                                        <span class="text-orange-600">{{ formatCurrency(totalInterest) }}</span>
                                    </div>
                                </div>
                                <div class="mt-4 pt-3 border-t">
                                    <div class="text-sm text-gray-600">Amortissement</div>
                                    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                        <div class="bg-violet-500 rounded-full h-2"
                                            :style="{ width: amortizationPercent + '%' }"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Démo NURSES (Réservation) -->
                    <div v-else-if="demoType === 'nurses'" class="p-6 bg-gray-50">
                        <div class="max-w-md mx-auto">
                            <h4 class="font-bold text-gray-800 mb-4">Simulateur de réservation</h4>
                            <div class="space-y-4">
                                <div>
                                    <label class="text-sm text-gray-600">Nombre de personnes</label>
                                    <input type="number" v-model="booking.guests" min="1" max="50"
                                        class="w-full p-2 border rounded">
                                </div>
                                <div>
                                    <label class="text-sm text-gray-600">Date</label>
                                    <input type="date" v-model="booking.date" :min="minDate"
                                        class="w-full p-2 border rounded">
                                </div>
                                <div>
                                    <label class="text-sm text-gray-600">Service</label>
                                    <select v-model="booking.service" class="w-full p-2 border rounded">
                                        <option value="midi">Déjeuner (12h-14h)</option>
                                        <option value="soir">Dîner (19h-22h)</option>
                                        <option value="vip">VIP (service exclusif)</option>
                                    </select>
                                </div>
                                <button @click="makeReservation"
                                    class="w-full bg-violet-500 text-white py-2 rounded hover:bg-violet-600 transition">
                                    Réserver (démo)
                                </button>
                                <div v-if="reservationMessage"
                                    :class="['p-3 rounded text-center', reservationMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
                                    {{ reservationMessage }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Démo générique pour autres projets -->
                    <div v-else class="p-6 bg-gray-50">
                        <div class="text-center">
                            <div class="text-6xl mb-4">🚀</div>
                            <h4 class="font-bold text-gray-800 mb-2">Démo en cours de développement</h4>
                            <p class="text-gray-600">Une version interactive sera bientôt disponible pour ce projet.</p>
                            <button @click="notifyDemo"
                                class="mt-4 bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 transition">
                                Être notifié
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useToast } from 'vue-toastification';

const props = defineProps<{
    images: string[],
    title: string,
    description: string
}>();

const emit = defineEmits<{
    (e: 'open-image', img: string): void
}>();

const toast = useToast();
const showDemo = ref(false);

// Fonction toggle explicite
const toggleDemo = () => {
    console.log('Toggle demo clicked', showDemo.value);
    showDemo.value = !showDemo.value;
};

// Déterminer le type de démo selon le titre
const demoType = computed(() => {
    const title = props.title.toLowerCase();
    if (title.includes('fid') || title.includes('connect')) return 'fid-connect';
    if (title.includes('qcp')) return 'qcp';
    if (title.includes('nurses') || title.includes('souper')) return 'nurses';
    return 'generic';
});

// Données pour FID-CONNECT
const demoData = ref({ revenue: 50000, clients: 250 });
const actionMessage = ref('');
const growthRate = computed(() => Math.round((demoData.value.revenue / 100000) * 100));

// Données pour QCP
const loan = ref({ amount: 50000, rate: 5, years: 10 });
const monthlyPayment = computed(() => {
    const monthlyRate = loan.value.rate / 100 / 12;
    const months = loan.value.years * 12;
    if (monthlyRate === 0) return loan.value.amount / months;
    const payment = loan.value.amount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    return isNaN(payment) ? 0 : payment;
});
const totalPayment = computed(() => monthlyPayment.value * loan.value.years * 12);
const totalInterest = computed(() => totalPayment.value - loan.value.amount);
const amortizationPercent = computed(() => (monthlyPayment.value > 0 ? (loan.value.amount / totalPayment.value) * 100 : 0));

// Données pour NURSES
const booking = ref({ guests: 2, date: new Date().toISOString().split('T')[0], service: 'soir' });
const reservationMessage = ref('');
const minDate = new Date().toISOString().split('T')[0];

// Fonctions utilitaires
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR' }).format(value);
};

const simulateAction = () => {
    actionMessage.value = '✅ Données mises à jour !';
    setTimeout(() => { actionMessage.value = ''; }, 2000);
};

const makeReservation = () => {
    const serviceNames = { midi: 'déjeuner', soir: 'dîner', vip: 'service VIP' };
    reservationMessage.value = `✓ Réservation confirmée pour ${booking.value.guests} personne(s) le ${booking.value.date} (${serviceNames[booking.value.service as keyof typeof serviceNames]})`;
    setTimeout(() => { reservationMessage.value = ''; }, 3000);
};

const notifyDemo = () => {
    toast.info("Merci ! Vous serez notifié quand la démo sera disponible.");
};
</script>

<style scoped>
img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px !important;
    z-index: 1;
    background-color: #f3f4f6;
}

.demo-wrapper {
    transition: all 0.3s ease;
}

.demo-section {
    position: relative;
    z-index: 10;
}

.demo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    position: relative;
    z-index: 20;
}

.demo-toggle-btn {
    position: relative;
    z-index: 30;
    background-color: rgba(102, 29, 228, 0.1);
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    color: #7c3aed;
    transition: all 0.2s;
    padding: 8px 12px;
    border-radius: 6px;
}

.demo-toggle-btn:hover {
    color: #5b21b6;
    background-color: rgba(102, 29, 228, 0.1);
}

.demo-toggle-btn:active {
    transform: scale(0.98);
}

.mySwiper {
    position: relative;
    z-index: 1;
    pointer-events: auto;
}

.project-container {
    position: relative;
    overflow-x: visible;
}

@media screen and (max-width: 748px) {

    span,
    p {
        font-size: 10px !important;
    }

    .flex {
        flex-direction: column;
        gap: 16px;
    }

    .mySwiper {
        width: 100% !important;
        height: auto !important;
    }

    .card {
        width: 100% !important;
        height: auto !important;
    }

    .demo-wrapper {
        font-size: 12px;
    }

    .demo-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }

    .demo-toggle-btn {
        min-height: 44px;
        min-width: 44px;
        font-size: 12px;
        padding: 8px 12px;
    }

    .demo-section {
        margin-top: 20px;
        clear: both;
    }
}
</style>