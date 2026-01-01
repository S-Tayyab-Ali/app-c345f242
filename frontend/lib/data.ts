import { QuizQuestion, Recommendation, Resource, ProfessionalGuidance, QuizResponse } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'stairs',
    text: {
      en: "Do you have stairs inside or outside your home that you use regularly?",
      es: "¿Tiene escaleras dentro o fuera de su casa que usa regularmente?"
    },
    type: 'boolean'
  },
  {
    id: 'falls',
    text: {
      en: "Have you or a loved one had a fall in the past year, or do you worry about falling?",
      es: "¿Usted o un ser querido ha tenido una caída en el último año, o le preocupa caerse?"
    },
    type: 'boolean'
  },
  {
    id: 'bathroom',
    text: {
      en: "Which of these best describes your bathroom setup?",
      es: "¿Cuál de estas opciones describe mejor su baño?"
    },
    type: 'single',
    options: [
      { value: 'tub_shower', label: { en: "Tub/Shower Combo", es: "Combinación de bañera y ducha" } },
      { value: 'walk_in_shower', label: { en: "Walk-in Shower with Step", es: "Ducha con escalón" } },
      { value: 'roll_in_shower', label: { en: "Roll-in Shower (No Step)", es: "Ducha sin escalón (accesible)" } }
    ]
  },
  {
    id: 'lighting',
    text: {
      en: "Are there areas in your home that feel dim or hard to see in at night?",
      es: "¿Hay áreas en su casa que se sienten oscuras o difíciles de ver por la noche?"
    },
    type: 'boolean'
  },
  {
    id: 'flooring',
    text: {
      en: "Do you have throw rugs or loose carpets in your hallways or living areas?",
      es: "¿Tiene alfombras sueltas o tapetes en sus pasillos o áreas de estar?"
    },
    type: 'boolean'
  },
  {
    id: 'entryway',
    text: {
      en: "Is it difficult to get in and out of your front door (e.g., heavy door, steps, no railing)?",
      es: "¿Es difícil entrar y salir de su puerta principal (ej. puerta pesada, escalones, sin barandilla)?"
    },
    type: 'boolean'
  }
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'remove_rugs',
    title: { en: "Remove Throw Rugs", es: "Retire las alfombras sueltas" },
    description: {
      en: "Loose rugs are a top cause of falls. Remove them or secure them with double-sided tape.",
      es: "Las alfombras sueltas son una de las principales causas de caídas. Retírelas o asegúrelas con cinta adhesiva de doble cara."
    },
    category: 'DIY',
    cost: '$',
    triggerCondition: (r: QuizResponse) => r.flooring === true
  },
  {
    id: 'night_lights',
    title: { en: "Install Night Lights", es: "Instale luces nocturnas" },
    description: {
      en: "Add plug-in night lights in hallways and bathrooms to improve visibility at night.",
      es: "Agregue luces nocturnas enchufables en pasillos y baños para mejorar la visibilidad por la noche."
    },
    category: 'DIY',
    cost: '$',
    triggerCondition: (r: QuizResponse) => r.lighting === true
  },
  {
    id: 'grab_bars',
    title: { en: "Install Grab Bars", es: "Instale barras de apoyo" },
    description: {
      en: "Install grab bars in the shower and near the toilet. Do not rely on towel racks.",
      es: "Instale barras de apoyo en la ducha y cerca del inodoro. No confíe en los toalleros."
    },
    category: 'Professional',
    cost: '$$',
    triggerCondition: (r: QuizResponse) => r.bathroom === 'tub_shower' || r.bathroom === 'walk_in_shower' || r.falls === true
  },
  {
    id: 'handrails',
    title: { en: "Add Dual Handrails", es: "Agregue pasamanos dobles" },
    description: {
      en: "Ensure stairs have sturdy handrails on BOTH sides for maximum stability.",
      es: "Asegúrese de que las escaleras tengan pasamanos resistentes en AMBOS lados para una máxima estabilidad."
    },
    category: 'Professional',
    cost: '$$',
    triggerCondition: (r: QuizResponse) => r.stairs === true
  },
  {
    id: 'entry_ramp',
    title: { en: "Consider an Entry Ramp", es: "Considere una rampa de entrada" },
    description: {
      en: "If steps are a barrier, a modular ramp can make entering your home much safer.",
      es: "Si los escalones son una barrera, una rampa modular puede hacer que entrar a su casa sea mucho más seguro."
    },
    category: 'Professional',
    cost: '$$$',
    triggerCondition: (r: QuizResponse) => r.entryway === true
  },
  {
    id: 'shower_chair',
    title: { en: "Use a Shower Chair", es: "Use una silla de ducha" },
    description: {
      en: "A shower chair allows you to bathe safely while seated, reducing fatigue and fall risk.",
      es: "Una silla de ducha le permite bañarse de forma segura mientras está sentado, reduciendo la fatiga y el riesgo de caídas."
    },
    category: 'Low-Cost',
    cost: '$',
    triggerCondition: (r: QuizResponse) => r.falls === true || r.bathroom !== 'roll_in_shower'
  }
];

