import fs from 'fs';
import path from 'path';

const frPath = path.resolve('src/locales/fr.json');
const enPath = path.resolve('src/locales/en.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

fr.contact = {
  "loading": "Me contacter...",
  "quote": " « Vous pouvez me contacter ici de deux façons.  » ",
  "p": "Travailler avec des équipes et décideurs internationaux m’a appris une chose : la meilleure technologie ne remplace pas une bonne discussion. Parlons de votre projet — sans engagement, avec sérieux et bienveillance.",
  "form_name": "Nom",
  "form_email": "Email",
  "form_message": "Message",
  "sending": "Envoi...",
  "send": "Envoyer",
  "toast_fill_all": "Veuillez remplir tous les champs 👮‍♂️ !",
  "toast_invalid_email": "Veuillez entrer une adresse e-mail valide 😏 !",
  "toast_error": "Erreur lors de l’envoi. Vérifiez votre connnexion internet 🥶.",
  "toast_success": "Message envoyé avec succès 🎉 !",
  "meta_title": "Contact de Randy",
  "meta_desc": "Contacte-moi ici de deux façons."
};

en.contact = {
  "loading": "Contacting me...",
  "quote": " \"You can contact me here in two ways.\" ",
  "p": "Working with international teams and decision-makers taught me one thing: the best technology doesn't replace a good discussion. Let's talk about your project — without obligation, with seriousness and benevolence.",
  "form_name": "Name",
  "form_email": "Email",
  "form_message": "Message",
  "sending": "Sending...",
  "send": "Send",
  "toast_fill_all": "Please fill out all fields 👮‍♂️!",
  "toast_invalid_email": "Please enter a valid email address 😏!",
  "toast_error": "Error during sending. Check your internet connection 🥶.",
  "toast_success": "Message sent successfully 🎉!",
  "meta_title": "Randy's Contact",
  "meta_desc": "Contact me here in two ways."
};

fr.whatsapp = {
  "title": "Contactez-moi sur",
  "qr_alt": "QR Code WhatsApp",
  "scan_message": "Scannez ce QR pour m'écrire sur WhatsApp mobile",
  "click_link": "Ou cliquez ici pour ouvrir directement WhatsApp web"
};

en.whatsapp = {
  "title": "Contact me on",
  "qr_alt": "QR Code WhatsApp",
  "scan_message": "Scan this QR code to write to me on WhatsApp mobile",
  "click_link": "Or click here to open WhatsApp web directly"
};

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
