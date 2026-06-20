export interface FAQ {
  question: string;
  answer: string;
}

export interface TreatmentDetail {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  benefits: string[];
  procedureSteps: { title: string; desc: string }[];
  faqs: FAQ[];
  seoKeywords: string[];
  pairIndex: number;
}

export const treatmentsData: TreatmentDetail[] = [
  {
    slug: 'smile-design',
    title: 'Smile Design',
    shortDescription: 'Custom smile makeovers tailored to your unique facial features.',
    fullDescription: [
      'A complete smile design is a highly personalized cosmetic dental procedure that transforms your teeth and gums to create a harmonious, beautiful smile.',
      'Using advanced imaging and digital planning, Dr. Saachi Shingrani carefully evaluates your facial proportions, lip line, and tooth alignment. The result is a natural-looking, radiant smile that boosts your confidence and complements your unique aesthetics.'
    ],
    benefits: ['Enhanced facial aesthetics', 'Customized to your facial structure', 'Boosts self-confidence', 'Long-lasting natural results'],
    procedureSteps: [
      { title: 'Digital Consultation', desc: 'We take 3D scans and photographs of your face and teeth.' },
      { title: 'Treatment Planning', desc: 'A custom mock-up is created so you can preview your new smile.' },
      { title: 'Execution', desc: 'A combination of veneers, bonding, or whitening is applied with precision.' }
    ],
    faqs: [
      { question: 'How long does a smile makeover take?', answer: 'Depending on the complexity, it can take anywhere from two weeks to a few months.' },
      { question: 'Is the procedure painful?', answer: 'We ensure a completely painless experience using modern local anesthesia and gentle techniques.' }
    ],
    seoKeywords: ['Best smile makeover in Bandra', 'Hollywood smile dental clinic Mumbai', 'Cosmetic dentist near me', 'Digital smile design'],
    pairIndex: 0
  },
  {
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    shortDescription: 'Brighten your smile with our safe, effective whitening procedures.',
    fullDescription: [
      'Professional teeth whitening is the fastest and most effective way to eliminate deep stains and discoloration caused by coffee, tea, tobacco, and aging.',
      'Unlike over-the-counter kits that can damage enamel, our in-clinic whitening treatments use medical-grade bleaching agents activated by advanced light technology, ensuring maximum brightness with minimal sensitivity.'
    ],
    benefits: ['Instant results in a single visit', 'Safe for enamel', 'Removes deep stains', 'Customized shade selection'],
    procedureSteps: [
      { title: 'Gum Protection', desc: 'A protective barrier is applied to your gums to prevent irritation.' },
      { title: 'Gel Application', desc: 'A professional-grade whitening gel is carefully applied to the teeth.' },
      { title: 'Light Activation', desc: 'A specialized light is used to accelerate the stain-dissolving process.' }
    ],
    faqs: [
      { question: 'How long do the results last?', answer: 'With proper oral hygiene and avoiding staining foods, results can last from one to three years.' },
      { question: 'Will my teeth feel sensitive?', answer: 'Some temporary sensitivity may occur, but we use desensitizing agents to ensure your comfort.' }
    ],
    seoKeywords: ['Professional teeth whitening Bandra', 'Laser teeth whitening cost Mumbai', 'Best teeth bleaching clinic', 'Stain removal dentist'],
    pairIndex: 1
  },
  {
    slug: 'dental-implants',
    title: 'Dental Implants',
    shortDescription: 'Restore missing teeth with durable, natural-looking implants.',
    fullDescription: [
      'Dental implants are the gold standard for replacing missing teeth. They provide a permanent, robust foundation for replacement teeth that look, feel, and function exactly like natural teeth.',
      'An implant is a small titanium post surgically placed into the jawbone, preventing bone loss and preserving facial structure. Whether you are missing a single tooth or require a full arch, our precision implantology ensures long-term success and a flawless smile.'
    ],
    benefits: ['Permanent tooth replacement', 'Prevents jawbone deterioration', 'Functions like a natural tooth', 'No impact on adjacent teeth'],
    procedureSteps: [
      { title: '3D Imaging', desc: 'We capture precise 3D CBCT scans of your jawbone to plan the exact implant position.' },
      { title: 'Implant Placement', desc: 'The titanium post is gently placed into the jawbone under local anesthesia.' },
      { title: 'Crown Attachment', desc: 'Once healed, a custom-crafted ceramic crown is securely attached to the post.' }
    ],
    faqs: [
      { question: 'Are dental implants painful?', answer: 'The procedure is performed under profound local anesthesia, making it virtually painless.' },
      { question: 'How long do dental implants last?', answer: 'With excellent oral hygiene and regular checkups, implants can last a lifetime.' }
    ],
    seoKeywords: ['Best dental implants in Bandra West', 'Painless tooth implant Mumbai', 'Immediate dental implants', 'Implantologist near me'],
    pairIndex: 2
  },
  {
    slug: 'aligners-and-braces',
    title: 'Aligners & Braces',
    shortDescription: 'Invisible, comfortable alignment solutions tailored for both teens and adults.',
    fullDescription: [
      'Orthodontic treatment has evolved rapidly. We offer state-of-the-art clear aligners and modern braces to correct misaligned teeth, overbites, and spacing issues discretely.',
      'Invisible aligners provide a nearly invisible, removable option for straightening your teeth without the hassle of metal wires. For more complex cases, our advanced ceramic braces offer precise control with a highly aesthetic appearance.'
    ],
    benefits: ['Straighter, healthier smile', 'Nearly invisible options available', 'Improved bite and chewing function', 'Custom treatment plans for all ages'],
    procedureSteps: [
      { title: 'Digital Impressions', desc: 'We take a comfortable digital scan of your teeth, eliminating messy putty.' },
      { title: 'Treatment Simulation', desc: 'You will see a 3D simulation of your projected final smile before starting.' },
      { title: 'Progress Tracking', desc: 'We monitor your alignment progress through scheduled, quick clinic visits.' }
    ],
    faqs: [
      { question: 'How much do invisible aligners cost?', answer: 'Costs vary based on the duration of treatment. We provide transparent pricing during your consultation.' },
      { question: 'Do I have to wear aligners all day?', answer: 'For optimal results, aligners should be worn for 20 to 22 hours a day, removed only for eating and brushing.' }
    ],
    seoKeywords: ['Invisible aligners cost in Mumbai', 'Invisalign dentist Bandra', 'Clear braces clinic near me', 'Orthodontist Bandra West'],
    pairIndex: 3
  },
  {
    slug: 'full-mouth-rehab',
    title: 'Full Mouth Rehab',
    shortDescription: 'Comprehensive restoration of your oral health and aesthetics.',
    fullDescription: [
      'Full mouth rehabilitation is a highly customized, comprehensive treatment plan designed to rebuild and restore all of the teeth in both the upper and lower jaws.',
      'This advanced procedure is ideal for patients with severe tooth wear, multiple missing teeth, or complex bite issues. By combining implants, crowns, veneers, and orthodontics, Dr. Saachi Shingrani reconstructs your entire mouth for optimal function and spectacular aesthetics.'
    ],
    benefits: ['Restores complete chewing function', 'Eliminates chronic dental pain', 'Rejuvenates facial appearance', 'Corrects bite alignment issues'],
    procedureSteps: [
      { title: 'Comprehensive Evaluation', desc: 'A thorough analysis of your teeth, gums, jaw joints, and facial muscles.' },
      { title: 'Phased Treatment Plan', desc: 'A step-by-step roadmap is created, combining multiple dental specialties.' },
      { title: 'Functional Restoration', desc: 'Teeth are meticulously rebuilt to ensure a perfect bite and stunning smile.' }
    ],
    faqs: [
      { question: 'How long does full mouth rehab take?', answer: 'Because it involves multiple procedures, it can take several months to complete the entire phased plan.' },
      { question: 'Who needs full mouth rehabilitation?', answer: 'Patients with severe tooth decay, advanced gum disease, or traumatic dental injuries are the best candidates.' }
    ],
    seoKeywords: ['Full mouth rehabilitation Mumbai', 'Complete dental restoration Bandra', 'Full arch implants clinic', 'Bite correction dentist'],
    pairIndex: 4
  },
  {
    slug: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    shortDescription: 'Gentle, anxiety-free dental care designed exclusively for our youngest patients.',
    fullDescription: [
      'We believe that a lifetime of healthy smiles begins with positive early dental experiences. Our pediatric dentistry services focus on preventive care, education, and gentle treatments for children of all ages.',
      'From the first baby tooth to adolescence, we provide a welcoming, fear-free environment. We specialize in cavity prevention, fluoride treatments, painless fillings, and guiding proper dental development.'
    ],
    benefits: ['Child-friendly, anxiety-free environment', 'Focus on cavity prevention', 'Early detection of alignment issues', 'Educates children on proper brushing'],
    procedureSteps: [
      { title: 'Gentle Introduction', desc: 'We take the time to introduce your child to the dental chair and tools in a fun way.' },
      { title: 'Preventive Care', desc: 'Teeth cleaning, fluoride application, and protective dental sealants.' },
      { title: 'Painless Treatment', desc: 'If cavities are found, we treat them quickly and comfortably using specialized pediatric techniques.' }
    ],
    faqs: [
      { question: 'When should my child first visit the dentist?', answer: 'We recommend scheduling their first visit by their first birthday or when their first tooth appears.' },
      { question: 'How do you handle anxious children?', answer: 'Our team uses a "tell, show, do" approach, ensuring children feel safe and in control at all times.' }
    ],
    seoKeywords: ['Best pediatric dentist in Bandra', 'Child friendly dental clinic Mumbai', 'Kids dentist near me', 'Painless pediatric dental care'],
    pairIndex: 5
  },
  {
    slug: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    shortDescription: 'Enhance aesthetics with veneers, bonding, and smile redesigns.',
    fullDescription: [
      'Cosmetic dentistry focuses on improving the appearance of your mouth, teeth, and smile. Even subtle changes can make a massive difference in your self-esteem and how others perceive you.',
      'Whether it is repairing a chipped tooth with composite bonding, reshaping uneven teeth, or placing ultra-thin porcelain veneers, we utilize state-of-the-art materials to deliver flawless, natural-looking results.'
    ],
    benefits: ['Fixes chipped or cracked teeth', 'Closes unsightly gaps', 'Reshapes uneven teeth', 'Provides a youthful, vibrant appearance'],
    procedureSteps: [
      { title: 'Aesthetic Analysis', desc: 'We analyze your tooth shape, color, and alignment relative to your face.' },
      { title: 'Material Selection', desc: 'We choose premium composites or porcelains that perfectly match natural enamel.' },
      { title: 'Precision Bonding', desc: 'The cosmetic material is artistically sculpted and bonded to your natural teeth.' }
    ],
    faqs: [
      { question: 'Are veneers permanent?', answer: 'Porcelain veneers are highly durable and can last 10 to 15 years with proper care.' },
      { question: 'Will cosmetic bonding stain?', answer: 'Modern composite resins are highly stain-resistant, though avoiding heavy tobacco and coffee use is recommended.' }
    ],
    seoKeywords: ['Cosmetic dentist Bandra West', 'Porcelain veneers cost Mumbai', 'Dental bonding clinic', 'Best aesthetic dentist near me'],
    pairIndex: 6
  },
  {
    slug: 'dentures',
    title: 'Dentures',
    shortDescription: 'High-quality, comfortable dentures to restore function and confidence.',
    fullDescription: [
      'Modern dentures are vastly superior to those of the past. We provide custom-crafted, lightweight, and highly aesthetic dentures that fit securely and look incredibly natural.',
      'Whether you need partial dentures to replace a few missing teeth or complete dentures for a full arch, our prosthetics restore your ability to eat, speak, and smile with absolute confidence.'
    ],
    benefits: ['Restores chewing and speaking ability', 'Supports facial muscles to prevent sagging', 'Removable for easy cleaning', 'Custom fitted for maximum comfort'],
    procedureSteps: [
      { title: 'Accurate Impressions', desc: 'Detailed molds of your gums are taken to ensure a perfectly snug fit.' },
      { title: 'Bite Registration', desc: 'We measure your jaw movements to ensure the dentures align correctly with your natural bite.' },
      { title: 'Final Fitting', desc: 'The custom dentures are fitted, and micro-adjustments are made for ultimate comfort.' }
    ],
    faqs: [
      { question: 'How long does it take to get used to new dentures?', answer: 'It usually takes a few weeks for your mouth muscles and tongue to adapt to the new appliance.' },
      { question: 'Can I sleep with my dentures in?', answer: 'We recommend removing them at night to allow your gums to rest and to maintain proper oral hygiene.' }
    ],
    seoKeywords: ['Best dentures clinic Bandra', 'Custom partial dentures Mumbai', 'Comfortable false teeth', 'Complete denture specialists'],
    pairIndex: 7
  },
  {
    slug: 'geriatric-dentistry',
    title: 'Geriatric Dentistry',
    shortDescription: 'Specialized dental care focused on the unique needs of older adults.',
    fullDescription: [
      'Aging brings unique oral health challenges, including dry mouth, root decay, gum disease, and tooth loss. Our geriatric dentistry services are specifically tailored to address the needs of senior patients with empathy and expertise.',
      'We focus on preserving natural teeth as long as possible, managing age-related oral conditions, and providing comfortable restorative options that improve the overall quality of life and nutrition for older adults.'
    ],
    benefits: ['Manages age-related oral diseases', 'Improves chewing efficiency for better nutrition', 'Gentle, patient-focused care', 'Solutions for dry mouth and root decay'],
    procedureSteps: [
      { title: 'Medical History Review', desc: 'We carefully review all medications to manage issues like dry mouth or bleeding risks.' },
      { title: 'Gentle Examination', desc: 'A thorough but highly comfortable checkup focusing on gums and root health.' },
      { title: 'Conservative Treatment', desc: 'We prioritize minimally invasive treatments to preserve remaining natural teeth.' }
    ],
    faqs: [
      { question: 'Why are my teeth becoming more sensitive as I age?', answer: 'Gum recession can expose the roots of your teeth, which lack protective enamel, causing sensitivity.' },
      { question: 'How does medication affect oral health?', answer: 'Many common medications reduce saliva flow, leading to dry mouth and a significantly higher risk of cavities.' }
    ],
    seoKeywords: ['Dental care for seniors Mumbai', 'Geriatric dentist Bandra', 'Root decay treatment', 'Elderly dental clinic near me'],
    pairIndex: 8
  },
  {
    slug: 'diagnosis-of-oral-lesions',
    title: 'Diagnosis of Oral Lesions',
    shortDescription: 'Expert diagnosis and treatment of oral lesions and mucosal diseases.',
    fullDescription: [
      'Early detection of abnormalities in the mouth is critical for effective treatment. We provide expert diagnostic services for oral lesions, ulcers, white patches, and other mucosal diseases.',
      'Dr. Saachi Shingrani performs thorough oral cancer screenings and mucosal examinations. Using advanced diagnostic tools, we ensure that any suspicious tissue is promptly evaluated, biopsied if necessary, and managed with the highest standard of care.'
    ],
    benefits: ['Early detection of oral pathologies', 'Peace of mind through expert evaluation', 'Prompt management of painful ulcers', 'Comprehensive oral cancer screening'],
    procedureSteps: [
      { title: 'Visual Examination', desc: 'A detailed inspection of the tongue, lips, cheeks, and palate.' },
      { title: 'Palpation', desc: 'Feeling the tissues of the mouth and neck to detect any unusual lumps or swelling.' },
      { title: 'Specialized Testing', desc: 'If necessary, we perform painless brush biopsies or refer for advanced histopathology.' }
    ],
    faqs: [
      { question: 'Should I be worried about a mouth ulcer?', answer: 'Most ulcers heal within two weeks. If an ulcer persists beyond this timeframe, it requires immediate professional evaluation.' },
      { question: 'How often should I get an oral cancer screening?', answer: 'An oral mucosal examination should be part of your routine six-month dental checkup.' }
    ],
    seoKeywords: ['Oral lesion diagnosis Mumbai', 'Mouth ulcer specialist Bandra', 'Oral cancer screening clinic', 'White patch in mouth treatment'],
    pairIndex: 9
  },
  {
    slug: 'wisdom-tooth-surgery',
    title: 'Wisdom Tooth Surgery',
    shortDescription: 'Safe, painless extraction of impacted wisdom teeth by specialists.',
    fullDescription: [
      'Wisdom teeth often lack sufficient space to erupt properly, leading to impaction, severe pain, infection, and damage to adjacent teeth. We specialize in the safe and painless surgical extraction of third molars.',
      'Our clinic utilizes advanced 3D imaging to precisely map the position of the tooth root and surrounding nerves. This ensures a highly predictable, swift surgical procedure with minimized recovery time and absolutely no pain during the process.'
    ],
    benefits: ['Eliminates chronic jaw pain', 'Prevents damage to neighboring teeth', 'Reduces the risk of oral infections', 'Fast, predictable recovery'],
    procedureSteps: [
      { title: '3D Nerve Mapping', desc: 'CBCT scans are used to view the exact position of the tooth relative to facial nerves.' },
      { title: 'Painless Extraction', desc: 'The tooth is gently removed under profound local anesthesia.' },
      { title: 'Post-Op Care', desc: 'We provide detailed instructions and medications to ensure rapid, comfortable healing.' }
    ],
    faqs: [
      { question: 'Is wisdom tooth extraction painful?', answer: 'The procedure itself is completely painless. Post-operative discomfort is managed easily with prescribed medication.' },
      { question: 'What is the recovery time?', answer: 'Most patients resume normal activities within 48 to 72 hours, though complete tissue healing takes a few weeks.' }
    ],
    seoKeywords: ['Painless wisdom tooth extraction Mumbai', 'Impacted tooth removal Bandra', 'Wisdom tooth surgery cost', 'Best oral surgeon near me'],
    pairIndex: 10
  },
  {
    slug: 'crowns-and-bridges',
    title: 'Crowns and Bridges',
    shortDescription: 'Restore damaged or missing teeth with durable, custom-fitted crowns.',
    fullDescription: [
      'When a tooth is heavily decayed, fractured, or has undergone a root canal, a dental crown provides essential structural support. Dental bridges offer a fixed, non-removable solution for bridging the gap created by one or more missing teeth.',
      'We use premium materials such as high-translucency Zirconia and E-max porcelain. These materials offer incredible strength and mimic the light-reflecting properties of natural enamel flawlessly.'
    ],
    benefits: ['Protects weak or treated teeth', 'Restores proper chewing mechanics', 'Highly aesthetic, natural appearance', 'Fixed and non-removable'],
    procedureSteps: [
      { title: 'Tooth Preparation', desc: 'The affected tooth is gently reshaped to accommodate the thickness of the crown.' },
      { title: 'Digital Scan', desc: 'A highly accurate digital impression is sent to our premium dental laboratory.' },
      { title: 'Final Cementation', desc: 'The custom-crafted crown or bridge is permanently bonded into place.' }
    ],
    faqs: [
      { question: 'How long do dental crowns last?', answer: 'With good oral hygiene, high-quality ceramic crowns can easily last 10 to 15 years or more.' },
      { question: 'Is a bridge better than an implant?', answer: 'While implants are the gold standard, bridges are an excellent, faster alternative if the adjacent teeth already require crowns.' }
    ],
    seoKeywords: ['Zirconia dental crowns Mumbai', 'Best dental bridge clinic Bandra', 'Cap for tooth cost', 'Porcelain crown specialist'],
    pairIndex: 11
  },
  {
    slug: 'dental-cleaning',
    title: 'Dental Cleaning',
    shortDescription: 'Professional cleaning and polishing for a healthy, plaque-free smile.',
    fullDescription: [
      'Routine professional dental cleaning (scaling and polishing) is the foundation of preventive dental care. Even with excellent home brushing, hard calculus (tartar) accumulates in hard-to-reach areas, leading to gum disease and bad breath.',
      'Using advanced ultrasonic scalers, our hygienists gently and effectively remove stubborn plaque and stains without damaging the enamel, leaving your mouth feeling incredibly fresh and your gums completely healthy.'
    ],
    benefits: ['Prevents gum disease and tooth loss', 'Eliminates persistent bad breath', 'Removes surface stains for a brighter smile', 'Painless and quick preventive care'],
    procedureSteps: [
      { title: 'Ultrasonic Scaling', desc: 'Vibrating instruments gently break down hardened tartar above and below the gumline.' },
      { title: 'Deep Polishing', desc: 'A specialized paste is used to smooth the enamel and remove coffee or tea stains.' },
      { title: 'Fluoride Treatment', desc: 'Optional fluoride application to strengthen enamel and prevent future decay.' }
    ],
    faqs: [
      { question: 'How often should I get a dental cleaning?', answer: 'We highly recommend a professional scaling and polishing every six months for optimal oral health.' },
      { question: 'Does scaling weaken the teeth?', answer: 'No, this is a common myth. Scaling removes harmful deposits and actually strengthens the supporting bone and gums.' }
    ],
    seoKeywords: ['Professional teeth cleaning Bandra', 'Dental scaling cost Mumbai', 'Best plaque removal dentist', 'Gum disease prevention near me'],
    pairIndex: 12
  }
];
