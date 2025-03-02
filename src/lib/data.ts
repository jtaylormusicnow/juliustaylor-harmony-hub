
export interface Music {
  id: string;
  title: string;
  releaseDate: string;
  artwork: string;
  audioSrc: string;
  description: string;
  genres: string[];
  duration: string;
  featured?: boolean;
}

export interface Beat {
  id: string;
  title: string;
  releaseDate: string;
  artwork: string;
  audioSrc: string;
  price: number;
  bpm: number;
  key: string;
  genres: string[];
  tags: string[];
  duration: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const featuredMusic: Music[] = [
  {
    id: "1",
    title: "Midnight Dreams",
    releaseDate: "2023-10-15",
    artwork: "/lovable-uploads/30833680-a35e-46a1-8c3e-fd8c5eb6e71b.png",
    audioSrc: "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3",
    description: "A journey through ambient soundscapes and rhythmic patterns.",
    genres: ["Electronic", "Ambient", "Downtempo"],
    duration: "3:45",
    featured: true
  },
  {
    id: "2",
    title: "Urban Flow",
    releaseDate: "2023-08-23",
    artwork: "/lovable-uploads/053caca3-3e6f-432f-955d-d4c9e3c34c00.png",
    audioSrc: "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-1.mp3",
    description: "High-energy beats with a cinematic undertone.",
    genres: ["Hip Hop", "Instrumental", "Urban"],
    duration: "4:12",
    featured: true
  },
  {
    id: "3",
    title: "Electric Soul",
    releaseDate: "2023-06-10",
    artwork: "/lovable-uploads/62bc6225-21aa-4aa4-98ca-b02fa10a2079.png",
    audioSrc: "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-2.mp3",
    description: "Fusion of soul, jazz and electronic elements.",
    genres: ["Soul", "Electronic", "Jazz"],
    duration: "3:28",
    featured: true
  }
];

export const allMusic: Music[] = [
  ...featuredMusic,
  {
    id: "4",
    title: "Neon City",
    releaseDate: "2023-04-05",
    artwork: "/lovable-uploads/a09b9fee-3f52-4573-b0c1-f3cb6265e659.png",
    audioSrc: "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-3.mp3",
    description: "Synthwave-inspired tracks with futuristic vibes.",
    genres: ["Synthwave", "Electronic", "Retrowave"],
    duration: "5:22"
  },
  {
    id: "5",
    title: "Rhythm & Blues",
    releaseDate: "2023-02-12",
    artwork: "/lovable-uploads/b67e2e76-2af1-4201-8e79-5e8e5c1055ef.png",
    audioSrc: "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-4.mp3",
    description: "Classic R&B with a modern twist.",
    genres: ["R&B", "Soul", "Contemporary"],
    duration: "4:08"
  }
];

export const featuredBeats: Beat[] = [
  {
    id: "b1",
    title: "Midnight Trap",
    releaseDate: "2023-11-05",
    artwork: "/lovable-uploads/42e6554d-6d7e-4881-bef4-f87d6d560d27.png",
    audioSrc: "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-5.mp3",
    price: 49.99,
    bpm: 140,
    key: "C Minor",
    genres: ["Trap", "Hip Hop", "Dark"],
    tags: ["atmospheric", "808", "dark"],
    duration: "2:48",
    featured: true
  },
  {
    id: "b2",
    title: "Summer Bounce",
    releaseDate: "2023-09-10",
    artwork: "/lovable-uploads/30833680-a35e-46a1-8c3e-fd8c5eb6e71b.png",
    audioSrc: "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-6.mp3",
    price: 39.99,
    bpm: 95,
    key: "G Major",
    genres: ["Pop", "Dance", "Upbeat"],
    tags: ["summer", "catchy", "radio"],
    duration: "2:35",
    featured: true
  },
  {
    id: "b3",
    title: "Street Anthology",
    releaseDate: "2023-07-19",
    artwork: "/lovable-uploads/053caca3-3e6f-432f-955d-d4c9e3c34c00.png",
    audioSrc: "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-7.mp3",
    price: 59.99,
    bpm: 90,
    key: "F Minor",
    genres: ["Hip Hop", "Boom Bap", "Underground"],
    tags: ["vinyl", "chill", "storytelling"],
    duration: "3:10",
    featured: true
  }
];

export const allBeats: Beat[] = [
  ...featuredBeats,
  {
    id: "b4",
    title: "Neon Lights",
    releaseDate: "2023-05-20",
    artwork: "/lovable-uploads/a09b9fee-3f52-4573-b0c1-f3cb6265e659.png",
    audioSrc: "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-8.mp3",
    price: 44.99,
    bpm: 128,
    key: "A Minor",
    genres: ["EDM", "House", "Electronic"],
    tags: ["club", "energy", "drop"],
    duration: "2:55"
  },
  {
    id: "b5",
    title: "Soul Searching",
    releaseDate: "2023-03-08",
    artwork: "/lovable-uploads/b67e2e76-2af1-4201-8e79-5e8e5c1055ef.png",
    audioSrc: "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-9.mp3",
    price: 54.99,
    bpm: 75,
    key: "D Minor",
    genres: ["R&B", "Soul", "Emotional"],
    tags: ["emotional", "vocals", "soulful"],
    duration: "3:22"
  }
];

export const featuredBlogPosts: BlogPost[] = [
  {
    id: "post1",
    title: "Behind the Production of 'Midnight Dreams'",
    date: "2023-10-20",
    author: "J. Taylor",
    excerpt: "Exploring the creative process and technical aspects behind my latest track 'Midnight Dreams'.",
    content: `
      <p>When I set out to create "Midnight Dreams," I wanted to craft something that would transport listeners to another dimension. The track began with a simple piano melody that came to me late one night – hence the title.</p>
      
      <p>I started by recording several ambient textures using analog synthesizers, particularly my vintage Moog and Roland Jupiter-8. The unique warmth these instruments bring to a track is irreplaceable.</p>
      
      <p>For the rhythmic elements, I decided to go with a more organic approach. Rather than programming perfect drums, I recorded percussion elements separately and arranged them in a way that flows naturally with slight human imperfections.</p>
      
      <p>The mixing process was particularly challenging as I wanted to create a spacious soundscape without losing definition. I used subtle automation throughout to keep the listener engaged, bringing different elements forward and back in the mix as the track progresses.</p>
      
      <p>What really brought everything together was the final mastering session. I worked with a technique that preserves the dynamic range while still giving the track the presence it needs to translate across different listening environments.</p>
      
      <p>I'm particularly proud of how the middle section evolves, creating tension before the final resolution. This kind of emotional journey is what I always strive for in my music.</p>
    `,
    image: "/lovable-uploads/30833680-a35e-46a1-8c3e-fd8c5eb6e71b.png",
    tags: ["Production", "Behind The Scenes", "Electronic Music"],
    featured: true
  },
  {
    id: "post2",
    title: "Collaborating with Vocal Artists: Tips and Experiences",
    date: "2023-09-15",
    author: "J. Taylor",
    excerpt: "Insights from my experiences working with different vocal artists and how to make the most of collaborations.",
    content: `
      <p>Collaboration is at the heart of some of my favorite musical projects. Working with vocalists brings a whole new dimension to production, but it also comes with unique challenges and rewards.</p>
      
      <p>The first rule I've learned is to establish clear communication from the start. Discussing influences, direction, and expectations before a single note is recorded saves time and potential frustration later.</p>
      
      <p>When producing for vocalists, I've found it's essential to leave space in the mix. My early collaborations often suffered from overcrowded arrangements that competed with rather than complemented the vocal performance.</p>
      
      <p>Technical aspects aside, the most successful collaborations come from mutual respect for each other's creative process. Some of my best work has happened when I've been open to changing my production to suit a vocalist's unique delivery or lyrical direction.</p>
      
      <p>One particularly memorable collaboration was with a jazz-trained vocalist who brought improvisation techniques to what was originally a very structured electronic track. The result took the music in a direction I never would have discovered alone.</p>
      
      <p>Remote collaboration has become increasingly common in my workflow, especially over the past few years. I've developed a streamlined process for working with artists across different time zones, using a combination of video calls for creative discussions and specialized platforms for sharing high-quality audio files securely.</p>
      
      <p>The beauty of collaboration is that the final product often transcends what either party could have created individually. Those magical moments of synergy are what keep me seeking out new artists to work with.</p>
    `,
    image: "/lovable-uploads/b67e2e76-2af1-4201-8e79-5e8e5c1055ef.png",
    tags: ["Collaboration", "Vocal Production", "Creative Process"],
    featured: true
  }
];

export const allBlogPosts: BlogPost[] = [
  ...featuredBlogPosts,
  {
    id: "post3",
    title: "Evolution of My Studio Setup",
    date: "2023-08-05",
    author: "J. Taylor",
    excerpt: "A look at how my production studio has evolved over the years and the philosophy behind my gear choices.",
    content: `
      <p>My journey as a producer has been mirrored by the evolution of my studio space. What started as a laptop and headphones in a bedroom corner has grown into a thoughtfully designed environment built for creativity and sound quality.</p>
      
      <p>The first major upgrade in my setup came when I invested in proper acoustic treatment. Before adding any expensive gear, addressing room reflections and standing waves made an immediate improvement to my mixes that no plugin could achieve.</p>
      
      <p>When it comes to equipment, I've always prioritized quality over quantity. Rather than accumulating gear for the sake of it, I carefully research each addition to ensure it fills a specific need in my production process.</p>
      
      <p>My monitoring setup has been particularly important. After trying several options, I settled on a pair of monitors that offer flat frequency response rather than flattering coloration. This choice forces me to work harder during production but results in mixes that translate better across different playback systems.</p>
      
      <p>The analog versus digital debate has been present throughout my career. While my workflow is primarily in-the-box, I've found that selective use of analog processing adds character that's difficult to achieve purely with digital tools. My hybrid approach gives me the best of both worlds.</p>
      
      <p>Ergonomics is an aspect of studio design that's often overlooked. After experiencing physical strain from long sessions, I redesigned my workspace with adjustable furniture and proper positioning of all elements. This has allowed for longer, more comfortable creative sessions.</p>
      
      <p>Perhaps most importantly, I've learned that the studio should serve the creative process, not the other way around. Technical considerations are important, but they should never become obstacles to capturing inspiration when it strikes.</p>
    `,
    image: "/lovable-uploads/42e6554d-6d7e-4881-bef4-f87d6d560d27.png",
    tags: ["Studio Setup", "Equipment", "Production Environment"],
    featured: false
  },
  {
    id: "post4",
    title: "Finding Inspiration in Unexpected Places",
    date: "2023-07-12",
    author: "J. Taylor",
    excerpt: "How I break creative blocks by seeking inspiration outside the studio and traditional music sources.",
    content: `
      <p>The blank canvas of a new project can be both exciting and intimidating. Over the years, I've developed strategies for finding inspiration when it doesn't come naturally, often looking beyond music itself.</p>
      
      <p>Urban environments have become one of my richest sources of musical ideas. There's something about the rhythm of a city – the overlapping conversations, the mechanical patterns of transit systems, the unexpected harmonies of street performers – that sparks creativity in unique ways.</p>
      
      <p>Visual art regularly influences my sonic palette. I'll often visit galleries before starting new projects, translating the colors, textures, and emotions of paintings into auditory equivalents. This synesthetic approach has led to some of my most interesting compositional choices.</p>
      
      <p>Literature and film have shaped my approach to narrative in instrumental music. Studying how other art forms handle pacing, tension, and resolution has deeply informed how I structure tracks to tell a story without words.</p>
      
      <p>Perhaps my most unusual source of inspiration comes from scientific concepts. Learning about phenomena in fields like physics or biology often translates into new production techniques or sound design approaches as I try to sonically represent natural patterns and processes.</p>
      
      <p>Sometimes, stepping away from creating entirely provides the reset I need. Periods of deliberate listening – giving my full attention to albums outside my usual genres – frequently leads to breakthrough moments in my own work.</p>
      
      <p>I've come to believe that creative blocks are often not about a lack of inspiration but about filtering too critically too early. Some of my best work has come from temporarily suspending judgment and allowing myself to create freely, finding the unexpected gems in what begins as imperfect experimentation.</p>
    `,
    image: "/lovable-uploads/053caca3-3e6f-432f-955d-d4c9e3c34c00.png",
    tags: ["Creativity", "Inspiration", "Creative Process"],
    featured: false
  }
];
