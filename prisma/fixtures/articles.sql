-- Insertion de 50 articles avec des images basées sur des mots-clés pertinents (LoremFlickr)
INSERT INTO "article" ("name", "imageurl", "description", "prix", "createdAt", "updatedAt")
VALUES
    ('Flipper Zero', 'https://loremflickr.com/400/400/gadget,hacker/all', 'Outil multi-tool de piratage éthique pour les protocoles radio, RFID, NFC et infrarouge.', 169.00, NOW(), NOW()),
    ('WiFi Pineapple Enterprise', 'https://loremflickr.com/400/400/router,antenna/all', 'Plateforme d''audit de sécurité pour les réseaux sans fil. Idéal pour les tests de pénétration.', 119.99, NOW(), NOW()),
    ('USB Rubber Ducky', 'https://loremflickr.com/400/400/usb,pendrive/all', 'Clé USB d''injection de frappes au clavier. Exécute des scripts en quelques secondes.', 49.99, NOW(), NOW()),
    ('Bash Bunny', 'https://loremflickr.com/400/400/usb,computer/all', 'Plateforme d''attaque USB avancée pour l''exfiltration de données et l''audit.', 99.99, NOW(), NOW()),
    ('LAN Turtle', 'https://loremflickr.com/400/400/ethernet,usb/all', 'Outil d''administration système et de test d''intrusion déguisé en adaptateur USB Ethernet.', 59.99, NOW(), NOW()),
    ('Proxmark3 RDV4', 'https://loremflickr.com/400/400/rfid,circuit/all', 'Le couteau suisse de la recherche et de l''analyse RFID. Kit complet avec antennes.', 350.00, NOW(), NOW()),
    ('HackRF One', 'https://loremflickr.com/400/400/radio,antenna/all', 'Périphérique SDR (Software Defined Radio) capable de transmettre ou recevoir des signaux radio.', 339.00, NOW(), NOW()),
    ('Ubertooth One', 'https://loremflickr.com/400/400/bluetooth,circuit/all', 'Plateforme de développement sans fil 2.4 GHz open source pour l''expérimentation Bluetooth.', 129.50, NOW(), NOW()),
    ('RTL-SDR Blog V3', 'https://loremflickr.com/400/400/usb,radio/all', 'Dongle USB pour la réception radio logicielle (SDR). Parfait pour débuter en analyse de signaux.', 35.00, NOW(), NOW()),
    ('O.MG Cable', 'https://loremflickr.com/400/400/usb,cable/all', 'Câble USB d''apparence normale intégrant un implant d''injection de frappes sans fil.', 139.99, NOW(), NOW()),
    ('Raspberry Pi 4 Kit Pentest', 'https://loremflickr.com/400/400/raspberrypi,circuit/all', 'Kit complet Raspberry Pi 4 (8GB) préconfiguré avec Kali Linux pour l''audit mobile.', 145.00, NOW(), NOW()),
    ('Carte WiFi Alfa AWUS036ACH', 'https://loremflickr.com/400/400/wifi,antenna/all', 'Adaptateur USB sans fil longue portée avec mode monitor, indispensable pour l''audit WiFi.', 65.00, NOW(), NOW()),
    ('Shark Jack', 'https://loremflickr.com/400/400/ethernet,network/all', 'Outil d''audit réseau portable conçu pour des évaluations rapides sur des réseaux filaires.', 59.99, NOW(), NOW()),
    ('Plunder Bug', 'https://loremflickr.com/400/400/network,switch/all', 'Mini-switch réseau (Smart LAN Tap) permettant la capture de paquets via USB-C.', 49.99, NOW(), NOW()),
    ('Key Croc', 'https://loremflickr.com/400/400/keyboard,usb/all', 'Keylogger matériel avancé avec capacités de filtrage et d''exfiltration via WiFi.', 109.99, NOW(), NOW()),

