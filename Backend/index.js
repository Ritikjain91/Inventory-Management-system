const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const stories = [
  {
    id: 1,
  name: 'The Tale of the Lost Compass',
  description: `Once upon a time in a small coastal village, there lived a young sailor named Leo. Leo was known for his adventurous spirit and love for the sea. He had a small, weathered boat named The Seagull, which he used to explore the nearby islands and bring back stories of his journeys to the villagers.

One day, while preparing for a new adventure, Leo found an old compass in his grandfather’s chest. The compass was unique, with a golden rim and an intricate design of a star at its center. His grandfather had always told him that this compass would guide him to wherever his heart truly desired. Excited to test it out, Leo set sail, letting the compass lead the way.

Days turned into weeks as Leo sailed farther than he ever had before. The compass led him through calm seas and fierce storms, always pointing to a distant place he had never been. Finally, he arrived at a mysterious island shrouded in mist.

As he stepped onto the shore, Leo noticed something magical about the island. The trees shimmered with golden leaves, and the air was filled with the scent of flowers he had never encountered before. Following the compass, he ventured deeper into the island until he reached a clearing.

In the center of the clearing was a large stone with an inscription that read, “The heart knows the way.” At that moment, Leo realized that the compass had not just been leading him to a physical place, but to a deeper understanding of himself. The island was a place where dreams and reality intertwined, and it was there that Leo understood his true calling—to share the beauty of the world with others.

Leo returned to his village with tales of the magical island, but more importantly, with a renewed sense of purpose. He knew that his adventures were not just about the destinations, but about the journey and the lessons learned along the way. From that day on, he continued to explore the seas, guided not just by the compass, but by the compass of his heart.

And so, the tale of the lost compass became a cherished story in the village, inspiring others to follow their dreams and trust in the journey of life.`,
  imageUrl: 'http://yourserver.com/images/lost_compass.jpg',

  },
  {
    id: 2,
    name: 'The Second Story',
    description: 'This is the description of the second story.',
    imageUrl: 'http://yourserver.com/images/story2.jpg',
  },
  {
    id: 3,
    name: 'The Third Story',
    description: 'This is the description of the third story.',
    imageUrl: 'http://yourserver.com/images/story3.jpg',
  },
];

app.get('/api/stories', (req, res) => {
  res.json(stories);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