export const RESOURCES: Resource[] = [
  {
    id: 'oc_office_aging',
    name: "OC Office on Aging",
    type: 'Support',
    description: {
      en: "The primary government agency for senior services in Orange County. Call for referrals.",
      es: "La agencia gubernamental principal para servicios para personas mayores en el Condado de Orange. Llame para referencias."
    },
    contact: {
      phone: "800-510-2020",
      website: "https://www.officeonaging.ocgov.com"
    },
    zipCodes: ["92602", "92603", "92604", "92606", "92610", "92612", "92614", "92617", "92618", "92620", "92624", "92625", "92626", "92627", "92629", "92630", "92637", "92646", "92647", "92648", "92649", "92651", "92653", "92655", "92656", "92657", "92660", "92661", "92662", "92663", "92672", "92673", "92675", "92676", "92677", "92678", "92679", "92683", "92688", "92691", "92692", "92694", "92701", "92703", "92704", "92705", "92706", "92707", "92708", "92780", "92782", "92801", "92802", "92804", "92805", "92806", "92807", "92808", "92821", "92823", "92831", "92832", "92833", "92835", "92840", "92841", "92843", "92844", "92845", "92861", "92865", "92866", "92867", "92868", "92869", "92870", "92886", "92887"],
    verified: true
  },
  {
    id: 'habitat_oc',
    name: "Habitat for Humanity OC - Home Repair",
    type: 'Funding',
    description: {
      en: "Offers low-cost home repairs and modifications for qualified low-income seniors.",
      es: "Ofrece reparaciones y modificaciones del hogar a bajo costo para personas mayores de bajos ingresos calificadas."
    },
    contact: {
      phone: "714-434-6200",
      website: "https://www.habitatoc.org"
    },
    zipCodes: ["92701", "92703", "92801", "92802", "92804", "92805"], // Partial list for demo
    verified: true
  },
  {
    id: 'council_aging',
    name: "Council on Aging - Southern California",
    type: 'Support',
    description: {
      en: "Provides unbiased information, programs, and services to older adults.",
      es: "Proporciona información imparcial, programas y servicios a adultos mayores."
    },
    contact: {
      phone: "714-479-0107",
      website: "https://www.coasc.org"
    },
    zipCodes: ["92602", "92603", "92604", "92606"], // Partial list
    verified: true
  },
  {
    id: 'safe_bath_pros',
    name: "Safe Bath Pros (Demo Contractor)",
    type: 'Contractor',
    description: {
      en: "Specializes in walk-in tubs and barrier-free showers. CAPS certified.",
      es: "Se especializa en bañeras de acceso y duchas sin barreras. Certificado CAPS."
    },
    contact: {
      phone: "555-012-3456",
      email: "contact@safebathpros.demo"
    },
    zipCodes: ["92626", "92627", "92646", "92647", "92648"],
    verified: true
  }
];

export const PROFESSIONAL_GUIDANCE: ProfessionalGuidance[] = [
  {
    id: 'ot',
    role: { en: "Occupational Therapist (OT)", es: "Terapeuta Ocupacional (OT)" },
    description: {
      en: "OTs assess how you function in your home and recommend changes to improve safety and independence.",
      es: "Los OT evalúan cómo funciona usted en su hogar y recomiendan cambios para mejorar la seguridad y la independencia."
    },
    whenToCall: {
      en: "If you've had a fall, have a new medical condition, or find daily tasks difficult.",
      es: "Si ha tenido una caída, tiene una nueva condición médica o encuentra difíciles las tareas diarias."
    },
    whatToAsk: {
      en: ["Can you do a home safety evaluation?", "Do you have experience with aging in place modifications?"],
      es: ["¿Puede hacer una evaluación de seguridad en el hogar?", "¿Tiene experiencia con modificaciones para envejecer en casa?"]
    }
  },
  {
    id: 'caps',
    role: { en: "Certified Aging-in-Place Specialist (CAPS)", es: "Especialista Certificado en Envejecimiento en el Lugar (CAPS)" },
    description: {
      en: "Contractors or designers trained specifically in the unique needs of older adults.",
      es: "Contratistas o diseñadores capacitados específicamente en las necesidades únicas de los adultos mayores."
    },
    whenToCall: {
      en: "When you are planning a remodel or need significant structural changes.",
      es: "Cuando esté planeando una remodelación o necesite cambios estructurales significativos."
    },
    whatToAsk: {
      en: ["Are you CAPS certified?", "Can you provide references from past projects?"],
      es: ["¿Está certificado por CAPS?", "¿Puede proporcionar referencias de proyectos anteriores?"]
    }
  }
];

