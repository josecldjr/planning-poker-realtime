export const resources = {
  pt: {
    translation: {
      language: {
        label: "Idioma",
        portuguese: "Portugues",
        english: "Ingles",
        spanish: "Espanhol",
      },
      home: {
        badge: "Planeje Agile Mais Rapido",
        titleHighlight: "Planning Poker",
        titleSuffix: "Online",
        description:
          "Estime suas historias de usuario em tempo real com sua equipe de forma simples, rapida e gratuita.",
        createRoom: "Criar Nova Sala",
        footer: "Built with Next.js & Socket.io",
      },
      room: {
        title: "Planning Poker",
        roomLabel: "Sala #{{id}}",
        copyInvite: "Convidar Equipe",
        copied: "Copiado!",
        leaveRoom: "Sair da Sala",
        waitingTeam: "Esperando equipe entrar...",
        votesCount: "{{voted}} / {{total}} votos",
        revealVotes: "REVELAR VOTOS",
        average: "Media",
        newRound: "NOVA RODADA",
        yourEstimate: "Sua Estimativa",
        selected: "Selecionado: {{value}}",
      },
      modal: {
        welcome: "Bem-vindo a sala!",
        question: "Como voce gostaria de ser chamado na mesa?",
        placeholder: "Ex: Joao Silva",
        joinRoom: "Entrar na Sala",
      },
      user: {
        you: "Voce",
        voted: "Votou",
      },
    },
  },
  en: {
    translation: {
      language: {
        label: "Language",
        portuguese: "Portuguese",
        english: "English",
        spanish: "Spanish",
      },
      home: {
        badge: "Plan Agile Faster",
        titleHighlight: "Planning Poker",
        titleSuffix: "Online",
        description:
          "Estimate your user stories in real time with your team in a simple, fast, and free way.",
        createRoom: "Create New Room",
        footer: "Built with Next.js & Socket.io",
      },
      room: {
        title: "Planning Poker",
        roomLabel: "Room #{{id}}",
        copyInvite: "Invite Team",
        copied: "Copied!",
        leaveRoom: "Leave Room",
        waitingTeam: "Waiting for the team to join...",
        votesCount: "{{voted}} / {{total}} votes",
        revealVotes: "REVEAL VOTES",
        average: "Average",
        newRound: "NEW ROUND",
        yourEstimate: "Your Estimate",
        selected: "Selected: {{value}}",
      },
      modal: {
        welcome: "Welcome to the room!",
        question: "How would you like to be identified at the table?",
        placeholder: "Ex: John Smith",
        joinRoom: "Join Room",
      },
      user: {
        you: "You",
        voted: "Voted",
      },
    },
  },
  es: {
    translation: {
      language: {
        label: "Idioma",
        portuguese: "Portugues",
        english: "Ingles",
        spanish: "Espanol",
      },
      home: {
        badge: "Planifica Agile Mas Rapido",
        titleHighlight: "Planning Poker",
        titleSuffix: "Online",
        description:
          "Estima tus historias de usuario en tiempo real con tu equipo de forma simple, rapida y gratuita.",
        createRoom: "Crear Nueva Sala",
        footer: "Built with Next.js & Socket.io",
      },
      room: {
        title: "Planning Poker",
        roomLabel: "Sala #{{id}}",
        copyInvite: "Invitar Equipo",
        copied: "Copiado!",
        leaveRoom: "Salir de la Sala",
        waitingTeam: "Esperando que el equipo entre...",
        votesCount: "{{voted}} / {{total}} votos",
        revealVotes: "REVELAR VOTOS",
        average: "Promedio",
        newRound: "NUEVA RONDA",
        yourEstimate: "Tu Estimacion",
        selected: "Seleccionado: {{value}}",
      },
      modal: {
        welcome: "Bienvenido a la sala!",
        question: "Como te gustaria ser llamado en la mesa?",
        placeholder: "Ej: Juan Perez",
        joinRoom: "Entrar en la Sala",
      },
      user: {
        you: "Tu",
        voted: "Voto",
      },
    },
  },
} as const;

export type AppLanguage = keyof typeof resources;
