import Scooter from './scooter.png'
import Hamburger from './hamburger.png'
import Apple from './apples.png'
import Turkey from './turkey.png'
import Juice from './orangejuice.png'
import Coffee from './coffee.png'
import Candy from './candy.png'
import Sushi from './sushi.png'
import Hotdog from './hotdog.png'
import Cake from './cake.png'
import Breakfast from './breakfast.png'
import Blocks from './blocks.png'
import Bucket from './bucket.png'
import Music from './music.png'
import Sled from './sled.webp'
import Dress from './dressup.png'
import Game from './boardgame.png'
import Laundry from './laundry.png'
import Doll from './doll.png'
import Pong from './pingpong.png'


const itemList = [
    {   
        id: 1,
        img: Hamburger,
        name: "Hamburger",
        description: "Extra greasy and juicy!",
        amount: 20,
        price: 50,
        action: "Feed"
    },
    {
        id: 2,
        img: Apple,
        name: "Apple",
        description: "An apple a day keeps the doctor away",
        amount: 10,
        price: 10,
        action: "Feed"
    },
    {
        id: 3,
        img: Turkey,
        name: "Turkey",
        description: "Winner, winner turkey dinner!",
        amount: 30,
        price: 100,
        action: "Feed"
    },
    {
        id: 4,
        img: Juice,
        name: "Orange Juice",
        description: "Vitamin C for a balanced diet",
        amount: 5,
        price: 5,
        action: "Feed"
    },
    {
        id: 5,
        img: Coffee,
        name: "Coffee",
        description: "Start the day right with a cup of coffee!",
        amount: 1,
        price: 5,
        action: "Feed"
    },
    {
        id: 6,
        img: Candy,
        name: "Candy",
        description: "A sweet treat every now and then",
        amount: 10,
        price: 10,
        action: "Feed"
    },
    {
        id: 7,
        img: Sushi,
        name: "Sushi",
        description: "Some love it, some hate it, but your pet deserves some luxury!",
        amount: 50,
        price: 200,
        action: "Feed"
    },
    {
        id: 8,
        img: Hotdog,
        name: "Hotdog",
        description: "Just another fun day at the carnival",
        amount: 20,
        price: 50,
        action: "Feed"
    },
    {
        id: 9,
        img: Cake,
        name: "Cake",
        description: "Celebrate a special day with your pet!",
        amount: 30,
        price: 70,
        action: "Feed"
    },
    {
        id: 10,
        img: Breakfast,
        name: "Breakfast Platter",
        description: "Don't forget: breakfast is the most important meal of the day!",
        amount: 35,
        price: 100,
        action: "Feed"
    },
    {
        id: 11,
        img: Blocks,
        name: "Blocks",
        description: "What will you build?",
        amount: 10,
        price: 20,
        action: "Play"
    },
    {
        id: 12,
        img: Bucket,
        name: "Sand Bucket",
        description: "It's the perfect weather for a beach day!",
        amount: 15,
        price: 25,
        action: "Play"
    },
    {
        id: 13,
        img: Music,
        name: "Music Set",
        description: "Everybody loves a good jam sesh",
        amount: 25,
        price: 50,
        action: "Play"
    },
    {
        id: 14,
        img: Sled,
        name: "Sledding",
        description: "Hope your brought your snow jacket, it's freezing!",
        amount: 30,
        price: 50,
        action: "Play"
    },
    {
        id: 15,
        img: Dress,
        name: "Dress Up",
        description: "Your pet is dressed to the nines",
        amount: 10,
        price: 15,
        action: "Play"
    },
    {
        id: 16,
        img: Game,
        name: "Board Game",
        description: "Remember, it's just a game!",
        amount: 15,
        price: 20,
        action: "Play"
    },
    {
        id: 17,
        img: Laundry,
        name: "Laundry",
        description: "That's no fun! But someone's gotta do it",
        amount: 1,
        price: 5,
        action: "Play"
    },
    {
        id: 18,
        img: Doll,
        name: "Dolls",
        description: "Hands off! This is a limited edition.",
        amount: 30,
        price: 50,
        action: "Play"
    },
    {
        id: 19,
        img: Pong,
        name: "Ping Pong",
        description: "Better bring your A game!",
        amount: 70,
        price: 200,
        action: "Play"
    },
    {
        id: 20,
        img: Scooter,
        name: "Scooter",
        description: "One of the cool kids now",
        amount: 40,
        price: 100,
        action: "Play"
    }
]

export default itemList;