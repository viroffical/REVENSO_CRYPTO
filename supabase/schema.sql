-- Create events table
CREATE TABLE IF NOT EXISTS "event" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  event_name TEXT NOT NULL,
  category TEXT NOT NULL,
  entry TEXT NOT NULL,
  image TEXT NOT NULL,
  status TEXT NOT NULL,
  invited_users JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample event data
INSERT INTO "event" (date, start_time, end_time, event_name, category, entry, image, status, invited_users)
VALUES
  (
    'Mon, 28 April',
    '7:00 AM',
    '6:00 PM',
    'CoinFerenceX – Day 1',
    'Conference/Summit',
    'Free',
    'https://token2049-week.s3.amazonaws.com/token2049-events/token2049-b7dc33b3-5109-4b8a-b5bb-ffd8200468b0.png',
    'Going',
    '[
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.pexels.com/photos/4965012/pexels-photo-4965012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ]'
  ),
  (
    'Mon, 28 April',
    '8:00 AM',
    '12:00 PM',
    'Oversubscribed Capital VIP Breakfast',
    'Networking',
    'Free',
    'https://token2049-week.s3.amazonaws.com/token2049-events/token2049-b3d46cee-fdce-4dbc-a3ea-dddef3b7475b.png',
    'Pending',
    '[
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]'
  ),
  (
    'Mon, 28 April',
    '9:00 AM',
    '6:00 PM',
    'VCC & Coinference X Demo Day in Dubai 2025',
    'Conference/Summit',
    'Free',
    'https://token2049-week.s3.amazonaws.com/token2049-events/token2049-11885d99-463e-4227-9877-f5f61d5f8ea9.png',
    'Going',
    '[
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]'
  ),
  (
    'Tue, 29 April',
    '10:00 AM',
    '4:00 PM',
    'Builders Meetup',
    'Workshop/Hackathon',
    'Free',
    'https://token2049-week.s3.amazonaws.com/token2049-events/token2049-3aee5a8a-a535-4373-8c74-a966fefa30bf.avif',
    'Going',
    '[
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]'
  ),
  (
    'Wed, 30 April',
    '11:00 AM',
    '7:00 PM',
    'Lagrange House of ZK: The ZK/AI Summit',
    'Conference/Summit',
    'Free',
    'https://token2049-week.s3.amazonaws.com/token2049-events/token2049-f2924bd0-09b2-4f55-a977-6f05de0ea7ba.jpg',
    'Going',
    '[
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]'
  ),
  (
    'Thu, 1 May',
    '11:00 AM',
    '2:00 PM',
    'VC Connect',
    'Networking',
    'Free',
    'https://token2049-week.s3.amazonaws.com/token2049-events/token2049-e9897291-1b11-4c79-8182-3c23d178d341.jpg',
    'Invited',
    '[
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]'
  );