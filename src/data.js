export const clubs = [
  {
    id: 1,
    name: "Coding Club",
    description:
      "For students passionate about software development, hackathons, and problem-solving.",
    events: [
      {
        id: 101,
        title: "Hackathon 2025",
        date: "2025-10-15",
        location: "Auditorium A",
        description:
          "A rigorous 24-hour hackathon where teams collaborate intensively to design innovative solutions for real-world problems. This event fosters creativity, rapid prototyping, and teamwork under pressure, ideal for anyone looking to challenge their coding skills and learn new technologies.",
        entryFee: "₹200",
        benefits:
          "Participating helps you enhance your coding skills through practical problem solving, improve your teamwork and collaboration abilities, expand your professional network by interacting with industry mentors, and gain valuable experience working under tight deadlines.",
        prizes: [
          { position: "1st Prize", amount: "₹5000" },
          { position: "2nd Prize", amount: "₹3000" },
          { position: "3rd Prize", amount: "₹1000" },
        ],
      },
      {
        id: 102,
        title: "Web Dev Bootcamp",
        date: "2025-11-02",
        location: "Lab 3",
        description:
          "An immersive, hands-on workshop designed to take you through modern web development essentials. Learn how to build responsive, dynamic websites using React, Tailwind CSS, and RESTful APIs, culminating in a project you can showcase.",
        entryFee: "₹150",
        benefits:
          "Gain practical skills in the latest front-end technologies, build a portfolio-worthy project, receive mentorship from experienced developers, and improve your career readiness for web development roles.",
        prizes: [
          { position: "1st Prize", amount: "₹3000" },
          { position: "2nd Prize", amount: "₹2000" },
          { position: "3rd Prize", amount: "₹1000" },
        ],
      },
      {
        id: 103,
        title: "Competitive Coding Challenge",
        date: "2025-12-01",
        location: "Online",
        description:
          "A fast-paced online competition where participants solve algorithmic and data structure problems within timed rounds. This challenge is perfect for those wanting to improve their problem-solving speed and accuracy.",
        entryFee: "₹100",
        benefits:
          "Sharpen your algorithmic thinking and coding efficiency, compete with top coders nationally, identify your strengths and weaknesses through challenging problems, and boost your resume with competitive coding experience.",
        prizes: [
          { position: "1st Prize", amount: "₹4000" },
          { position: "2nd Prize", amount: "₹2500" },
          { position: "3rd Prize", amount: "₹1500" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Cultural Club",
    description:
      "A hub for music, dance, and theater enthusiasts to showcase their talents.",
    events: [
      {
        id: 201,
        title: "Dance Night",
        date: "2025-10-20",
        location: "Main Hall",
        description:
          "An energetic evening dedicated to diverse dance performances ranging from contemporary to traditional styles. Participants get a chance to present choreographed pieces or freestyle acts in front of a lively audience.",
        entryFee: "₹100",
        benefits:
          "Gain stage experience, improve your dance techniques and expression, enhance your confidence performing live, and connect with fellow dance enthusiasts to exchange ideas and styles.",
        prizes: [
          { position: "1st Prize", amount: "₹3500" },
          { position: "2nd Prize", amount: "₹2000" },
          { position: "3rd Prize", amount: "₹1000" },
        ],
      },
      {
        id: 202,
        title: "Music Fiesta",
        date: "2025-11-10",
        location: "Amphitheater",
        description:
          "A vibrant event showcasing live band performances, solo vocalists, and instrumental acts. Whether you're a musician or a music lover, this fiesta celebrates diverse genres and talents.",
        entryFee: "₹150",
        benefits:
          "Experience live performance dynamics, build stage presence, network with other musicians, get feedback from audiences and experts, and boost your confidence through public exposure.",
        prizes: [
          { position: "1st Prize", amount: "₹4000" },
          { position: "2nd Prize", amount: "₹2500" },
          { position: "3rd Prize", amount: "₹1500" },
        ],
      },
      {
        id: 203,
        title: "Drama Showcase",
        date: "2025-12-05",
        location: "Auditorium B",
        description:
          "A theatrical event where students perform original or classic short plays and skits. This showcase emphasizes creativity, acting skills, and stagecraft in a supportive environment.",
        entryFee: "₹120",
        benefits:
          "Develop acting and storytelling abilities, learn stage management and collaboration, enhance creativity, and gain experience performing in front of a live audience.",
        prizes: [
          { position: "1st Prize", amount: "₹3500" },
          { position: "2nd Prize", amount: "₹2200" },
          { position: "3rd Prize", amount: "₹1300" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Sports Club",
    description:
      "Promotes fitness and teamwork through different sports activities.",
    events: [
      {
        id: 301,
        title: "Football League",
        date: "2025-09-30",
        location: "College Ground",
        description:
          "A competitive inter-department football league encouraging teamwork, fitness, and sportsmanship. Teams compete over multiple matches to win the league title.",
        entryFee: "₹250",
        benefits:
          "Improve physical fitness and endurance, develop teamwork and strategic thinking, enjoy healthy competition, and gain recognition in the college sports community.",
        prizes: [
          { position: "1st Prize", amount: "₹6000" },
          { position: "2nd Prize", amount: "₹3500" },
          { position: "3rd Prize", amount: "₹2000" },
        ],
      },
      {
        id: 302,
        title: "Basketball Tournament",
        date: "2025-10-25",
        location: "Sports Complex",
        description:
          "A knockout-style basketball tournament where teams face off in intense matches. The event highlights athletic skill, teamwork, and competitive spirit.",
        entryFee: "₹200",
        benefits:
          "Enhance basketball skills, build team coordination, experience competitive sportsmanship, and gain college-level sports exposure.",
        prizes: [
          { position: "1st Prize", amount: "₹5500" },
          { position: "2nd Prize", amount: "₹3000" },
          { position: "3rd Prize", amount: "₹1800" },
        ],
      },
      {
        id: 303,
        title: "Athletics Meet",
        date: "2025-11-15",
        location: "Track Field",
        description:
          "A day-long event featuring various track and field competitions including relay races, sprints, and long jumps. Open to all skill levels, promoting fitness and healthy rivalry.",
        entryFee: "₹150",
        benefits:
          "Boost your speed, endurance, and agility, compete in multiple disciplines, build competitive spirit, and enjoy camaraderie with fellow athletes.",
        prizes: [
          { position: "1st Prize", amount: "₹5000" },
          { position: "2nd Prize", amount: "₹2700" },
          { position: "3rd Prize", amount: "₹1500" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Literary Club",
    description:
      "Encourages creativity through debates, poetry, and storytelling.",
    events: [
      {
        id: 401,
        title: "Debate Competition",
        date: "2025-10-18",
        location: "Seminar Hall",
        description:
          "An intellectually stimulating debate competition where participants discuss and argue on current social and political topics. Encourages critical thinking and persuasive communication.",
        entryFee: "₹80",
        benefits:
          "Improve public speaking and critical thinking skills, learn to construct and defend arguments, build confidence, and engage with diverse perspectives.",
        prizes: [
          { position: "1st Prize", amount: "₹3500" },
          { position: "2nd Prize", amount: "₹2000" },
          { position: "3rd Prize", amount: "₹1000" },
        ],
      },
      {
        id: 402,
        title: "Poetry Slam",
        date: "2025-11-05",
        location: "Library Auditorium",
        description:
          "A vibrant event where poets present original works in a lively and supportive setting. This slam encourages expression, creativity, and audience engagement.",
        entryFee: "₹70",
        benefits:
          "Express your creativity, receive constructive feedback, connect with a community of poets, and improve performance and writing skills.",
        prizes: [
          { position: "1st Prize", amount: "₹3000" },
          { position: "2nd Prize", amount: "₹1800" },
          { position: "3rd Prize", amount: "₹900" },
        ],
      },
      {
        id: 403,
        title: "Storytelling Night",
        date: "2025-12-08",
        location: "Cafeteria Stage",
        description:
          "An informal, fun evening where students narrate personal or fictional stories, honing narrative techniques and engaging audiences in a relaxed atmosphere.",
        entryFee: "₹50",
        benefits:
          "Enhance your storytelling and communication skills, build confidence in public speaking, foster creativity, and enjoy social interaction with fellow storytellers.",
        prizes: [
          { position: "1st Prize", amount: "₹2500" },
          { position: "2nd Prize", amount: "₹1500" },
          { position: "3rd Prize", amount: "₹700" },
        ],
      },
    ],
  },
];