-- Outils Défensifs et Protection Vie Privée
    ('YubiKey 5 NFC', 'https://loremflickr.com/400/400/security,key/all', 'Clé de sécurité matérielle pour l''authentification à deux facteurs (2FA) et la protection des comptes.', 55.00, NOW(), NOW()),
    ('Sac de Faraday', 'https://loremflickr.com/400/400/bag,shield/all', 'Pochette bloquant tous les signaux (Cellulaire, WiFi, Bluetooth, GPS) pour téléphones.', 25.00, NOW(), NOW()),
    ('Bloqueur de données USB', 'https://loremflickr.com/400/400/usb,shield/all', '"Condom USB" empêchant le transfert de données tout en permettant la charge sur des ports publics.', 12.50, NOW(), NOW()),
    ('Cache Webcam (Pack de 5)', 'https://loremflickr.com/400/400/webcam,privacy/all', 'Caches coulissants ultra-fins pour protéger votre vie privée sur ordinateur et tablette.', 6.99, NOW(), NOW()),
    ('Filtre de confidentialité Écran', 'https://loremflickr.com/400/400/screen,privacy/all', 'Filtre assombrissant l''écran vu de côté pour empêcher le "shoulder surfing".', 34.90, NOW(), NOW()),
    ('Clé USB Cryptée (64Go)', 'https://loremflickr.com/400/400/usb,padlock/all', 'Clé USB avec chiffrement matériel AES 256 bits et clavier physique pour le code PIN.', 89.00, NOW(), NOW()),
    ('Routeur VPN de voyage', 'https://loremflickr.com/400/400/router,travel/all', 'Mini-routeur portable permettant de sécuriser vos connexions sur les réseaux Wi-Fi publics.', 45.00, NOW(), NOW()),
    ('Clé Titan Security (Google)', 'https://loremflickr.com/400/400/security,token/all', 'Clé de sécurité FIDO U2F pour protéger contre le phishing avancé.', 35.00, NOW(), NOW()),
    ('Bloqueur de Microphone', 'https://loremflickr.com/400/400/microphone,plug/all', 'Faux connecteur Jack 3.5mm trompant l''OS pour désactiver le microphone interne.', 8.50, NOW(), NOW()),
    ('Portefeuille Anti-RFID', 'https://loremflickr.com/400/400/wallet,rfid/all', 'Portefeuille bloquant les scanners RFID pour protéger vos cartes bancaires.', 29.99, NOW(), NOW()),

-- Livres & Formations
    ('The Web Application Hacker''s Handbook', 'https://loremflickr.com/400/400/book,hacker/all', 'La bible absolue pour découvrir et exploiter les failles de sécurité web.', 45.00, NOW(), NOW()),
    ('Black Hat Python', 'https://loremflickr.com/400/400/book,python/all', 'Livre d''apprentissage de la programmation Python orientée pour les hackers et pentesters.', 35.50, NOW(), NOW()),
    ('RTFM (Red Team Field Manual)', 'https://loremflickr.com/400/400/book,manual/all', 'Manuel de référence rapide regroupant les commandes essentielles pour les Red Teams.', 15.00, NOW(), NOW()),
    ('Social Engineering: The Science of Human Hacking', 'https://loremflickr.com/400/400/book,psychology/all', 'Livre détaillant les techniques psychologiques utilisées pour tromper les cibles humaines.', 28.00, NOW(), NOW()),
    ('Hacking: The Art of Exploitation', 'https://loremflickr.com/400/400/book,code/all', 'Un classique expliquant les bases du fonctionnement de la mémoire et du développement d''exploits.', 40.00, NOW(), NOW()),
    ('Practical Malware Analysis', 'https://loremflickr.com/400/400/book,malware/all', 'Guide complet sur la dissection et l''analyse de logiciels malveillants de manière sécurisée.', 55.00, NOW(), NOW()),
    ('BTFM (Blue Team Field Manual)', 'https://loremflickr.com/400/400/book,defense/all', 'Livre de référence pour les équipes de défense (Blue Teams) et les réponses aux incidents.', 15.00, NOW(), NOW()),
    ('Applied Cryptography', 'https://loremflickr.com/400/400/book,cryptography/all', 'L''ouvrage de référence de Bruce Schneier sur les protocoles, algorithmes et codes source.', 60.00, NOW(), NOW()),
    ('Pass Laboratoire Pentest (1 mois)', 'https://loremflickr.com/400/400/server,network/all', 'Accès virtuel d''un mois à un environnement réseau vulnérable pour s''entraîner légalement.', 99.00, NOW(), NOW()),
    ('Voucher CompTIA Security+', 'https://loremflickr.com/400/400/certificate,exam/all', 'Bon d''examen pour passer la certification internationale de base en cybersécurité.', 370.00, NOW(), NOW()),

