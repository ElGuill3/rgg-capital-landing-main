/** Copy hub RGG — tono institucional; sin cifras de performance no aprobadas */
const CONTACT_EMAIL = "rggcapital5@gmail.com";

const NAV_TREE = [
  {
    pillarId: "system",
    labelKey: "system",
    subItems: [
      { id: "system-overview", labelKey: "systemOverview" },
      { id: "system-allocation", labelKey: "systemAllocation" },
      { id: "system-research", labelKey: "systemResearch" },
      { id: "system-execution", labelKey: "systemExecution" },
    ],
  },
  {
    pillarId: "crypto",
    labelKey: "crypto",
    subItems: [
      { id: "crypto-trading", labelKey: "cryptoTrading" },
      { id: "crypto-strategy", labelKey: "cryptoStrategy" },
      { id: "crypto-optimization", labelKey: "cryptoOptimization" },
      { id: "crypto-risk", labelKey: "cryptoRisk" },
    ],
  },
  {
    pillarId: "sports",
    labelKey: "sports",
    subItems: [
      { id: "sports-market", labelKey: "sportsMarket" },
      { id: "sports-strategy", labelKey: "sportsStrategy" },
      { id: "sports-execution", labelKey: "sportsExecution" },
      { id: "sports-portfolio", labelKey: "sportsPortfolio" },
    ],
  },
  {
    pillarId: "ai-labs",
    labelKey: "aiLabs",
    subItems: [
      { id: "ai-labs-rl-core", labelKey: "aiLabsRlCore" },
      { id: "ai-labs-agents", labelKey: "aiLabsAgents" },
      { id: "ai-labs-simulation", labelKey: "aiLabsSimulation" },
      { id: "ai-labs-vision", labelKey: "aiLabsVision" },
    ],
  },
  {
    pillarId: "foundation",
    labelKey: "foundation",
    subItems: [
      { id: "foundation-infrastructure", labelKey: "foundationInfrastructure" },
      { id: "foundation-philosophy", labelKey: "foundationPhilosophy" },
    ],
  },
];

