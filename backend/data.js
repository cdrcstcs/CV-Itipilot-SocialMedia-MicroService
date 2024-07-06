import User from "./models/User.js";
import Image from "./models/Image.js";
const imageUrls = [
    "1.jpeg",
    "2.jpeg",
    "3.jpeg",
    "4.jpeg",
    "5.jpeg",
    "6.jpeg",
    "7.jpeg",
    "8.jpeg",
    "9.jpeg",
    "10.jpeg",
];
const generateImageData = () => {
    const imageData = [];
    for (let i = 0; i < 10; i++) {
        const image = imageUrls[i]; // Cycling through sample URLs
        const imageEntry = { image };
        imageData.push(imageEntry);
    }
    return imageData;
};
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateRandomPhoneNumber = () => {
    const digits = Math.floor(Math.random() * 9000000000) + 1000000000;
    return digits;
};
const generateUsers = async () => {
    const users = [];
    const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France", "Japan", "Brazil", "India", "South Africa"];
    const userTypes = ["ADMIN", "USER"];
    const imageIds = (await Image.find()).map(({_id})=>{
        return _id;
    })
    for (let i = 0; i < 20; i++) {
        const user= {
        imageId: imageIds[getRandomInt(0, imageIds.length - 1)],
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: `password${i + 1}`,
        country: countries[Math.floor(Math.random() * countries.length)],
        phone: generateRandomPhoneNumber(),
        longtitude: getRandomInt(0, 100),
        latitude: getRandomInt(0, 100),
        userType: userTypes[Math.floor(Math.random() * userTypes.length)],
        };
        users.push(user);
    }
    return users;
};
const generateRandomDescription = () => {
    const descriptions = [
        "Beautiful scenery!",
        "Amazing sunset view.",
        "Lovely place to visit.",
        "Exploring new adventures.",
        "Chilling by the beach.",
        "Hiking in the mountains.",
        "Cityscape from above.",
        "Nature at its finest.",
        "Cultural experience.",
        "Memorable travel spot.",
        "Enchanting landscapes.",
        "Tranquil retreat.",
        "Ancient wonders.",
        "Vibrant city life.",
        "Adventurous spirit.",
        "Ocean breeze.",
        "Serenity in nature.",
        "Historic charm.",
        "Epic road trip.",
        "Journey to the unknown.",
        "Panoramic views.",
        "Spiritual pilgrimage.",
        "Cosmopolitan vibes.",
        "Hidden gem.",
        "Picturesque village.",
        "Wildlife sanctuary.",
        "Local flavors.",
        "Architectural marvels.",
        "Peaceful oasis.",
        "Unforgettable escapade."
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
};
const generateRandomLikes = (userIds) => {
    const likeMap = new Map();
    userIds.forEach(id => {
        likeMap.set(id, Math.random() < 0.5); // Random true/false for likes
    });
    return likeMap;
};

const generatePosts = async () => {
    const posts = [];
    const userIds = (await User.find()).map(user => user._id);
    const imageIds = (await Image.find()).map(image => image._id);
    for (let i = 0; i < 50; i++) {
      const post = {
        userId: userIds[Math.floor(Math.random() * userIds.length)],
        latitude: getRandomInt(1, 100),
        longtitude: getRandomInt(1, 100),
        description: generateRandomDescription(),
        imageId: imageIds[Math.floor(Math.random() * imageIds.length)],
        likes: generateRandomLikes(userIds),
      };
      posts.push(post);
    }
    return posts;
  };
  
export {generateImageData, generateUsers, generatePosts}