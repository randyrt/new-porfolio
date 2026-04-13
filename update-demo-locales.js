import fs from 'fs';
import path from 'path';

// 1. Update locales
const frPath = path.resolve('src/locales/fr.json');
const enPath = path.resolve('src/locales/en.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

fr.demo = {
  hide: "Masquer la démo",
  show: "Voir la démo en action",
  live: "Live Demo",
  fid_connect: {
    title: "📊 Simulation fiscale & comptable",
    period: "Exercice fiscal 2024",
    ongoing: "En cours",
    revenue: "Chiffre d'affaires",
    expenses: "Charges déductibles",
    tax_result: "Résultat imposable",
    vat_title: "💰 TVA due (21%)",
    vat_desc: "Déclaration à soumettre avant le 20 du mois",
    generate_tax: "📄 Générer la déclaration",
    amortization_title: "📉 Plan d'amortissement",
    amortization_line: "Amortissement linéaire • Valeur nette comptable:",
    per_year: "% / an",
    doc_title: "📋 Génération de documents",
    doc_letter: "📝 Lettre d'engagement client",
    doc_report: "📊 Rapport fiscal annuel",
    doc_invoice: "🧾 Facture pro forma",
    alerts_title: "🔔 Alertes fiscales :",
    alert_1: "✓ Déclaration TVA due dans 12 jours",
    alert_2: "✓ Réforme fiscale 2025 : nouvelles déductions possibles",
    alert_3: "✓ Amortissement matériel à réviser"
  },
  qcp: {
    title: "Simulateur de crédit",
    amount: "Montant du prêt",
    rate: "Taux d'intérêt (%)",
    years: "Durée (années)",
    years_unit: "ans",
    results: "Résultats",
    monthly: "Mensualité",
    total: "Total payé",
    interest: "Intérêts totaux",
    amortization: "Amortissement"
  },
  afr_fan: {
    share_placeholder: "Partagez quelque chose avec la communauté africaine...",
    btn_media: "📷 Média",
    btn_event: "📅 Événement",
    btn_publish: "Publier",
    write_comment: "Écrire un commentaire...",
    btn_send: "Envoyer",
    groups_title: "🤝 Groupes d'intérêt",
    btn_create: "+ Créer",
    members: "membres",
    member: "✓ Membre",
    join: "+ Rejoindre",
    premium_title: "Accès Premium",
    popular: "Populaire",
    premium_desc: "Soutenez la communauté et accédez à des fonctionnalités exclusives :",
    premium_1: "✓ 📹 Contenu vidéo exclusif",
    premium_2: "✓ 🎓 Webinaires et formations",
    premium_3: "✓ 🤝 Mise en relation avec des experts",
    premium_4: "✓ 🚫 Pas de publicité",
    monthly: "Mensuel",
    yearly: "Annuel",
    processing: "Traitement...",
    support_now: "Soutenir maintenant",
    stats_title: "📊 Communauté en chiffres",
    stats_members: "Membres",
    stats_posts: "Publications",
    stats_groups: "Groupes actifs",
    stats_countries: "Pays représentés"
  },
  nurses: {
    title: "🍷 Simulateur de réservation",
    guests: "Nombre de personnes",
    date: "Date",
    service: "Service",
    serv_lunch: "🍳 Déjeuner (12h-14h)",
    serv_dinner: "🌙 Dîner (19h-22h)",
    serv_vip: "✨ VIP (service exclusif)",
    vip_inc: "🎁 Service VIP inclus :",
    vip_1: "✓ Accès au salon privé",
    vip_2: "✓ Menu dégustation personnalisé",
    vip_3: "✓ Accueil par le chef cuisinier",
    btn_reserve: "Réserver (démo)",
    events_title: "🎉 Événements à venir",
    participants: "participants",
    remaining: "places restantes",
    btn_reserve_event: "Réserver pour cet événement",
    admin_title: "👑 Panneau d'administration",
    admin_res: "Réservations",
    admin_vip: "VIP",
    admin_guests: "Couverts",
    admin_events: "Événements",
    btn_add_event: "+ Ajouter un événement",
    btn_reset: "Réinitialiser",
    event_gala: "🎭 Gala",
    event_degust: "🍷 Dégustation"
  },
  echo: {
    title: "📅 Gestion des événements",
    upcoming: "Événements à venir",
    btn_new: "+ Nouvel événement",
    participants: "participants",
    status_open: "Ouvert",
    status_full: "Complet",
    btn_delete: "Supprimer",
    form_title: "Inscription à un événement",
    form_name: "Nom complet",
    form_email: "Email",
    select_event: "Sélectionner un événement",
    avail_full: "Complet",
    avail_open: "Disponible",
    btn_register: "S'inscrire",
    cardio_title: "❤️ Imagerie cardiovasculaire",
    params: "Paramètres cardiaques",
    heart_rate: "Fréquence cardiaque",
    blood_press: "Tension artérielle",
    oxygen: "Niveau d'oxygène",
    btn_simData: "Simuler nouvelle donnée",
    hist_title: "Historique des mesures",
    last_8: "Dernières 8 mesures (bpm)",
    resources_title: "Ressources disponibles",
    guide: "📄 Guide pratique cardiologie",
    webinar: "🎥 Webinaire - Nouvelles technologies",
    btn_download: "Télécharger",
    btn_view: "Voir"
  },
  in_dev: {
    title: "Démo en cours de développement",
    desc: "Une version interactive sera bientôt disponible pour ce projet.",
    btn_notify: "Être notifié"
  },
  group_modal: {
    title: "📝 Créer un nouveau groupe",
    label: "Nom du groupe",
    placeholder: "Ex: Musique Africaine, Tech Hub, Cuisine...",
    btn_cancel: "Annuler",
    btn_create: "Valider",
    creating: "Création..."
  }
};

en.demo = {
  hide: "Hide demo",
  show: "See demo in action",
  live: "Live Demo",
  fid_connect: {
    title: "📊 Tax & Accounting Simulation",
    period: "Fiscal Year 2024",
    ongoing: "Ongoing",
    revenue: "Revenue",
    expenses: "Deductible expenses",
    tax_result: "Taxable result",
    vat_title: "💰 VAT due (21%)",
    vat_desc: "Declaration to be submitted before the 20th of the month",
    generate_tax: "📄 Generate declaration",
    amortization_title: "📉 Amortization plan",
    amortization_line: "Linear amortization • Net book value:",
    per_year: "% / yr",
    doc_title: "📋 Document Generation",
    doc_letter: "📝 Client engagement letter",
    doc_report: "📊 Annual tax report",
    doc_invoice: "🧾 Pro forma invoice",
    alerts_title: "🔔 Tax Alerts :",
    alert_1: "✓ VAT declaration due in 12 days",
    alert_2: "✓ 2025 Tax Reform: new deductions available",
    alert_3: "✓ Equipment amortization to review"
  },
  qcp: {
    title: "Credit Simulator",
    amount: "Loan amount",
    rate: "Interest rate (%)",
    years: "Duration (years)",
    years_unit: "years",
    results: "Results",
    monthly: "Monthly payment",
    total: "Total paid",
    interest: "Total interest",
    amortization: "Amortization"
  },
  afr_fan: {
    share_placeholder: "Share something with the African community...",
    btn_media: "📷 Media",
    btn_event: "📅 Event",
    btn_publish: "Publish",
    write_comment: "Write a comment...",
    btn_send: "Send",
    groups_title: "🤝 Interest Groups",
    btn_create: "+ Create",
    members: "members",
    member: "✓ Member",
    join: "+ Join",
    premium_title: "Premium Access",
    popular: "Popular",
    premium_desc: "Support the community and get exclusive features :",
    premium_1: "✓ 📹 Exclusive video content",
    premium_2: "✓ 🎓 Webinars and courses",
    premium_3: "✓ 🤝 Connect with experts",
    premium_4: "✓ 🚫 No ads",
    monthly: "Monthly",
    yearly: "Yearly",
    processing: "Processing...",
    support_now: "Support now",
    stats_title: "📊 Community Stats",
    stats_members: "Members",
    stats_posts: "Posts",
    stats_groups: "Active groups",
    stats_countries: "Countries represented"
  },
  nurses: {
    title: "🍷 Reservation Simulator",
    guests: "Number of people",
    date: "Date",
    service: "Service",
    serv_lunch: "🍳 Lunch (12pm-2pm)",
    serv_dinner: "🌙 Dinner (7pm-10pm)",
    serv_vip: "✨ VIP (Exclusive service)",
    vip_inc: "🎁 VIP service included :",
    vip_1: "✓ Private lounge access",
    vip_2: "✓ Custom tasting menu",
    vip_3: "✓ Welcome by the head chef",
    btn_reserve: "Reserve (demo)",
    events_title: "🎉 Upcoming Events",
    participants: "participants",
    remaining: "spots left",
    btn_reserve_event: "Reserve for this event",
    admin_title: "👑 Admin Dashboard",
    admin_res: "Reservations",
    admin_vip: "VIP",
    admin_guests: "Guests",
    admin_events: "Events",
    btn_add_event: "+ Add event",
    btn_reset: "Reset",
    event_gala: "🎭 Gala",
    event_degust: "🍷 Tasting"
  },
  echo: {
    title: "Event Management",
    upcoming: "Upcoming Events",
    btn_new: "+ New Event",
    participants: "participants",
    status_open: "Open",
    status_full: "Full",
    btn_delete: "Delete",
    form_title: "Event Registration",
    form_name: "Full Name",
    form_email: "Email",
    select_event: "Select Event",
    avail_full: "Full",
    avail_open: "Available",
    btn_register: "Register",
    cardio_title: "❤️ Cardiovascular Imaging",
    params: "Cardiac Parameters",
    heart_rate: "Heart Rate",
    blood_press: "Blood Pressure",
    oxygen: "Oxygen Level",
    btn_simData: "Simulate new data",
    hist_title: "Measurement History",
    last_8: "Last 8 measurements (bpm)",
    resources_title: "Available Resources",
    guide: "📄 Cardiology Guide",
    webinar: "🎥 Webinar - New tech",
    btn_download: "Download",
    btn_view: "View"
  },
  in_dev: {
    title: "Demo under development",
    desc: "An interactive version will be available soon for this project.",
    btn_notify: "Get notified"
  },
  group_modal: {
    title: "📝 Create new group",
    label: "Group name",
    placeholder: "Ex: African Music, Tech Hub, Cooking...",
    btn_cancel: "Cancel",
    btn_create: "Validate",
    creating: "Creating..."
  }
};

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');

// 2. Do string replacements in ProjectGallery.vue
const vuePath = path.resolve('src/components/ProjectGallery.vue');
let code = fs.readFileSync(vuePath, 'utf8');

const replacements = [
  // Hide / show
  ["{{ showDemo ? 'Masquer la démo' : 'Voir la démo en action' }}", "{{ showDemo ? $t('demo.hide') : $t('demo.show') }}"],
  ["Live Demo • {{ title }}", "{{ $t('demo.live') }} • {{ title }}"],

  // fid-connect
  ["📊 Simulation fiscale & comptable", "{{ $t('demo.fid_connect.title') }}"],
  ["Exercice fiscal 2024", "{{ $t('demo.fid_connect.period') }}"],
  ["En cours", "{{ $t('demo.fid_connect.ongoing') }}"],
  ["Chiffre d'affaires", "{{ $t('demo.fid_connect.revenue') }}"],
  ["Charges déductibles", "{{ $t('demo.fid_connect.expenses') }}"],
  ["Résultat imposable", "{{ $t('demo.fid_connect.tax_result') }}"],
  ["💰 TVA due (21%)", "{{ $t('demo.fid_connect.vat_title') }}"],
  ["Déclaration à soumettre avant le 20 du mois", "{{ $t('demo.fid_connect.vat_desc') }}"],
  ["📄 Générer la déclaration", "{{ $t('demo.fid_connect.generate_tax') }}"],
  ["📉 Plan d'amortissement", "{{ $t('demo.fid_connect.amortization_title') }}"],
  ["Amortissement linéaire • Valeur nette comptable: {{ formatCurrency(netBookValue)", "{{ $t('demo.fid_connect.amortization_line') }} {{ formatCurrency(netBookValue)"],
  ["% / an", "{{ $t('demo.fid_connect.per_year') }}"],
  ["📋 Génération de documents", "{{ $t('demo.fid_connect.doc_title') }}"],
  ["📝 Lettre d'engagement client", "{{ $t('demo.fid_connect.doc_letter') }}"],
  ["📊 Rapport fiscal annuel", "{{ $t('demo.fid_connect.doc_report') }}"],
  ["🧾 Facture pro forma", "{{ $t('demo.fid_connect.doc_invoice') }}"],
  ["🔔 Alertes fiscales :", "{{ $t('demo.fid_connect.alerts_title') }}"],
  ["✓ Déclaration TVA due dans 12 jours", "{{ $t('demo.fid_connect.alert_1') }}"],
  ["✓ Réforme fiscale 2025 : nouvelles déductions possibles", "{{ $t('demo.fid_connect.alert_2') }}"],
  ["✓ Amortissement matériel à réviser", "{{ $t('demo.fid_connect.alert_3') }}"],

  // qcp
  ["Simulateur de crédit", "{{ $t('demo.qcp.title') }}"],
  ["Montant du prêt", "{{ $t('demo.qcp.amount') }}"],
  ["Taux d'intérêt (%)", "{{ $t('demo.qcp.rate') }}"],
  ["Durée (années)", "{{ $t('demo.qcp.years') }}"],
  ["ans", "{{ $t('demo.qcp.years_unit') }}"],
  ["Résultats", "{{ $t('demo.qcp.results') }}"],
  ["Mensualité", "{{ $t('demo.qcp.monthly') }}"],
  ["Total payé", "{{ $t('demo.qcp.total') }}"],
  ["Intérêts totaux", "{{ $t('demo.qcp.interest') }}"],
  ["Amortissement", "{{ $t('demo.qcp.amortization') }}"],

  // afr_fan
  ["Partagez quelque chose avec la communauté africaine...", ""], // special placeholder below
  ["placeholder=\"Partagez quelque chose avec la communauté africaine...\"", ":placeholder=\"$t('demo.afr_fan.share_placeholder')\""],
  ["📷 Média", "{{ $t('demo.afr_fan.btn_media') }}"],
  ["📅 Événement", "{{ $t('demo.afr_fan.btn_event') }}"],
  ["> Publier", "> {{ $t('demo.afr_fan.btn_publish') }}"],
  ["placeholder=\"Écrire un commentaire...\"", ":placeholder=\"$t('demo.afr_fan.write_comment')\""],
  ["> Envoyer", "> {{ $t('demo.afr_fan.btn_send') }}"],
  ["🤝 Groupes d'intérêt", "{{ $t('demo.afr_fan.groups_title') }}"],
  ["+ Créer", "{{ $t('demo.afr_fan.btn_create') }}"],
  ["membres <", "{{ $t('demo.afr_fan.members') }} <"],
  ["✓ Membre", "{{ $t('demo.afr_fan.member') }}"],
  ["+ Rejoindre", "{{ $t('demo.afr_fan.join') }}"],
  ["Accès Premium", "{{ $t('demo.afr_fan.premium_title') }}"],
  ["Populaire", "{{ $t('demo.afr_fan.popular') }}"],
  ["Soutenez la communauté et accédez à des fonctionnalités exclusives :", "{{ $t('demo.afr_fan.premium_desc') }}"],
  ["✓ 📹 Contenu vidéo exclusif", "{{ $t('demo.afr_fan.premium_1') }}"],
  ["✓ 🎓 Webinaires et formations", "{{ $t('demo.afr_fan.premium_2') }}"],
  [">✓ 🤝 Mise en relation avec des experts<", ">{{ $t('demo.afr_fan.premium_3') }}<"],
  ["✓ 🚫 Pas de publicité", "{{ $t('demo.afr_fan.premium_4') }}"],
  ["Mensuel<br>", "{{ $t('demo.afr_fan.monthly') }}<br>"],
  ["Annuel<br>", "{{ $t('demo.afr_fan.yearly') }}<br>"],
  ["{{ isProcessing ? 'Traitement...' : 'Soutenir maintenant' }}", "{{ isProcessing ? $t('demo.afr_fan.processing') : $t('demo.afr_fan.support_now') }}"],
  ["📊 Communauté en chiffres", "{{ $t('demo.afr_fan.stats_title') }}"],
  [">Membres<", ">{{ $t('demo.afr_fan.stats_members') }}<"],
  [">Publications<", ">{{ $t('demo.afr_fan.stats_posts') }}<"],
  [">Groupes actifs<", ">{{ $t('demo.afr_fan.stats_groups') }}<"],
  [">Pays représentés<", ">{{ $t('demo.afr_fan.stats_countries') }}<"],

  // nurses
  ["🍷", "🍷"], // prevent issue
  ["Simulateur de réservation", "{{ $t('demo.nurses.title') }}"],
  ["Nombre de personnes", "{{ $t('demo.nurses.guests') }}"],
  [">Date<", ">{{ $t('demo.nurses.date') }}<"], // careful to match label Date
  [">Service<", ">{{ $t('demo.nurses.service') }}<"],
  ["🍳 Déjeuner (12h-14h)", "{{ $t('demo.nurses.serv_lunch') }}"],
  ["🌙 Dîner (19h-22h)", "{{ $t('demo.nurses.serv_dinner') }}"],
  ["✨ VIP (service exclusif)", "{{ $t('demo.nurses.serv_vip') }}"],
  ["🎁 Service VIP inclus :", "{{ $t('demo.nurses.vip_inc') }}"],
  ["✓ Accès au salon privé", "{{ $t('demo.nurses.vip_1') }}"],
  ["✓ Menu dégustation personnalisé", "{{ $t('demo.nurses.vip_2') }}"],
  ["✓ Accueil par le chef cuisinier", "{{ $t('demo.nurses.vip_3') }}"],
  ["Réserver (démo)", "{{ $t('demo.nurses.btn_reserve') }}"],
  ["🎉", "🎉"],
  ["Événements à venir", "{{ $t('demo.nurses.events_title') }}"], // already replaced below
  [" participants</div>", " {{ $t('demo.nurses.participants') }}</div>"],
  [" places restantes\n", " {{ $t('demo.nurses.remaining') }}\n"],
  ["Réserver pour cet événement", "{{ $t('demo.nurses.btn_reserve_event') }}"],
  ["👑", "👑"],
  ["Panneau d'administration", "{{ $t('demo.nurses.admin_title') }}"],
  [">Réservations<", ">{{ $t('demo.nurses.admin_res') }}<"],
  [">VIP<", ">{{ $t('demo.nurses.admin_vip') }}<"],
  [">Couverts<", ">{{ $t('demo.nurses.admin_guests') }}<"],
  [">Événements<", ">{{ $t('demo.nurses.admin_events') }}<"],
  ["+ Ajouter un événement", "{{ $t('demo.nurses.btn_add_event') }}"],
  ["Réinitialiser", "{{ $t('demo.nurses.btn_reset') }}"],
  ["{{ event.type === 'gala' ? '🎭 Gala' : '🍷 Dégustation' }}", "{{ event.type === 'gala' ? $t('demo.nurses.event_gala') : $t('demo.nurses.event_degust') }}"],

  // echo
  ["📅", "📅"],
  ["Gestion des événements", "{{ $t('demo.echo.title') }}"],
  [">Événements à venir<", ">{{ $t('demo.echo.upcoming') }}<"], // wait, already mapped nurses
  ["+ Nouvel événement", "{{ $t('demo.echo.btn_new') }}"],
  ["{{ event.status === 'ouvert' ? 'Ouvert' : 'Complet' }}", "{{ event.status === 'ouvert' ? $t('demo.echo.status_open') : $t('demo.echo.status_full') }}"],
  [">Supprimer<", ">{{ $t('demo.echo.btn_delete') }}<"],
  ["Inscription à un événement", "{{ $t('demo.echo.form_title') }}"],
  ["placeholder=\"Nom complet\"", ":placeholder=\"$t('demo.echo.form_name')\""],
  ["placeholder=\"Email\"", ":placeholder=\"$t('demo.echo.form_email')\""],
  [">Sélectionner un événement<", ">{{ $t('demo.echo.select_event') }}<"],
  ["{{ event.status === 'complet' ? 'Complet' : 'Disponible' }}", "{{ event.status === 'complet' ? $t('demo.echo.avail_full') : $t('demo.echo.avail_open') }}"],
  ["S'inscrire", "{{ $t('demo.echo.btn_register') }}"],
  ["❤️", "❤️"],
  ["Imagerie cardiovasculaire", "{{ $t('demo.echo.cardio_title') }}"],
  ["Paramètres cardiaques", "{{ $t('demo.echo.params') }}"],
  ["Fréquence cardiaque", "{{ $t('demo.echo.heart_rate') }}"],
  ["Tension artérielle", "{{ $t('demo.echo.blood_press') }}"],
  ["Niveau d'oxygène", "{{ $t('demo.echo.oxygen') }}"],
  ["Simuler nouvelle donnée", "{{ $t('demo.echo.btn_simData') }}"],
  ["Historique des mesures", "{{ $t('demo.echo.hist_title') }}"],
  ["Dernières 8 mesures (bpm)", "{{ $t('demo.echo.last_8') }}"],
  ["Ressources disponibles", "{{ $t('demo.echo.resources_title') }}"],
  ["📄 Guide pratique cardiologie", "{{ $t('demo.echo.guide') }}"],
  ["🎥 Webinaire - Nouvelles technologies", "{{ $t('demo.echo.webinar') }}"],
  [">Télécharger<", ">{{ $t('demo.echo.btn_download') }}<"],
  [">Voir<", ">{{ $t('demo.echo.btn_view') }}<"],

  // in_dev
  ["Démo en cours de développement", "{{ $t('demo.in_dev.title') }}"],
  ["Une version interactive sera bientôt disponible pour ce projet.", "{{ $t('demo.in_dev.desc') }}"],
  ["Être notifié", "{{ $t('demo.in_dev.btn_notify') }}"],

  // modal
  ["📝 Créer un nouveau groupe", "{{ $t('demo.group_modal.title') }}"],
  ["Nom du groupe", "{{ $t('demo.group_modal.label') }}"],
  ["placeholder=\"Ex: Musique Africaine, Tech Hub, Cuisine...\"", ":placeholder=\"$t('demo.group_modal.placeholder')\""],
  ["Annuler", "{{ $t('demo.group_modal.btn_cancel') }}"],
  ["{{ isCreatingGroup ? 'Création...' : 'Valider' }}", "{{ isCreatingGroup ? $t('demo.group_modal.creating') : $t('demo.group_modal.btn_create') }}"]
];

for (const [search, replace] of replacements) {
  if (search === "") continue;
  // use split/join for global replace without regex syntax issues
  code = code.split(search).join(replace);
}

// Special case for duplicate "Événements à venir" -> already covered by replace on echo maybe, but let's see, it maps to demo.nurses.events_title initially. 
// "Événements à venir" appears twice. Let's make sure it's valid.

fs.writeFileSync(vuePath, code, 'utf8');

console.log("Demo locales updated!");
