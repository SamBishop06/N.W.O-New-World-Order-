// Mock Users Data
export const users = [
	{ id: 1, username: 'FrodoBaggins', email: 'frodo.baggins@shire.com' },
	{ id: 2, username: 'GandalfTheGrey', email: 'gandalf.the.grey@middleearth.com' },
	{ id: 3, username: 'Aragorn', email: 'aragorn@ranger.com' },
	{ id: 4, username: 'Legolas', email: 'legolas@woodlandrealm.com' },
	{ id: 5, username: 'Gimli', email: 'gimli@lonelymountain.com' }
];

// Mock Messages Data
let messages = [
	{ id: 1, userId: 1, message: 'Hello, friends of Middle Earth!', timestamp: '2024-05-04T18:43:01Z' },
	{ id: 2, userId: 2, message: 'Greetings, Frodo! How goes your journey?', timestamp: '2024-05-04T18:44:01Z' },
	{ id: 3, userId: 3, message: 'Hello Frodo and Gandalf! Ready for another adventure?', timestamp: '2024-05-04T18:45:01Z' },
	{ id: 4, userId: 4, message: 'Good day, brave warriors!', timestamp: '2024-05-04T18:46:01Z' },
	{ id: 5, userId: 5, message: 'And my axe! Ready when you are, Legolas.', timestamp: '2024-05-04T18:47:01Z' },
	{ id: 6, userId: 1, message: 'Thank you all! Let\'s set forth on our quest.', timestamp: '2024-05-04T18:48:01Z' },
	{ id: 7, userId: 1, message: 'The journey is long and full of perils. I sometimes wonder if we will make it.', timestamp: '2024-05-04T18:49:01Z' },
	{ id: 8, userId: 2, message: 'Fear not, Frodo! You have friends by your side. Together, we can overcome any obstacle.', timestamp: '2024-05-04T18:50:01Z' },
	{ id: 9, userId: 3, message: 'Indeed, we shall face any danger together. Our unity is our strength.', timestamp: '2024-05-04T18:51:01Z' },
	{ id: 10, userId: 4, message: 'The path is clear. We must move swiftly. Time is of the essence.', timestamp: '2024-05-04T18:52:01Z' },
	{ id: 11, userId: 5, message: 'Aye, let\'s not waste any more time. The sooner we start, the sooner we reach our destination.', timestamp: '2024-05-04T18:53:01Z' },
	{ id: 12, userId: 1, message: 'I am grateful for your support. Onward, then! Let\'s set forth on our quest.', timestamp: '2024-05-04T18:54:01Z' },
	{ id: 13, userId: 2, message: 'Remember, the strength lies in your heart. Believe in yourself, and you can achieve anything.', timestamp: '2024-05-04T18:55:01Z' },
	{ id: 14, userId: 3, message: 'We are with you, Frodo. Let\'s go. The road ahead may be long, but we will travel it together.', timestamp: '2024-05-04T18:56:01Z' },
	{ id: 15, userId: 4, message: 'Every step takes us closer to our goal. Let\'s keep moving forward.', timestamp: '2024-05-04T18:57:01Z' },
	{ id: 16, userId: 5, message: 'And every step is a victory in itself. Let\'s keep our spirits high and continue on our journey.', timestamp: '2024-05-04T18:58:01Z' }
];

messages = messages.map(({ userId, ...message }) => ({
	...message,
	user: users.find(user => user.id === userId)
}));

export { messages };
