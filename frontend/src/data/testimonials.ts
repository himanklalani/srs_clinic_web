export interface Testimonial {
  name: string;
  avatarInitials: string;
  review: string;
  rating: number;
  timeAgo: string;
  dateStr: string; // Used strictly for sorting logic behind the scenes
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

/**
 * Dates are approximated based on the relative times provided (e.g., "3 weeks ago")
 * relative to the current live date (April 2024) to ensure the "Newest" sort works correctly.
 */
export const testimonialsData: Testimonial[] = [
  {
    name: "Marilyn Misquitta",
    avatarInitials: getInitials("Marilyn Misquitta"),
    review: "Dr.Saachi is great at what she does. Makes the patient feel at ease. Extremely professional is her approach and breaks down the treatment very well both in dialogue and action..that adds a lot of comfort.",
    rating: 5,
    timeAgo: "3 weeks ago",
    dateStr: "2024-03-22",
  },
  {
    name: "Saket Shrirao",
    avatarInitials: getInitials("Saket Shrirao"),
    review: "Went to this clinic for an implant surgery. The process happened very smoothly. Doctor guided me before the surgery and during the surgery , the entire experience was painless. Also the post op follow up was very prompt. Satisfied with their service and I highly recommend this clinic for dental implants.",
    rating: 5,
    timeAgo: "3 weeks ago",
    dateStr: "2024-03-21",
  },
  {
    name: "jyoti dapal",
    avatarInitials: getInitials("jyoti dapal"),
    review: "Exceptional Dental Care With Painless Treatment. Kudos To Dr Saachi and Team. Have got multiple dental treatments here in this clinic and i couldn't be more glad to find this clinic. Right from implants to root canal treatment to cavity filling, this clinic is a go to dental clinic. Thankyou for managing all my dental issues and giving me the smile i always wanted",
    rating: 5,
    timeAgo: "3 weeks ago",
    dateStr: "2024-03-20",
  },
  {
    name: "Sunil Pahuja",
    avatarInitials: getInitials("Sunil Pahuja"),
    review: "Dr.saachi is one experienced agile and knowledgeable Dentist. Very much satisfied and happy the way she tackles tricky dental issues. Topnotch treatment always.",
    rating: 5,
    timeAgo: "a month ago",
    dateStr: "2024-03-10",
  },
  {
    name: "Shweta Gupta",
    avatarInitials: getInitials("Shweta Gupta"),
    review: "Loved the experience ther! Got the filling and it was done in a blink of an eye and i did not feel any pain. The dentist is so sweet, kind and soo good at her work! Plus point : the aesthetic of the clinic is so relaxing and they play your favourite music during the whole procedure! 🫶🏻 10/10 recommended",
    rating: 5,
    timeAgo: "a month ago",
    dateStr: "2024-03-05",
  },
  {
    name: "Tricia D'Souza",
    avatarInitials: getInitials("Tricia D'Souza"),
    review: "Dr Saachi Shingrani does wonderful work. She took care of my dental needs - filling cavities , root canals and caps in a way that involved minimal discomfort. When Saachi says there will be no pain - trust her! She also goes to great lengths to ensure high quality medical care so that once she takes care of a tooth it won’t trouble you again. I had to take care of a long list of dental issues in a hurry before leaving the country and Saachi was efficient and very organised with the plan, the schedule and the appointments which was a huge plus! A high recommendation to anyone with dental needs!",
    rating: 5,
    timeAgo: "8 months ago",
    dateStr: "2023-08-15",
  },
  {
    name: "sagar makwana",
    avatarInitials: getInitials("sagar makwana"),
    review: "Had a great experience at the clinic, Dr. is very kind , which makes me comfortable to speak to her ,also love the interior colours of the clinic. She has been verry patient and helpful would highly recommend anyone for great dental care !!",
    rating: 5,
    timeAgo: "8 months ago",
    dateStr: "2023-08-12",
  },
  {
    name: "pranav singh",
    avatarInitials: getInitials("pranav singh"),
    review: "I recently visited Dr. Saachi Shingrani's clinic and was thoroughly impressed. Dr. Saachi's expertise and gentle approach made my dental procedure smooth and painless. The clinic is modern, and the staff is friendly and professional. I highly recommend Dr. Saachi for top-quality dental care.",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-04-10",
  },
  {
    name: "pranav rathore",
    avatarInitials: getInitials("pranav rathore"),
    review: "Dr. Saachi Shingrani's Dental Care is exceptional! The clinic is modern, hygienic, and patient-focused. Dr. Saachi is highly skilled, explains everything clearly, and ensures a comfortable experience. The staff is friendly and professional. Highly recommend it for all dental needs!",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-04-09",
  },
  {
    name: "Gayatri Kulkarni",
    avatarInitials: getInitials("Gayatri Kulkarni"),
    review: "I'm excited to share my exceptional experience at SRS Dental Clinic! 😊 My journey began with a root canal treatment, followed by orthodontic treatment with braces. Dr. Saachi's unwavering support, kindness, and expertise made the entire process seamless and painless. Her dedication to delivering outstanding results is evident in the beautiful smile I now have. I highly recommend SRS Dental Clinic to anyone seeking top-notch dental care. Thank you, Dr. Saachi, for transforming my smile! 💕",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-03-25",
  },
  {
    name: "Yohaan Photography",
    avatarInitials: getInitials("Yohaan Photography"),
    review: "I found Dr. Saachi right after the pandemic ended, and I was very a particular as my friend did not enjoy trips to the dentist. To my surprise, from the moment I called Saachi to meeting her at the clinic, she displayed a very professional yet friendly persona. My friend was so glad to listen to her favorite music which is a very impressive way of getting patients at ease! That is something every patient gets to choose for themselves. I am glad to say that I, too, am being taken care of by Saachi ever since! She has a very calm and knowledgeable way of handling her patients. Would highly recommend her to everybody! 6 Stars!",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-03-20",
  },
  {
    name: "Dr. Sunil Patel",
    avatarInitials: getInitials("Dr. Sunil Patel"),
    review: "\"I recently visited this dental clinic and had an exceptional experience! The staff were friendly, welcoming, and professional. Dr. Saachi was thorough, gentle, and explained everything clearly. The clinic was modern, clean, and well-organized. I appreciated the attention to detail and the care taken to ensure I was comfortable throughout my appointment. The treatment was pain-free and efficient. I highly recommend Dr. Saachi Shingrani's Dental Care Clinic to anyone seeking top-notch dental care. They truly prioritize their patients' needs and provide outstanding service. Thank you for a wonderful experience!\"",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-03-15",
  },
  {
    name: "Manav Hassanandani",
    avatarInitials: getInitials("Manav Hassanandani"),
    review: "I wanted to express my gratitude for the exceptional care I received during my recent visits to your clinic. Your expertise in treating my cavity and performing the root canal procedure was truly remarkable. I appreciate how effortlessly you filled the cavity and alleviated my discomfort. Your skilled hands and dedication to providing top-notch dental care were evident throughout the treatment process. Thank you for your professionalism, attention to detail, and the comfortable environment you create in your clinic. Your commitment to ensuring your patients' well-being is truly commendable. I am grateful for the positive experience and the effective treatment that has improved my dental health significantly. Looking forward to continuing my dental care under your expert guidance.",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-03-10",
  },
  {
    name: "AMEET REGE",
    avatarInitials: getInitials("AMEET REGE"),
    review: "Saachi is a fabulous dentist, she puts you at ease and explains all the pros and cons of the procedure. She's also very detailed in her explanation making sure you understand the procedure and are fully aware before it starts. Oh and yes the most important - she ensures that there's No Pain :)",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-03-05",
  },
  {
    name: "Amey Divekar",
    avatarInitials: getInitials("Amey Divekar"),
    review: "Dr Saachi is quite proficient at her job and is also very considerate vis-a-vis timings and appointments. Highly recommend :)",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-03-01",
  },
  {
    name: "Rajesh Bathija",
    avatarInitials: getInitials("Rajesh Bathija"),
    review: "Dr Saachi is a very proficient and gentle Dentist. I have got root canal and fillings done for several teeth. She has been extremely good with the work apart from ensuring no discomfort to me either during or post procedures. Her clinic is very well equipped with the latest technology allowing her to take xrays as well as other computerised support. Fantastic Doc, Highly recommended !",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-02-28",
  },
  {
    name: "Meher",
    avatarInitials: getInitials("Meher"),
    review: "Dr. Saachi is one of the finest doctors I have been to. As a dentist, she is amazing at what she does and has the most comforting atmosphere at her clinic. She never fails to make me feel relaxed and completely changed my experience when she asked me about my favourite singer....we both absolutely vibed to Prateek Kuhad in all the upcoming sessions!! :)) Both her effortless hand and warm personality is what stood out and I've never felt as comfortable at a doctor's clinic as I have at hers. Thank you so much! <3",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-02-25",
  },
  {
    name: "Manpreet Wadhwa",
    avatarInitials: getInitials("Manpreet Wadhwa"),
    review: "My experience with Dr. Saachi and her team was outstanding. Not only was the staff incredibly friendly and welcoming, but the level of care and attention to detail was truly impressive. Highly recommended..!!",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-02-20",
  },
  {
    name: "Berenice da Gama Rose",
    avatarInitials: getInitials("Berenice da Gama Rose"),
    review: "Loved my experience with Dr. Saachi. Not only does she do a fantastic job of the dental treatment, she also provides such a peaceful and pleasant environment in her clinic, with lots of tooth/ dental topic jokes on the walls,",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-02-15",
  },
  {
    name: "Venita Patnaik",
    avatarInitials: getInitials("Venita Patnaik"),
    review: "Very clean n hygienic. Dr.Saachi is a thorough professional yet kind n caring.",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-02-10",
  },
  {
    name: "Bharadwaj Ramakrishnan",
    avatarInitials: getInitials("Bharadwaj Ramakrishnan"),
    review: "I appreciate Dr. Saachi helping me when I was in pain. She was professional and showed expertise and I think she is someone who is genuine in her intention to care and help her patients. She diagnosed my problem and explained my treatment options very objectively. Her clinic, albeit small, is very tastefully done and she also lets her patients play music they like which makes it an overall lovely experience.",
    rating: 5,
    timeAgo: "a year ago",
    dateStr: "2023-02-05",
  },
  {
    name: "Shubham Tejaswi Shahi",
    avatarInitials: getInitials("Shubham Tejaswi Shahi"),
    review: "Highly recommended! My experience was great. My process was quick, comfortable and convenient. Saachi is great and very helpful and easy to approach. Always available on WhatsApp for any discomfort.",
    rating: 5,
    timeAgo: "2 years ago",
    dateStr: "2022-04-10",
  },
  {
    name: "Mohit Salgaonkar",
    avatarInitials: getInitials("Mohit Salgaonkar"),
    review: "This is a great place to go take care of your teeth. The team of Dr Saachi was very professional examining and providing with solutions by priority. I had to do root canal and dr saachi did a great job, I felt that I was in good hands. All the people here were very gentle and kind to me. They explained very well what was going on. Thanks to Dr saachi:)",
    rating: 5,
    timeAgo: "2 years ago",
    dateStr: "2022-04-05",
  },
  {
    name: "Noel D'Silva",
    avatarInitials: getInitials("Noel D'Silva"),
    review: "Highly recommended! Dr Saachi is kind, soft spoken & very approachable. She responds to all your doubts & very well explains in depth the treatment procedure. You can go ahead with her without any doubt for all your dental treatment. All the best & wish you success!",
    rating: 5,
    timeAgo: "2 years ago",
    dateStr: "2022-03-25",
  },
  {
    name: "Keshmira Elavia",
    avatarInitials: getInitials("Keshmira Elavia"),
    review: "Dr Saachi- She is one of a kind Doc Very loving, very patient and makes you feel very comfortable and knows how to take care of her patients very well. Blessed to know her and have her in our life! God bless you !",
    rating: 5,
    timeAgo: "2 years ago",
    dateStr: "2022-03-20",
  },
  {
    name: "Chirag Thakkar",
    avatarInitials: getInitials("Chirag Thakkar"),
    review: "Dr. Saachi is the best Dentist I have come across so far. Doc is very calm and understanding - This helped me a lot during my very first root canal, addressed my queries in detail, since I was a little scared being my first she supported and made sure I stay relaxed throughout. She did a fantastic work - not even once I faced any pain. I would highly recommend Dr. Saachi for any dental care required👍",
    rating: 5,
    timeAgo: "2 years ago",
    dateStr: "2022-03-15",
  },
  {
    name: "Abaan Ghavte",
    avatarInitials: getInitials("Abaan Ghavte"),
    review: "Loved the experience i had extract 4 teeth but it did not pain a bit she gave breaks whenever i wanted and dr saachi is so polite extra points for playing my fav songs😌😉",
    rating: 5,
    timeAgo: "2 years ago",
    dateStr: "2022-03-10",
  },
  {
    name: "Xerxis Desai",
    avatarInitials: getInitials("Xerxis Desai"),
    review: "Had a great pain free experience.",
    rating: 5,
    timeAgo: "2 years ago",
    dateStr: "2022-03-05",
  },
  {
    name: "Yohhaan H Rawani",
    avatarInitials: getInitials("Yohhaan H Rawani"),
    review: "Dr.Saachi is a thorough professional who knows her job and ensures she does it well. I had a good experience in getting my cavity filled and also the diagnosis and plan of action wrt my jaw lock. Her charges are also quite reasonable for the quality of work she does. Highly recommended.",
    rating: 5,
    timeAgo: "2 years ago",
    dateStr: "2022-03-01",
  },
  {
    name: "EdwinAndSweta Marmanillo",
    avatarInitials: getInitials("EdwinAndSweta Marmanillo"),
    review: "Dr Saachi is amazing. I went for a general medical check up and dental was part of it. But I wanted a cleaning and she had a conference but accommodated me in the evening in her private clinic because I had a flight. Not only did she fill my cavities and give me a cleaning she was able to make me a personalize night guard and check my son with less than 24 hrs notice. I wish she could treat my son for braces but unfortunately we don’t live in India. But next time I come back will definitely for my check up with Dr Saachi!",
    rating: 5,
    timeAgo: "2 years ago",
    dateStr: "2022-02-25",
  }
];
