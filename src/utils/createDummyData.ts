const fs = require('fs');

type User = {
  id: number;
  name: string;
  email: string;
  address: string;
};

const createDummyData = (count: number): User[] => {
  const users: User[] = [];

  for (let i = 1; i <= count; i++) {
    const userObj = {
      id: i,
      name: `Test ${i}`,
      email: `test${i}@test.com`,
      address: `test${i} add`,
    };
    users.push(userObj);
  }

  return users;
};

const dummyData = createDummyData(40);
fs.writeFileSync('dummyData.json', JSON.stringify(dummyData));
