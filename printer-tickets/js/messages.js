// Base de datos de mensajes bonitos sobre Rayo McQueen
const lightningMcQueenMessages = {
    // Mensajes románticos
    romantic: [
        "🏁 Eres mi pista favorita, siempre quiero correr hacia ti 💕",
        "⚡ Como Rayo McQueen, eres la única que me hace acelerar el corazón 🏎️",
        "🏆 Eres mi trofeo más preciado, mi premio más valioso 💖",
        "🌟 Eres mi estrella guía en cada carrera de la vida ✨",
        "💨 Contigo, cada día es una nueva aventura llena de velocidad y amor 🏁",
        "🔥 Eres mi chispa, mi motor, mi razón para seguir adelante 💕",
        "🏎️ Como Rayo McQueen, sé que contigo puedo llegar a cualquier meta 🏆",
        "💫 Eres mi pit crew perfecto, siempre ahí para apoyarme 💖",
        "⚡ Tu amor es mi combustible, me da la energía para ser el mejor 🏁",
        "🌟 Eres mi Radiador Springs, mi hogar, mi lugar favorito en el mundo 💕"
    ],

    // Mensajes de amor profundo
    deepLove: [
        "🏁 Te amo más que Rayo McQueen ama la velocidad 💕",
        "⚡ Eres mi número 95, mi número de la suerte, mi todo 🏎️",
        "🏆 Contigo, cada día es una victoria, cada momento es un triunfo 💖",
        "🌟 Eres mi Mack, mi compañero de viaje en esta gran aventura 🚛",
        "💨 Tu amor es mi viento a favor, me impulsa hacia adelante 🏁",
        "🔥 Eres mi Doc Hudson, mi mentor, mi inspiración 💕",
        "🏎️ Como Rayo McQueen encontró su hogar en Radiador Springs, yo encontré el mío en ti ✨",
        "💫 Eres mi Sally, mi amor verdadero, mi final feliz 💖",
        "⚡ Tu sonrisa es mi pista de carreras favorita 🏁",
        "🌟 Eres mi Mater, mi mejor amigo, mi confidente 💕"
    ],

    // Mensajes divertidos
    funny: [
        "🏁 Soy más rápido que Rayo McQueen cuando se trata de decirte que te amo ⚡",
        "🏎️ Eres mi pit stop favorito, siempre quiero parar en ti 💕",
        "🏆 Gano todas las carreras cuando tienes mi corazón 🏁",
        "🌟 Eres mi checkered flag, mi meta, mi objetivo 💖",
        "💨 Soy más veloz que un rayo cuando se trata de amarte ⚡",
        "🔥 Eres mi combustible premium, me das la mejor energía 🏎️",
        "🏁 Como Rayo McQueen, soy el mejor cuando estoy contigo 💕",
        "⚡ Eres mi pista de carreras favorita, siempre quiero correr hacia ti 🏆",
        "🌟 Soy más rápido que la velocidad del sonido cuando se trata de amarte 💨",
        "🏎️ Eres mi trofeo Piston Cup, mi premio más valioso 💖"
    ],

    // Mensajes motivacionales
    motivational: [
        "🏁 Como Rayo McQueen, sé que con determinación y amor, podemos lograr cualquier cosa ⚡",
        "🏆 Eres mi inspiración para ser el mejor, para dar siempre el 100% 💕",
        "🌟 Contigo, cada día es una nueva oportunidad de ser extraordinario ✨",
        "⚡ Tu amor me da la fuerza para superar cualquier obstáculo 🏁",
        "🏎️ Como Rayo McQueen aprendió que la velocidad no lo es todo, yo aprendí que contigo tengo todo 💖",
        "💨 Eres mi viento a favor, me impulsas a ser mejor cada día 🏆",
        "🔥 Tu amor es mi motor, me da la energía para conquistar el mundo 💕",
        "🌟 Eres mi radiador, me mantienes fresco y enfocado en lo que importa ⚡",
        "🏁 Contigo, cada carrera de la vida es una aventura emocionante 💖",
        "⚡ Eres mi pit crew perfecto, siempre ahí para darme el mejor apoyo 🏎️"
    ],

    // Mensajes especiales
    special: [
        "🏁 Eres mi Lightning McQueen personal, mi héroe, mi amor 💕",
        "⚡ Como Rayo McQueen encontró su hogar, yo encontré el mío en tu corazón 🏠",
        "🏆 Eres mi Piston Cup, mi trofeo más preciado, mi victoria más grande 💖",
        "🌟 Eres mi Radiador Springs, mi lugar perfecto, mi paraíso ✨",
        "💨 Tu amor es mi velocidad máxima, mi límite más alto 🏁",
        "🔥 Eres mi chispa, mi ignición, mi razón para arrancar cada día ⚡",
        "🏎️ Como Rayo McQueen, sé que contigo puedo llegar a cualquier destino 💕",
        "💫 Eres mi estrella guía, mi GPS del corazón, mi dirección correcta 🗺️",
        "⚡ Tu amor es mi combustible premium, me da la mejor energía 🏁",
        "🌟 Eres mi Mack, mi compañero de viaje en esta gran aventura llamada vida 🚛"
    ],

    // Mensajes de agradecimiento
    gratitude: [
        "🏁 Gracias por ser mi Rayo McQueen personal, por darme velocidad y amor ⚡",
        "💕 Eres mi pit crew perfecto, siempre ahí para apoyarme y animarme 🏆",
        "🌟 Gracias por ser mi Radiador Springs, mi hogar, mi refugio 💖",
        "⚡ Eres mi Doc Hudson, mi mentor en el amor, mi guía perfecta 🏎️",
        "🏁 Gracias por ser mi Sally, mi amor verdadero, mi final feliz ✨",
        "💨 Eres mi viento a favor, gracias por impulsarme hacia adelante 🏁",
        "🔥 Gracias por ser mi combustible, por darme la energía para ser mejor 💕",
        "🌟 Eres mi Mater, mi mejor amigo, gracias por estar siempre ahí 💖",
        "⚡ Gracias por ser mi pista de carreras favorita, por ser mi meta 🏆",
        "🏎️ Eres mi trofeo más valioso, gracias por ser mi premio más grande 💕"
    ]
};

