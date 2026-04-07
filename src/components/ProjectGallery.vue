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
                                <p v-if="actionMessage" class="text-sm text-green-600 mt-2 text-center">{{ actionMessage
                                }}</p>
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
                                        <div class="bg-violet-2000 rounded-full h-2"
                                            :style="{ width: amortizationPercent + '%' }"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="demoType === 'afr-fan'" class="p-6 bg-gray-50">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- Feed social / Publications -->
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800 flex items-center gap-2">
                                    <span class="text-2xl">🌍</span>
                                </h4>

                                <!-- Créer une publication -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <div class="flex gap-3">
                                        <div
                                            class="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                            👤
                                        </div>
                                        <div class="flex-1">
                                            <textarea v-model="newPost.content"
                                                placeholder="Partagez quelque chose avec la communauté africaine..."
                                                rows="2"
                                                class="w-full p-2 border rounded-lg resize-none text-sm"></textarea>
                                            <div class="flex justify-between items-center mt-2">
                                                <div class="flex gap-2">
                                                    <button @click="addMediaPost"
                                                        class="text-gray-500 hover:text-violet-500 text-sm">📷
                                                        Média</button>
                                                    <button @click="addEventPost"
                                                        class="text-gray-500 hover:text-violet-500 text-sm">📅
                                                        Événement</button>
                                                </div>
                                                <button @click="createPost" :disabled="!newPost.content.trim()"
                                                    class="btn-violet inline-block text-center btn-effect-5 disabled:bg-gray-400 text-sm">
                                                    Publier
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Liste des publications -->
                                <div class="space-y-3 max-h-[700px] overflow-y-auto">
                                    <div v-for="(post, idx) in posts" :key="idx" class="bg-white rounded-lg shadow p-4">
                                        <div class="flex items-start gap-3">
                                            <div
                                                class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                                {{ post.avatar }}
                                            </div>
                                            <div class="flex-1">
                                                <div class="flex justify-between items-start">
                                                    <div>
                                                        <span class="font-semibold text-gray-800">{{ post.author
                                                            }}</span>
                                                        <span class="text-xs text-gray-500 ml-2">{{ post.time }}</span>
                                                    </div>
                                                    <button @click="deletePost(idx)"
                                                        class="text-gray-400 hover:text-red-500 text-xs">✕</button>
                                                </div>
                                                <p class="text-gray-700 text-sm mt-1">{{ post.content }}</p>
                                                <div v-if="post.media"
                                                    class="mt-2 p-2 bg-gray-300 rounded text-center text-sm">
                                                    {{ post.media }}
                                                </div>
                                                <div class="flex gap-4 mt-3 text-sm">
                                                    <button @click="likePost(idx)"
                                                        class="flex items-center gap-1 text-gray-500 hover:text-red-500">
                                                        ❤️ {{ post.likes }}
                                                    </button>
                                                    <button @click="toggleComment(idx)"
                                                        class="flex items-center gap-1 text-gray-500 hover:text-violet-500">
                                                        💬 {{ post.comments.length }}
                                                    </button>
                                                    <button class="text-gray-500 hover:text-green-500">🔄
                                                        Partager</button>
                                                </div>

                                                <!-- Section commentaires -->
                                                <div v-if="showComments === idx" class="mt-3 pt-3 border-t">
                                                    <div class="flex gap-2 mb-2">
                                                        <input type="text" v-model="post.newComment"
                                                            placeholder="Écrire un commentaire..."
                                                            class="flex-1 p-1 border rounded text-sm"
                                                            @keyup.enter="addComment(idx)">
                                                        <button @click="addComment(idx)"
                                                            class="bg-violet-2000 text-white px-2 py-1 rounded text-xs">
                                                            Envoyer
                                                        </button>
                                                    </div>
                                                    <div class="space-y-2 max-h-32 overflow-y-auto">
                                                        <div v-for="(comment, cIdx) in post.comments" :key="cIdx"
                                                            class="text-sm">
                                                            <span class="font-semibold">{{ comment.author }}:</span>
                                                            <span class="text-gray-600 ml-1">{{ comment.content
                                                                }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Sidebar : Groupes + Paiement Premium -->
                            <div class="space-y-4">
                                <!-- Groupes d'intérêt -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <div class="flex justify-between items-center mb-3">
                                        <h5 class="font-semibold text-gray-800">🤝 Groupes d'intérêt</h5>
                                        <button @click="createGroup"
                                            class="btn-violet inline-block text-center btn-effect-5">+ Créer</button>
                                    </div>
                                    <div class="space-y-2 max-h-48 overflow-y-auto">
                                        <div v-for="(group, idx) in groups" :key="idx"
                                            class="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                                            @click="joinGroup(idx)">
                                            <div>
                                                <div class="font-medium text-gray-800 text-sm">{{ group.name }}</div>
                                                <div class="text-xs text-gray-500">{{ group.members }} membres</div>
                                            </div>
                                            <button class="text-xs"
                                                :class="group.joined ? 'text-green-600' : 'text-violet-500'">
                                                {{ group.joined ? '✓ Membre' : '+ Rejoindre' }}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Abonnement Premium -->
                                <div
                                    class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow p-4 border border-amber-200">
                                    <div class="flex items-center gap-2 mb-3">
                                        <span class="text-2xl">⭐</span>
                                        <h5 class="font-bold text-gray-800">Accès Premium</h5>
                                        <span
                                            class="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded">Populaire</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">
                                        Soutenez la communauté et accédez à des fonctionnalités exclusives :
                                    </p>
                                    <ul class="text-xs text-gray-600 space-y-1 mb-3">
                                        <li>✓ 📹 Contenu vidéo exclusif</li>
                                        <li>✓ 🎓 Webinaires et formations</li>
                                        <li>✓ 🤝 Mise en relation avec des experts</li>
                                        <li>✓ 🚫 Pas de publicité</li>
                                    </ul>

                                    <!-- Simulation de paiement -->
                                    <div class="space-y-3">
                                        <div class="flex gap-2">
                                            <button @click="selectedPlan = 'monthly'"
                                                class="flex-1 py-2 rounded text-sm font-medium transition"
                                                :class="selectedPlan === 'monthly' ? 'bg-violet-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'">
                                                Mensuel<br><span class="font-bold">9,99€</span>
                                            </button>
                                            <button @click="selectedPlan = 'yearly'"
                                                class="flex-1 py-2 rounded text-sm font-medium transition relative"
                                                :class="selectedPlan === 'yearly' ? 'bg-violet-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'">
                                                Annuel<br><span class="font-bold">89,99€</span>
                                                <span
                                                    class="absolute top-1 right-1 text-[10px] bg-green-500 text-white px-1 rounded">-25%</span>
                                            </button>
                                        </div>

                                        <div class="flex gap-2">
                                            <button @click="paymentMethod = 'visa'"
                                                class="flex-1 py-2 border rounded text-sm transition"
                                                :class="paymentMethod === 'visa' ? 'border-violet-500 bg-violet-400' : 'bg-violet-200 text-white'">
                                                💳 VISA
                                            </button>
                                            <button @click="paymentMethod = 'paypal'"
                                                class="flex-1 py-2 border rounded text-sm transition"
                                                :class="paymentMethod === 'paypal' ? 'border-violet-500 bg-violet-400 text-white' : 'bg-violet-200 text-white'">
                                                🅿️ PayPal
                                            </button>
                                        </div>

                                        <button @click="processPayment" :disabled="isProcessing"
                                            class="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded hover:from-amber-600 hover:to-orange-600 transition disabled:opacity-50 text-sm font-medium">
                                            {{ isProcessing ? 'Traitement...' : 'Soutenir maintenant' }}
                                        </button>

                                        <div v-if="paymentMessage" class="text-center text-sm p-2 rounded"
                                            :class="paymentMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                                            {{ paymentMessage }}
                                        </div>
                                    </div>
                                </div>

                                <!-- Diaspora en chiffres -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <h5 class="font-semibold text-gray-800 mb-2">📊 Communauté en chiffres</h5>
                                    <div class="grid grid-cols-2 gap-3 text-center">
                                        <div>
                                            <div class="text-2xl font-bold text-violet-600">{{ stats.members }}</div>
                                            <div class="text-xs text-gray-500">Membres</div>
                                        </div>
                                        <div>
                                            <div class="text-2xl font-bold text-violet-600">{{ stats.posts }}</div>
                                            <div class="text-xs text-gray-500">Publications</div>
                                        </div>
                                        <div>
                                            <div class="text-2xl font-bold text-violet-600">{{ stats.groups }}</div>
                                            <div class="text-xs text-gray-500">Groupes actifs</div>
                                        </div>
                                        <div>
                                            <div class="text-2xl font-bold text-violet-600">{{ stats.countries }}</div>
                                            <div class="text-xs text-gray-500">Pays représentés</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="demoType === 'nurses'" class="p-6 bg-gray-50">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- Section Réservation -->
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800 flex items-center gap-2">
                                    <span class="text-2xl">🍽️</span>
                                    Simulateur de réservation
                                </h4>

                                <div class="bg-white rounded-lg shadow p-4">
                                    <div class="space-y-4">
                                        <div>
                                            <label class="text-sm text-gray-600 font-medium">Nombre de personnes</label>
                                            <div class="flex items-center gap-2 mt-1">
                                                <button @click="booking.guests = Math.max(1, booking.guests - 1)"
                                                    class="w-8 h-8 rounded-full bg-violet-400 hover:bg-violet-300 transition flex items-center justify-center text-lg font-bold">
                                                    -
                                                </button>
                                                <input type="number" v-model.number="booking.guests" min="1" max="50"
                                                    class="flex-1 p-2 border rounded text-center">
                                                <button @click="booking.guests = Math.min(50, booking.guests + 1)"
                                                    class="w-8 h-8 rounded-full bg-violet-400 hover:bg-violet-300 transition flex items-center justify-center text-lg font-bold">
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label class="text-sm text-gray-600 font-medium">Date</label>
                                            <input type="date" v-model="booking.date" :min="minDate"
                                                class="w-full p-2 border rounded mt-1">
                                        </div>

                                        <div>
                                            <label class="text-sm text-gray-600 font-medium">Service</label>
                                            <select v-model="booking.service" class="w-full p-2 border rounded mt-1">
                                                <option value="midi">🍳 Déjeuner (12h-14h)</option>
                                                <option value="soir">🌙 Dîner (19h-22h)</option>
                                                <option value="vip">✨ VIP (service exclusif)</option>
                                            </select>
                                        </div>

                                        <div v-if="booking.service === 'vip'"
                                            class="p-3 bg-amber-50 rounded border border-amber-200">
                                            <p class="text-sm text-amber-800">🎁 Service VIP inclus :</p>
                                            <ul class="text-xs text-amber-700 mt-1 space-y-1">
                                                <li>✓ Accès au salon privé</li>
                                                <li>✓ Menu dégustation personnalisé</li>
                                                <li>✓ Accueil par le chef</li>
                                            </ul>
                                        </div>

                                        <button @click="makeReservation"
                                            class="w-full btn-violet inline-block text-center btn-effect-5 py-2 rounded-lg">
                                            Réserver (démo)
                                        </button>

                                        <div v-if="reservationMessage"
                                            :class="['p-3 rounded text-center', reservationMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
                                            {{ reservationMessage }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Section Événements à venir -->
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800 flex items-center gap-2">
                                    <span class="text-2xl">🎉</span>
                                    Événements à venir
                                </h4>

                                <div class="bg-white rounded-lg shadow p-4">
                                    <div class="space-y-3 max-h-80 overflow-y-auto">
                                        <div v-for="(event, idx) in nurseEvents" :key="idx"
                                            class="border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
                                            :class="{ 'border-amber-400 bg-amber-50': selectedEvent === idx }"
                                            @click="selectNurseEvent(idx)">
                                            <div class="flex justify-between items-start">
                                                <div>
                                                    <div class="font-semibold text-gray-800">{{ event.title }}</div>
                                                    <div class="text-sm text-gray-600">📅 {{ event.date }}</div>
                                                    <div class="text-xs text-gray-500">👥 {{ event.participants }}
                                                        participants</div>
                                                </div>
                                                <div class="text-right">
                                                    <div class="text-sm font-semibold text-amber-600">{{ event.price }}
                                                    </div>
                                                    <div class="text-xs"
                                                        :class="event.spots > 10 ? 'text-green-600' : 'text-orange-600'">
                                                        {{ event.spots }} places restantes
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-2 flex gap-2">
                                                <span class="text-xs px-2 py-1 rounded-full"
                                                    :class="event.type === 'gala' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'">
                                                    {{ event.type === 'gala' ? '🎭 Gala' : '🍷 Dégustation' }}
                                                </span>
                                                <span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                                    ⏰ {{ event.time }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button @click="reserveEvent" :disabled="selectedEvent === null"
                                        class="w-full mt-4 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                                        Réserver pour cet événement
                                    </button>
                                    <p v-if="eventReservationMessage" class="text-sm text-center mt-2"
                                        :class="eventReservationMessage.includes('✓') ? 'text-green-600' : 'text-red-600'">
                                        {{ eventReservationMessage }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Section Admin simplifiée -->
                        <div class="mt-6">
                            <div class="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow p-4">
                                <div class="flex justify-between items-center mb-3">
                                    <h4 class="font-bold text-white flex items-center gap-2">
                                        <span class="text-xl">👑</span>
                                        Panneau d'administration
                                    </h4>
                                </div>

                                <div class="space-y-3">
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div class="bg-white/10 rounded p-2 text-center">
                                            <div class="text-2xl font-bold text-white">{{ adminStats.totalReservations
                                            }}</div>
                                            <div class="text-xs text-gray-300">Réservations</div>
                                        </div>
                                        <div class="bg-white/10 rounded p-2 text-center">
                                            <div class="text-2xl font-bold text-white">{{ adminStats.vipReservations }}
                                            </div>
                                            <div class="text-xs text-gray-300">VIP</div>
                                        </div>
                                        <div class="bg-white/10 rounded p-2 text-center">
                                            <div class="text-2xl font-bold text-white">{{ adminStats.totalGuests }}
                                            </div>
                                            <div class="text-xs text-gray-300">Couverts</div>
                                        </div>
                                        <div class="bg-white/10 rounded p-2 text-center">
                                            <div class="text-2xl font-bold text-white">{{ nurseEvents.length }}</div>
                                            <div class="text-xs text-gray-300">Événements</div>
                                        </div>
                                    </div>

                                    <div class="flex gap-2">
                                        <button @click="addDemoEvent"
                                            class="flex-1 bg-green-600 text-white py-1 rounded text-sm hover:bg-green-700 transition">
                                            + Ajouter un événement
                                        </button>
                                        <button @click="resetDemoData"
                                            class="flex-1 bg-orange-600 text-white py-1 rounded text-sm hover:bg-orange-700 transition">
                                            Réinitialiser
                                        </button>
                                    </div>
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
                                            :class="{ 'border-violet-300 bg-violet-200': selectedEvent === idx }"
                                            @click="selectEvent(idx)">
                                            <div class="flex justify-between items-start">
                                                <div>
                                                    <div class="font-semibold text-gray-800">{{ event.title }}</div>
                                                    <div class="text-sm text-gray-600">{{ event.date }}</div>
                                                    <div class="text-xs text-gray-500">{{ event.participants }}
                                                        participants</div>
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
                                        <select v-model="registration.eventId"
                                            class="w-full p-2 border rounded text-sm">
                                            <option value="">Sélectionner un événement</option>
                                            <option v-for="(event, idx) in events" :key="idx" :value="idx"
                                                :disabled="event.status === 'complet'">
                                                {{ event.title }} ({{ event.status === 'complet' ? 'Complet' :
                                                    'Disponible' }})
                                            </option>
                                        </select>
                                        <button @click="registerToEvent" :disabled="!canRegister"
                                            class="w-full btn-violet inline-block text-center btn-effect-5">
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
                                                <span class="font-semibold"
                                                    :class="heartData.heartRate > 100 ? 'text-red-600' : 'text-green-600'">
                                                    {{ heartData.heartRate }} bpm
                                                </span>
                                            </div>
                                            <input type="range" v-model="heartData.heartRate" min="40" max="180"
                                                step="1" class="w-full mt-1">
                                        </div>
                                        <div>
                                            <div class="flex justify-between text-sm">
                                                <span>Tension artérielle</span>
                                                <span class="font-semibold">{{ heartData.systolic }}/{{
                                                    heartData.diastolic }} mmHg</span>
                                            </div>
                                            <div class="flex gap-2">
                                                <input type="range" v-model="heartData.systolic" min="80" max="200"
                                                    step="1" class="w-full mt-1">
                                                <input type="range" v-model="heartData.diastolic" min="50" max="120"
                                                    step="1" class="w-full mt-1">
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex justify-between text-sm">
                                                <span>Niveau d'oxygène</span>
                                                <span class="font-semibold"
                                                    :class="heartData.oxygen < 94 ? 'text-orange-600' : 'text-green-600'">
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
                                        <div
                                            class="absolute bottom-0 left-0 right-0 flex items-end justify-between h-full">
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
                                    <p v-if="downloadMessage" class="text-xs text-green-600 mt-2 text-center">{{
                                        downloadMessage }}</p>
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
                                class="mt-4 bg-violet-2000 text-white px-4 py-2 rounded hover:bg-violet-600 transition">
                                Être notifié
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>

    <div v-if="showGroupModal" class="fixed inset-0 flex items-center justify-center z-50"
        @click.self="cancelCreateGroup">
        <div class="absolute inset-0 backdrop-blur-sm bg-white/30"></div>
        <div
            class="relative bg-white rounded-xl shadow-2xl p-6 w-96 max-w-[90%] transform transition-all animate-fade-in">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-800">📝 Créer un nouveau groupe</h3>
                <button @click="cancelCreateGroup"
                    class="bg-violet-500 rounded-full w-6 h-6 flex items-center justify-center hover:bg-violet-400 transition">
                    &times;
                </button>
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom du groupe</label>
                <input type="text" v-model="newGroupName" placeholder="Ex: Musique Africaine, Tech Hub, Cuisine..."
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
                    @keyup.enter="confirmCreateGroup" autofocus>
            </div>

            <div class="flex gap-2">
                <button @click="cancelCreateGroup"
                    class="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    Annuler
                </button>
                <button @click="confirmCreateGroup" :disabled="isCreatingGroup || !newGroupName.trim()"
                    class="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2 rounded-lg hover:from-violet-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ isCreatingGroup ? 'Création...' : 'Valider' }}
                </button>
            </div>
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
    if (title.includes('afr') || title.includes('fan')) return 'afr-fan';
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

// NURSES demo data enrichi
const booking = ref({ guests: 2, date: new Date().toISOString().split('T')[0], service: 'soir' });
const reservationMessage = ref('');
const minDate = new Date().toISOString().split('T')[0];

// Événements du restaurant
const nurseEvents = ref([
    {
        title: 'Soirée de Gala Annuel',
        date: '2024-12-15',
        time: '19h30',
        participants: 89,
        price: '150€',
        spots: 11,
        type: 'gala'
    },
    {
        title: 'Dîner aux Chandelles',
        date: '2024-11-20',
        time: '20h00',
        participants: 45,
        price: '85€',
        spots: 5,
        type: 'gala'
    },
    {
        title: 'Dégustation de Vins Belges',
        date: '2024-10-25',
        time: '18h30',
        participants: 32,
        price: '65€',
        spots: 18,
        type: 'degustation'
    }
]);

const eventReservationMessage = ref('');

const adminStats = ref({
    totalReservations: 127,
    vipReservations: 34,
    totalGuests: 486
});

const makeReservation = () => {
    const serviceNames = { midi: 'déjeuner', soir: 'dîner', vip: 'service VIP' };
    const vipBonus = booking.value.service === 'vip' ? ' (avec accès VIP)' : '';

    reservationMessage.value = `✓ Réservation confirmée pour ${booking.value.guests} personne(s) le ${booking.value.date} (${serviceNames[booking.value.service as keyof typeof serviceNames]})${vipBonus}`;

    adminStats.value.totalReservations++;
    adminStats.value.totalGuests += booking.value.guests;
    if (booking.value.service === 'vip') {
        adminStats.value.vipReservations++;
    }

    setTimeout(() => { reservationMessage.value = ''; }, 3000);
};

const selectNurseEvent = (idx: number) => {
    selectedEvent.value = idx;
};

const reserveEvent = () => {
    if (selectedEvent.value === null) {
        eventReservationMessage.value = '❌ Veuillez sélectionner un événement';
        return;
    }

    const event = nurseEvents.value[selectedEvent.value];
    if (event.spots <= 0) {
        eventReservationMessage.value = '❌ Désolé, cet événement est complet';
        return;
    }

    event.spots--;
    event.participants++;
    adminStats.value.totalReservations++;

    eventReservationMessage.value = `✓ Réservation confirmée pour "${event.title}" !`;

    setTimeout(() => { eventReservationMessage.value = ''; }, 3000);
};

const addDemoEvent = () => {
    nurseEvents.value.push({
        title: `Nouvel événement ${nurseEvents.value.length + 1}`,
        date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        time: '20h00',
        participants: 0,
        price: '70€',
        spots: 30,
        type: Math.random() > 0.5 ? 'gala' : 'degustation'
    });
    toast.success('Événement ajouté !');
};

const resetDemoData = () => {
    nurseEvents.value = [
        { title: 'Soirée de Gala Annuel', date: '2024-12-15', time: '19h30', participants: 89, price: '150€', spots: 11, type: 'gala' },
        { title: 'Dîner aux Chandelles', date: '2024-11-20', time: '20h00', participants: 45, price: '85€', spots: 5, type: 'gala' },
        { title: 'Dégustation de Vins Belges', date: '2024-10-25', time: '18h30', participants: 32, price: '65€', spots: 18, type: 'degustation' }
    ];
    adminStats.value = { totalReservations: 127, vipReservations: 34, totalGuests: 486 };
    selectedEvent.value = null;
    toast.info('Données réinitialisées');
};

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


const notifyDemo = () => {
    toast.info("Merci ! Vous serez notifié quand la démo sera disponible.");
};

// AFR-FAN demo data
interface Post {
    author: string;
    avatar: string;
    content: string;
    time: string;
    likes: number;
    comments: Array<{ author: string; content: string }>;
    newComment?: string;
    media?: string;
}

const newPost = ref({ content: '' });
const posts = ref<Post[]>([
    {
        author: 'Mamadou Diallo',
        avatar: '🇸🇳',
        content: 'Fier de partager cet article sur l\'entrepreneuriat en Afrique ! Qui d\'autre est intéressé par les opportunités dans la tech ?',
        time: 'Il y a 2h',
        likes: 24,
        comments: [
            { author: 'Aminata', content: 'Très inspirant, merci du partage !' },
            { author: 'Koffi', content: 'Je suis intéressé, on peut en discuter ?' }
        ]
    },
    {
        author: 'Grace Akinyi',
        avatar: '🇰🇪',
        content: 'Événement culturel ce weekend à Paris ! Venez célébrer la diversité africaine 🎉',
        time: 'Il y a 5h',
        likes: 56,
        comments: [{ author: 'Jean', content: 'J\'y serai !' }]
    }
]);
const showComments = ref<number | null>(null);

const groups = ref([
    { name: 'Tech Africa', members: 1234, joined: false },
    { name: 'Culture & Traditions', members: 892, joined: true },
    { name: 'Business & Investissement', members: 567, joined: false },
    { name: 'Diaspora United', members: 2103, joined: false }
]);

const stats = ref({
    members: 15423,
    posts: 3421,
    groups: 48,
    countries: 42
});

const selectedPlan = ref('monthly');
const paymentMethod = ref('visa');
const isProcessing = ref(false);
const paymentMessage = ref('');

const createPost = () => {
    if (!newPost.value.content.trim()) return;

    posts.value.unshift({
        author: 'Vous',
        avatar: '👤',
        content: newPost.value.content,
        time: 'À l\'instant',
        likes: 0,
        comments: []
    });

    stats.value.posts++;
    newPost.value.content = '';
    toast.success('Publication partagée !');
};

const addMediaPost = () => {
    toast.info('📷 Fonctionnalité média (démo)');
};

const addEventPost = () => {
    toast.info('📅 Fonctionnalité événement (démo)');
};

const deletePost = (idx: number) => {
    posts.value.splice(idx, 1);
    toast.info('Publication supprimée');
};

const likePost = (idx: number) => {
    posts.value[idx].likes++;
};

const toggleComment = (idx: number) => {
    showComments.value = showComments.value === idx ? null : idx;
};

const addComment = (idx: number) => {
    const comment = posts.value[idx].newComment?.trim();
    if (!comment) return;

    posts.value[idx].comments.push({
        author: 'Vous',
        content: comment
    });
    posts.value[idx].newComment = '';
    toast.success('Commentaire ajouté');
};


const showGroupModal = ref(false);
const newGroupName = ref('');
const isCreatingGroup = ref(false);


const createGroup = () => {
    showGroupModal.value = true;
    newGroupName.value = '';
};

const confirmCreateGroup = () => {
    if (!newGroupName.value.trim()) {
        toast.warning('Veuillez entrer un nom de groupe');
        return;
    }

    isCreatingGroup.value = true;

    setTimeout(() => {
        groups.value.unshift({
            name: newGroupName.value.trim(),
            members: 1,
            joined: true
        });
        stats.value.groups++;
        toast.success(`Groupe "${newGroupName.value.trim()}" créé !`);

        showGroupModal.value = false;
        newGroupName.value = '';
        isCreatingGroup.value = false;
    }, 300);
};

const cancelCreateGroup = () => {
    showGroupModal.value = false;
    newGroupName.value = '';
};

const joinGroup = (idx: number) => {
    if (groups.value[idx].joined) {
        toast.info('Vous êtes déjà membre');
    } else {
        groups.value[idx].joined = true;
        groups.value[idx].members++;
        toast.success(`Vous avez rejoint ${groups.value[idx].name}`);
    }
};

const processPayment = async () => {
    isProcessing.value = true;
    paymentMessage.value = '';

    // Simulation de paiement
    setTimeout(() => {
        isProcessing.value = false;
        paymentMessage.value = `✓ Paiement de ${selectedPlan.value === 'monthly' ? '9,99€' : '89,99€'} effectué via ${paymentMethod.value === 'visa' ? 'VISA' : 'PayPal'} ! Merci pour votre soutien à la communauté africaine.`;

        setTimeout(() => {
            paymentMessage.value = '';
        }, 4000);
    }, 1500);
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

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-fade-in {
    animation: fadeIn 0.2s ease-out;
}


@media screen and (max-width: 748px) {

    span,
    p {
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