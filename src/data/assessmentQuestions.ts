/**
 * KSIA ERT (King Salman International Airport Emergency Response Team)
 * 25-Question Psychometric & Aptitude Assessment
 * 
 * Specifically calibrated for KSIA Administrative Personnel (non-trained candidates,
 * office and department staff) to discover their natural abilities, personality,
 * stress-response instincts, and ideal volunteer brigade fit.
 * 
 * Evaluates candidates for 4 Volunteer Brigade Paths (Team Leader excluded):
 * 1. Safety & Hazard Volunteer Brigade (Practical Action, Hazard Isolation & Physical Courage)
 * 2. First Aid & Medical Support Volunteer Brigade (Compassionate Care, Calm around Injury & Basic Aid)
 * 3. Evacuation & Floor Guidance Volunteer Brigade (Vocal Guidance, Orderly Movement & Floor Sweeps)
 * 4. Communications & Coordination Volunteer Brigade (Clear Reporting, Headcounts & Liaison Support)
 * 
 * Non-obvious psychometric design: Questions avoid giveaway cues, specialized gear assumptions,
 * or operational airport jargon, focusing on natural human choices when stepping up without prior training.
 */

export interface RoleScores {
  suppressionLead: number;
  casualtyCareLead: number;
  evacuationSupportLead: number;
  externalLiaison: number;
}

export interface CompetencyScores {
  decisiveness: number;
  physicalReadiness: number;
  traumaComposure: number;
  crowdControl: number;
  communicationProtocol: number;
}

export interface AssessmentOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  arabicText?: string;
  roleWeights: Partial<RoleScores>;
  competencies: Partial<CompetencyScores>;
  learningInsight: string;
}

export interface AssessmentQuestion {
  id: number;
  module: string;
  arabicModule: string;
  category: 'behavioral' | 'stress' | 'communication' | 'situational' | 'temperament';
  question: string;
  arabicQuestion?: string;
  contextNote?: string;
  options: AssessmentOption[];
}

export interface RoleDefinition {
  id: keyof RoleScores;
  name: string;
  arabicName: string;
  tagline: string;
  badgeColor: string;
  iconName: string;
  standards: string[];
  keyTraits: string[];
  operationalDuties: string[];
  idealPersonality: string;
  recommendedTrainingPath: string[];
}