// Decoraciones para los tickets (incluyendo imágenes)
const ticketDecorations = [
    { type: "emoji", content: "🏁" },
    { type: "emoji", content: "⚡" },
    { type: "emoji", content: "🏆" },
    { type: "emoji", content: "🌟" },
    { type: "emoji", content: "💕" },
    { type: "emoji", content: "🏎️" },
    { type: "emoji", content: "💨" },
    { type: "emoji", content: "🔥" },
    { type: "emoji", content: "✨" },
    { type: "emoji", content: "💖" },
    { type: "image", content: "img/RayoMcQueenLengua.webp", alt: "Rayo McQueen" },
    { type: "image", content: "img/Cars3sally.webp", alt: "Sally" },
    { type: "image", content: "img/sallyMqueen.png", alt: "Sally y McQueen" },
    { type: "image", content: "img/copapiston.png", alt: "Copa Piston" },
    { type: "image", content: "img/95img.png", alt: "Número 95" }
];

// Frases de cierre para los tickets
const closingPhrases = [
    "Con amor y velocidad, Rayo McQueen 💕",
    "Tu piloto favorito 🏁",
    "Con cariño y rapidez ⚡",
    "Tu corredor de corazones 🏎️",
    "Con amor a toda velocidad 💨",
    "Tu número 95 favorito 🏆",
    "Con cariño y chispa ⚡",
    "Tu conductor del amor 🚗",
    "Con amor y pit stop 💕",
    "Tu rayo de amor ⚡"
];

// Función para obtener un mensaje aleatorio
function getRandomMessage() {
    const categories = Object.keys(lightningMcQueenMessages);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const messages = lightningMcQueenMessages[randomCategory];
    return messages[Math.floor(Math.random() * messages.length)];
}

// Función para obtener una decoración aleatoria
function getRandomDecoration() {
    return ticketDecorations[Math.floor(Math.random() * ticketDecorations.length)];
}

// Función para obtener una frase de cierre aleatoria
function getRandomClosingPhrase() {
    return closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
}

// Función para generar un ticket completo
function generateTicket() {
    return {
        message: getRandomMessage(),
        decoration: getRandomDecoration(),
        closingPhrase: getRandomClosingPhrase(),
        timestamp: new Date()
    };
}

// Exportar funciones para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getRandomMessage,
        getRandomDecoration,
        getRandomClosingPhrase,
        generateTicket,
        lightningMcQueenMessages
    };
}
