import { characters, servers } from './common';

// 클래스 정보 return
export const getClassInfoByKor = (name) => {
  const info = [];

  characters.map((character) => {
    const data = character.filter((c) => c.kor === name);
    if (data.length > 0) {
      info.push(data[0]);
    }
  });

  return info;
};

// server 이름 kor return
export const getServerKor = (kor) => {
  const [info] = servers.filter((server) => server.kor === kor);

  return info.length > 0 ? info.kor : '';
};