const en = {
  hub: {
    contactEmail: CONTACT_EMAIL,
    nav: {
      system: "INNOVATION HUB",
      crypto: "CRYPTO",
      sports: "SPORTS",
      aiLabs: "AI LABS",
      foundation: "FOUNDATION",
    },
    navTree: NAV_TREE,
    navSub: {
      systemOverview: "0.1 System overview",
      systemAllocation: "0.2 Allocation",
      systemResearch: "0.3 Research",
      systemExecution: "0.4 Execution",
      cryptoTrading: "1.1 Multi-horizon",
      cryptoStrategy: "1.2 Strategy",
      cryptoOptimization: "1.3 Optimization",
      cryptoRisk: "1.4 Risk",
      sportsMarket: "2.1 Market",
      sportsStrategy: "2.2 Strategy",
      sportsExecution: "2.3 Execution",
      sportsPortfolio: "2.4 Portfolio",
      aiLabsRlCore: "3.1 RL Core",
      aiLabsAgents: "3.2 Agents",
      aiLabsSimulation: "3.3 Simulation",
      aiLabsVision: "3.4 Vision",
      foundationInfrastructure: "4 Core infrastructure",
      foundationPhilosophy: "5 Philosophy",
    },
    a11y: {
      foundationGroup: "Infrastructure and philosophy",
    },
    hero: {
      title: "RGG",
      titleAccent: "Innovation HUB",
      description:
        "RGG Capital is an innovation hub building AI-native trading systems, portfolio optimization engines, and next-generation hedge fund infrastructure. Work is grounded in rigorous mathematical modeling, statistical inference, and portfolio optimization — applied across crypto, algorithmic sports betting, and reinforcement learning R&D.",
      ctaPrimary: "Contact",
      ctaSecondary: "View system",
    },
    sections: {
      system: {
        tag: "0.1 System overview",
        title: "Multi-strategy, multi-asset, AI-native",
        lead:
          "We do not optimize individual trades in isolation — we engineer systems that discover, validate, and deploy strategies at scale.",
        quote: "We don't build strategies; we build systems that generate strategies.",
        bullets: [
          "Multi-strategy architecture spanning horizons and signal types",
          "Multi-asset coverage with unified risk and allocation logic",
          "AI-native research and execution pipelines end to end",
        ],
      },
      allocation: {
        tag: "0.2 Capital allocation engine",
        title: "Portfolio construction",
        lead: "Capital is routed dynamically across strategies with discipline, not discretion alone.",
        bullets: [
          "Cross-strategy allocation and correlation-aware sizing",
          "Dynamic capital routing as edges and regimes evolve",
          "Volatility- and drawdown-adaptive exposure",
        ],
      },
      research: {
        tag: "0.3 Research engine",
        title: "From idea to deployment",
        lead: "A closed loop: generate hypotheses, simulate, validate, and ship — tightly coupled to AI Labs.",
        bullets: [
          "Structured idea generation and experiment design",
          "Simulation at scale before capital commitment",
          "Validation gates and controlled deployment",
        ],
      },
      execution: {
        tag: "0.4 Execution layer",
        title: "Where capital meets markets",
        lead: "Execution is treated as a first-class systems problem: connectivity, latency, and operational resilience.",
        bullets: [
          "Digital asset and crypto market access",
          "Sports betting and probability-market venues",
          "Derivatives and prediction-market interfaces where applicable",
        ],
      },
      pillarCrypto: {
        tag: "1 Crypto fund",
        title: "RGG Capital Crypto Fund",
        lead: "Systematic exposure across crypto with horizon-specific alpha and rigorous risk controls.",
        bullets: [
          "Multi-horizon trading (e.g. intraday through daily)",
          "Strategy families: momentum, mean reversion, volatility, event-driven",
          "Portfolio optimization, correlation management, drawdown control",
          "Dynamic exposure, preservation rules, and kill-switch logic",
        ],
      },
      cryptoTrading: {
        tag: "1.1 Multi-horizon trading",
        title: "Multi-horizon trading engine",
        lead: "Systematic trading with distinct alpha by horizon: from short intraday to daily and multi-day, with disciplined entry and exit logic.",
        bullets: [
          "Timeframes including 5m, 15m, 4h, and daily (and adjacent horizons) — different alpha per horizon",
          "Signal families: momentum, mean reversion, volatility regimes, event-driven overlays",
          "Adaptive position sizing per horizon and regime",
        ],
      },
      cryptoStrategy: {
        tag: "1.2 Strategy",
        title: "Strategy families",
        lead: "Multiple uncorrelated strategy types deployed simultaneously to smooth drawdowns and diversify alpha.",
        bullets: [
          "Momentum and trend-following across timeframes",
          "Mean reversion and volatility-targeting strategies",
          "Event-driven and structural arbitrage overlays",
        ],
      },
      cryptoOptimization: {
        tag: "1.3 Optimization",
        title: "Portfolio optimization",
        lead: "Capital allocation across strategies with dynamic sizing, correlation management, and risk overlays.",
        bullets: [
          "Cross-strategy allocation and correlation-aware sizing",
          "Dynamic rebalancing as strategy edges evolve",
          "Drawdown control and kill-switch logic per strategy",
        ],
      },
      cryptoRisk: {
        tag: "1.4 Risk",
        title: "Risk framework",
        lead: "Exposure, preservation, and downside controls as a first-class system component.",
        bullets: [
          "Dynamic exposure limits and preservation rules",
          "Volatility-adaptive position sizing",
          "Real-time PnL monitoring and automated risk gates",
        ],
      },
      pillarSports: {
        tag: "2 Algorithmic sports betting fund",
        title: "RGG Capital Algorithmic Sports Betting Fund",
        lead:
          "Systematic alpha from sports betting markets via algorithmic pricing, probabilistic modeling, and portfolio-level optimization — framed as probability-market trading, not casual wagering.",
        bullets: [
          "Global coverage: exchanges, in-play, event-driven structures",
          "Engines: arbitrage, mispricing vs implied probabilities, line movement, structured payoffs",
          "Infrastructure: multi-book routing, real-time odds, automated execution",
          "Portfolio: event/sport diversification, correlation-aware sizing, drawdown discipline",
        ],
      },
      sportsMarket: {
        tag: "2.1 Market",
        title: "Market access and coverage",
        lead: "Systematic access to global sports betting markets, betting exchanges, in-play (live) venues, and event-driven odds markets.",
        bullets: [
          "Global sports betting and exchange coverage; in-play and pre-match structures",
          "Event-driven and exotic markets where edge is structural, not casual",
          "Real-time odds feeds, line movement, and cross-venue comparables",
        ],
      },
      sportsStrategy: {
        tag: "2.2 Strategy",
        title: "Strategy engine",
        lead: "Systematic alpha: arbitrage (pure and synthetic), mispricing vs implied probabilities, line movement, and structured payoffs (handicaps, totals, multi-leg).",
        bullets: [
          "Implied vs model probability; mispricing detection at scale",
          "Arbitrage and structural payoff engineering across bet types",
          "Volatility and line-movement strategies as tradable signals",
        ],
      },
      sportsExecution: {
        tag: "2.3 Execution",
        title: "Execution infrastructure",
        lead: "Multi-bookmaker routing with real-time odds tracking (24/7) and automated, latency-aware bet placement.",
        bullets: [
          "Automated order submission across books and betting exchanges",
          "Real-time odds tracking and line monitoring around the clock",
          "Timing and routing logic to minimize slippage and maximize fill quality",
        ],
      },
      sportsPortfolio: {
        tag: "2.4 Portfolio",
        title: "Portfolio construction",
        lead: "Capital allocation across events and sports: correlation-aware bet sizing, drawdown-controlled exposure, and multi-strategy aggregation.",
        bullets: [
          "Cross-sport and cross-event position sizing; concentration limits",
          "Correlation tracking and drawdown rules at portfolio level",
          "Multi-strategy aggregation at portfolio level — not one-off picks",
        ],
      },
      pillarAiLabs: {
        tag: "3 RGG AI Labs",
        title: "RL-native hedge fund R&D",
        lead: "Research toward a fully AI-native hedge fund: RL, autonomous agents, and continuous learning.",
        bullets: [
          "RL core: policy optimization, value modeling, adaptive learning",
          "Multi-agent architecture: signals, execution, risk, allocation",
          "Simulation: synthetic markets, scenarios, large-scale backtesting",
          "Vision: strategies generated, tested, and refined by the system with minimal static hand-design",
        ],
      },
      aiLabsRlCore: {
        tag: "3.1 RL Core",
        title: "Reinforcement learning core",
        lead: "Actor-critic style systems: policy optimization (e.g. PPO, A2C), value-function modeling, and adaptive learning for AI-native markets.",
        bullets: [
          "Policy optimization: PPO / A2C-class methods and value modeling",
          "Actor-critic architectures and reward shaping aligned with risk-adjusted returns",
          "Continuous learning loops and policy adaptation as regimes shift",
        ],
      },
      aiLabsAgents: {
        tag: "3.2 Agent Architecture",
        title: "Multi-agent system",
        lead: "Autonomous agents for signal generation, execution, risk, and capital allocation working as a coordinated system.",
        bullets: [
          "Specialized agents per system function (signal, exec, risk, allocation)",
          "Agent communication and coordination protocols",
          "Emergent system behavior from agent interactions",
        ],
      },
      aiLabsSimulation: {
        tag: "3.3 Simulation",
        title: "Simulation environment",
        lead: "Synthetic market generation, scenario engines, and large-scale backtesting — the training loop for safe strategy validation.",
        bullets: [
          "Synthetic market and scenario generation across asset and bet structures",
          "Backtesting at scale with statistical and robustness gates",
          "Iterative training loops: generate, test, refine before deployment",
        ],
      },
      aiLabsVision: {
        tag: "3.4 Autonomous fund vision",
        title: "Autonomous hedge fund vision",
        lead: "No human-in-the-loop strategy design as the end state: the AI system generates, tests, deploys, and continuously self-improves strategies.",
        bullets: [
          "Minimal static hand-design — strategies emerge from learning and evidence",
          "Continuous self-improvement: generate, backtest, deploy, measure, repeat",
          "Capital allocation as a learning signal inside the same loop (ties to Foundation §5)",
        ],
      },
      infrastructure: {
        tag: "4 Core infrastructure",
        title: "Infrastructure layer",
        lead: "Data, execution, simulation, and monitoring as production-grade platforms.",
        bullets: [
          "Data: real-time ingestion, historical stores, feature pipelines",
          "Execution: low-latency paths, integrations, smart routing",
          "Simulation & backtest: multi-market engines and validation",
          "Monitoring: PnL, risk dashboards, system health",
        ],
      },
      philosophy: {
        tag: "5 Philosophy",
        title: "Systems over strategies",
        lead: "This is where the firm differentiates: we do not optimize individual trades — we design systems that produce them.",
        bullets: [
          "Systems over strategies: we don't optimize trades — we design systems that produce them",
          "Capital as a learning signal — allocation is part of the intelligence loop",
          "Markets as probabilistic systems: not only prices or assets — probability surfaces",
          "Continuous evolution: no static models; everything adapts and learns from evidence",
        ],
      },
    },
    phase2Hint: "Shared layer ready — Layout & Hub landing (Phase 3).",
  },
};

