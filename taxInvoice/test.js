const topics = [
  {
    topic: "ReactJS",
    posts: [
      { postID: "id1", title: "title1" },
      { postID: "id2", title: "title2" },
    ],
  },
  {
    topic: "Vue.js",
    posts: [
      { postID: "id3", title: "title3" },
      { postID: "id4", title: "title4" },
    ],
  },
];

let all = topics.reduce(convert, []);

function convert(previousValue, currentValue, currentIndex, array) {
  return [
    ...previousValue,
    ...currentValue.posts.map((i) => {
      let item = { ...i, topic: currentValue.topic };
      return item;
    }),
  ];
}
console.log(all);
