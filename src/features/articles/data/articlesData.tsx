import {nanoid} from '@reduxjs/toolkit';

const articlesDataWithoutId = [
  {
    'slug': 'frontend-vs-backend-salary-6omlnx',
    'title': 'Frontend vs Backend salary',
    'description': 'Are they equal?',
    'body': 'Not much different since Frontend developer now have more things to do. Call API, Client-Side validation before submit to data backend.',
    'createdAt': '2021-08-14T13:50:22.299Z',
    'updatedAt': '2021-08-14T13:50:22.299Z',
    'tagList': [
      'sweb development',
      'Frontend',
      'Backend',
      'Salary'
    ],
    'favorited': false,
    'favoritesCount': 0,
    'author': {
      'username': 'dat',
      'image': 'https://static.productionready.io/images/smiley-cyrus.jpg',
      'following': false
    }
  },
  {
    'slug': 'maintain-your-relationship-7hrdgq',
    'title': 'Maintain your relationship',
    'description': 'Friends, co-workers',
    'body': 'Spend more time go outside together.',
    'createdAt': '2021-08-14T13:48:38.558Z',
    'updatedAt': '2021-08-14T13:48:38.558Z',
    'tagList': [
      'soft skill',
      'relationship'
    ],
    'favorited': false,
    'favoritesCount': 0,
    'author': {
      'username': 'dat',
      'image': 'https://static.productionready.io/images/smiley-cyrus.jpg',
      'following': false
    }
  },
  {
    'slug': 'improve-your-english-speaking-skill-pa02zo',
    'title': 'Improve your english speaking skill',
    'description': 'We need to learn in normal way?',
    'body': 'Practice method shadowing.',
    'createdAt': '2021-08-14T13:39:05.359Z',
    'updatedAt': '2021-08-14T13:39:05.359Z',
    'tagList': [
      'learn',
      'English',
      'Speaking'
    ],
    'favorited': false,
    'favoritesCount': 0,
    'author': {
      'username': 'dat',
      'image': 'https://static.productionready.io/images/smiley-cyrus.jpg',
      'following': false
    }
  },
  {
    'slug': 'how-to-learn-react-8csdro',
    'title': 'How to learn React',
    'description': 'Is it hard?',
    'body': 'Learn HTML, CSS, JS first.',
    'createdAt': '2021-08-14T13:30:01.502Z',
    'updatedAt': '2021-08-14T13:30:01.502Z',
    'tagList': [
      'learn',
      'React',
      'HTML',
      'CSS',
      'JS'
    ],
    'favorited': false,
    'favoritesCount': 0,
    'author': {
      'username': 'dat',
      'image': 'https://static.productionready.io/images/smiley-cyrus.jpg',
      'following': false
    }
  },
  {
    'slug': 'how-to-train-your-dragon-lwsw74',
    'title': 'How to train your dragon',
    'description': 'Ever wonder how?',
    'body': 'Very carefully.',
    'createdAt': '2021-08-14T13:25:14.083Z',
    'updatedAt': '2021-08-14T13:25:14.083Z',
    'tagList': [
      'dragons',
      'training'
    ],
    'favorited': false,
    'favoritesCount': 0,
    'author': {
      'username': 'dat',
      'image': 'https://static.productionready.io/images/smiley-cyrus.jpg',
      'following': false
    }
  }
];

export const articlesData = articlesDataWithoutId.map(article => {
  const randomId = nanoid();
  return {
    ...article,
    id: randomId
  };
});