const es = {
  hub: {
    contactEmail: CONTACT_EMAIL,
    nav: {
      system: "INNOVATION HUB",
      crypto: "CRYPTO",
      sports: "SPORTS",
      aiLabs: "AI LABS",
      foundation: "FOUNDATION",
    },
    navTree: NAV_TREE,
    navSub: {
      systemOverview: "0.1 Visión de sistema",
      systemAllocation: "0.2 Asignación",
      systemResearch: "0.3 Investigación",
      systemExecution: "0.4 Ejecución",
      cryptoTrading: "1.1 Multi-horizonte",
      cryptoStrategy: "1.2 Estrategia",
      cryptoOptimization: "1.3 Optimización",
      cryptoRisk: "1.4 Riesgo",
      sportsMarket: "2.1 Mercado",
      sportsStrategy: "2.2 Estrategia",
      sportsExecution: "2.3 Ejecución",
      sportsPortfolio: "2.4 Cartera",
      aiLabsRlCore: "3.1 Núcleo RL",
      aiLabsAgents: "3.2 Agentes",
      aiLabsSimulation: "3.3 Simulación",
      aiLabsVision: "3.4 Visión",
      foundationInfrastructure: "4 Infraestructura core",
      foundationPhilosophy: "5 Filosofía",
    },
    a11y: {
      foundationGroup: "Infraestructura y filosofía",
    },
    hero: {
      title: "RGG",
      titleAccent: "Innovation HUB",
      description:
        "RGG Capital es un hub de innovación que construye sistemas de trading nativos en IA, motores de optimización de cartera e infraestructura de hedge fund de nueva generación. El trabajo se apoya en modelado matemático riguroso, inferencia estadística y optimización de cartera — aplicados en crypto, mercados de apuestas deportivas algorítmicas e I+D en aprendizaje por refuerzo.",
      ctaPrimary: "Contacto",
      ctaSecondary: "Ver sistema",
    },
    sections: {
      system: {
        tag: "0.1 Visión de sistema",
        title: "Multi-estrategia, multi-activo, nativo en IA",
        lead:
          "No optimizamos trades aislados: diseñamos sistemas que descubren, validan y despliegan estrategias a escala.",
        quote: "No construimos estrategias aisladas; construimos sistemas que las generan.",
        bullets: [
          "Arquitectura multi-estrategia en distintos horizontes y tipos de señal",
          "Cobertura multi-activo con riesgo y asignación unificados",
          "Investigación y ejecución de punta a punta, nativas en IA",
        ],
      },
      allocation: {
        tag: "0.2 Motor de asignación de capital",
        title: "Construcción de cartera",
        lead: "El capital se enruta de forma dinámica entre estrategias con disciplina, no solo criterio discrecional.",
        bullets: [
          "Asignación cruzada entre estrategias y tamaño consciente de correlaciones",
          "Enrutamiento dinámico conforme evolucionan regímenes y ventajas",
          "Exposición adaptativa a volatilidad y drawdown",
        ],
      },
      research: {
        tag: "0.3 Motor de investigación",
        title: "De la idea al despliegue",
        lead: "Ciclo cerrado: hipótesis, simulación, validación y producción — alineado con AI Labs.",
        bullets: [
          "Generación estructurada de ideas y diseño experimental",
          "Simulación a escala antes de comprometer capital",
          "Validación y despliegue controlado",
        ],
      },
      execution: {
        tag: "0.4 Capa de ejecución",
        title: "Donde el capital encuentra los mercados",
        lead: "La ejecución es un problema de sistemas: conectividad, latencia y resiliencia operativa.",
        bullets: [
          "Acceso a mercados de activos digitales y crypto",
          "Mercados de apuestas deportivas y de probabilidad",
          "Derivados y mercados de predicción cuando aplica",
        ],
      },
      pillarCrypto: {
        tag: "1 Fondo crypto",
        title: "RGG Capital Crypto Fund",
        lead: "Exposición sistemática en crypto con alpha por horizonte y controles de riesgo estrictos.",
        bullets: [
          "Trading multi-horizonte (intradía a diario)",
          "Familias: momentum, reversión a la media, volatilidad, event-driven",
          "Optimización de cartera, correlaciones y control de drawdown",
          "Exposición dinámica, reglas de preservación y kill-switches",
        ],
      },
      cryptoTrading: {
        tag: "1.1 Trading multi-horizonte",
        title: "Motor de trading multi-horizonte",
        lead: "Trading sistemático con alpha distinto por horizonte: desde intradía corto hasta diario y multi-día, con lógica de entrada y salida disciplinada.",
        bullets: [
          "Marcos temporales que incluyen 5m, 15m, 4h y diario (y adyacentes) — distinto alpha por horizonte",
          "Familias: momentum, reversión a la media, regímenes de volatilidad, overlays event-driven",
          "Tamaño de posición adaptativo por horizonte y régimen",
        ],
      },
      cryptoStrategy: {
        tag: "1.2 Estrategia",
        title: "Familias de estrategias",
        lead: "Múltiples tipos de estrategia no correlacionados desplegados simultáneamente para suavizar drawdowns y diversificar alpha.",
        bullets: [
          "Momentum y seguimiento de tendencia en múltiples plazos",
          "Estrategias de reversión a la media y targeting de volatilidad",
          "Overlays de arbitraje estructural y event-driven",
        ],
      },
      cryptoOptimization: {
        tag: "1.3 Optimización",
        title: "Optimización de cartera",
        lead: "Asignación de capital entre estrategias con tamaño dinámico, gestión de correlaciones y overlays de riesgo.",
        bullets: [
          "Asignación cruzada y tamaño consciente de correlaciones",
          "Rebalanceo dinámico conforme evolucionan las ventajas",
          "Control de drawdown y kill-switch por estrategia",
        ],
      },
      cryptoRisk: {
        tag: "1.4 Riesgo",
        title: "Marco de riesgo",
        lead: "Controles de exposición, preservación y downside como componente de primer nivel del sistema.",
        bullets: [
          "Límites de exposición dinámicos y reglas de preservación",
          "Tamaño de posición adaptativo a la volatilidad",
          "Monitoreo de PnL en tiempo real y gates de riesgo automatizados",
        ],
      },
      pillarSports: {
        tag: "2 Fondo deportivo algorítmico",
        title: "RGG Capital Algorithmic Sports Betting Fund",
        lead:
          "Alpha sistemático en mercados de apuestas deportivas mediante pricing algorítmico, modelado probabilístico y optimización a nivel de cartera — enmarcado como trading en mercados de probabilidad.",
        bullets: [
          "Cobertura global: exchanges, en vivo, estructuras event-driven",
          "Motores: arbitraje, mispricing vs probabilidades implícitas, movimiento de líneas, payoffs estructurados",
          "Infra: multi-casa, cuotas en tiempo real, ejecución automatizada",
          "Cartera: diversificación por evento/deporte, tamaño consciente de correlación, disciplina de drawdown",
        ],
      },
      sportsMarket: {
        tag: "2.1 Mercado",
        title: "Acceso y cobertura de mercado",
        lead: "Acceso sistemático a mercados globales de apuestas deportivas, exchanges de apuestas, mercados in-play (en vivo) y estructuras event-driven de cuotas.",
        bullets: [
          "Cobertura global: casas, exchanges, pre-partido y en vivo",
          "Mercados event-driven y estructuras donde el edge es estructural",
          "Feeds en tiempo real, movimiento de líneas y comparables multi-venue",
        ],
      },
      sportsStrategy: {
        tag: "2.2 Estrategia",
        title: "Motor de estrategia",
        lead: "Alpha sistemático: arbitraje (puro y sintético), mispricing frente a probabilidades implícitas, movimiento de líneas y payoffs estructurados (hándicaps, totales, multi-leg).",
        bullets: [
          "Probabilidad implícita vs modelo; detección de mispricing a escala",
          "Arbitraje e ingeniería de payoff estructurado en múltiples tipos de apuesta",
          "Volatilidad y movimiento de línea como señales operables",
        ],
      },
      sportsExecution: {
        tag: "2.3 Ejecución",
        title: "Infraestructura de ejecución",
        lead: "Enrutamiento multi-casa con seguimiento de cuotas en tiempo real (24/7) y colocación automatizada y consciente de latencia.",
        bullets: [
          "Envío automatizado a casas y exchanges de apuestas",
          "Seguimiento de cuotas y líneas de forma continua",
          "Timing y enrutamiento para minimizar slippage y mejorar el fill",
        ],
      },
      sportsPortfolio: {
        tag: "2.4 Cartera",
        title: "Construcción de cartera",
        lead: "Asignación de capital entre eventos y deportes: tamaño consciente de correlación, exposición con control de drawdown y agregación multi-estrategia.",
        bullets: [
          "Tamaño cruzado por deporte y evento; límites de concentración",
          "Seguimiento de correlaciones y reglas de drawdown a nivel de cartera",
          "Agregación multi-estrategia a nivel de cartera — no picks aislados",
        ],
      },
      pillarAiLabs: {
        tag: "3 RGG AI Labs",
        title: "I+D hedge fund nativo en RL",
        lead: "Investigación hacia un hedge fund plenamente nativo en IA: RL, agentes autónomos y aprendizaje continuo.",
        bullets: [
          "Núcleo RL: optimización de políticas, valor, aprendizaje adaptativo",
          "Arquitectura multi-agente: señales, ejecución, riesgo, asignación",
          "Simulación: mercados sintéticos, escenarios, backtesting a escala",
          "Visión: estrategias generadas, probadas y refinadas por el sistema",
        ],
      },
      aiLabsRlCore: {
        tag: "3.1 Núcleo RL",
        title: "Núcleo de aprendizaje por refuerzo",
        lead: "Sistemas tipo actor-crítico: optimización de políticas (p. ej. PPO, A2C), modelado de la función de valor y aprendizaje adaptativo para mercados nativos en IA.",
        bullets: [
          "Optimización de políticas: métodos tipo PPO / A2C y modelado de valor",
          "Arquitecturas actor-crítico y recompensas alineadas con riesgo ajustado",
          "Ciclos de aprendizaje continuo y adaptación al cambiar el régimen",
        ],
      },
      aiLabsAgents: {
        tag: "3.2 Arquitectura de agentes",
        title: "Sistema multi-agente",
        lead: "Agentes autónomos para generación de señales, ejecución, riesgo y asignación de capital trabajando como sistema coordinado.",
        bullets: [
          "Agentes especializados por función del sistema (señal, ejecución, riesgo, asignación)",
          "Protocolos de comunicación y coordinación entre agentes",
          "Comportamiento emergente del sistema desde interacciones entre agentes",
        ],
      },
      aiLabsSimulation: {
        tag: "3.3 Simulación",
        title: "Entorno de simulación",
        lead: "Mercados sintéticos, motores de escenario y backtesting a escala — el bucle de entrenamiento antes de desplegar capital.",
        bullets: [
          "Generación de mercados y escenarios (activos, apuestas, estructuras)",
          "Backtesting a escala con gates estadísticos y de robustez",
          "Bucles de entrenamiento: generar, probar, refinar antes de producción",
        ],
      },
      aiLabsVision: {
        tag: "3.4 Visión fondo autónomo",
        title: "Visión de hedge fund autónomo",
        lead: "Estado final sin diseño humano de estrategias: el sistema de IA genera, prueba, despliega y mejora de forma continua.",
        bullets: [
          "Mínimo diseño estático: las estrategias emergen del aprendizaje y la evidencia",
          "Auto-mejora continua: generar, backtest, desplegar, medir, repetir",
          "Asignación de capital como señal de aprendizaje (conecta con la base §5)",
        ],
      },
      infrastructure: {
        tag: "4 Infraestructura",
        title: "Capa de infraestructura",
        lead: "Datos, ejecución, simulación y monitoreo como plataformas de producción.",
        bullets: [
          "Datos: ingesta en tiempo real, históricos, features",
          "Ejecución: baja latencia, integraciones, enrutamiento",
          "Simulación y backtest: multi-mercado y validación",
          "Monitoreo: PnL, riesgo, salud del sistema",
        ],
      },
      philosophy: {
        tag: "5 Filosofía",
        title: "Sistemas sobre estrategias sueltas",
        lead: "Aquí se diferencia la firma: no optimizamos trades aislados — diseñamos sistemas que los producen.",
        bullets: [
          "Sistemas frente a estrategias: no optimizamos operaciones sueltas, diseñamos sistemas que las generan",
          "El capital como señal de aprendizaje: la asignación forma parte del bucle de inteligencia",
          "Mercados como sistemas probabilísticos: no solo precios o activos — superficies de probabilidad",
          "Evolución continua: nada queda fijo; modelos y controles se adaptan con evidencia",
        ],
      },
    },
    phase2Hint: "Capa compartida lista — Layout y Hub (Fase 3).",
  },
};

export default { en, es };
