export type Member = {
  id: string;
  name: string;
  alias: string;
  jp: string;
  role: string;
  fruit: string;
  bounty: string;
  quote: string;
  bio: string;
  color: string;
  colorDeep: string;
  image?: string;
  bg?: string;
};

export const members: Member[] = [
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    alias: "Straw Hat",
    jp: "ルフィ",
    role: "Captain",
    fruit: "Gomu Gomu no Mi",
    bounty: "3,000,000,000",
    quote: "I'm gonna be King of the Pirates!",
    bio: "Reckless, loyal, and rubber-limbed. Luffy chases freedom across every sea and stops for nothing short of the One Piece itself.",
    color: "#D71920",
    colorDeep: "#6F0B0F",
  },
  {
    id: "zoro",
    name: "Roronoa Zoro",
    alias: "Pirate Hunter",
    jp: "ゾロ",
    role: "Swordsman",
    fruit: "—",
    bounty: "1,111,000,000",
    quote: "Nothing happened.",
    bio: "Three-sword style master, chasing the title of the World's Greatest Swordsman. Sleeps as hard as he fights.",
    color: "#0B7A3E",
    colorDeep: "#063A22",
  },
  {
    id: "nami",
    name: "Nami",
    alias: "Cat Burglar",
    jp: "ナミ",
    role: "Navigator",
    fruit: "—",
    bounty: "366,000,000",
    quote: "I'll draw a map of the whole world.",
    bio: "Reads the weather like a book and the room twice as fast. The Straw Hats sail by her wind.",
    color: "#F26A21",
    colorDeep: "#A63A0E",
  },
  {
    id: "usopp",
    name: "Usopp",
    alias: "God Usopp",
    jp: "ウソップ",
    role: "Sniper",
    fruit: "—",
    bounty: "500,000,000",
    quote: "I am a brave warrior of the sea!",
    bio: "Tall tales, sharp aim. The sniper who lies his way into truth — and out of every certain death.",
    color: "#D99A10",
    colorDeep: "#7A4B05",
  },
  {
    id: "sanji",
    name: "Vinsmoke Sanji",
    alias: "Black Leg",
    jp: "サンジ",
    role: "Cook",
    fruit: "—",
    bounty: "1,032,000,000",
    quote: "A cook who doesn't help a lady is no man at all.",
    bio: "Hands for food, feet for fights. Cooks for anyone who's starving, kicks anyone who isn't worth it.",
    color: "#0B5FB8",
    colorDeep: "#062D5B",
  },
  {
    id: "chopper",
    name: "Tony Tony Chopper",
    alias: "Cotton Candy Lover",
    jp: "チョッパー",
    role: "Doctor",
    fruit: "Hito Hito no Mi",
    bounty: "1,000",
    quote: "Shut up! That doesn't make me happy at all, you idiot!",
    bio: "A reindeer who became a doctor to save the lives medicine never could. Small body, vast heart.",
    color: "#F36FA6",
    colorDeep: "#9B2E59",
  },
  {
    id: "robin",
    name: "Nico Robin",
    alias: "Devil Child",
    jp: "ロビン",
    role: "Archaeologist",
    fruit: "Hana Hana no Mi",
    bounty: "930,000,000",
    quote: "I want to live!",
    bio: "Keeper of forbidden history, hunted by the world for knowing too much. Found a home by choosing one.",
    color: "#6D35B7",
    colorDeep: "#301552",
  },
  {
    id: "franky",
    name: "Franky",
    alias: "Iron Man",
    jp: "フランキー",
    role: "Shipwright",
    fruit: "—",
    bounty: "394,000,000",
    quote: "SUPER!",
    bio: "Cyborg shipwright with cola for blood. Built the Thousand Sunny — built himself, too.",
    color: "#00AFC8",
    colorDeep: "#005D70",
  },
  {
    id: "brook",
    name: "Brook",
    alias: "Soul King",
    jp: "ブルック",
    role: "Musician",
    fruit: "Yomi Yomi no Mi",
    bounty: "383,000,000",
    quote: "Yohohoho!",
    bio: "A skeleton with a song and a sword. Promised a whale he'd come back — and he did, fifty years late.",
    color: "#F97316",
    colorDeep: "#9A3412",
  },
  {
    id: "jinbe",
    name: "Jinbe",
    alias: "First Son of the Sea",
    jp: "ジンベエ",
    role: "Helmsman",
    fruit: "—",
    bounty: "1,100,000,000",
    quote: "Bushido is the heart of a man.",
    bio: "Fish-Man Karate master, former Warlord, now the hand on the wheel of the Sunny. Calm in any storm.",
    color: "#1D3F8F",
    colorDeep: "#0B1C4D",
  },
];

export const findMember = (id: string) => members.find((m) => m.id === id);
