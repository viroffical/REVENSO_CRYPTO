export const stories = [
  {
    id: 1,
    name: 'Sarah',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    hasNewStory: true
  },
  {
    id: 2,
    name: 'Michael',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    hasNewStory: true
  },
  {
    id: 3,
    name: 'Jessica',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    hasNewStory: false
  },
  {
    id: 4,
    name: 'David',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    hasNewStory: true
  },
  {
    id: 5,
    name: 'Amanda',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    hasNewStory: false
  }
];

export const chats = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Looking forward to the meeting tomorrow!',
    time: '10:24 AM',
    unread: 2,
    messages: [
      {
        id: 101,
        text: 'Hi there! How are you doing?',
        sender: 'them',
        timestamp: '10:20 AM'
      },
      {
        id: 102,
        text: 'I\'m good, thanks for asking! How about you?',
        sender: 'me',
        timestamp: '10:22 AM'
      },
      {
        id: 103,
        text: 'Doing well! Just wanted to confirm our meeting for tomorrow.',
        sender: 'them',
        timestamp: '10:23 AM'
      },
      {
        id: 104,
        text: 'Looking forward to the meeting tomorrow!',
        sender: 'them',
        timestamp: '10:24 AM'
      }
    ]
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'The project is coming along nicely.',
    time: 'Yesterday',
    unread: 0,
    messages: [
      {
        id: 201,
        text: 'Hey, how\'s the project going?',
        sender: 'them',
        timestamp: 'Yesterday, 2:30 PM'
      },
      {
        id: 202,
        text: 'It\'s coming along well. I\'ve finished the initial designs.',
        sender: 'me',
        timestamp: 'Yesterday, 2:45 PM'
      },
      {
        id: 203,
        text: 'Great! Can you share them with me?',
        sender: 'them',
        timestamp: 'Yesterday, 3:00 PM'
      },
      {
        id: 204,
        text: 'The project is coming along nicely.',
        sender: 'me',
        timestamp: 'Yesterday, 3:15 PM'
      }
    ]
  },
  {
    id: 3,
    name: 'Jessica Parker',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    lastMessage: 'Are we still on for coffee this weekend?',
    time: 'Yesterday',
    unread: 1,
    messages: [
      {
        id: 301,
        text: 'Hey! How have you been?',
        sender: 'them',
        timestamp: 'Yesterday, 10:00 AM'
      },
      {
        id: 302,
        text: 'I\'ve been good! Just busy with work.',
        sender: 'me',
        timestamp: 'Yesterday, 10:15 AM'
      },
      {
        id: 303,
        text: 'Are we still on for coffee this weekend?',
        sender: 'them',
        timestamp: 'Yesterday, 10:30 AM'
      }
    ]
  },
  {
    id: 4,
    name: 'David Miller',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    lastMessage: 'Thanks for the introduction yesterday.',
    time: 'Tuesday',
    unread: 0,
    messages: [
      {
        id: 401,
        text: 'Thanks for introducing me to your colleague yesterday.',
        sender: 'them',
        timestamp: 'Tuesday, 4:00 PM'
      },
      {
        id: 402,
        text: 'No problem at all! I thought you two would get along.',
        sender: 'me',
        timestamp: 'Tuesday, 4:15 PM'
      },
      {
        id: 403,
        text: 'We did! We\'re planning to collaborate on a project.',
        sender: 'them',
        timestamp: 'Tuesday, 4:30 PM'
      },
      {
        id: 404,
        text: 'Thanks for the introduction yesterday.',
        sender: 'them',
        timestamp: 'Tuesday, 4:45 PM'
      }
    ]
  },
  {
    id: 5,
    name: 'Amanda Lee',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    lastMessage: 'The concert was amazing! Check out this photo.',
    time: 'Monday',
    unread: 0,
    messages: [
      {
        id: 501,
        text: 'Did you see the concert last night?',
        sender: 'them',
        timestamp: 'Monday, 11:00 AM'
      },
      {
        id: 502,
        text: 'No, I couldn\'t make it. How was it?',
        sender: 'me',
        timestamp: 'Monday, 11:15 AM'
      },
      {
        id: 503,
        text: 'The concert was amazing! Check out this photo.',
        sender: 'them',
        timestamp: 'Monday, 11:30 AM'
      }
    ]
  }
];