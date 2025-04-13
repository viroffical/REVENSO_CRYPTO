// data/chats.js
const stories = [
  {
    id: 1,
    name: "Terry",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hasNewStory: true,
  },
  {
    id: 2,
    name: "Craig",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hasNewStory: true,
  },
  {
    id: 3,
    name: "Roger",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hasNewStory: false,
  },
  {
    id: 4,
    name: "Nolan",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hasNewStory: true,
  },
  {
    id: 5,
    name: "Jordan",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hasNewStory: false,
  },
  {
    id: 6,
    name: "Melissa",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hasNewStory: true,
  },
];

const chats = [
  {
    id: 1,
    name: "Angel Curtis",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2622&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastMessage: "Please help me find a good monitor for ...",
    time: "02:11",
    unread: 2,
    isRead: false,
  },
  {
    id: 2,
    name: "Zaire Dorwart",
    avatar:
      "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastMessage: "✓ Gacor pisan kang",
    time: "02:11",
    unread: 0,
    isRead: true,
  },
  {
    id: 3,
    name: "Kelas Malam",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastMessage: "Btms : No one can come today?",
    time: "02:11",
    unread: 2,
    isRead: false,
  },
  {
    id: 4,
    name: "Jocelyn Gouse",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastMessage: "You're now an admin",
    time: "02:11",
    unread: 0,
    isRead: true,
  },
  {
    id: 5,
    name: "Jaylon Dias",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastMessage: "✓ Buy back 10k gallons, top up credit, b...",
    time: "02:11",
    unread: 0,
    isRead: true,
  },
  {
    id: 6,
    name: "Chance Rhiel Madsen",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastMessage: "Thank you mate!",
    time: "02:11",
    unread: 2,
    isRead: false,
  },
  {
    id: 7,
    name: "Sophie Chang",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastMessage: "Can we reschedule our meeting to next week?",
    time: "01:45",
    unread: 0,
    isRead: true,
  },
  {
    id: 8,
    name: "Marcus Wilson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastMessage: "Just sent you the files you requested",
    time: "Yesterday",
    unread: 0,
    isRead: true,
  },
];

export { stories, chats };
