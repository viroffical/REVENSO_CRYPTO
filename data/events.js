const events = [
  {
    id: 1,
    event_name: "Tech Networking Mixer",
    date: "April 15, 2025",
    start_time: "18:00",
    end_time: "21:00",
    category: "Networking",
    subtitle: "Tech Enthusiasts SF",
    entry: "Free",
    status: "Going",
    location: {
      name: "SF Innovation Hub",
      address: "123 Market St, San Francisco",
      lat: 37.7749,
      lng: -122.4194,
      color: "#FF5A5F"
    },
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    invitedUsers: [
      "https://randomuser.me/api/portraits/women/12.jpg",
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/22.jpg",
      "https://randomuser.me/api/portraits/men/42.jpg"
    ],
    description: "Join us for an evening of networking with tech professionals from all over the city. Great opportunity to meet potential collaborators and future employers."
  },
  {
    id: 2,
    event_name: "Startup Pitch Competition",
    date: "April 18, 2025",
    start_time: "13:00",
    end_time: "17:00",
    category: "Business",
    subtitle: "SF Entrepreneurs Network",
    entry: "RSVP Required",
    status: "Going",
    location: {
      name: "Venture Capital Plaza",
      address: "789 Mission St, San Francisco",
      lat: 37.7833,
      lng: -122.4167,
      color: "#4285F4"
    },
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    invitedUsers: [
      "https://randomuser.me/api/portraits/women/15.jpg",
      "https://randomuser.me/api/portraits/men/22.jpg",
      "https://randomuser.me/api/portraits/women/32.jpg"
    ],
    description: "Watch as 10 promising startups pitch their ideas to a panel of top VC investors. Network with founders and investors during the reception."
  },
  {
    id: 3,
    event_name: "MLOPS Hands-on Session",
    date: "April 20, 2025",
    start_time: "10:00",
    end_time: "14:00",
    category: "Workshop",
    subtitle: "MLOps and LLMOps Enthusiasts",
    entry: "$25",
    status: "Pending",
    location: {
      name: "AI Innovation Center",
      address: "456 Howard St, San Francisco",
      lat: 37.7695,
      lng: -122.4143,
      color: "#FBBC05"
    },
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    invitedUsers: [
      "https://randomuser.me/api/portraits/women/18.jpg",
      "https://randomuser.me/api/portraits/men/28.jpg"
    ],
    description: "Hands-on workshop focused on implementing efficient MLOps pipelines. Bring your laptop and be ready to build real-world solutions with expert guidance."
  },
  {
    id: 4,
    event_name: "Charity Gala Dinner",
    date: "April 22, 2025",
    start_time: "19:00",
    end_time: "23:00",
    category: "Charity",
    subtitle: "SF Community Foundation",
    entry: "$100 Donation",
    status: "Invited",
    location: {
      name: "Grand Hyatt",
      address: "345 Stockton St, San Francisco",
      lat: 37.7879,
      lng: -122.4075,
      color: "#34A853"
    },
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    invitedUsers: [
      "https://randomuser.me/api/portraits/women/23.jpg",
      "https://randomuser.me/api/portraits/men/34.jpg",
      "https://randomuser.me/api/portraits/women/45.jpg",
      "https://randomuser.me/api/portraits/men/56.jpg",
      "https://randomuser.me/api/portraits/women/67.jpg"
    ],
    description: "A glamorous evening to raise funds for local education initiatives. Enjoy a gourmet dinner, live music, and a silent auction with amazing prizes."
  },
  {
    id: 5,
    event_name: "AI in Healthcare Conference",
    date: "April 25, 2025",
    start_time: "09:00",
    end_time: "18:00",
    category: "Conference",
    subtitle: "Future of Medicine Alliance",
    entry: "Free for Members",
    status: "Going",
    location: {
      name: "SF Medical Center",
      address: "550 Terry A Francois Blvd, San Francisco",
      lat: 37.7702,
      lng: -122.3871,
      color: "#EA4335"
    },
    image: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    invitedUsers: [
      "https://randomuser.me/api/portraits/women/28.jpg",
      "https://randomuser.me/api/portraits/men/29.jpg",
      "https://randomuser.me/api/portraits/women/30.jpg"
    ],
    description: "Explore the latest advancements in AI and machine learning applications in healthcare. Leading researchers and medical professionals will present their work."
  },
  {
    id: 6,
    event_name: "Web3 Developers Meetup",
    date: "April 28, 2025",
    start_time: "19:30",
    end_time: "22:30",
    category: "Tech",
    subtitle: "Blockchain Developers Bay Area",
    entry: "Free",
    status: "Pending",
    location: {
      name: "Crypto Hub Co-working",
      address: "888 Brannan St, San Francisco",
      lat: 37.7721,
      lng: -122.4034,
      color: "#8E44AD"
    },
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    invitedUsers: [
      "https://randomuser.me/api/portraits/women/33.jpg",
      "https://randomuser.me/api/portraits/men/44.jpg",
      "https://randomuser.me/api/portraits/women/55.jpg",
      "https://randomuser.me/api/portraits/men/66.jpg"
    ],
    description: "Join fellow Web3 developers to discuss the latest in blockchain technology, smart contracts, and decentralized applications. Live coding demos included."
  }
];

export default events;