import dayjs from 'dayjs';
import { schedule as commonSchedule } from '../common/common';

// 기초 숙코코 데이터 생성 로직
export const initSookcoco = (origin) => {
  const now = dayjs().format('YYYYMMDDHHmm');
  // 로요일과 차이
  const diffDate = 3 - dayjs(now).day();

  origin = {};
  origin.characters = [];
  origin.expedition = commonSchedule.expedition;

  // 현재 사이트 접속 시각이 새벽시간대인 경우
  if (
    parseInt(now) >= parseInt(dayjs(now).format('YYYYMMDD0000')) &&
    parseInt(now) < parseInt(dayjs(now).format('YYYYMMDD0600'))
  ) {
    // 일일 컨텐츠 초기화 날짜를 당일로 설정
    origin.refreshDate = dayjs(now).format('YYYYMMDD0600');
  } else {
    // 새벽시간대가 아닌 경우
    // 초기화 날짜를 다음날로 설정
    origin.refreshDate = dayjs(now).add(1, 'day').format('YYYYMMDD0600');
  }

  // 현재 사이트 접속 요일이 로요일(수) 이전인 경우
  if (diffDate > 0) {
    // 주간 컨텐츠 초기화 날짜를 로요일(수)로 설정
    origin.refreshWeek = dayjs(now).add(diffDate, 'day').format('YYYYMMDD0600');
  } else if (diffDate === 0) {
    // 접속 요일이 로요일인 경우
    // 새벽시간대
    if (
      parseInt(now) >= parseInt(dayjs(now).format('YYYYMMDD0000')) &&
      parseInt(now) < parseInt(dayjs(now).format('YYYYMMDD0600'))
    ) {
      // 주간 컨텐츠 초기화 날짜를 당일로 설정
      origin.refreshWeek = dayjs(now).format('YYYYMMDD0600');
    } else {
      origin.refreshWeek = dayjs(now).add(1, 'week').format('YYYYMMDD0600');
    }
  } else {
    // 접속 요일이 로요일 이후인 경우
    // 다음 주 로요일로 설정
    origin.refreshWeek = dayjs(now)
      .add(diffDate, 'day')
      .add(1, 'week')
      .format('YYYYMMDD0600');
  }

  window.localStorage.setItem('sookcoco', JSON.stringify(origin));
};

// 일간/주간 컨텐츠 초기화 로직
export const setSookcocoRefreshData = (origin) => {
  const now = dayjs().format('YYYYMMDDHHmm');

  // 로요일과 차이
  const diffDate = 3 - dayjs(now).day();
  let refreshDate;
  let refreshWeek;

  // 원정대 스케줄 없는 경우 공통 원정대 정보 추가
  if (!origin.hasOwnProperty('expedition')) {
    origin.expedition = commonSchedule.expedition;
    window.localStorage.setItem('sookcoco', JSON.stringify(origin));
  } else {
    // 공통 원정대 컨텐츠가 추가 제거될 경우 update 로직
    // 커스텀 컨텐츠를 제외한 공통 원정대 컨텐츠
    const orgExpExceptCustom = origin.expedition.filter(
      (exp) => exp.custom !== 'y'
    );

    if (orgExpExceptCustom.length !== commonSchedule.expedition.length) {
      const customExpContent = origin.expedition.filter(
        (exp) => exp.custom === 'y'
      );

      if (customExpContent.length === 0) {
        origin.expedition = commonSchedule.expedition;
      } else {
        origin.expedition = [...commonSchedule.expedition, ...customExpContent];
      }
      window.localStorage.setItem('sookcoco', JSON.stringify(origin));
    }
  }

  // 일일 컨텐츠 초기화 날짜 세팅
  refreshDate = origin.refreshDate;
  refreshWeek = origin.refreshWeek;

  // 일일 스케줄 초기화
  if (parseInt(now) >= parseInt(refreshDate)) {
    origin.characters.map((character) => {
      if (character.hasOwnProperty('schedule')) {
        character.schedule.daily.length > 0 &&
          character.schedule.daily.map((day) => {
            day.done = 0;
          });
      }
    });

    // 원정대-일일 스케줄 초기화
    if (origin.expedition.length > 0) {
      origin.expedition.map((exp) => {
        if (exp.repeat === 'daily') {
          exp.done = 0;
        }
      });
    }

    // 일일 스케줄 초기화 날짜를 다음날로 세팅
    origin.refreshDate = dayjs(now).add(1, 'day').format('YYYYMMDD0600');
  }

  // 주간, 원정대 스케줄 초기화
  if (parseInt(now) >= parseInt(refreshWeek)) {
    origin.characters.map((character) => {
      if (character.hasOwnProperty('schedule')) {
        character.schedule.weekly.length > 0 &&
          character.schedule.weekly.map((week) => {
            week.done = 0;
          });
      }
    });

    // 원정대-주간 스케줄 초기화
    if (origin.hasOwnProperty('expedition')) {
      if (origin.expedition.length > 0) {
        origin.expedition.map((exp) => {
          if (exp.repeat === 'weekly') {
            exp.done = 0;
          }
        });
      }
    }

    if (diffDate > 0) {
      origin.refreshWeek = dayjs(now)
        .add(diffDate, 'day')
        .format('YYYYMMDD0600');
    } else {
      origin.refreshWeek = dayjs(now)
        .add(diffDate, 'day')
        .add(1, 'week')
        .format('YYYYMMDD0600');
    }
  }
  window.localStorage.setItem('sookcoco', JSON.stringify(origin));
};