-- Outils Physiques & Réseau
    ('Kit de Lockpicking Transparent', 'https://loremflickr.com/400/400/padlock,lockpick/all', 'Kit d''apprentissage au crochetage avec cadenas transparent pour comprendre les mécanismes physiques.', 25.00, NOW(), NOW()),
    ('Testeur de câble réseau', 'https://loremflickr.com/400/400/ethernet,tester/all', 'Outil de diagnostic pour vérifier la connectivité et la qualité des câbles RJ45 et RJ11.', 18.50, NOW(), NOW()),
    ('Pince à sertir RJ45 Pro', 'https://loremflickr.com/400/400/tool,ethernet/all', 'Pince professionnelle pour créer vos propres câbles réseau sur mesure.', 22.00, NOW(), NOW()),
    ('Switch réseau manageable (8 ports)', 'https://loremflickr.com/400/400/switch,network/all', 'Switch Gigabit permettant la configuration de VLANs et le port mirroring pour l''analyse réseau.', 45.00, NOW(), NOW()),
    ('Détecteur de caméras cachées', 'https://loremflickr.com/400/400/detector,lens/all', 'Scanner portable pour détecter les objectifs de caméras espions et les micros sans fil.', 38.00, NOW(), NOW()),
    ('Antenne Yagi Directionnelle 2.4GHz', 'https://loremflickr.com/400/400/antenna,yagi/all', 'Antenne haute portée pour capter des réseaux sans fil distants lors d''audits externes.', 55.00, NOW(), NOW()),
    ('Câble console Cisco USB', 'https://loremflickr.com/400/400/cable,cisco/all', 'Câble indispensable pour l''administration directe des routeurs et commutateurs professionnels.', 14.99, NOW(), NOW()),
    ('Organisateur de câbles tactique', 'https://loremflickr.com/400/400/bag,cables/all', 'Trousse de rangement renforcée pour transporter tous vos dongles, clés USB et adaptateurs.', 26.50, NOW(), NOW()),
    ('Multimètre Numérique', 'https://loremflickr.com/400/400/multimeter,electronics/all', 'Outil de mesure essentiel pour le hacking matériel (hardware hacking) et le diagnostic de circuits.', 32.00, NOW(), NOW()),
    ('Adaptateur USB vers Série (UART)', 'https://loremflickr.com/400/400/circuit,usb/all', 'Module FT232RL pour la communication série matérielle avec des routeurs ou objets connectés (IoT).', 9.50, NOW(), NOW()),

-- Accessoires & Lifestyle Hacking
    ('Mug "There is no patch for human stupidity"', 'https://loremflickr.com/400/400/mug,coffee/all', 'Tasse à café en céramique noire avec citation célèbre pour la salle de pause de l''équipe sécurité.', 12.90, NOW(), NOW()),
    ('Sweat à capuche "Security Researcher"', 'https://loremflickr.com/400/400/hoodie,hacker/all', 'Le vêtement officiel de tout bon hacker. Couleur noire, confortable pour les longues nuits de code.', 45.00, NOW(), NOW()),
    ('Tapis de souris XXL Linux Cheat Sheet', 'https://loremflickr.com/400/400/mousepad,desk/all', 'Tapis de bureau géant imprimé avec les commandes système et réseau les plus utiles.', 24.90, NOW(), NOW()),
    ('Pack de 50 Autocollants "Hack the Planet"', 'https://loremflickr.com/400/400/stickers,laptop/all', 'Stickers en vinyle pour personnaliser votre ordinateur portable de pentest.', 8.99, NOW(), NOW()),
    ('Figurine Canard (Rubber Duck Debugging)', 'https://loremflickr.com/400/400/rubberduck,toy/all', 'Un canard en plastique jaune pour vous écouter expliquer vos bugs de code. Efficacité prouvée.', 5.50, NOW(), NOW());