<template>
    <div :id="id" class="project-container mb-16 card p-4">
        <div class="flex flex-col md:flex-row justify-between items-center h-auto md:h-[400px] mt-4 gap-4 md:gap-0">
            <Swiper :pagination="{ clickable: true, dynamicBullets: true }" :modules="[Pagination, Autoplay]"
                class="mySwiper w-full md:w-2/3 rounded-lg border-1 border-violet-300" :loop="true"
                :autoplay="{ delay: 2500 }" navigation>
                <SwiperSlide v-for="(img, index) in images" :key="index">
                    <div class="relative group overflow-hidden rounded-lg shadow-md">
                        <img :src="img" :alt="`${title} capture ${index + 1}`"
                            class="cursor-pointer transition-transform duration-300 group-hover:scale-105"
                            @click="$emit('open-image', img)" />
                        <div class="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div class="flex justify-center card h-auto w-full md:w-1/3 mt-4 md:mt-0">
                <p class="flex flex-col items-center p-4 text-gray-600">
                    <span class="text-lg font-bold text-violet-800">- {{ title }} -</span>
                    <span>{{ description }}</span>
                </p>
            </div>
        </div>

        <div class="demo-section mt-8  p-8">
            <div class="demo-header p-8">
                <h3 class="text-xl font-semibold text-gray-600"></h3>
                <button @click.stop="toggleDemo" class="btn-effect-5">
                    {{ showDemo ? t('demo.hide') : t('demo.show') }}
                    <span class="ml-1">{{ showDemo ? '▲' : '▼' }}</span>
                </button>
            </div>

            <transition enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 transform -translate-y-4"
                enter-to-class="opacity-100 transform translate-y-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 transform translate-y-0"
                leave-to-class="opacity-0 transform -translate-y-4">
                <div v-if="showDemo"
                    class="demo-wrapper  border-2 border-violet-500 rounded-xl overflow-hidden shadow-lg ">
                    <div class="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2">
                        <span class="text-white text-sm font-mono">{{ t('demo.live') }} • {{ title }}</span>
                    </div>

                    <div v-if="demoType === 'fid-connect'" class="p-6 bg-gray-50">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- Tableau de bord fiscal -->
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800">{{ t('demo.fid_connect.title') }}</h4>

                                <!-- Période comptable -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <div class="flex justify-between items-center mb-3">
                                        <span class="font-semibold">{{ t('demo.fid_connect.period') }}</span>
                                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">En
                                            cours</span>
                                    </div>
                                    <div class="space-y-2">
                                        <div class="flex justify-between text-sm">
                                            <span>{{ t('demo.fid_connect.revenue') }}</span>
                                            <span class="font-semibold">{{ formatCurrency(fiscalData.revenue) }}</span>
                                        </div>
                                        <input type="range" v-model="fiscalData.revenue" min="0" max="500000"
                                            step="5000" class="w-full">

                                        <div class="flex justify-between text-sm mt-2">
                                            <span>{{ t('demo.fid_connect.expenses') }}</span>
                                            <span class="font-semibold">{{ formatCurrency(fiscalData.expenses) }}</span>
                                        </div>
                                        <input type="range" v-model="fiscalData.expenses" min="0"
                                            :max="fiscalData.revenue" step="1000" class="w-full">

                                        <div class="flex justify-between text-sm mt-2">
                                            <span>{{ t('demo.fid_connect.tax_result') }}</span>
                                            <span class="font-semibold"
                                                :class="taxableResult < 0 ? 'text-green-600' : 'text-orange-600'">
                                                {{ formatCurrency(taxableResult) }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Calcul TVA -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <h5 class="font-semibold mb-2">{{ t('demo.fid_connect.vat_title') }}</h5>
                                    <div class="text-2xl font-bold text-violet-600">{{ formatCurrency(vatAmount) }}
                                    </div>
                                    <div class="text-xs text-gray-500 mt-1">{{ t('demo.fid_connect.vat_desc') }}
                                    </div>
                                    <button @click="generateTaxDeclaration"
                                        class="mt-3 w-full btn-violet btn-effect-5 text-sm py-2">
                                        {{ t('demo.fid_connect.generate_tax') }}
                                    </button>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div class="bg-white rounded-lg shadow p-4">
                                    <h5 class="font-semibold mb-2">{{ t('demo.fid_connect.doc_title') }}</h5>
                                    <div class="space-y-2">
                                        <button @click="generateDocument('letter')"
                                            class="w-full text-left px-3 py-2 bg-gray-500 rounded hover:bg-gray-400 text-sm">
                                            {{ t('demo.fid_connect.doc_letter') }}
                                        </button>
                                        <button @click="generateDocument('report')"
                                            class="w-full text-left px-3 py-2 bg-gray-500 rounded hover:bg-gray-400 text-sm">
                                            {{ t('demo.fid_connect.doc_report') }}
                                        </button>
                                        <button @click="generateDocument('invoice')"
                                            class="w-full text-left px-3 py-2 bg-gray-500 rounded hover:bg-gray-400 text-sm">
                                            {{ t('demo.fid_connect.doc_invoice') }}
                                        </button>
                                    </div>
                                    <div v-if="docMessage" class="text-center text-sm p-2 mt-2 rounded"
                                        :class="docMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                                        {{ docMessage }}
                                    </div>
                                </div>

                                <div class="bg-blue-50 rounded-lg p-3 text-sm">
                                    <span class="font-semibold">{{ t('demo.fid_connect.alerts_title') }}</span>
                                    <ul class="text-xs mt-1 space-y-1">
                                        <li>{{ t('demo.fid_connect.alert_1') }}</li>
                                        <li>{{ t('demo.fid_connect.alert_2') }}</li>
                                        <li>{{ t('demo.fid_connect.alert_3') }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="demoType === 'qcp'" class="p-6 bg-gray-50">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800">{{ t('demo.qcp.title') }}</h4>
                                <div>
                                    <label class="text-sm text-gray-600">{{ t('demo.qcp.amount') }}</label>
                                    <input type="range" v-model="loan.amount" min="5000" max="500000" step="5000"
                                        class="w-full">
                                    <div class="text-right font-semibold">{{ formatCurrency(loan.amount) }}</div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-600">{{ t('demo.qcp.rate') }}</label>
                                    <input type="range" v-model="loan.rate" min="1" max="15" step="0.1" class="w-full">
                                    <div class="text-right font-semibold">{{ loan.rate }}%</div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-600">{{ t('demo.qcp.years') }}</label>
                                    <input type="range" v-model="loan.years" min="1" max="30" class="w-full">
                                    <div class="text-right font-semibold">{{ loan.years }} {{ t('demo.qcp.years_unit')
                                    }}</div>
                                </div>
                            </div>
                            <div class="bg-white p-4 rounded-lg shadow">
                                <h4 class="font-bold mb-3">{{ t('demo.qcp.results') }}</h4>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span>{{ t('demo.qcp.monthly') }}</span>
                                        <span class="font-bold text-violet-600">{{ formatCurrency(monthlyPayment)
                                            }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>{{ t('demo.qcp.total') }}</span>
                                        <span>{{ formatCurrency(totalPayment) }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>{{ t('demo.qcp.interest') }}</span>
                                        <span class="text-orange-600">{{ formatCurrency(totalInterest) }}</span>
                                    </div>
                                </div>
                                <div class="mt-4 pt-3 border-t">
                                    <div class="text-sm text-gray-600">{{ t('demo.qcp.amortization') }}</div>
                                    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                        <div class="bg-green-500 rounded-full h-2"
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
                                            <textarea v-model="newPost.content" placeholder="" rows="2"
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
                                                <button @click="createPost"
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
                                                        class="!text-gray-400  hover:text-red-500 text-xs">✕</button>
                                                </div>
                                                <p class="text-gray-700 text-sm mt-1">{{ post.content }}</p>
                                                <div v-if="post.media"
                                                    class="mt-2 p-2 bg-gray-300 rounded text-center text-sm">
                                                    {{ post.media }}
                                                </div>
                                                <div class="flex gap-4 mt-3 text-sm">
                                                    <button @click="likePost(idx)"
                                                        class="flex items-center gap-1 !text-gray-500">
                                                        ❤️ {{ post.likes }}
                                                    </button>
                                                    <button @click="toggleComment(idx)"
                                                        class="flex items-center gap-1 !text-gray-500">
                                                        💬 {{ post.comments.length }}
                                                    </button>
                                                </div>

                                                <!-- Section commentaires -->
                                                <div v-if="showComments === idx" class="mt-3 pt-3 border-t">
                                                    <div class="flex gap-2 mb-2">
                                                        <input type="text" v-model="post.newComment"
                                                            :placeholder="t('demo.afr_fan.write_comment')"
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
                                        <h5 class="font-semibold text-gray-800">{{ t('demo.afr_fan.groups_title') }}
                                        </h5>
                                        <button @click="createGroup"
                                            class="btn-violet inline-block text-center btn-effect-5">{{
                                                t('demo.afr_fan.btn_create') }}</button>
                                    </div>
                                    <div class="space-y-2 max-h-48 overflow-y-auto">
                                        <div v-for="(group, idx) in groups" :key="idx"
                                            class="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                                            @click="joinGroup(idx)">
                                            <div>
                                                <div class="font-medium text-gray-800 text-sm">{{ group.name }}</div>
                                                <div class="text-xs text-gray-500">{{ group.members }} membres</div>
                                            </div>
                                            <button class="text-xs font-medium transition btn-effect-20"
                                                :class="group.joined ? 'text-green-600' : 'text-violet-500'">
                                                {{ group.joined ? t('demo.afr_fan.member') : t('demo.afr_fan.join') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Abonnement Premium -->
                                <div
                                    class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow p-4 border border-amber-200">
                                    <div class="flex items-center gap-2 mb-3">
                                        <span class="text-2xl">⭐</span>
                                        <h5 class="font-bold text-gray-800">{{ t('demo.afr_fan.premium_title') }}</h5>
                                        <span class="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded">{{
                                            t('demo.afr_fan.popular') }}</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">
                                        {{ t('demo.afr_fan.premium_desc') }}
                                    </p>
                                    <ul class="text-xs text-gray-600 space-y-1 mb-3">
                                        <li>{{ t('demo.afr_fan.premium_1') }}</li>
                                        <li>{{ t('demo.afr_fan.premium_2') }}</li>
                                        <li>{{ t('demo.afr_fan.premium_3') }}</li>
                                        <li>{{ t('demo.afr_fan.premium_4') }}</li>
                                    </ul>

                                    <!-- Simulation de paiement -->
                                    <div class="space-y-3">
                                        <div class="flex gap-2">
                                            <button @click="selectedPlan = 'monthly'"
                                                class="flex-1 py-2 rounded text-sm font-medium transition"
                                                :class="selectedPlan === 'monthly' ? 'bg-violet-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'">
                                                {{ t('demo.afr_fan.monthly') }}<br><span class="font-bold">9,99€</span>
                                            </button>
                                            <button @click="selectedPlan = 'yearly'"
                                                class="flex-1 py-2 rounded text-sm font-medium transition relative"
                                                :class="selectedPlan === 'yearly' ? 'bg-violet-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'">
                                                {{ t('demo.afr_fan.yearly') }}<br><span class="font-bold">89,99€</span>
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
                                            class="w-full btn-effect-5-submit rounded text-sm font-medium">
                                            {{ isProcessing ? t('demo.afr_fan.processing') :
                                                t('demo.afr_fan.support_now') }}
                                        </button>

                                        <div v-if="paymentMessage" class="text-center text-sm p-2 rounded"
                                            :class="paymentMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                                            {{ paymentMessage }}
                                        </div>
                                    </div>
                                </div>

                                <!-- Diaspora en chiffres -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <h5 class="font-semibold text-gray-800 mb-2">{{ t('demo.afr_fan.stats_title') }}
                                    </h5>
                                    <div class="grid grid-cols-2 gap-3 text-center">
                                        <div>
                                            <div class="text-2xl font-bold text-violet-600">{{ stats.members }}</div>
                                            <div class="text-xs text-gray-500">{{ t('demo.afr_fan.stats_members') }}
                                            </div>
                                        </div>
                                        <div>
                                            <div class="text-2xl font-bold text-violet-600">{{ stats.posts }}</div>
                                            <div class="text-xs text-gray-500">{{ t('demo.afr_fan.stats_posts') }}
                                            </div>
                                        </div>
                                        <div>
                                            <div class="text-2xl font-bold text-violet-600">{{ stats.groups }}</div>
                                            <div class="text-xs text-gray-500">{{ t('demo.afr_fan.stats_groups') }}
                                            </div>
                                        </div>
                                        <div>
                                            <div class="text-2xl font-bold text-violet-600">{{ stats.countries }}</div>
                                            <div class="text-xs text-gray-500">{{ t('demo.afr_fan.stats_countries') }}
                                            </div>
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
                                    {{ t('demo.nurses.title') }}
                                </h4>
                                <div class="bg-white rounded-lg shadow p-4">
                                    <div class="space-y-4">
                                        <div>
                                            <label class="text-sm text-gray-600 font-medium">{{ t('demo.nurses.guests')
                                            }}</label>
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
                                            <label class="text-sm text-gray-600 font-medium">{{ t('demo.nurses.date')
                                            }}</label>
                                            <input type="date" v-model="booking.date" :min="minDate"
                                                class="w-full p-2 border rounded mt-1">
                                        </div>

                                        <div>
                                            <label class="text-sm text-gray-600 font-medium">{{
                                                t('demo.nurses.service') }}</label>
                                            <select v-model="booking.service" class="w-full p-2 border rounded mt-1">
                                                <option value="midi">{{ t('demo.nurses.serv_lunch') }}</option>
                                                <option value="soir">{{ t('demo.nurses.serv_dinner') }}</option>
                                                <option value="vip">{{ t('demo.nurses.serv_vip') }}</option>
                                            </select>
                                        </div>

                                        <div v-if="booking.service === 'vip'"
                                            class="p-3 bg-amber-50 rounded border border-amber-200">
                                            <p class="text-sm text-amber-800">{{ t('demo.nurses.vip_inc') }}</p>
                                            <ul class="text-xs text-amber-700 mt-1 space-y-1">
                                                <li>{{ t('demo.nurses.vip_1') }}</li>
                                                <li>{{ t('demo.nurses.vip_2') }}</li>
                                                <li>{{ t('demo.nurses.vip_3') }}</li>
                                            </ul>
                                        </div>

                                        <button @click="makeReservation"
                                            class="w-full btn-violet inline-block text-center btn-effect-5 py-2 rounded-lg">
                                            {{ t('demo.nurses.btn_reserve') }}
                                        </button>

                                        <div v-if="reservationMessage"
                                            :class="['p-3 rounded text-center', reservationMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
                                            {{ reservationMessage }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Section {{ t('demo.nurses.events_title') }} -->
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800 flex items-center gap-2">
                                    {{ t('demo.nurses.events_title') }}
                                </h4>

                                <div class="bg-white rounded-lg shadow p-4">
                                    <div class="space-y-3 max-h-90 overflow-y-auto">
                                        <div v-for="(event, idx) in nurseEvents" :key="idx"
                                            class="border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
                                            :class="{ 'border-amber-400 bg-amber-50': selectedEvent === idx }"
                                            @click="selectNurseEvent(idx)">
                                            <div class="flex justify-between items-start">
                                                <div>
                                                    <div class="font-semibold text-gray-800">{{ t(event.title) }}</div>
                                                    <div class="text-sm text-gray-600">{{ event.date }}</div>
                                                    <div class="text-xs text-gray-500">👥 {{ event.participants }} {{
                                                        t('demo.nurses.participants') }}</div>
                                                </div>
                                                <div class="text-right">
                                                    <div class="text-sm font-semibold text-amber-600">{{ event.price }}
                                                    </div>
                                                    <div class="text-xs"
                                                        :class="event.spots > 10 ? 'text-green-600' : 'text-orange-600'">
                                                        {{ event.spots }} {{ t('demo.nurses.remaining') }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-2 flex gap-2">
                                                <span class="text-xs px-2 py-1 rounded-full"
                                                    :class="event.type === 'gala' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'">
                                                    {{ event.type === 'gala' ? t('demo.nurses.event_gala') :
                                                        t('demo.nurses.event_degust') }}
                                                </span>
                                                <span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                                    ⏰ {{ event.time }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button @click="reserveEvent" :disabled="selectedEvent === null"
                                        class="w-full btn-effect-5-submit transition disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                                        {{ t('demo.nurses.btn_reserve_event') }}
                                    </button>
                                    <div v-if="eventReservationMessage" class="text-center text-sm p-2 rounded mt-2"
                                        :class="eventReservationMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                                        {{ eventReservationMessage }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Section Admin simplifiée -->
                        <div class="mt-6">
                            <div class="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow p-4">
                                <div class="flex justify-between items-center mb-3">
                                    <h4 class="font-bold text-white flex items-center gap-2">
                                        {{ t('demo.nurses.admin_title') }}
                                    </h4>
                                </div>

                                <div class="space-y-3">
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div class="bg-white/10 rounded p-2 text-center">
                                            <div class="text-2xl font-bold text-white">{{ adminStats.totalReservations
                                                }}</div>
                                            <div class="text-xs text-gray-300">{{ t('demo.nurses.admin_res') }}</div>
                                        </div>
                                        <div class="bg-white/10 rounded p-2 text-center">
                                            <div class="text-2xl font-bold text-white">{{ adminStats.vipReservations }}
                                            </div>
                                            <div class="text-xs text-gray-300">{{ t('demo.nurses.admin_vip') }}</div>
                                        </div>
                                        <div class="bg-white/10 rounded p-2 text-center">
                                            <div class="text-2xl font-bold text-white">{{ adminStats.totalGuests }}
                                            </div>
                                            <div class="text-xs text-gray-300">{{ t('demo.nurses.admin_guests') }}
                                            </div>
                                        </div>
                                        <div class="bg-white/10 rounded p-2 text-center">
                                            <div class="text-2xl font-bold text-white">{{ nurseEvents.length }}</div>
                                            <div class="text-xs text-gray-300">{{ t('demo.nurses.admin_events') }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex gap-2">
                                        <button @click="addDemoEvent"
                                            class="flex-1 bg-violet-600 text-white py-1 rounded text-sm hover:bg-violet-700 transition">
                                            {{ t('demo.nurses.btn_add_event') }}
                                        </button>
                                        <button @click="resetDemoData"
                                            class="flex-1 bg-orange-600 text-white py-1 rounded text-sm hover:bg-orange-700 transition">
                                            {{ t('demo.nurses.btn_reset') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="demoType === 'echo-webLine'" class="p-6 bg-gray-50">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- {{ t('demo.echo.title') }} scientifiques -->
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800 flex items-center gap-2">
                                    {{ t('demo.echo.title') }}
                                </h4>

                                <!-- Liste des événements -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <div class="flex justify-between items-center mb-3">
                                        <span class="font-semibold text-gray-700">{{ t('demo.nurses.events_title')
                                        }}</span>
                                        <button @click="addEvent"
                                            class="btn-violet inline-block text-center btn-effect-5">
                                            {{ t('demo.echo.btn_new') }}
                                        </button>
                                    </div>
                                    <div class="space-y-2 max-h-64 overflow-y-auto">
                                        <div v-for="(event, idx) in events" :key="idx"
                                            class="p-3 border rounded-lg hover:shadow-md transition cursor-pointer"
                                            :class="{ 'border-violet-300 bg-violet-200': selectedEvent === idx }"
                                            @click="selectEvent(idx)">
                                            <div class="flex justify-between items-start">
                                                <div>
                                                    <div class="font-semibold text-gray-800">{{ t(event.title) }}</div>
                                                    <div class="text-sm text-gray-600">{{ event.date }}</div>
                                                    <div class="text-xs text-gray-500">{{ event.participants }}
                                                        {{ t('demo.nurses.participants') }}</div>
                                                </div>
                                                <div class="flex gap-1 items-center space-x-6">
                                                    <span class="text-xs px-2 py-1 rounded"
                                                        :class="event.status === 'ouvert' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'">
                                                        {{ event.status === 'ouvert' ? t('demo.echo.status_open') :
                                                            t('demo.echo.status_full') }}
                                                    </span>
                                                    <button @click.stop="deleteEvent(idx)"
                                                        class="btn-effect-5-delete">{{ t('demo.echo.btn_delete')
                                                        }}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Formulaire d'inscription -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <h5 class="font-semibold text-gray-700 mb-3">{{ t('demo.echo.form_title') }}</h5>
                                    <div class="space-y-3">
                                        <input type="text" v-model="registration.name"
                                            :placeholder="t('demo.echo.form_name')"
                                            class="w-full p-2 border rounded text-sm">
                                        <input type="email" v-model="registration.email"
                                            :placeholder="t('demo.echo.form_email')"
                                            class="w-full p-2 border rounded text-sm">
                                        <select v-model="registration.eventId"
                                            class="w-full p-2 border rounded text-sm">
                                            <option value="">{{ t('demo.echo.select_event') }}</option>
                                            <option v-for="(event, idx) in events" :key="idx" :value="idx"
                                                :disabled="event.status === 'complet'">
                                                {{ t(event.title) }} ({{ event.status === 'complet' ? 'Complet' :
                                                    'Disponible' }})
                                            </option>
                                        </select>
                                        <button @click="registerToEvent"
                                            class="w-full btn-violet inline-block text-center btn-effect-5">
                                            {{ t('demo.echo.btn_register') }}
                                        </button>
                                        <span v-if="registrationMessage"
                                            class="text-xs text-center italic p-2 w-fit flex justify-center rounded mx-auto"
                                            :class="registrationMessage.includes('✓')
                                                ? 'text-green-600 border-1 border-green-600'
                                                : 'text-red-600 border-1 border-red-600'">
                                            {{ registrationMessage }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- {{ t('demo.echo.cardio_title') }} -->
                            <div class="space-y-4">
                                <h4 class="font-bold text-gray-800 flex items-center gap-2">
                                    {{ t('demo.echo.cardio_title') }}
                                </h4>

                                <!-- Visualisation des données médicales -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <div class="flex justify-between items-center mb-3">
                                        <span class="font-semibold text-gray-700">{{ t('demo.echo.params') }}</span>
                                    </div>
                                    <div class="space-y-3">
                                        <div>
                                            <div class="flex justify-between text-sm">
                                                <span>{{ t('demo.echo.heart_rate') }}</span>
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
                                                <span>{{ t('demo.echo.blood_press') }}</span>
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
                                                <span>{{ t('demo.echo.oxygen') }}</span>
                                                <span class="font-semibold"
                                                    :class="heartData.oxygen < 94 ? 'text-orange-600' : 'text-green-600'">
                                                    {{ heartData.oxygen }}%
                                                </span>
                                            </div>
                                            <input type="range" v-model="heartData.oxygen" min="70" max="100" step="1"
                                                class="w-full mt-1">
                                        </div>
                                        <button @click="simulateHeartData"
                                            class="w-1/2 btn-violet inline-block text-center btn-effect-5">
                                            {{ t('demo.echo.btn_simData') }}
                                        </button>
                                    </div>
                                </div>

                                <!-- Graphique simplifié -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <h5 class="font-semibold text-gray-700 mb-2">{{ t('demo.echo.hist_title') }}</h5>
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
                                        {{ t('demo.echo.last_8') }}
                                    </div>
                                </div>

                                <!-- Ressources médicales -->
                                <div class="bg-white rounded-lg shadow p-4">
                                    <h5 class="font-semibold text-gray-700 mb-2">{{ t('demo.echo.resources_title') }}
                                    </h5>
                                    <div class="space-y-2">
                                        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <span class="text-sm">{{ t('demo.echo.guide') }}</span>
                                            <button @click="downloadResource"
                                                class="btn-violet inline-block text-center btn-effect-5">{{
                                                    t('demo.echo.btn_download') }}</button>
                                        </div>
                                        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <span class="text-sm">{{ t('demo.echo.webinar') }}</span>
                                            <button @click="downloadResource"
                                                class="btn-violet inline-block text-center btn-effect-5">{{
                                                    t('demo.echo.btn_view') }}</button>
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
                            <h4 class="font-bold text-gray-800 mb-2">{{ t('demo.in_dev.title') }}</h4>
                            <p class="text-gray-600">{{ t('demo.in_dev.desc') }}</p>
                            <button @click="notifyDemo"
                                class="mt-4 bg-violet-2000 text-white px-4 py-2 rounded hover:bg-violet-600 transition">
                                {{ t('demo.in_dev.btn_notify') }}
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
                <h3 class="text-lg font-bold text-gray-800">{{ t('demo.group_modal.title') }}</h3>
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('demo.group_modal.label') }}</label>
                <input type="text" v-model="newGroupName" :placeholder="t('demo.group_modal.placeholder')"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
                    @keyup.enter="confirmCreateGroup" autofocus>
            </div>

            <div class="flex gap-2 space-x-4 justify-center">
                <button @click="cancelCreateGroup" class="btn-violet btn-effect-5">
                    {{ t('demo.group_modal.btn_cancel') }}
                </button>
                <button @click="confirmCreateGroup" :disabled="isCreatingGroup" class="btn-violet btn-effect-5">
                    {{ isCreatingGroup ? t('demo.group_modal.creating') : t('demo.group_modal.btn_create') }}
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
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    id?: string,
    images: string[],
    title: string,
    description: string
}>();

const emit = defineEmits<{
    (e: 'open-image', img: string): void
}>();

const toast = useToast();
const showDemo = ref(false);
const { t, locale } = useI18n()

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
const fiscalData = ref({ revenue: 250000, expenses: 145000 });
const taxableResult = computed(() => fiscalData.value.revenue - fiscalData.value.expenses);
const vatAmount = computed(() => fiscalData.value.revenue * 0.21);
const docMessage = ref('');

const generateTaxDeclaration = () => {
    toast.success(` ${t('demo.fid_connect.toast')} ${formatCurrency(vatAmount.value)}`);
};

const generateDocument = (type: string) => {
    const notificationKeys = {
        letter: 'demo.fid_connect.doc_letter_notif',
        report: 'demo.fid_connect.doc_report_notif',
        invoice: 'demo.fid_connect.doc_invoice_notif'
    };

    const key = notificationKeys[type as keyof typeof notificationKeys];
    docMessage.value = `${t(key)}`;

    setTimeout(() => {
        docMessage.value = '';
    }, 2000);
};

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


const booking = ref({ guests: 2, date: new Date().toISOString().split('T')[0], service: 'soir' });
const reservationMessage = ref('');
const minDate = new Date().toISOString().split('T')[0];

interface NurseEvent {
    title: string;
    date: string;
    time: string;
    participants: number;
    price: string;
    spots: number;
    type: 'gala' | 'degustation';
}

const nurseEvents = ref<NurseEvent[]>([
    {
        title: 'demo.nurses.event_gala_annual',
        date: '2024-12-15',
        time: '19:30',
        participants: 89,
        price: '150€',
        spots: 11,
        type: 'gala'
    },
    {
        title: 'demo.nurses.event_dinner_candles',
        date: '2024-11-20',
        time: '20:00',
        participants: 45,
        price: '85€',
        spots: 5,
        type: 'gala'
    },
    {
        title: 'demo.nurses.event_wine_tasting',
        date: '2024-10-25',
        time: '18:30',
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
    const serviceKey = booking.value.service as 'midi' | 'soir' | 'vip';
    const serviceName = t(`demo.nurses.reservation.service_names.${serviceKey}`);
    const vipBonus = booking.value.service === 'vip' ? t('demo.nurses.reservation.vip_bonus') : '';

    reservationMessage.value = t('demo.nurses.reservation.confirmed', {
        guests: booking.value.guests,
        date: booking.value.date,
        service: serviceName,
        vipBonus: vipBonus
    });

    adminStats.value.totalReservations++;
    adminStats.value.totalGuests += booking.value.guests;
    if (booking.value.service === 'vip') {
        adminStats.value.vipReservations++;
    }

    setTimeout(() => {
        reservationMessage.value = '';
    }, 3000);
};

const selectNurseEvent = (idx: number) => {
    selectedEvent.value = idx;
};

const reserveEvent = () => {
    if (selectedEvent.value === null) {
        eventReservationMessage.value = '';
        return;
    }

    const event = nurseEvents.value[selectedEvent.value];
    if (event.spots <= 0) {
        eventReservationMessage.value = '';
        return;
    }

    event.spots--;
    event.participants++;
    adminStats.value.totalReservations++;

    eventReservationMessage.value = `${t('demo.nurses.reservation_success')} "${t(event.title)}" !`;

    setTimeout(() => { eventReservationMessage.value = ''; }, 3000);
};

const addDemoEvent = () => {
    nurseEvents.value.push({
        title: ` ${t('demo.nurses.addNewEvent')} ${nurseEvents.value.length + 1}`,
        date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        time: '20h00',
        participants: 0,
        price: '70€',
        spots: 30,
        type: Math.random() > 0.5 ? 'gala' : 'degustation'
    });
    toast.success(`${t('demo.nurses.name_event')} : ${t('demo.nurses.addNewEvent')} ${nurseEvents.value.length}`);
};

const resetDemoData = () => {
    nurseEvents.value = [
        { title: 'demo.nurses.event_gala_annual', date: '2024-12-15', time: '19:30', participants: 89, price: '150€', spots: 11, type: 'gala' },
        { title: 'demo.nurses.event_dinner_candles', date: '2024-11-20', time: '20:00', participants: 45, price: '85€', spots: 5, type: 'gala' },
        { title: 'demo.nurses.event_wine_tasting', date: '2024-10-25', time: '18:30', participants: 32, price: '65€', spots: 18, type: 'degustation' }
    ];
    adminStats.value = { totalReservations: 127, vipReservations: 34, totalGuests: 486 };
    selectedEvent.value = null;
    toast.info(t('demo.nurses.reset_success'));
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
    { title: 'demo.echo.congress', date: '2024-06-15', participants: 145, status: 'ouvert', maxParticipants: 200 },
    { title: 'demo.echo.symposium', date: '2024-07-20', participants: 89, status: 'ouvert', maxParticipants: 150 },
    { title: 'demo.echo.workshop', date: '2024-08-10', participants: 50, status: 'complet', maxParticipants: 50 }
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
    events.value.splice(idx, 1);
    if (selectedEvent.value === idx) {
        selectedEvent.value = null;
        registration.value.eventId = '';
    }
    toast.info('Événement supprimé');
};


const showMessage = (message: string, isError = true) => {
    registrationMessage.value = message;
    setTimeout(() => {
        registrationMessage.value = '';
    }, 3000);
};

const registerToEvent = () => {
    const eventId = parseInt(registration.value.eventId);
    const event = events.value[eventId];

    if (!canRegister.value) {
        showMessage(t('demo.echo.validation_check'), true);
        return;
    }

    if (!event) {
        showMessage('❌ Événement non trouvé');
        return;
    }

    if (event.status === 'complet') {
        showMessage('❌ Cet événement est déjà complet');
        return;
    }

    if (event.participants + 1 > event.maxParticipants) {
        event.status = 'complet';
        showMessage('❌ Désolé, cet événement vient d\'être complet');
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

    toast.info(t('demo.echo.toast_success') + ` (${heartData.value.heartRate} bpm)`);
};

const downloadResource = () => {
    downloadMessage.value = '✓ ' + t('demo.echo.download_success');
    setTimeout(() => {
        downloadMessage.value = '';
    }, 2000);
};

// Utilitaires
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR' }).format(value);
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
    if (!newPost.value.content.trim()) {
        toast.warning(t('demo.afr_fan.toast_check_form'));
        return;
    }

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
    toast.success(t('demo.afr_fan.toast_post_success'));
};

const addMediaPost = () => {
    toast.info('📷 Fonctionnalité média (démo)');
};

const addEventPost = () => {
    toast.info('📅 Fonctionnalité événement (démo)');
};

const deletePost = (idx: number) => {
    posts.value.splice(idx, 1);
    toast.info(t('demo.afr_fan.toast_delete_post'));
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
        toast.warning('Veuillez entrer le nom du groupe 👮‍♂️');
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
        toast.info(t('demo.afr_fan.already_member'));
    } else {
        groups.value[idx].joined = true;
        groups.value[idx].members++;
        toast.success(t('demo.afr_fan.joined_success', { name: groups.value[idx].name }));
    }
};

const processPayment = async () => {
    isProcessing.value = true;
    paymentMessage.value = t('demo.afr_fan.processings');

    setTimeout(() => {
        isProcessing.value = false;

        const isMonthly = selectedPlan.value === 'monthly';
        const amountKey = isMonthly ? 'demo.afr_fan.success_monthly' : 'demo.afr_fan.success_yearly';
        const methodName = t(`demo.afr_fan.methods.${paymentMethod.value}`);

        paymentMessage.value = t(amountKey, { method: methodName });

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
    width: 800px;
    height: 91%;
    object-fit: cover;
    border-radius: 8px;
    z-index: 1;
    box-shadow: 0 4px 8px rgba(129, 8, 177, 0.384);
    padding-bottom: 2rem !important; 
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