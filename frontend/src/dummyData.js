export const tasks = [
  {
    id: 1,
    title: "Next 7 days",
    plant: { name: "Calathea Orbifolia", slug: "calathea-orbifolia" },
    type: "Water",
    completed: true,
  },
  {
    id: 2,
    title: "Next 7 days",
    plant: { name: "Pothos", slug: "calathea-orbifolia" },
    type: "Water",
    completed: false,
  },
  {
    id: 3,
    title: "Next 7 days",

    plant: { name: "Calathea Orbifolia", slug: "calathea-orbifolia" },
    type: "Repot",
    completed: false,
  },
  {
    id: 4,
    title: "Next 7 days",
    plant: { name: "Calathea Orbifolia", slug: "calathea-orbifolia" },
    type: "Propagate",
    completed: false,
  },
  {
    id: 5,
    title: "Next 7 days",
    plant: { name: "Calathea Orbifolia", slug: "calathea-orbifolia" },
    type: "Progress Update",
    completed: true,
  },
];

export const wateringEntries = [
  {
    plant: { name: "Calathea Orbifolia", slug: "calathea-orbifolia" },
    watered_on: "12/05/23",
    created: "12/01/21",
  },
  {
    plant: { name: "Pothos", slug: "pothos" },
    watered_on: "05/05/23",
    created: "12/01/21",
  },
  {
    plant: { name: "Calathea Orbifolia", slug: "calathea-orbifolia" },
    watered_on: "01/07/23",
    created: "12/01/21",
  },
];

export const noteList = [
  {
    id: 1,
    text: "I love this plant so much!",
    plant: { id: 1, name: "String of Hearts" },
    created_on: "12/05/2023",
    owner: { username: "admin", email: "admin@example.com", password: "admin" },
    created: "12/01/2023",
  },
  {
    id: 2,
    text: "Why is this plant so dramatic ;(",
    plant: { id: 1, name: "Calathea Orbifolia" },
    created_on: "11/01/2023",
    img: "../../Calathea_orbifolia.jpg",
    owner: { username: "admin", email: "admin@example.com", password: "admin" },
  },
];

export const plantList = [{ id: 1, name: "Calathea Orbifolia" }];