export const BRIGADE_ROLES: Record<keyof RoleScores, RoleDefinition> = {
  suppressionLead: {
    id: 'suppressionLead',
    name: 'Fire Suppression',
    arabicName: 'إخماد ومكافحة الحرائق',
    tagline: 'Practical Action, Hazard Isolation & Fire Response',
    badgeColor: 'rose',
    iconName: 'Flame',
    standards: ['Introductory Workplace Safety', 'Basic Fire Prevention', 'Workplace Hazard Recognition'],
    keyTraits: [
      'Natural courage and willingness to tackle practical, physical workplace issues',
      'Hands-on problem solving and intuitive mechanical common sense',
      'Readiness to take decisive physical action rather than hesitate',
      'Comfort handling safety equipment (fire blankets, extinguishers) after introductory training',
      'Keen alertness to physical workplace hazards, electrical faults, and safety risks'
    ],
    operationalDuties: [
      'Step up to isolate immediate physical hazards (unplugging devices, closing fire doors)',
      'Assist with basic portable extinguishers or safety blankets on small office fires if safe',
      'Report and mark structural or environmental hazards to arriving responders',
      'Help clear physical pathways and secure safety barriers around hazard areas'
    ],
    idealPersonality: 'Practical, proactive individuals who stay calm when physical action is needed and enjoy solving tangible problems with common sense and courage.',
    recommendedTrainingPath: [
      'Basic Fire Awareness & Extinguisher Practical Use',
      'Workplace Electrical & Hazard Isolation Basics',
      'Emergency Safety Perimeter & Practical Hazard Control'
    ]
  },
  casualtyCareLead: {
    id: 'casualtyCareLead',
    name: 'Casualty Care',
    arabicName: 'رعاية المصابين والإسعافات',
    tagline: 'Compassionate Care, Calm around Injury & Basic Aid',
    badgeColor: 'emerald',
    iconName: 'Stethoscope',
    standards: ['Standard First Aid', 'Basic CPR & AED Awareness', 'Workplace Well-being'],
    keyTraits: [
      'Remains composed and empathetic when a colleague is hurt or unwell',
      'Natural instinct to provide comfort, calm breathing, and emotional reassurance',
      'Careful and attentive to subtle physical signs of distress or shock in others',
      'Patient, steady hands and willingness to learn life-saving first-aid skills',
      'Genuine dedication to human well-being and supporting vulnerable colleagues'
    ],
    operationalDuties: [
      'Step up to comfort and assist colleagues who faint, fall, or suffer cuts/burns',
      'Apply basic first-aid supplies (dressings, ice packs, direct pressure) calmly',
      'Stay beside injured persons until professional medical responders arrive',
      'Provide clear, calm descriptions of the person’s condition to arriving paramedics'
    ],
    idealPersonality: 'Empathetic, steady individuals who remain grounded when others are in pain, instinctively offering comfort and practical physical care.',
    recommendedTrainingPath: [
      'Workplace First Aid & CPR/AED Foundation',
      'Bleeding Control & Wound Care Basics',
      'Psychological First Aid & Calming People in Crisis'
    ]
  },
  evacuationSupportLead: {
    id: 'evacuationSupportLead',
    name: 'Evacuation Support',
    arabicName: 'دعم الإخلاء',
    tagline: 'Vocal Leadership, Orderly Movement & Floor Sweeps',
    badgeColor: 'blue',
    iconName: 'DoorOpen',
    standards: ['Workplace Life Safety', 'Orderly Evacuation Planning', 'Floor Marshal Guidelines'],
    keyTraits: [
      'Confident, clear voice that can guide coworkers without creating panic',
      'Keeps a calm overview of hallway flow, exits, and potential bottlenecks',
      'Patient yet firm authority when colleagues hesitate or try to retrieve items',
      'Systematic diligence in checking offices, meeting rooms, and restrooms',
      'Special attentiveness to assisting coworkers with reduced mobility or visitors'
    ],
    operationalDuties: [
      'Step up to guide colleagues along designated emergency stairwells and exits',
      'Conduct a swift, organized check of your floor to ensure no one remains behind',
      'Keep movement steady and prevent crowding or rushing at doorway bottlenecks',
      'Direct everyone to the designated outdoor assembly point and prevent re-entry'
    ],
    idealPersonality: 'Assertive, socially confident organizers who can project clear guidance, reassure groups, and lead orderly evacuations with confidence.',
    recommendedTrainingPath: [
      'Floor Marshal & Evacuation Guidance Techniques',
      'Crowd Movement & Bottleneck Prevention',
      'Assisting Persons with Restricted Mobility in Evacuations'
    ]
  },
  externalLiaison: {
    id: 'externalLiaison',
    name: 'External Agency Liaison',
    arabicName: 'التنسيق مع الجهات الخارجية',
    tagline: 'Clear Reporting, Accurate Headcounts & Liaison Support',
    badgeColor: 'purple',
    iconName: 'Radio',
    standards: ['Workplace Emergency Logging', 'Inter-Department Communication', 'Liaison Support'],
    keyTraits: [
      'Clear, articulate spoken and written communication under stressful conditions',
      'Methodical note-taking and structured recording of names, times, and events',
      'Calm presence when speaking with building security, emergency dispatch, or management',
      'Filters out rumors and focuses strictly on verified, actionable facts',
      'High organizational discipline in tracking headcounts and missing persons lists'
    ],
    operationalDuties: [
      'Contact emergency services and building security with accurate, concise details',
      'Maintain an organized log of event times, floor evacuations, and reported issues',
      'Assist floor marshals by consolidating headcounts at the outdoor assembly point',
      'Serve as the helpful contact point between your administrative department and emergency responders'
    ],
    idealPersonality: 'Structured, analytical, and articulate communicators who excel at gathering verified information, keeping accurate records, and coordinating smoothly with external teams.',
    recommendedTrainingPath: [
      'Emergency Communication & Dispatch Briefing Skills',
      'Assembly Point Headcount & Incident Logging',
      'Inter-Agency Liaison & Coordination Essentials'
    ]
  }
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // 1. Initial reflex upon sudden workplace disruption
  {
    id: 1,
    module: 'Situational Instinct & Initial Reflex',
    arabicModule: 'الاستجابة التلقائية ورد الفعل الأولي',
    category: 'situational',
    question: 'When an unexpected emergency alarm suddenly rings across your administrative floor and routine work stops, what is your immediate reflex?',
    arabicQuestion: 'عند انطلاق جرس إنذار طارئ ومفاجئ في طابقك الإداري وتوقف العمل فجأة، ما هو رد فعلك التلقائي الأول؟',
    contextNote: 'Measures natural perceptual focus under initial workplace disorientation.',
    options: [
      {
        id: 'A',
        text: 'Look around for the physical source of trouble—checking for strange smoke, burning smells, or malfunctioning electrical equipment.',
        arabicText: 'البحث عن المصدر المادي للمشكلة—ملاحظة أي دخان غريب، أو رائحة احتراق، أو عطل في الأجهزة الكهربائية.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3, decisiveness: 2 },
        learningInsight: 'Demonstrates an instinctive drive to identify and address physical hazards directly.'
      },
      {
        id: 'B',
        text: 'Turn to the nearest colleague to check how they are reacting, ensuring no one is in distress, freezing, or feeling faint.',
        arabicText: 'الالتفات فوراً لأقرب زميل لملاحظة رد فعله والتأكد من عدم شعوره بالهلع أو الإغماء أو العجز عن الحركة.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 1 },
        learningInsight: 'Reflects immediate empathetic observation focused on personal human well-being.'
      },
      {
        id: 'C',
        text: 'Stand up to look down the corridor to see which exit routes are clear and whether people are heading toward the stairs.',
        arabicText: 'الوقوف واستطلاع الممر الرئيسي لمعرفة أي مسارات الخروج سالكة وما إذا كان الزملاء يتجهون للسلالم.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Highlights spatial corridor awareness and immediate evacuation route perception.'
      },
      {
        id: 'D',
        text: 'Check the office intercom or internal message channels to find out what official information is being announced.',
        arabicText: 'متابعة قنوات التواصل الإداري أو الشاشات لمعرفة ما إذا كانت هناك توجيهات أو بلاغات رسمية مؤكدة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3, decisiveness: 1 },
        learningInsight: 'Indicates a focus on verifiable communication channels and official information flow.'
      }
    ]
  },

  // 2. Stepping up during an unplanned building problem
  {
    id: 2,
    module: 'Team Alignment & Practical Contribution',
    arabicModule: 'المساهمة الميدانية والتناغم مع الزملاء',
    category: 'behavioral',
    question: 'If power cuts off across your administrative department alongside an unfamiliar alert sound, which task feels most natural for you to step up and handle?',
    arabicQuestion: 'إذا انقطعت الكهرباء فجأة في إدارتك مصحوبة بصوت تنبيه غير مألوف، أي مهمة تشعر أنها الأقرب لطبيعتك لتتولى المبادرة فيها؟',
    contextNote: 'Measures natural contribution style in sudden departmental disruption.',
    options: [
      {
        id: 'A',
        text: 'Safely unplugging high-voltage office appliances, coffee stations, or computer power strips to prevent short-circuits.',
        arabicText: 'فصل الأجهزة الكهربائية الكبيرة أو سخانات القهوة بأمان لمنع أي التماس كهربائي أو اشتعال.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3, decisiveness: 2 },
        learningInsight: 'Practical affinity for direct hazard mitigation and physical safety measures.'
      },
      {
        id: 'B',
        text: 'Offering reassurance and assisting an anxious coworker or visitor who feels disoriented in the sudden disruption.',
        arabicText: 'تقديم الدعم والاطمئنان لزميل أو زائر يشعر بالقلق أو الارتباك بسبب هذا الانقطاع المفاجئ.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Natural dedication to interpersonal comfort, empathy, and personal emotional stabilization.'
      },
      {
        id: 'C',
        text: 'Encouraging everyone in your section to gather their essentials calmly and head together toward the designated exit.',
        arabicText: 'حث الجميع في قسمك على جمع متعلقاتهم الأساسية بهدوء وبدء التحرك المنظم نحو مخرج الطابق.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Proactive group guidance and orderly movement leadership.'
      },
      {
        id: 'D',
        text: 'Calling the building management or facilities desk to report the outage and record the exact time it occurred.',
        arabicText: 'الاتصال فوراً بإدارة المبنى أو مكتب الصيانة للإبلاغ وتدوين وقت الحادثة والتفاصيل الدقيقة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3 },
        learningInsight: 'High discipline in structured notification, logging, and administrative liaison.'
      }
    ]
  },

  // 3. Reaction to sudden smoke in the hallway
  {
    id: 3,
    module: 'Stress Response & Immediate Safety Reflex',
    arabicModule: 'الاستجابة للضغط وسرعة التصرف',
    category: 'stress',
    question: 'While walking down the main office corridor, you spot light smoke drifting from an unoccupied printing or utility room. What is your immediate instinct?',
    arabicQuestion: 'أثناء مرورك في ممر المكاتب، لاحظت دخاناً خفيفاً يتصاعد من غرفة طباعة أو خدمات غير مأهولة. ما هو تصرفك التلقائي الفوري؟',
    contextNote: 'Measures instinct when first encountering a localized physical hazard.',
    options: [
      {
        id: 'A',
        text: 'Carefully approach the closed door, check if the handle feels hot, and make sure it is shut to keep the smoke contained.',
        arabicText: 'الاقتراب بحذر من الباب، والتأكد من حرارة المقبض، وإغلاقه بإحكام لحصر الدخان ومنع انتشاره.',
        roleWeights: { suppressionLead: 4 },
        competencies: { decisiveness: 3, physicalReadiness: 2 },
        learningInsight: 'Direct proactive containment of physical hazards without unnecessary exposure.'
      },
      {
        id: 'B',
        text: 'Check if anyone inside or nearby inhaled smoke or is coughing, escorting them to fresh air right away.',
        arabicText: 'التأكد مما إذا كان أي شخص قريب قد استنشق الدخان أو يسعل، واصطحابه فوراً إلى منطقة جيدة التهوية.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 1 },
        learningInsight: 'Instant focus on human respiratory safety and personal assistance.'
      },
      {
        id: 'C',
        text: 'Alert everyone on that side of the hallway with a clear voice and guide them toward the opposite stairwell.',
        arabicText: 'تنبيه جميع الموظفين في ذلك الجزء من الممر بصوت واضح وتوجيههم نحو الدرج البعيد عن الدخان.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Assertive vocal direction to channel coworkers away from potential danger.'
      },
      {
        id: 'D',
        text: 'Pull the nearest manual alarm pull station and call internal emergency dispatch to state the exact room number.',
        arabicText: 'تفعيل أقرب كاسر إنذار والاتصال فوراً بالرقم الداخلي للطوارئ لتحديد رقم الغرفة بدقة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3, decisiveness: 2 },
        learningInsight: 'Focus on triggering standard alarm systems and transmitting exact coordinates.'
      }
    ]
  },

  // 4. Intrinsic satisfaction in everyday work
  {
    id: 4,
    module: 'Cognitive Preference & Work Temperament',
    arabicModule: 'النمط الذهني وأسلوب العمل التلقائي',
    category: 'temperament',
    question: 'In your regular administrative role, which type of outcome gives you the greatest personal sense of accomplishment?',
    arabicQuestion: 'في عملك الإداري اليومي، أي نوع من النتائج يمنحك أكبر شعور بالإنجاز والرضا الشخصي؟',
    contextNote: 'Identifies deep intrinsic motivators and problem-solving styles.',
    options: [
      {
        id: 'A',
        text: 'Rolling up your sleeves to fix a physical office problem, rearrange heavy items, or troubleshoot broken equipment.',
        arabicText: 'المبادرة العملية لحل مشكلة مادية بالمكتب، أو ترتيب أغراض ثقيلة، أو معالجة عطل ملموس.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3 },
        learningInsight: 'Motivation driven by tangible, physical problem solving and hands-on initiative.'
      },
      {
        id: 'B',
        text: 'Offering personal support, active listening, and comfort to a coworker undergoing personal stress or sudden illness.',
        arabicText: 'تقديم الدعم الإنساني والإنصات والاطمئنان لزميل يمر بظرف صحي مفاجئ أو توتر نفسي.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Motivation driven by empathy, personal recovery, and human well-being.'
      },
      {
        id: 'C',
        text: 'Bringing order to a confused group meeting, keeping everyone aligned, and guiding a smooth, coordinated workflow.',
        arabicText: 'تنظيم اجتماع عمل مشتت، وإعادة ترتيب أولويات المجموعة وتوجيه الجميع نحو مسار منظم.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Motivation driven by social structure, group leadership, and smooth collective movement.'
      },
      {
        id: 'D',
        text: 'Organizing complex records, writing precise summary notes, and ensuring accurate communication between separate teams.',
        arabicText: 'ترتيب السجلات بدقة، وصياغة تقارير واضحة وموجزة تزيل أي لبس بين الإدارات المختلفة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3 },
        learningInsight: 'Motivation driven by clear documentation, diplomatic bridging, and reliable information.'
      }
    ]
  },

  // 5. Handling panic and disorientation in others
  {
    id: 5,
    module: 'Interpersonal Dynamics Under Pressure',
    arabicModule: 'التعامل مع سلوكيات الزملاء تحت الضغط',
    category: 'behavioral',
    question: 'During a sudden building evacuation alert, a colleague near your desk begins trembling, hyperventilating, and sits down unable to move. How do you respond?',
    arabicQuestion: 'أثناء تنبيه إخلاء طارئ، بدأ زميل بجوار مكتبك بالارتجاف والتنفس السريع وجلس عاجزاً عن الحركة من الخوف. كيف تتصرف معه؟',
    contextNote: 'Assesses interpersonal intervention style in acute coworker stress.',
    options: [
      {
        id: 'A',
        text: 'Quickly move heavy chairs and bags out of the walkway around them so the area remains completely unobstructed and safe.',
        arabicText: 'إبعاد الكراسي والحقائب الثقيلة من حوله فوراً لضمان خلو الممر وأمان المساحة المحيطة به.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 2 },
        learningInsight: 'Pragmatic focus on environmental safety and clearing physical obstructions.'
      },
      {
        id: 'B',
        text: 'Sit down beside them at eye level, speak in a gentle steady voice, take their hand, and breathe together until they regain composure.',
        arabicText: 'الجلوس بمستواه والتحدث بهدوء وأخذ بيده ومساعدته على أخذ أنفاس منتظمة حتى يستعيد اتزانه.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Natural empathetic presence and personal emotional stabilization.'
      },
      {
        id: 'C',
        text: 'Speak firmly and encouragingly, help them up by the arm, and keep them moving steadily forward in the line of coworkers.',
        arabicText: 'مخاطبته بحزم وتشجيع، ومساعدته على الوقوف وإبقائه يتحرك بهدوء ضمن صف الزملاء المتجهين للخروج.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Directive, supportive guidance to maintain movement momentum.'
      },
      {
        id: 'D',
        text: 'Note their exact desk location and notify a floor marshal or safety coordinator so additional assistance is directed to them.',
        arabicText: 'تحديد موقع مكتبه بدقة وإشعار منسق السلامة أو المشرف لتوجيه المساعدة المناسبة له.',
        roleWeights: { externalLiaison: 3 },
        competencies: { communicationProtocol: 2, decisiveness: 2 },
        learningInsight: 'Resource coordination and systematic routing through proper communication.'
      }
    ]
  },

  // 6. Orientation in an unfamiliar office building
  {
    id: 6,
    module: 'Environmental & Spatial Awareness',
    arabicModule: 'الوعي المكاني والمحيطي',
    category: 'situational',
    question: 'When visiting an unfamiliar administrative building or new company floor for the first time, what do your eyes naturally scan for?',
    arabicQuestion: 'عند زيارتك لمبنى إداري غير مألوف أو طابق جديد للمرة الأولى، ما الذي تبحث عنه عيناك وتلاحظه تلقائياً؟',
    contextNote: 'Measures spatial filtering and subconscious environmental mapping in workplaces.',
    options: [
      {
        id: 'A',
        text: 'The location of physical utility closets, electrical breakers, fire blankets, or wall-mounted extinguishers.',
        arabicText: 'مواقع غرف الخدمات، القواطع الكهربائية، بطانيات الحريق، أو طفايات الحريق المعلقة.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3 },
        learningInsight: 'Safety assets and physical infrastructure mapping.'
      },
      {
        id: 'B',
        text: 'Where the first-aid box, resting area, or employee wellness clinic is located in case someone feels unwell.',
        arabicText: 'موقع صندوق الإسعافات الأولية، أو غرفة الاستراحة الطبية، في حال احتاج أحد لرعاية صحية.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Human-welfare and basic first-aid resource awareness.'
      },
      {
        id: 'C',
        text: 'The main stairwells, emergency exit signs, and wide corridors versus narrow bottleneck passages.',
        arabicText: 'السلالم الرئيسية، ومخارج الطوارئ المضيئة، والممرات الواسعة مقارنة بالنقاط الضيقة.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Movement pathways and egress capacity awareness.'
      },
      {
        id: 'D',
        text: 'The security reception counter, official announcement boards, evacuation maps, and emergency phone numbers.',
        arabicText: 'مكتب الاستقبال الأمني، ولوحات الإعلانات الرسمية، ومخطط الإخلاء، وأرقام الطوارئ الداخلية.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3 },
        learningInsight: 'Communications and institutional coordination infrastructure awareness.'
      }
    ]
  },

  // 7. Reaction to seeing physical injury
  {
    id: 7,
    module: 'Trauma Composure & Distress Tolerance',
    arabicModule: 'الهدوء أمام الإصابات والتعامل مع الطوارئ الصحية',
    category: 'stress',
    question: 'An office worker accidentally shatters glass in the breakroom and gets a deep, bleeding cut on their hand. What is your initial reaction?',
    arabicQuestion: 'كسر أحد الموظفين لوحاً زجاجياً في غرفة الاستراحة بالخطأ وأصيب بجرح عميق ينزف في يده. ما هو رد فعلك الداخلي الأول؟',
    contextNote: 'Measures composure and natural reflex around sudden bleeding or injury.',
    options: [
      {
        id: 'A',
        text: 'Grab a broom or cloth to quickly clear away the broken glass fragments so no one else steps on them or gets cut.',
        arabicText: 'المبادرة فوراً لكنس وإبعاد شظايا الزجاج المكسور حتى لا يتعثر بها أو يجرح نفسه أي شخص آخر.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 2 },
        learningInsight: 'Hazard elimination focus to prevent compounding injuries.'
      },
      {
        id: 'B',
        text: 'Stay calm, grab a clean paper towel or cloth immediately, and apply steady direct pressure on the wound while reassuring them.',
        arabicText: 'الحفاظ على الهدوء والضغط المباشر على الجرح بضمادة أو قماش نظيف والتحدث معه لبث الطمأنينة.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 4, decisiveness: 2 },
        learningInsight: 'Direct composure and natural instinct for basic bleeding control.'
      },
      {
        id: 'C',
        text: 'Politely ask curious coworkers to step back out of the breakroom doorway so there is plenty of space and fresh air.',
        arabicText: 'الطلب بلطف وحزم من الزملاء الفضوليين التراجع عن باب الغرفة لإتاحة المجال وتوفير هواء نقي للمصاب.',
        roleWeights: { evacuationSupportLead: 3 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Crowd management and securing open space around an incident.'
      },
      {
        id: 'D',
        text: 'Quickly call the building nurse or local emergency number to report the injury and request first-aid supplies.',
        arabicText: 'الاتصال السريع بعيادة المبنى أو الإسعاف والإبلاغ عن طبيعة الإصابة لطلب الدعم المناسب.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3, decisiveness: 2 },
        learningInsight: 'Rapid critical notification for professional medical dispatch.'
      }
    ]
  },

  // 8. Communication style under noisy disruption
  {
    id: 8,
    module: 'Verbal Precision & Communication Style',
    arabicModule: 'وضوح التعبير وأسلوب التخاطب في الزحام',
    category: 'communication',
    question: 'When trying to communicate with colleagues in a loud, bustling hallway where multiple people are talking at once, what is your natural communication style?',
    arabicQuestion: 'عندما تحاول التواصل مع زملائك في ممر صاخب يتحدث فيه الجميع في وقت واحد، ما هو أسلوبك الطبيعي في التحدث؟',
    contextNote: 'Measures communication efficiency under acoustic interference.',
    options: [
      {
        id: 'A',
        text: 'I use physical gestures and lead by demonstration—showing coworkers what to do with hand signals rather than shouting.',
        arabicText: 'استخدام الإشارات الحركية والتقدم لإظهار المطلوب عملياً بدلاً من الصراخ وسط الضجيج.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 2 },
        learningInsight: 'Non-verbal, action-based physical demonstration.'
      },
      {
        id: 'B',
        text: 'I speak softly and closely to one person at a time, making sure they feel personally heard and supported.',
        arabicText: 'التحدث بهدوء وقرب من كل شخص على حدة، لضمان شعوره بالأمان النفسي والفهم التام.',
        roleWeights: { casualtyCareLead: 3 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Personalized, calming acoustic connection and reassurance.'
      },
      {
        id: 'C',
        text: 'I raise my voice firmly and project clear, concise instructions: "Please listen, keep moving, follow the stairs!"',
        arabicText: 'رفع نبرة الصوت بحزم وإطلاق توجيهات واضحة ومختصرة: "انتبهوا جميعاً، نواصل الحركة بهدوء نحو السلم!"',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 3 },
        learningInsight: 'Projected, authoritative vocal command for group guidance.'
      },
      {
        id: 'D',
        text: 'I wait for a brief lull, then state verified facts plainly and accurately without repeating unconfirmed rumors.',
        arabicText: 'انتظار لحظة هدوء ونقل المعلومات المؤكدة بدقة واختصار دون تكرار أي شائعات.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4, decisiveness: 1 },
        learningInsight: 'Disciplined, factual communication without clutter.'
      }
    ]
  },

  // 9. Energy and perseverance under disruption
  {
    id: 9,
    module: 'Endurance & Stamina Orientation',
    arabicModule: 'التحمل والدافعية أثناء الطوارئ',
    category: 'behavioral',
    question: 'When an unexpected event disrupts the workday and requires everyone to stay late on their feet, what keeps your energy high?',
    arabicQuestion: 'عندما يطرأ ظرف طارئ يعطل يوم العمل ويتطلب من الجميع البقاء واقفين لوقت إضافي، ما الذي يحافظ على نشاطك وعزيمتك؟',
    contextNote: 'Assesses psychological perseverance during an extended disruption.',
    options: [
      {
        id: 'A',
        text: 'The satisfaction of hands-on physical action—helping move tables, carry supplies, or secure the facility.',
        arabicText: 'الشعور بالإنجاز من العمل البدني الملموس—المساعدة في نقل المستلزمات أو تأمين المكاتب.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 4 },
        learningInsight: 'High energy found in tangible physical exertion and practical assistance.'
      },
      {
        id: 'B',
        text: 'Knowing that someone distressed or frail is counting on my personal care and presence to feel safe.',
        arabicText: 'إدراكي أن هناك زميلاً قلقاً أو متعباً يعتمد على دعمي ووجودي بجانبه ليشعر بالراحة.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Empathy-driven perseverance during personal care and comfort.'
      },
      {
        id: 'C',
        text: 'Seeing our department move together in an orderly, organized manner without chaos or delay.',
        arabicText: 'رؤية قسمنا يتحرك بتنظيم وانسجام وسلاسة دون حدوث أي ارتباك أو فوضى.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, physicalReadiness: 2 },
        learningInsight: 'Social responsibility and motivation derived from smooth group coordination.'
      },
      {
        id: 'D',
        text: 'Keeping detailed track of what has been accomplished and ensuring all updates are clearly documented.',
        arabicText: 'الحفاظ على التدوين المنظم لما تم إنجازه والتأكد من توثيق جميع المستجدات بإتقان.',
        roleWeights: { externalLiaison: 3 },
        competencies: { communicationProtocol: 3, decisiveness: 1 },
        learningInsight: 'Mental stamina and organizational informational discipline.'
      }
    ]
  },

  // 10. A hallway bottleneck during an evacuation
  {
    id: 10,
    module: 'Bottleneck Management & Group Dynamics',
    arabicModule: 'التعامل مع التزاحم وإدارة نقاط الاختناق',
    category: 'situational',
    question: 'During a building drill, people stop moving in the stairwell landing because someone dropped their laptop and papers, blocking the doorway. What is your instinct?',
    arabicQuestion: 'خلال تمرين إخلاء، توقفت حركة الموظفين عند مدخل الدرج بسبب سقوط حاسوب وأوراق زميل مما سد الباب. ما هو تصرفك التلقائي؟',
    contextNote: 'Measures decision-making at critical congestion points.',
    options: [
      {
        id: 'A',
        text: 'Step in immediately, bend down to quickly scoop the items off the floor, and clear the doorway obstruction.',
        arabicText: 'المبادرة فوراً لرفع الأغراض والحاسوب عن الأرض وإخلاء مدخل الباب لاستئناف الحركة.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 3, decisiveness: 3 },
        learningInsight: 'Physical intervention to remove the obstruction quickly.'
      },
      {
        id: 'B',
        text: 'Check on the coworker who dropped their belongings to make sure they aren\'t bruised, panicked, or stepped on.',
        arabicText: 'التأكد من سلامة الزميل الذي سقطت أغراضه والتثبت من عدم تعرضه لأي كدمات أو دهس.',
        roleWeights: { casualtyCareLead: 3 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Immediate concern for personal safety and emotional composure.'
      },
      {
        id: 'C',
        text: 'Stand before the approaching crowd, hold up your hands, and direct incoming colleagues to slow down and wait.',
        arabicText: 'الوقوف أمام القادمين ورفع اليدين بحزم لتوجيههم لتهدئة السرعة والانتظار حتى يفرغ الممر.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 4, decisiveness: 3 },
        learningInsight: 'Proactive crowd buffering to prevent crush hazards at doorways.'
      },
      {
        id: 'D',
        text: 'Note the stairwell bottleneck location to mention it to safety coordinators so the stairwell protocol can be improved.',
        arabicText: 'تسجيل موقع الاختناق لرفعه إلى منسقي السلامة لتفادي تكرار الانسداد في التدريبات القادمة.',
        roleWeights: { externalLiaison: 2 },
        competencies: { communicationProtocol: 3, decisiveness: 2 },
        learningInsight: 'Process observation and reporting for institutional improvement.'
      }
    ]
  },

  // 11. Dealing with contradictory rumors
  {
    id: 11,
    module: 'Decision-Making in Ambiguity',
    arabicModule: 'اتخاذ القرارات في ظل نقص المعلومات والشائعات',
    category: 'situational',
    question: 'An alarm starts beeping, but coworkers are sharing conflicting rumors—some say it\'s just burnt toast, others say it\'s serious. How do you proceed?',
    arabicQuestion: 'بدأ جرس الإنذار بالرنين لكن الزملاء يتداولون شائعات متضاربة؛ بعضهم يقول مجرد خبز محترق وآخرون يقولون خطر حقيقي. كيف تتصرف؟',
    contextNote: 'Assesses cognitive handling of ambiguous workplace rumors.',
    options: [
      {
        id: 'A',
        text: 'Walk carefully toward the kitchen or utility area to check the physical reality with your own eyes before panicking.',
        arabicText: 'التوجه بحذر نحو منطقة الخدمات أو المطبخ للتأكد بالعين المجردة من الواقع وتفادي التكهنات.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3, decisiveness: 2 },
        learningInsight: 'Empirical verification through direct personal inspection.'
      },
      {
        id: 'B',
        text: 'Check in on nearby colleagues who are looking frightened or uncomfortable, keeping them calm while facts emerge.',
        arabicText: 'الاطمئنان على الزملاء الذين تظهر عليهم علامات الخوف ومساعدتهم على التهدئة ريثما تتضح الحقيقة.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 2 },
        learningInsight: 'Prioritizing colleague reassurance during periods of confusing information.'
      },
      {
        id: 'C',
        text: 'Encourage coworkers not to debate: "Let’s start walking toward the exit now as a precaution, just in case."',
        arabicText: 'حث الزملاء على تجنب الجدال والبدء بالخروج الاحترازي فوراً كإجراء وقائي آمن.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 3 },
        learningInsight: 'Precautionary life-safety movement rather than debating uncertain facts.'
      },
      {
        id: 'D',
        text: 'Call the facilities desk or security extension directly to get the official, verified status from authorized personnel.',
        arabicText: 'الاتصال المباشر بإدارة المبنى أو الأمن للتأكد من الموقف الرسمي المعتمد وتفادي الشائعات.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Authoritative fact-checking through established communication channels.'
      }
    ]
  },

  // 12. A colleague wants to go back for personal items
  {
    id: 12,
    module: 'Boundary Enforcement & Interpersonal Tact',
    arabicModule: 'التعامل مع المواقف الحرجة وإصرار الزملاء',
    category: 'temperament',
    question: 'While evacuating down the office stairs, a coworker insists on running back up to their desk to grab their car keys and laptop bag. How do you intervene?',
    arabicQuestion: 'أثناء النزول عبر درج الطوارئ، أصر أحد الزملاء على العودة للأعلى لجلب مفاتيح سيارته وحقيبة حاسوبه. كيف تتدخل؟',
    contextNote: 'Measures adherence to safety boundaries versus interpersonal friction.',
    options: [
      {
        id: 'A',
        text: 'Stand firmly in front of the stair access, using your body as a barrier to block anyone from heading back up.',
        arabicText: 'الوقوف بثبات عند مدخل السلم واستخدام جسدك كحاجز يمنع أي شخص من العودة للأعلى.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 3 },
        learningInsight: 'Physical boundary enforcement to protect colleagues from danger.'
      },
      {
        id: 'B',
        text: 'Empathize with their worry: "I understand, but your safety is worth more than any laptop. Let\'s stay together."',
        arabicText: 'مخاطبته بتفهم إنساني: "أتفهم قلقك، لكن سلامتك أهم من أي جهاز. دعنا نخرج معاً بسلام."',
        roleWeights: { casualtyCareLead: 3 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Compassionate reassurance and emotional persuasion.'
      },
      {
        id: 'C',
        text: 'Give a firm, authoritative instruction: "No going back. Safety rules require everyone out now. Keep walking down."',
        arabicText: 'توجيه أمر حازم: "العودة ممنوعة تماماً. قواعد السلامة تقتضي الخروج فوراً. واصل النزول."',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 4, decisiveness: 3 },
        learningInsight: 'Uncompromising, authoritative adherence to emergency evacuation rules.'
      },
      {
        id: 'D',
        text: 'Assure them that building security logs all desks and will retrieve items once the building is cleared.',
        arabicText: 'طمأنته بأن أمن المبنى موثق لديه كل شيء وسيتم استعادة الأغراض بعد انتهاء البلاغ رسمياً.',
        roleWeights: { externalLiaison: 3 },
        competencies: { communicationProtocol: 3 },
        learningInsight: 'De-escalation through institutional procedures and factual reassurance.'
      }
    ]
  },

  // 13. What you grasp most easily in safety training
  {
    id: 13,
    module: 'Learning Style & Practical Skill Acquisition',
    arabicModule: 'أسلوب التعلم واستيعاب المهارات الوقائية',
    category: 'behavioral',
    question: 'In an introductory workplace safety workshop, which type of practical skill do you absorb and remember most naturally?',
    arabicQuestion: 'في ورشة عمل تعريفية عن السلامة بالعمل، أي نوع من المهارات العملية تشعر أنك تستوعبه وتتذكره بأسهل شكل؟',
    contextNote: 'Measures procedural memory style and practical aptitude.',
    options: [
      {
        id: 'A',
        text: 'How to operate physical safety devices—like checking pressure pins on extinguishers or cutting emergency power.',
        arabicText: 'تشغيل أدوات السلامة المادية—مثل فحص مسمار الأمان بالطفايات أو قفل القواطع الكهربائية.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 4 },
        learningInsight: 'Hands-on practical learning and tactile device problem solving.'
      },
      {
        id: 'B',
        text: 'Basic human care techniques—like positioning someone who fainted, checking breathing, and soothing anxiety.',
        arabicText: 'مهارات الإسعاف الأولي—مثل وضعية الإفاقة لمن فقد وعيه، وفحص التنفس، وتهدئة المصاب.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Natural grasp of personal physical care and basic life-support skills.'
      },
      {
        id: 'C',
        text: 'Floor evacuation logistics—learning the quickest floor escape routes, room checking methods, and assembly points.',
        arabicText: 'خطة إخلاء الطابق—معرفة أسرع المسارات، وطريقة تمشيط المكاتب، ومواقع التجمع الآمنة.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Spatial organization and systematic floor sweep methodology.'
      },
      {
        id: 'D',
        text: 'Communication protocols—how to call emergency services, give precise building coordinates, and log incidents.',
        arabicText: 'إجراءات البلاغات—كيفية الاتصال بغرف الطوارئ، وتحديد الإحداثيات، وتوثيق السجلات.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4 },
        learningInsight: 'Structured reporting mastery and emergency liaison discipline.'
      }
    ]
  },

  // 14. Unusual burning smell in an office area
  {
    id: 14,
    module: 'Hazard Recognition & Environmental Precaution',
    arabicModule: 'رصد المخاطر والسلامة الوقائية في بيئة العمل',
    category: 'situational',
    question: 'You detect an unusual acrid electrical smell coming from behind an office copier or server cabinet. What is your immediate priority?',
    arabicQuestion: 'شممت رائحة احتراق كهربائي غير معتادة تنبعث من خلف طابعة مكتبية كبيرة أو خزانة خوادم. ما هي أولويتك الفورية؟',
    contextNote: 'Measures practical hazard mitigation vs communication instincts in an office setting.',
    options: [
      {
        id: 'A',
        text: 'Carefully switch off the wall power switch or unplug the cable if safe, preventing electrical heat from building up.',
        arabicText: 'فصل مفتاح الكهرباء الجداري أو نزع القابس بحذر إن كان آمناً لمنع تفاقم الحرارة الكهربائية.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 3, decisiveness: 3 },
        learningInsight: 'Direct, practical isolation of the physical hazard source.'
      },
      {
        id: 'B',
        text: 'Warn colleagues seated right next to the machine to step away to fresh air in case hazardous fumes escape.',
        arabicText: 'تنبيه الزملاء الجالسين بجوار الجهاز مباشرة للابتعاد واستنشاق هواء نقي منعاً لأي استنشاق ضار.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 2 },
        learningInsight: 'Immediate health protection and safeguarding colleagues from fumes.'
      },
      {
        id: 'C',
        text: 'Instruct everyone in that open-plan office pod to pack up calmly and move into the adjoining conference corridor.',
        arabicText: 'توجيه الموظفين في تلك المساحة المفتوحة للابتعاد بهدوء والانتقال للممر المجاور مؤقتاً.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 4, decisiveness: 2 },
        learningInsight: 'Rapid local evacuation to create a safe buffer zone.'
      },
      {
        id: 'D',
        text: 'Immediately dial building maintenance and report the exact floor number, department, and equipment type.',
        arabicText: 'الاتصال الفوري بصيانة المبنى والإبلاغ عن رقم الطابق والقسم ونوع الجهاز بدقة لإرسال فني.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Accurate technical notification and facilities coordination.'
      }
    ]
  },

  // 15. Balancing multiple immediate needs
  {
    id: 15,
    module: 'Cognitive Bandwidth & Priority Setting',
    arabicModule: 'ترتيب الأولويات الذهنية أثناء تعدد المهام',
    category: 'temperament',
    question: 'During a sudden building alert, several things happen at once. What does your mind naturally prioritize first?',
    arabicQuestion: 'أثناء إنذار مبنى مفاجئ، حدثت عدة أمور في نفس اللحظة. ما الذي يضعه ذهنك كأولوية أولى بشكل طبيعي؟',
    contextNote: 'Assesses mental filtering strategy during simultaneous urgent stimuli.',
    options: [
      {
        id: 'A',
        text: 'Neutralizing any direct physical hazards in the immediate room (sparks, blocked exits, fallen items).',
        arabicText: 'القضاء على الخطر المادي المباشر في الغرفة (شرر كهربائي، باب مغلق، عائق سد الطريق).',
        roleWeights: { suppressionLead: 4 },
        competencies: { decisiveness: 3, physicalReadiness: 2 },
        learningInsight: 'Focus on eliminating physical hazards that could compound the crisis.'
      },
      {
        id: 'B',
        text: 'Tending to any colleague who is dizzy, injured, or having an acute panic reaction.',
        arabicText: 'الاعتناء الفوري بأي زميل يعاني من إغماء، أو جرح، أو نوبة هلع حادة.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 2 },
        learningInsight: 'Prioritizing immediate personal human assistance and stabilization.'
      },
      {
        id: 'C',
        text: 'Ensuring the main escape hallway stays clear and that everyone is moving in an orderly direction.',
        arabicText: 'التأكد من أن ممر الخروج الرئيسي سالك وأن الجميع يتحركون باتجاه منظم دون تدافع.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 3 },
        learningInsight: 'Focus on collective evacuation flow and maintaining clear exit routes.'
      },
      {
        id: 'D',
        text: 'Gathering the exact facts from building management and transmitting clear instructions to the team.',
        arabicText: 'استقاء المعلومات الدقيقة من إدارة المبنى ونقل التوجيهات المؤكدة للزملاء فوراً.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3, decisiveness: 2 },
        learningInsight: 'Focus on informational accuracy and relaying reliable instructions.'
      }
    ]
  },

  // 16. Natural personal strength during disruptions
  {
    id: 16,
    module: 'Natural Personal Strength & Peer Reliance',
    arabicModule: 'نقاط القوة الشخصية واعتماد الزملاء عليك',
    category: 'behavioral',
    question: 'When an unexpected disruption occurs at the office (like a sudden power cut or loud alarm), what personal trait do your coworkers rely on you for?',
    arabicQuestion: 'عندما يحدث ظرف طارئ غير متوقع في المكتب (مثل انقطاع مفاجئ للكهرباء أو صوت إنذار قوي)، ما الصفة التي يعتمد عليها زملاؤك فيك؟',
    contextNote: 'Measures self-perception of natural interpersonal and functional contribution.',
    options: [
      {
        id: 'A',
        text: 'Practical, hands-on initiative—stepping in to check physical switches, secure equipment, or clear heavy obstacles.',
        arabicText: 'المبادرة العملية—التدخل لفحص المفاتيح وتأمين الأجهزة وإبعاد أي عوائق مادية فوراً.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 4 },
        learningInsight: 'Reputation for practical action and hands-on resourcefulness.'
      },
      {
        id: 'B',
        text: 'Emotional warmth and reassurance—staying gentle, calming frightened colleagues, and offering physical comfort.',
        arabicText: 'الهدوء النفسي والاحتواء—البقاء لطيفاً وبث الطمأنينة وتقديم الرعاية لمن يحتاجها.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Reputation for compassionate presence and emotional stabilization.'
      },
      {
        id: 'C',
        text: 'Clear vocal presence and guidance—stepping up to direct the group and keep everyone organized.',
        arabicText: 'الصوت الواضح والحضور التوجيهي—المبادرة لتنظيم المجموعة وتوجيه الجميع بوضوح.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Reputation for confident vocal leadership and group coordination.'
      },
      {
        id: 'D',
        text: 'Systematic thinking—finding out what is actually happening, taking notes, and keeping everyone accurately informed.',
        arabicText: 'التفكير المنظم—استقصاء الحقيقة، وتدوين الملاحظات، وإطلاع الجميع بالمعلومات السليمة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4 },
        learningInsight: 'Reputation for objective analysis and clear, reliable communication.'
      }
    ]
  },

  // 17. How you decompress after a high-stress exercise
  {
    id: 17,
    module: 'Stress Recovery & Post-Event Processing',
    arabicModule: 'استعادة الهدوء والتعافي بعد التمارين الضاغطة',
    category: 'stress',
    question: 'After completing an intensive office evacuation drill or emergency exercise, how do you naturally wind down?',
    arabicQuestion: 'بعد انتهاء تمرين إخلاء مكثف أو تدريب طوارئ في المبنى، كيف تستعيد هدوءك وطاقتك بشكل طبيعي؟',
    contextNote: 'Measures debriefing style and cognitive restoration after tension.',
    options: [
      {
        id: 'A',
        text: 'Helping physically tidy up the office, put safety gear away, and return tables and chairs to their proper places.',
        arabicText: 'المساعدة في إعادة ترتيب المكاتب، وإرجاع الكراسي لأماكنها، وتأمين التجهيزات عملياً.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3 },
        learningInsight: 'Tactile restoration through practical order and physical tidying.'
      },
      {
        id: 'B',
        text: 'Checking in with colleagues to ask how they felt, ensuring no one is lingering with stress or unease.',
        arabicText: 'الاطمئنان على الزملاء والحديث معهم للتأكد من زوال أي توتر نفسي أو إرهاق خلفه التمرين.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Empathetic debriefing and human connection to colleague well-being.'
      },
      {
        id: 'C',
        text: 'Reflecting on the evacuation path we took, thinking about how stairwell movement could be faster next time.',
        arabicText: 'مراجعة مسار الخروج الذي سلكناه، والتفكير في كيفية جعل حركة السلالم أسرع وأسلس لاحقاً.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Spatial analysis and route flow optimization.'
      },
      {
        id: 'D',
        text: 'Reviewing what went well on paper, writing down feedback notes, and submitting observations to management.',
        arabicText: 'تدوين الملاحظات الإيجابية ونقاط التحسين كتابةً وتقديمها لإدارة السلامة لتوثيقها.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3 },
        learningInsight: 'Structured documentation and institutional feedback reporting.'
      }
    ]
  },

  // 18. Helping a non-Arabic / non-English speaker in an emergency
  {
    id: 18,
    module: 'Cross-Cultural Communication & Practical Empathy',
    arabicModule: 'التواصل الفعال مع الزوار من مختلف الثقافات واللغات',
    category: 'communication',
    question: 'An international visitor or foreign contractor visiting your administrative department speaks neither Arabic nor English when an alarm rings. How do you help them?',
    arabicQuestion: 'زائر دولي أو متعاقد خارجي يزور إدارتك لا يتحدث العربية أو الإنجليزية وانطلق الإنذار فجأة. كيف تساعده؟',
    contextNote: 'Assesses intuitive communication across language barriers under pressure.',
    options: [
      {
        id: 'A',
        text: 'Use clear physical body actions—point to the exit, walk ahead of them, and physically demonstrate what to do.',
        arabicText: 'استخدام إشارات جسدية واضحة—الإشارة للمخرج، والمشي أمامه لإظهار المطلوب عملياً.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 2 },
        learningInsight: 'Action-based kinetic demonstration without verbal reliance.'
      },
      {
        id: 'B',
        text: 'Offer a warm, reassuring smile, make steady eye contact, and gently guide their shoulder so they feel safe and calm.',
        arabicText: 'الابتسام لطمأنته، والنظر في عينيه بثقة، وتوجيهه برفق من كتفه ليشعر بالأمان والهدوء.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Universal emotional stabilization through non-verbal warmth and personal care.'
      },
      {
        id: 'C',
        text: 'Use unmistakable, energetic hand waves and directional gestures to indicate "walk this way toward the exit."',
        arabicText: 'استخدام إشارات يد واضحة ومباشرة ترشده بحزم: "تحرك في هذا الاتجاه نحو السلم الخارجي."',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 4, decisiveness: 2 },
        learningInsight: 'Universal visual crowd signaling and directive posture.'
      },
      {
        id: 'D',
        text: 'Point to universal visual exit signs and floor evacuation pictograms posted on the office wall.',
        arabicText: 'الإشارة إلى اللوحات الإرشادية المصورة والرموز الدولية المعتمدة للإخلاء المعلقة بالجدار.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4 },
        learningInsight: 'Standardized symbolic communication and pre-planned institutional signage.'
      }
    ]
  },

  // 19. Reaction to sudden hallway blackout
  {
    id: 19,
    module: 'Low-Visibility Awareness & Sensory Anchoring',
    arabicModule: 'التعامل مع انقطاع الإضاءة وضعف الرؤية',
    category: 'situational',
    question: 'All lights suddenly go out across your office floor during daytime, plunging interior corridors into dim shadows with alarms beeping. What is your first action?',
    arabicQuestion: 'انطفأت جميع الأضواء فجأة في طابقك المكتبي وساد الظلام في الممرات الداخلية مع استمرار صفارات الإنذار. ما هو أول تصرف تقوم به؟',
    contextNote: 'Measures behavioral anchoring during sudden sensory deprivation in the workplace.',
    options: [
      {
        id: 'A',
        text: 'Use your phone flashlight to check the nearest electrical switchboard or inspect for tripped breakers.',
        arabicText: 'استخدام إضاءة الهاتف لفحص لوحة المفاتيح الكهربائية القريبة والتأكد من سبب الانقطاع.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3, decisiveness: 3 },
        learningInsight: 'Practical investigation and tangible curiosity about the physical system.'
      },
      {
        id: 'B',
        text: 'Call out in a gentle, clear voice to check if anyone tripped, bumped their head, or feels faint in the darkness.',
        arabicText: 'النداء بصوت هادئ ومطمئن للتأكد مما إذا كان أحد قد تعثر، أو اصطدم، أو أصيب بدوار في الظلام.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Immediate detection of injury or vulnerable colleagues in darkness.'
      },
      {
        id: 'C',
        text: 'Position yourself by the illuminated green EXIT sign, calling out directionally so colleagues can navigate toward you.',
        arabicText: 'الوقوف بجوار علامة المخرج المضيئة ومناداة الزملاء لتوجيههم نحو مخرج الطوارئ بالصوت.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Tactile and acoustic route anchoring for safe group evacuation in the dark.'
      },
      {
        id: 'D',
        text: 'Check your mobile phone for official administrative alerts and call facilities to confirm if the outage is building-wide.',
        arabicText: 'التحقق من رسائل الطوارئ الرسمية والاتصال بالصيانة للتأكد هل الانقطاع عام في المبنى.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Status verification and checking broader organizational scope.'
      }
    ]
  },

  // 20. Handling disagreement under tension
  {
    id: 20,
    module: 'Conflict Resolution & Group Harmony',
    arabicModule: 'فض الخلافات وتماسك الفريق تحت الضغط',
    category: 'temperament',
    question: 'Two coworkers start arguing loudly in the hallway about which stairwell is faster to exit the building. How do you step in?',
    arabicQuestion: 'بدأ زميلان بالجدال بصوت عالٍ في الممر حول أي درج هو الأسرع للخروج من المبنى. كيف تتدخل لإنهاء الموقف؟',
    contextNote: 'Measures interpersonal friction management in high-stakes moments.',
    options: [
      {
        id: 'A',
        text: 'Walk swiftly past them to open the nearest stairwell door, check it physically, and say "This way is open and clear."',
        arabicText: 'تجاوز الجدال سريعاً وفتح باب الدرج الأقرب ومعاينته ثم القول: "هذا الباب سالك وآمن، تقدموا."',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 3 },
        learningInsight: 'Cutting through debate with concrete physical verification.'
      },
      {
        id: 'B',
        text: 'Remind both calmly that arguing increases everyone\'s heart rate: "Take a breath, let\'s stay calm and walk together."',
        arabicText: 'تذكيرهما بهدوء أن التوتر يرفع دقات القلب: "تنفسوا بعمق، دعونا نحافظ على هدوئنا ونخرج معاً."',
        roleWeights: { casualtyCareLead: 3 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Human-centered de-escalation of colleague emotional stress.'
      },
      {
        id: 'C',
        text: 'Step between them with confident authority: "Stop debating. We take the designated East Stairwell now. Let\'s move!"',
        arabicText: 'الوقوف بينهما بحزم: "توقفا عن الجدال. نتبع الدرج المعتمد شرق المبنى فوراً. تحركوا الآن."',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 4 },
        learningInsight: 'Decisive command presence to halt group hesitation and keep momentum.'
      },
      {
        id: 'D',
        text: 'Point to the posted evacuation map on the wall that shows the official designated route for our department.',
        arabicText: 'الإشارة فوراً إلى مخطط الإخلاء المعتمد المعلق على الجدار لإثبات المسار النظامي بالأدلة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3, decisiveness: 2 },
        learningInsight: 'Resolving disputes with authoritative, objective institutional guidelines.'
      }
    ]
  },

  // 21. Spending waiting time at the assembly point
  {
    id: 21,
    module: 'Vigilance & Sustained Focus at Assembly Points',
    arabicModule: 'اليقظة والمتابعة المستمرة في نقاط التجمع',
    category: 'temperament',
    question: 'Everyone has evacuated to the outdoor assembly courtyard, and you are waiting 30 minutes for the all-clear. How do you naturally spend this time?',
    arabicQuestion: 'بعد إخلاء المبنى والوصول لساحة التجمع الخارجية، طُلب منكم الانتظار نصف ساعة لحين التأكد من سلامة المبنى. كيف تقضي هذا الوقت بتلقائية؟',
    contextNote: 'Assesses vigilance style and sustained attention under prolonged standby.',
    options: [
      {
        id: 'A',
        text: 'Walking around the perimeter of the group to ensure no one wanders near parking traffic or construction areas.',
        arabicText: 'المشي حول محيط التجمع للتأكد من عدم اقتراب أي زميل من حركة السيارات أو مناطق أعمال الصيانة.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3 },
        learningInsight: 'Perimeter vigilance and preventing physical environmental hazards.'
      },
      {
        id: 'B',
        text: 'Circulating among coworkers to offer bottles of water and check on anyone who is breathless, pale, or pregnant.',
        arabicText: 'التنقل بين الزملاء لتوزيع الماء والاطمئنان على من يشعر بضيق تنفس، أو إعياء، أو الحوامل.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Ongoing personal surveillance and human physiological care.'
      },
      {
        id: 'C',
        text: 'Helping maintain our department in a neat, recognizable group so no one wanders off and the crowd stays organized.',
        arabicText: 'المساعدة في إبقاء قسمنا متجمعاً بشكل واضح ومنظم حتى لا يتفرق الزملاء وتصعب متابعتهم.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Group cohesion and orderly assembly management.'
      },
      {
        id: 'D',
        text: 'Assisting with the department attendance roster, marking down who is present and noting any missing names.',
        arabicText: 'المساعدة في تدقيق كشف حضور القسم، وحصر المتواجدين وتدوين أسماء من لم يخرجوا بعد.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4 },
        learningInsight: 'Methodical headcount verification and administrative record keeping.'
      }
    ]
  },

  // 22. When the primary exit route is blocked
  {
    id: 22,
    module: 'Adaptability When Primary Plans Encounter Obstacles',
    arabicModule: 'المرونة وسرعة التصرف عند انسداد المسار الأول',
    category: 'situational',
    question: 'You reach the main floor exit door with colleagues, but find it jammed by a fallen display board. What is your immediate reaction?',
    arabicQuestion: 'وصلت مع زملائك لباب الخروج الرئيسي في الطابق لكن وجدتموه مغلقاً بسبب سقوط لوحة إعلانية كبيرة أمامه. ما هو رد فعلك الفوري؟',
    contextNote: 'Measures tactical flexibility when a primary corridor is obstructed.',
    options: [
      {
        id: 'A',
        text: 'Immediately put your shoulder into the board, recruit a coworker to help, and physically push the blockage aside.',
        arabicText: 'دفع اللوحة بكتفك فوراً والاستعانة بزميل لإزاحتها بالقوة المادية وإخلاء الباب.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3, decisiveness: 3 },
        learningInsight: 'Direct physical problem solving to overcome a tangible obstacle.'
      },
      {
        id: 'B',
        text: 'Make sure none of the colleagues at the front were hit by the fallen board, checking for bruises or cuts.',
        arabicText: 'التأكد من أن أحداً في مقدمة الصف لم تصبه اللوحة الساقطة، وتفقد أي خدوش أو رضوض.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 2 },
        learningInsight: 'Immediate personal safety assessment and care during setbacks.'
      },
      {
        id: 'C',
        text: 'Immediately call out to the line behind you: "Door blocked here! Everyone pivot, follow me to Exit B at the other end!"',
        arabicText: 'النداء بصوت مسموع لمن في الخلف: "المسار مسدود هنا! استديروا فوراً واتبعوني للمخرج البديل (ب)!"',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 4, decisiveness: 3 },
        learningInsight: 'Rapid routing redirection to prevent crowd stalling.'
      },
      {
        id: 'D',
        text: 'Alert building security on your phone that Exit A is physically obstructed so facility teams can clear it.',
        arabicText: 'إبلاغ أمن المبنى عبر الهاتف بأن المخرج (أ) مسدود ليتم إرسال فريق لفتحه فوراً.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4, decisiveness: 3 },
        learningInsight: 'Rapid escalation through communication channels for coordinated support.'
      }
    ]
  },

  // 23. Core belief on saving lives
  {
    id: 23,
    module: 'Core Values & Safety Philosophy',
    arabicModule: 'الفلسفة الوقائية والقيم الأساسية في الإنقاذ',
    category: 'temperament',
    question: 'In any workplace crisis, which fundamental action do you believe makes the greatest difference in saving lives?',
    arabicQuestion: 'في أي أزمة تحدث بمكان العمل، أي إجراء جوهري تعتقد أنه يصنع الفارق الأكبر في حماية الأرواح؟',
    contextNote: 'Reveals core values and strategic mental model of workplace safety.',
    options: [
      {
        id: 'A',
        text: 'Rapid, hands-on intervention to stop the physical danger (like unplugging equipment or putting out a spark before it grows).',
        arabicText: 'التدخل السريع لإيقاف الخطر المادي في مهده (مثل فصل مصدر الكهرباء أو إخماد شرارة قبل انتشارها).',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3, decisiveness: 2 },
        learningInsight: 'Hazard neutralization philosophy: eliminating physical causes stops the escalation.'
      },
      {
        id: 'B',
        text: 'Immediate compassionate first aid to soothe shock, stop bleeding, and comfort injured people until doctors arrive.',
        arabicText: 'الإسعاف الأولي الإنساني الفوري لتهدئة الصدمة ووقف النزيف ودعم المصاب حتى وصول الإسعاف.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 4, decisiveness: 2 },
        learningInsight: 'Human care philosophy: preserving individual life and health directly saves people.'
      },
      {
        id: 'C',
        text: 'Orderly, panic-free group guidance that gets hundreds of employees safely out of the building without stampedes.',
        arabicText: 'التوجيه الجماعي المنظم الخالي من الهلع الذي يضمن خروج مئات الموظفين دون تدافع أو اختناق.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 4, decisiveness: 2 },
        learningInsight: 'Mass evacuation philosophy: distance, clear pathways, and orderly movement save everyone.'
      },
      {
        id: 'D',
        text: 'Fast, accurate communication that connects on-scene staff with emergency responders so help reaches the exact spot.',
        arabicText: 'التواصل السريع والدقيق الذي يربط الموجودين بفرق الطوارئ لتوجيه الدعم للنقطة الصحيحة مباشرة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Systemic coordination philosophy: reliable information flow mobilizes the right support.'
      }
    ]
  },

  // 24. Stepping up as an administrative volunteer
  {
    id: 24,
    module: 'Voluntary Deployment Inclination',
    arabicModule: 'الميول التلقائية للتطوع في مهام السلامة',
    category: 'situational',
    question: 'Your department head asks for administrative staff to volunteer for basic safety roles during future drills and events. Which role do you instinctively raise your hand for?',
    arabicQuestion: 'طلب مدير الإدارة متطوعين من الموظفين الإداريين لمهام السلامة خلال التدريبات والفعاليات القادمة. أي مهمة ترفع يدك لها بتلقائية؟',
    contextNote: 'Direct behavioral selection of volunteer brigade preference without previous training.',
    options: [
      {
        id: 'A',
        text: 'Safety & Hazard Volunteer—learning how to inspect office hazards, isolate power, and use basic safety tools if safe.',
        arabicText: 'متطوع السلامة والمخاطر—تعلم فحص مخاطر المكاتب، وعزل الكهرباء، واستخدام أدوات الإخماد الأولية.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 4, decisiveness: 3 },
        learningInsight: 'Voluntary inclination toward physical hazard mitigation and practical safety.'
      },
      {
        id: 'B',
        text: 'First Aid & Care Volunteer—learning basic first aid, CPR, and how to comfort colleagues who feel sick or faint.',
        arabicText: 'متطوع الإسعاف الأولي—تعلم مهارات الإسعاف، والإنعاش القلبي، وتهدئة الزملاء في الحالات الصحية المفاجئة.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 4, decisiveness: 2 },
        learningInsight: 'Voluntary inclination toward human care, health support, and patient well-being.'
      },
      {
        id: 'C',
        text: 'Evacuation & Floor Guide—learning how to marshal colleagues down stairwells and ensure all office rooms are cleared.',
        arabicText: 'مرشد إخلاء الطابق—تعلم توجيه الموظفين في السلالم والتأكد من خلو جميع المكاتب والغرف من الأشخاص.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 4, decisiveness: 3 },
        learningInsight: 'Voluntary inclination toward crowd guidance and systematic floor sweeps.'
      },
      {
        id: 'D',
        text: 'Communications & Attendance Volunteer—keeping the department headcount list and coordinating messages with building management.',
        arabicText: 'متطوع الاتصال والتوثيق—حصر قوائم الموظفين ونقل البلاغات والتنسيق المباشر مع إدارة المبنى.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Voluntary inclination toward structured communications and administrative coordination.'
      }
    ]
  },

  // 25. Pride in your volunteer contribution
  {
    id: 25,
    module: 'Professional Identity & Volunteer Pride',
    arabicModule: 'الاعتزاز بالدور التطوعي والهوية الميدانية',
    category: 'temperament',
    question: 'When you imagine stepping up as a volunteer in KSIA\'s emergency response team, which outcome would make you proudest?',
    arabicQuestion: 'عندما تتخيل مشاركتك كمتطوع في فريق الاستجابة للطوارئ بمطار الملك سلمان، ما الإنجاز الذي ستشعر بأكبر فخر لتحقيقه؟',
    contextNote: 'Long-term self-concept alignment and pride projection in a volunteer capacity.',
    options: [
      {
        id: 'A',
        text: 'Knowing that my practical initiative and courage helped contain a physical danger before it damaged our workplace.',
        arabicText: 'معرفتي بأن مبادرتي العملية وشجاعتي ساهمت في حصر خطر مادي قبل أن يلحق الضرر بمقر عملنا.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 3, decisiveness: 2 },
        learningInsight: 'Pride in practical courage, physical hazard mitigation, and protecting the facility.'
      },
      {
        id: 'B',
        text: 'Knowing that in a frightening moment, my calm presence and basic care brought comfort and safety to a hurting colleague.',
        arabicText: 'معرفتي بأن هدوئي ورعايتي الإنسانية كانت سبباً في بث الطمأنينة وتخفيف الألم عن زميل في لحظة خوف.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 4, decisiveness: 2 },
        learningInsight: 'Pride in empathy, personal care, and being there for colleagues in physical distress.'
      },
      {
        id: 'C',
        text: 'Knowing that when confusion could have caused panic, my clear voice and guidance helped all my coworkers evacuate safely.',
        arabicText: 'معرفتي بأنه عندما كادت الحيرة أن تسبب هلعاً، نجح صوتي الواضح وتوجيهي في إيصال زملائي لبر الأمان.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 4, decisiveness: 3 },
        learningInsight: 'Pride in group guidance, clear vocal leadership, and preventing workplace panic.'
      },
      {
        id: 'D',
        text: 'Knowing that my precise reporting and organized coordination ensured help arrived quickly and everyone was accounted for.',
        arabicText: 'معرفتي بأن دقة بلاغاتي وتوثيقي المنظم ساعد في سرعة وصول الدعم والتأكد من سلامة جميع الموظفين.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Pride in structured communications, accurate record keeping, and reliable team coordination.'
      }
    ]
  }
];
