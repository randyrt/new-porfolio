<template>
    <div class="project-container mb-16 card p-4">
        <div class="flex flex-col md:flex-row justify-between items-center h-auto md:h-[400px] mt-4 gap-4 md:gap-0">
            <Swiper :pagination="{ clickable: true }" :modules="[Pagination, Autoplay]"
                class="mySwiper card p-4 w-full md:w-2/3" :loop="true" :autoplay="{ delay: 2500 }" navigation>
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
            <div class="flex justify-center card h-auto w-full md:w-1/3 mt-4 md:mt-0">
                <p class="flex flex-col items-center p-6 text-gray-600">
                    <span class="text-lg not-even:text-gray-800">- {{ title }} -</span>
                    <span>{{ description }}</span>
                </p>
            </div>
        </div>

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
                    <div class="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2">
                        <span class="text-white text-sm font-mono">Live Demo • {{ title }}</span>
                    </div>

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
                                    class="mt-4 w-full btn-violet inline-block text-center btn-effect-5 ">
                                    Actualiser les données
                                </button>
                                <p v-if="actionMessage" class="text-sm text-green-600 mt-2 text-center">{{ actionMessage }}</p>
                            </div>
                        </div>
                    </div>

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
                                    class="w-full btn-violet inline-block text-center btn-effect-5">
                                    Réserver (démo)
                                </button>
                                <div v-if="reservationMessage"
                                    :class="['p-3 rounded text-center', reservationMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
                                    {{ reservationMessage }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="demoType === 'echo-webLine'" class="p-6 bg-gray-50">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- Gestion des événements scientifiques -->
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800 flex items-center gap-2">
                                    <span class="text-2xl">📅</span>
                                    Gestion des événements
                                </h4>
                                
                                <!-- Liste des événements -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <div class="flex justify-between items-center mb-3">
                                        <span class="font-semibold text-gray-700">Événements à venir</span>
                                        <button @click="addEvent" 
                                            class="btn-violet inline-block text-center btn-effect-5">
                                            + Nouvel événement
                                        </button>
                                    </div>
                                    <div class="space-y-2 max-h-64 overflow-y-auto">
                                        <div v-for="(event, idx) in events" :key="idx"
                                            class="p-3 border rounded-lg hover:shadow-md transition cursor-pointer"
                                            :class="{'border-violet-300 bg-violet-50': selectedEvent === idx}"
                                            @click="selectEvent(idx)">
                                            <div class="flex justify-between items-start">
                                                <div>
                                                    <div class="font-semibold text-gray-800">{{ event.title }}</div>
                                                    <div class="text-sm text-gray-600">{{ event.date }}</div>
                                                    <div class="text-xs text-gray-500">{{ event.participants }} participants</div>
                                                </div>
                                                <div class="flex gap-1 items-center">
                                                    <span class="text-xs px-2 py-1 rounded" 
                                                        :class="event.status === 'ouvert' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'">
                                                        {{ event.status === 'ouvert' ? 'Ouvert' : 'Complet' }}
                                                    </span>
                                                    <button @click.stop="deleteEvent(idx)" 
                                                        class="text-red-500 hover:text-red-700 text-sm">✕</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Formulaire d'inscription -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <h5 class="font-semibold text-gray-700 mb-3">Inscription à un événement</h5>
                                    <div class="space-y-3">
                                        <input type="text" v-model="registration.name" placeholder="Nom complet"
                                            class="w-full p-2 border rounded text-sm">
                                        <input type="email" v-model="registration.email" placeholder="Email"
                                            class="w-full p-2 border rounded text-sm">
                                        <select v-model="registration.eventId" class="w-full p-2 border rounded text-sm">
                                            <option value="">Sélectionner un événement</option>
                                            <option v-for="(event, idx) in events" :key="idx" :value="idx" 
                                                :disabled="event.status === 'complet'">
                                                {{ event.title }} ({{ event.status === 'complet' ? 'Complet' : 'Disponible' }})
                                            </option>
                                        </select>
                                        <button @click="registerToEvent"
                                            :disabled="!canRegister"
                                            class="w-full bg-violet-500 text-white py-2 rounded hover:bg-violet-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                                            S'inscrire
                                        </button>
                                        <p v-if="registrationMessage" class="text-sm text-center"
                                            :class="registrationMessage.includes('✓') ? 'text-green-600' : 'text-red-600'">
                                            {{ registrationMessage }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Imagerie cardiovasculaire -->
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800 flex items-center gap-2">
                                    <span class="text-2xl">❤️</span>
                                    Imagerie cardiovasculaire
                                </h4>
                                
                                <!-- Visualisation des données médicales -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <div class="flex justify-between items-center mb-3">
                                        <span class="font-semibold text-gray-700">Paramètres cardiaques</span>
                                        <button @click="simulateHeartData" 
                                            class="w-1/2 btn-violet inline-block text-center btn-effect-5">
                                            Simuler nouvelle donnée
                                        </button>
                                    </div>
                                    <div class="space-y-3">
                                        <div>
                                            <div class="flex justify-between text-sm">
                                                <span>Fréquence cardiaque</span>
                                                <span class="font-semibold" :class="heartData.heartRate > 100 ? 'text-red-600' : 'text-green-600'">
                                                    {{ heartData.heartRate }} bpm
                                                </span>
                                            </div>
                                            <input type="range" v-model="heartData.heartRate" min="40" max="180" step="1"
                                                class="w-full mt-1">
                                        </div>
                                        <div>
                                            <div class="flex justify-between text-sm">
                                                <span>Tension artérielle</span>
                                                <span class="font-semibold">{{ heartData.systolic }}/{{ heartData.diastolic }} mmHg</span>
                                            </div>
                                            <div class="flex gap-2">
                                                <input type="range" v-model="heartData.systolic" min="80" max="200" step="1"
                                                    class="w-full mt-1">
                                                <input type="range" v-model="heartData.diastolic" min="50" max="120" step="1"
                                                    class="w-full mt-1">
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex justify-between text-sm">
                                                <span>Niveau d'oxygène</span>
                                                <span class="font-semibold" :class="heartData.oxygen < 94 ? 'text-orange-600' : 'text-green-600'">
                                                    {{ heartData.oxygen }}%
                                                </span>
                                            </div>
                                            <input type="range" v-model="heartData.oxygen" min="70" max="100" step="1"
                                                class="w-full mt-1">
                                        </div>
                                    </div>
                                </div>

                                <!-- Graphique simplifié -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <h5 class="font-semibold text-gray-700 mb-2">Historique des mesures</h5>
                                    <div class="relative h-32">
                                        <div class="absolute bottom-0 left-0 right-0 flex items-end justify-between h-full">
                                            <div v-for="(point, idx) in heartHistory" :key="idx"
                                                class="flex flex-col items-center" style="width: 12%">
                                                <div class="w-full bg-violet-400 rounded-t transition-all duration-300"
                                                    :style="{ height: (point.heartRate / 180 * 100) + '%', minHeight: '4px' }">
                                                </div>
                                                <div class="text-xs text-gray-500 mt-1">{{ point.time }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center text-xs text-gray-500 mt-4">
                                        Dernières 8 mesures (bpm)
                                    </div>
                                </div>

                                <!-- Ressources médicales -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <h5 class="font-semibold text-gray-700 mb-2">Ressources disponibles</h5>
                                    <div class="space-y-2">
                                        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <span class="text-sm">📄 Guide pratique cardiologie</span>
                                            <button @click="downloadResource" 
                                                class="btn-violet inline-block text-center btn-effect-5">Télécharger</button>
                                        </div>
                                        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <span class="text-sm">🎥 Webinaire - Nouvelles technologies</span>
                                            <button @click="downloadResource" 
                                                class="btn-violet inline-block text-center btn-effect-5">Voir</button>
                                        </div>
                                    </div>
                                    <p v-if="downloadMessage" class="text-xs text-green-600 mt-2 text-center">{{ downloadMessage }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

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

const toggleDemo = () => {
    showDemo.value = !showDemo.value;
};

const demoType = computed(() => {
    const title = props.title.toLowerCase();
    if (title.includes('fid') || title.includes('connect')) return 'fid-connect';
    if (title.includes('qcp')) return 'qcp';
    if (title.includes('nurses') || title.includes('souper')) return 'nurses';
    if (title.includes('echo') || title.includes('webline')) return 'echo-webLine';
    return 'generic';
});

// FID-CONNECT demo data
const demoData = ref({ revenue: 50000, clients: 250 });
const actionMessage = ref('');
const growthRate = computed(() => Math.round((demoData.value.revenue / 100000) * 100));

// QCP demo data
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

// NURSES demo data
const booking = ref({ guests: 2, date: new Date().toISOString().split('T')[0], service: 'soir' });
const reservationMessage = ref('');
const minDate = new Date().toISOString().split('T')[0];

// ECHO-WEBLINE demo data
interface Event {
    title: string;
    date: string;
    participants: number;
    status: 'ouvert' | 'complet';
    maxParticipants: number;
}

const events = ref<Event[]>([
    { title: 'Congrès Européen de Cardiologie', date: '2024-06-15', participants: 145, status: 'ouvert', maxParticipants: 200 },
    { title: 'Symposium sur l\'Imagerie Cardiaque', date: '2024-07-20', participants: 89, status: 'ouvert', maxParticipants: 150 },
    { title: 'Atelier Échocardiographie', date: '2024-08-10', participants: 50, status: 'complet', maxParticipants: 50 }
]);

const selectedEvent = ref<number | null>(null);
const registration = ref({ name: '', email: '', eventId: '' });
const registrationMessage = ref('');
const downloadMessage = ref('');

const heartData = ref({ heartRate: 72, systolic: 120, diastolic: 80, oxygen: 98 });
const heartHistory = ref<Array<{ heartRate: number; time: string }>>([]);

// Initialiser l'historique
for (let i = 7; i >= 0; i--) {
    const hour = new Date().getHours() - i;
    heartHistory.value.push({
        heartRate: Math.floor(Math.random() * 40) + 60,
        time: `${hour}h`
    });
}

const canRegister = computed(() => {
    return registration.value.name && registration.value.email && registration.value.eventId !== '';
});

const addEvent = () => {
    const newEvent: Event = {
        title: `Nouvel événement ${events.value.length + 1}`,
        date: new Date().toISOString().split('T')[0],
        participants: 0,
        status: 'ouvert',
        maxParticipants: 100
    };
    events.value.push(newEvent);
    toast.success('Nouvel événement créé !');
};

const selectEvent = (idx: number) => {
    selectedEvent.value = idx;
    registration.value.eventId = idx.toString();
};

const deleteEvent = (idx: number) => {
    if (confirm('Supprimer cet événement ?')) {
        events.value.splice(idx, 1);
        if (selectedEvent.value === idx) {
            selectedEvent.value = null;
            registration.value.eventId = '';
        }
        toast.info('Événement supprimé');
    }
};

const registerToEvent = () => {
    const eventId = parseInt(registration.value.eventId);
    const event = events.value[eventId];
    
    if (!event) {
        registrationMessage.value = '❌ Événement non trouvé';
        return;
    }
    
    if (event.status === 'complet') {
        registrationMessage.value = '❌ Cet événement est déjà complet';
        return;
    }
    
    if (event.participants + 1 > event.maxParticipants) {
        event.status = 'complet';
        registrationMessage.value = '❌ Désolé, cet événement vient d\'être complet';
        return;
    }
    
    event.participants++;
    if (event.participants === event.maxParticipants) {
        event.status = 'complet';
    }
    
    registrationMessage.value = `✓ Inscription confirmée pour ${registration.value.name} à "${event.title}"`;
    registration.value = { name: '', email: '', eventId: '' };
    
    setTimeout(() => {
        registrationMessage.value = '';
    }, 3000);
};

const simulateHeartData = () => {
    heartData.value.heartRate = Math.floor(Math.random() * 80) + 60;
    heartData.value.systolic = Math.floor(Math.random() * 60) + 100;
    heartData.value.diastolic = Math.floor(Math.random() * 40) + 60;
    heartData.value.oxygen = Math.floor(Math.random() * 15) + 90;
    
    heartHistory.value.shift();
    heartHistory.value.push({
        heartRate: heartData.value.heartRate,
        time: `${new Date().getHours()}h`
    });
    
    toast.info('Nouvelle mesure simulée');
};

const downloadResource = () => {
    downloadMessage.value = '✓ Démonstration : ressource téléchargée';
    setTimeout(() => {
        downloadMessage.value = '';
    }, 2000);
};

// Utilitaires
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
    span, p {
        font-size: 10px !important;
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

    .project-container .flex {
        flex-direction: column !important;
    }
    
    .mySwiper {
        order: 1;
    }
    
    .card:last-child {
        order: 2;
        margin-top: 1rem;
    }
}
</style>