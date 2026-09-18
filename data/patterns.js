// 자주 쓰는 문장 패턴 100개. 패턴 하나에 서로 다른 상황의 예문 3개를 붙였다.
// 예문은 조각 맞추기 퀴즈에 쓰이므로 짧게 유지한다.
// [패턴, 뜻, 외우기 팁, [[상황, 영어, 한국어] × 3]]
const rows = [
  ["Do you mind if I ~?", '~해도 될까요?', "대답이 'No'면 '괜찮아요'라는 뜻이에요. 'Not at all'도 허락이에요.", [
    ['카페', 'Do you mind if I sit here?', '여기 앉아도 될까요?'],
    ['회사', 'Do you mind if I leave early today?', '오늘 일찍 가도 될까요?'],
    ['친구 집', 'Do you mind if I use your bathroom?', '화장실 좀 써도 될까?']]],
  ["I'm about to ~", '막 ~하려던 참이야', "'about to'는 '바로 직전'이에요. 전화 받을 때 자주 써요.", [
    ['전화', "I'm about to leave the office.", '막 사무실에서 나가려던 참이야.'],
    ['집', "I'm about to take a shower.", '막 샤워하려던 참이야.'],
    ['친구', "I was about to call you!", '막 너한테 전화하려던 참이었어!']]],
  ["Can I get ~?", '~ 주시겠어요? (주문할 때)', "주문은 'Can I get ~, please?' 하나로 거의 다 돼요.", [
    ['카페', 'Can I get an iced latte, please?', '아이스 라테 한 잔 주시겠어요?'],
    ['식당', 'Can I get the check, please?', '계산서 주시겠어요?'],
    ['패스트푸드', 'Can I get a large fries?', '감자튀김 큰 거 하나 주시겠어요?']]],
  ["I'd like to ~", '~하고 싶어요 (정중하게)', "'I want to'보다 부드럽고 정중해요. 가게나 전화에서 써요.", [
    ['호텔', "I'd like to check in, please.", '체크인하고 싶어요.'],
    ['은행', "I'd like to open an account.", '계좌를 개설하고 싶어요.'],
    ['가게', "I'd like to return this.", '이거 반품하고 싶어요.']]],
  ["How about ~?", '~는 어때?', '뒤에 명사나 -ing가 와요. 제안할 때 가장 쉬운 표현이에요.', [
    ['친구', 'How about pizza tonight?', '오늘 밤 피자 어때?'],
    ['회사', 'How about meeting on Monday?', '월요일에 만나는 거 어때요?'],
    ['연인', 'How about a movie this weekend?', '이번 주말에 영화 어때?']]],
  ["I'm looking for ~", '~을 찾고 있어요', '가게에서 점원이 말을 걸면 바로 쓸 수 있어요.', [
    ['가게', "I'm looking for a gift for my mom.", '엄마 선물을 찾고 있어요.'],
    ['길에서', "I'm looking for the subway station.", '지하철역을 찾고 있어요.'],
    ['회사', "I'm looking for a new job.", '새 일자리를 찾고 있어.']]],
  ["Is there any ~?", '~ 있어요?', "셀 수 없는 것엔 'any', 하나만 물을 땐 'Is there a ~?'예요.", [
    ['집', 'Is there any coffee left?', '커피 남은 거 있어?'],
    ['여행', 'Is there a bank near here?', '이 근처에 은행 있어요?'],
    ['회사', 'Is there any news about the project?', '프로젝트 관련 소식 있어요?']]],
  ["I'm not sure if ~", '~인지 잘 모르겠어', "딱 잘라 말하기 어려울 때 쓰는 부드러운 표현이에요.", [
    ['친구', "I'm not sure if I can come.", '갈 수 있을지 잘 모르겠어.'],
    ['회사', "I'm not sure if this is right.", '이게 맞는지 잘 모르겠어요.'],
    ['쇼핑', "I'm not sure if it fits me.", '이게 나한테 맞을지 모르겠어.']]],
  ["It's not that ~, it's just ~", '~한 건 아니고, 그냥 ~해서 그래', '거절하거나 해명할 때 상대 기분을 덜 상하게 해요.', [
    ['친구', "It's not that I don't like it, it's just expensive.", '싫은 건 아니고, 그냥 비싸서 그래.'],
    ['연인', "It's not that I'm mad, it's just I'm tired.", '화난 건 아니고, 그냥 피곤해서 그래.'],
    ['회사', "It's not that it's bad, it's just too long.", '나쁜 건 아니고, 그냥 너무 길어요.']]],
  ["I used to ~", '예전엔 ~했었어 (지금은 안 해)', "과거 습관이에요. 지금은 아니라는 느낌이 들어 있어요.", [
    ['친구', 'I used to live in Busan.', '예전에 부산에 살았었어.'],
    ['운동', 'I used to run every morning.', '예전엔 매일 아침 달렸었어.'],
    ['음식', "I used to hate coffee.", '예전엔 커피를 싫어했었어.']]],
  ["I'm used to ~", '~에 익숙해', "'used to'와 헷갈리지 마세요. 'be'가 붙으면 '익숙하다'예요. 뒤에 명사나 -ing가 와요.", [
    ['회사', "I'm used to working late.", '늦게까지 일하는 거 익숙해.'],
    ['날씨', "I'm not used to this cold weather.", '이런 추운 날씨는 익숙하지 않아.'],
    ['음식', "I'm used to spicy food.", '매운 음식에 익숙해.']]],
  ["I can't wait to ~", '빨리 ~하고 싶어 (너무 기대돼)', "'기다릴 수 없다'가 아니라 '너무 기대된다'는 뜻이에요.", [
    ['여행', "I can't wait to go to Japan.", '일본 빨리 가고 싶어.'],
    ['친구', "I can't wait to see you!", '빨리 보고 싶어!'],
    ['음식', "I can't wait to try it.", '빨리 먹어 보고 싶어.']]],
  ["Would you like ~?", '~ 드릴까요? / ~ 하실래요?', "'Do you want ~?'의 정중한 버전이에요. 대답은 'Yes, please'로 해요.", [
    ['손님 접대', 'Would you like something to drink?', '뭐 좀 마실래요?'],
    ['식당', 'Would you like to see the menu?', '메뉴 보시겠어요?'],
    ['친구', 'Would you like to join us?', '우리랑 같이 할래?']]],
  ["Let me know if ~", '~하면 알려 줘', "대화를 마무리할 때 쓰기 좋은 만능 문장이에요.", [
    ['회사', 'Let me know if you have any questions.', '질문 있으면 알려 주세요.'],
    ['친구', 'Let me know if you need help.', '도움 필요하면 말해.'],
    ['약속', 'Let me know if you change your mind.', '마음 바뀌면 알려 줘.']]],
  ["I was wondering if ~", '혹시 ~해 주실 수 있을까 해서요', '부탁할 때 가장 공손한 틀이에요. 과거형이라 더 부드러워요.', [
    ['회사', 'I was wondering if you could help me.', '혹시 좀 도와주실 수 있을까 해서요.'],
    ['친구', 'I was wondering if you were free tonight.', '혹시 오늘 밤에 시간 되나 해서.'],
    ['가게', 'I was wondering if you had this in blue.', '혹시 이거 파란색 있나 해서요.']]],
  ["It depends on ~", '~에 따라 달라', "애매할 때 'It depends.'만 말해도 대답이 돼요.", [
    ['친구', 'It depends on the weather.', '날씨에 따라 달라.'],
    ['회사', 'It depends on the budget.', '예산에 따라 달라요.'],
    ['가족', 'It depends on how I feel.', '내 기분에 따라 달라.']]],
  ["I feel like ~ing", '~하고 싶은 기분이야', "'I feel like' 뒤에 -ing가 오면 '~하고 싶다'예요.", [
    ['음식', 'I feel like eating chicken.', '치킨 먹고 싶다.'],
    ['집', "I don't feel like going out.", '나가고 싶지 않아.'],
    ['친구', 'I feel like watching a movie.', '영화 보고 싶은 기분이야.']]],
  ["What do you mean by ~?", '~가 무슨 뜻이야?', '못 알아들었을 때 당황하지 말고 이걸로 물어보세요.', [
    ['회사', 'What do you mean by that?', '그게 무슨 뜻이에요?'],
    ['친구', 'What do you mean by later?', '나중에가 언제라는 거야?'],
    ['연인', "What do you mean you're busy?", '바쁘다니 그게 무슨 말이야?']]],
  ["Have you ever ~?", '~해 본 적 있어?', "뒤에 과거분사(p.p.)가 와요. 대화를 시작하기 좋은 질문이에요.", [
    ['여행', 'Have you ever been to Paris?', '파리 가 본 적 있어?'],
    ['음식', 'Have you ever tried Thai food?', '태국 음식 먹어 본 적 있어?'],
    ['취미', 'Have you ever played golf?', '골프 쳐 본 적 있어?']]],
  ["I'm thinking about ~ing", '~할까 생각 중이야', '아직 결정하지 않은 계획을 말할 때 써요.', [
    ['회사', "I'm thinking about changing jobs.", '이직할까 생각 중이야.'],
    ['여행', "I'm thinking about going to Jeju.", '제주도 갈까 생각 중이야.'],
    ['집', "I'm thinking about getting a cat.", '고양이 키울까 생각 중이야.']]],
  ["Why don't we ~?", '우리 ~하는 게 어때?', "'왜 안 해?'가 아니라 제안이에요. 'Let's'보다 부드러워요.", [
    ['친구', "Why don't we grab a coffee?", '우리 커피 한잔하는 거 어때?'],
    ['회사', "Why don't we take a break?", '잠깐 쉬는 게 어때요?'],
    ['가족', "Why don't we eat out tonight?", '오늘 저녁은 외식하는 게 어때?']]],
  ["Why don't you ~?", '~해 보는 게 어때? (권유)', "'we'를 'you'로 바꾸면 상대에게 권하는 말이 돼요.", [
    ['친구', "Why don't you ask her?", '그녀한테 물어보는 게 어때?'],
    ['건강', "Why don't you see a doctor?", '병원 가 보는 게 어때?'],
    ['회사', "Why don't you take the day off?", '하루 쉬는 게 어때?']]],
  ["You should ~", '~하는 게 좋겠어', "'must'보다 약한 조언이에요. 친구에게 가장 흔히 써요.", [
    ['건강', 'You should get some rest.', '좀 쉬는 게 좋겠어.'],
    ['음식', 'You should try this.', '이거 먹어 봐.'],
    ['여행', 'You should bring a jacket.', '재킷 챙기는 게 좋을 거야.']]],
  ["You don't have to ~", '~할 필요 없어', "'must not(하면 안 된다)'과 뜻이 달라요. '안 해도 된다'예요.", [
    ['친구', "You don't have to pay.", '돈 안 내도 돼.'],
    ['회사', "You don't have to come early.", '일찍 올 필요 없어요.'],
    ['손님', "You don't have to take off your shoes.", '신발 안 벗으셔도 돼요.']]],
  ["I'm afraid ~", '유감이지만 ~예요', '나쁜 소식이나 거절을 부드럽게 전할 때 문장 앞에 붙여요.', [
    ['가게', "I'm afraid we're closed.", '죄송하지만 영업이 끝났어요.'],
    ['회사', "I'm afraid I can't make it.", '유감이지만 못 갈 것 같아요.'],
    ['식당', "I'm afraid it's sold out.", '죄송하지만 다 팔렸어요.']]],
  ["It takes ~ to ...", '...하는 데 ~ 걸려', "'It takes + 시간 + to 동사' 순서를 통째로 외우세요.", [
    ['출근', 'It takes an hour to get to work.', '회사까지 가는 데 한 시간 걸려.'],
    ['요리', 'It takes ten minutes to cook.', '요리하는 데 10분 걸려.'],
    ['배송', 'It takes three days to arrive.', '도착하는 데 3일 걸려요.']]],
  ["How long does it take to ~?", '~하는 데 얼마나 걸려?', "바로 위 패턴을 질문으로 바꾼 거예요. 여행에서 꼭 써요.", [
    ['여행', 'How long does it take to get there?', '거기까지 얼마나 걸려요?'],
    ['병원', 'How long does it take to recover?', '회복하는 데 얼마나 걸려요?'],
    ['가게', 'How long does it take to fix it?', '고치는 데 얼마나 걸려요?']]],
  ["I have trouble ~ing", '~하는 게 힘들어', "'trouble' 뒤에 -ing가 와요. 고민을 털어놓을 때 써요.", [
    ['건강', 'I have trouble sleeping.', '잠드는 게 힘들어.'],
    ['영어', 'I have trouble understanding him.', '그 사람 말 알아듣기 힘들어.'],
    ['회사', 'I have trouble focusing today.', '오늘 집중하기 힘들어.']]],
  ["It's time to ~", '~할 시간이야', "'이제 할 때가 됐다'는 재촉하는 느낌도 있어요.", [
    ['집', "It's time to go to bed.", '잘 시간이야.'],
    ['회사', "It's time to start the meeting.", '회의 시작할 시간이에요.'],
    ['친구', "It's time to go home.", '집에 갈 시간이야.']]],
  ["I didn't mean to ~", '~하려던 건 아니었어', '실수로 상처 줬을 때 사과와 함께 써요.', [
    ['친구', "I didn't mean to hurt you.", '상처 주려던 건 아니었어.'],
    ['회사', "I didn't mean to interrupt.", '말을 끊으려던 건 아니었어요.'],
    ['연인', "I didn't mean to be rude.", '무례하게 굴려던 건 아니었어.']]],
  ["Thank you for ~ing", '~해 줘서 고마워', "'for' 뒤에 -ing나 명사가 와요. 이유를 붙이면 인사가 더 진심처럼 들려요.", [
    ['친구', 'Thank you for inviting me.', '초대해 줘서 고마워.'],
    ['회사', 'Thank you for waiting.', '기다려 주셔서 감사합니다.'],
    ['가족', 'Thanks for helping me.', '도와줘서 고마워.']]],
  ["Sorry for ~ing", '~해서 미안해', "'Sorry for' 뒤에 -ing로 무엇이 미안한지 붙여요.", [
    ['약속', 'Sorry for being late.', '늦어서 미안해.'],
    ['회사', 'Sorry for the late reply.', '답장이 늦어서 죄송해요.'],
    ['전화', 'Sorry for calling so late.', '너무 늦게 전화해서 미안해.']]],
  ["I'm sure ~", '분명 ~일 거야', '상대를 안심시킬 때 좋아요.', [
    ['친구', "I'm sure you'll do great.", '너 분명 잘할 거야.'],
    ['가족', "I'm sure he's fine.", '그는 분명 괜찮을 거야.'],
    ['회사', "I'm sure it will work.", '분명 잘 될 거예요.']]],
  ["There's no need to ~", '~할 필요 없어', "'You don't have to'와 비슷하지만 조금 더 단호해요.", [
    ['친구', "There's no need to apologize.", '사과할 필요 없어.'],
    ['회사', "There's no need to hurry.", '서두를 필요 없어요.'],
    ['손님', "There's no need to bring anything.", '아무것도 안 가져와도 돼요.']]],
  ["What if ~?", '만약 ~하면 어떡해?', '걱정이나 가정을 말할 때 문장 앞에 붙이면 돼요.', [
    ['여행', "What if it rains?", '비 오면 어떡해?'],
    ['회사', "What if they say no?", '그쪽에서 거절하면 어떡해요?'],
    ['친구', "What if we get lost?", '길 잃으면 어떡해?']]],
  ["It looks like ~", '~인 것 같아 (보기에)', '눈으로 보고 판단할 때 써요. 뒤에 문장이나 명사가 와요.', [
    ['날씨', 'It looks like it will rain.', '비가 올 것 같아.'],
    ['식당', 'It looks like they are closed.', '문 닫은 것 같아.'],
    ['친구', 'It looks like fun!', '재밌어 보인다!']]],
  ["It sounds like ~", '~인 것 같네 (들어 보니)', "상대 얘기에 반응할 때 최고예요. 'Sounds good!'도 여기서 나왔어요.", [
    ['친구', 'It sounds like a great plan.', '좋은 계획 같네.'],
    ['위로', 'It sounds like you had a rough day.', '힘든 하루였나 보네.'],
    ['회사', 'It sounds like a good idea.', '좋은 생각 같아요.']]],
  ["I'm in the middle of ~", '한창 ~하는 중이야', '바빠서 지금은 곤란할 때 이유로 대기 좋아요.', [
    ['전화', "I'm in the middle of a meeting.", '지금 회의 중이야.'],
    ['집', "I'm in the middle of cooking.", '한창 요리하는 중이야.'],
    ['친구', "I'm in the middle of something.", '지금 뭐 좀 하는 중이야.']]],
  ["Would you mind ~ing?", '~해 주시겠어요?', "'Do you mind if I'는 내가 하는 것, 이건 상대에게 부탁하는 거예요.", [
    ['회사', 'Would you mind closing the door?', '문 좀 닫아 주시겠어요?'],
    ['사진', 'Would you mind taking a picture?', '사진 좀 찍어 주시겠어요?'],
    ['카페', 'Would you mind moving over a bit?', '조금만 옆으로 가 주시겠어요?']]],
  ["Could you please ~?", '~ 좀 해 주실래요?', "'please'를 넣으면 더 공손해져요.", [
    ['회사', 'Could you please send me the file?', '파일 좀 보내 주실래요?'],
    ['택시', 'Could you please stop here?', '여기서 세워 주실래요?'],
    ['전화', 'Could you please speak slowly?', '천천히 말씀해 주실래요?']]],
  ["Is it okay if I ~?", '~해도 괜찮아?', "'Do you mind if I'보다 쉽고 캐주얼해요. 대답도 'Yes'면 허락이에요.", [
    ['친구', 'Is it okay if I bring a friend?', '친구 데려가도 괜찮아?'],
    ['회사', 'Is it okay if I work from home?', '재택근무해도 괜찮을까요?'],
    ['식당', 'Is it okay if we sit outside?', '밖에 앉아도 괜찮아요?']]],
  ["I'm planning to ~", '~할 계획이야', '구체적으로 정한 계획을 말할 때 써요.', [
    ['여행', "I'm planning to visit my parents.", '부모님 댁에 갈 계획이야.'],
    ['공부', "I'm planning to study English.", '영어 공부할 계획이야.'],
    ['주말', "I'm planning to stay home.", '집에 있을 계획이야.']]],
  ["I'm supposed to ~", '~하기로 되어 있어', "약속이나 규칙 때문에 해야 하는 일이에요. '원래 ~해야 하는데'의 느낌도 있어요.", [
    ['약속', "I'm supposed to meet him at 6.", '6시에 그를 만나기로 했어.'],
    ['회사', "I'm supposed to finish this today.", '이거 오늘 끝내야 해.'],
    ['건강', "I'm supposed to be on a diet.", '원래 다이어트 중이어야 하는데.']]],
  ["I'd rather ~", '차라리 ~할래', "'I would rather'의 줄임말이에요. 뒤에 동사원형이 와요.", [
    ['집', "I'd rather stay home.", '차라리 집에 있을래.'],
    ['음식', "I'd rather have tea.", '차라리 차 마실래.'],
    ['친구', "I'd rather not talk about it.", '그 얘긴 안 하는 게 낫겠어.']]],
  ["You'd better ~", '~하는 게 좋을걸 (안 그러면 곤란해)', "'should'보다 강해서 경고하는 느낌이 있어요. 윗사람에게는 쓰지 마세요.", [
    ['친구', "You'd better hurry.", '서두르는 게 좋을걸.'],
    ['날씨', "You'd better take an umbrella.", '우산 챙기는 게 좋을걸.'],
    ['가족', "You'd better not be late.", '늦지 않는 게 좋을 거야.']]],
  ["I can't help ~ing", '~하지 않을 수 없어', "'도울 수 없다'가 아니라 '어쩔 수 없이 ~하게 된다'예요.", [
    ['음식', "I can't help eating snacks.", '간식을 안 먹을 수가 없어.'],
    ['친구', "I couldn't help laughing.", '웃음을 참을 수가 없었어.'],
    ['연인', "I can't help thinking about you.", '자꾸 네 생각이 나.']]],
  ["There's nothing like ~", '~만 한 게 없지', "최고라고 감탄할 때 써요.", [
    ['음식', "There's nothing like home cooking.", '집밥만 한 게 없지.'],
    ['휴식', "There's nothing like a hot shower.", '뜨거운 샤워만 한 게 없어.'],
    ['여행', "There's nothing like the ocean.", '바다만 한 게 없지.']]],
  ["What's the best way to ~?", '~하는 제일 좋은 방법이 뭐야?', '조언을 구할 때 쓰기 좋아요.', [
    ['여행', "What's the best way to get downtown?", '시내 가는 제일 좋은 방법이 뭐예요?'],
    ['공부', "What's the best way to learn English?", '영어 배우는 제일 좋은 방법이 뭐야?'],
    ['건강', "What's the best way to lose weight?", '살 빼는 제일 좋은 방법이 뭐야?']]],
  ["Do you know where ~?", '~가 어디인지 아세요?', "간접 의문문이라 'where is it'이 아니라 'where it is' 순서예요.", [
    ['길에서', 'Do you know where the station is?', '역이 어디 있는지 아세요?'],
    ['집', 'Do you know where my keys are?', '내 열쇠 어디 있는지 알아?'],
    ['회사', 'Do you know where he went?', '그 사람 어디 갔는지 알아요?']]],
  ["I'll let you know ~", '~ 알려 줄게', "'Let me know(알려 줘)'의 짝이에요.", [
    ['회사', "I'll let you know by Friday.", '금요일까지 알려 드릴게요.'],
    ['친구', "I'll let you know when I arrive.", '도착하면 알려 줄게.'],
    ['약속', "I'll let you know if anything changes.", '뭐 바뀌면 알려 줄게.']]],
  ["Make sure you ~", '꼭 ~해', '신신당부할 때 써요.', [
    ['여행', 'Make sure you bring your passport.', '여권 꼭 챙겨.'],
    ['집', 'Make sure you lock the door.', '문 꼭 잠가.'],
    ['회사', 'Make sure you save the file.', '파일 꼭 저장하세요.']]],
  ["Don't forget to ~", '~하는 거 잊지 마', "'to' 뒤는 앞으로 할 일이에요.", [
    ['가족', "Don't forget to call Grandma.", '할머니께 전화하는 거 잊지 마.'],
    ['회사', "Don't forget to sign here.", '여기 서명하는 거 잊지 마세요.'],
    ['친구', "Don't forget to text me.", '문자 보내는 거 잊지 마.']]],
  ["It's worth ~ing", '~할 만한 가치가 있어', "'worth' 뒤에 -ing가 와요.", [
    ['여행', "It's worth visiting.", '가 볼 만해.'],
    ['영화', "It's worth watching.", '볼 만해.'],
    ['쇼핑', "It's not worth the money.", '그 돈 낼 가치 없어.']]],
  ["I'm getting ~", '점점 ~해지고 있어', "'get + 형용사'는 상태가 변하는 걸 말해요.", [
    ['식당', "I'm getting hungry.", '배가 점점 고파져.'],
    ['건강', "I'm getting better.", '점점 나아지고 있어.'],
    ['회사', "I'm getting tired of this.", '이거 점점 지겨워져.']]],
  ["As soon as ~", '~하자마자', "뒤는 미래 일이어도 현재형으로 써요.", [
    ['전화', "I'll call you as soon as I get home.", '집에 도착하자마자 전화할게.'],
    ['회사', "I'll start as soon as possible.", '가능한 한 빨리 시작할게요.'],
    ['친구', "Text me as soon as you land.", '착륙하자마자 문자해.']]],
  ["By the time ~", '~할 때쯤에는', '시간이 늦었거나 어긋난 상황을 말할 때 자주 써요.', [
    ['약속', 'By the time I got there, he left.', '내가 도착했을 때쯤 그는 떠났어.'],
    ['집', "I'll be done by the time you come.", '네가 올 때쯤엔 끝나 있을 거야.'],
    ['쇼핑', 'By the time we arrived, it was closed.', '우리가 도착했을 땐 문을 닫았더라.']]],
  ["The thing is, ~", '문제는 말이야, ~', "본론이나 문제점을 꺼낼 때 앞에 붙이는 말버릇이에요.", [
    ['친구', "The thing is, I'm broke.", '문제는, 나 돈이 없어.'],
    ['회사', "The thing is, we don't have time.", '문제는 시간이 없다는 거예요.'],
    ['연인', "The thing is, I'm not ready.", '사실은 나 아직 준비가 안 됐어.']]],
  ["That's why ~", '그래서 ~한 거야', "앞에서 말한 이유를 받아서 결과를 말해요.", [
    ['친구', "That's why I called you.", '그래서 너한테 전화한 거야.'],
    ['건강', "That's why I'm so tired.", '그래서 이렇게 피곤한 거야.'],
    ['회사', "That's why we need more time.", '그래서 시간이 더 필요한 거예요.']]],
  ["No wonder ~", '어쩐지 ~하더라', '이유를 알고 나서 납득할 때 써요.', [
    ['친구', "No wonder you're tired.", '어쩐지 피곤해 보이더라.'],
    ['식당', 'No wonder it was so good.', '어쩐지 맛있더라.'],
    ['날씨', "No wonder it's so cold.", '어쩐지 춥더라.']]],
  ["I can't believe ~", '~라니 믿을 수가 없어', '놀라거나 어이없을 때 둘 다 써요.', [
    ['친구', "I can't believe you're here!", '네가 여기 있다니 믿기지 않아!'],
    ['쇼핑', "I can't believe it's so cheap.", '이렇게 싸다니 말도 안 돼.'],
    ['회사', "I can't believe it's Friday already.", '벌써 금요일이라니.']]],
  ["It's up to you", '너한테 달렸어, 네가 정해', "메뉴를 못 고를 때 상대에게 넘기는 만능 문장이에요. 뒤에 무엇을 정할지 붙일 수 있어요.", [
    ['음식', "It's up to you. I'm fine with anything.", '네가 정해. 난 아무거나 괜찮아.'],
    ['회사', "It's up to you to decide.", '결정은 당신 몫이에요.'],
    ['친구', "It's totally up to you.", '완전히 네 마음이야.']]],
  ["I'm into ~", '~에 빠져 있어, ~ 좋아해', "요즘 관심사를 말하는 캐주얼한 표현이에요.", [
    ['취미', "I'm into yoga these days.", '요즘 요가에 빠져 있어.'],
    ['음악', "I'm really into K-pop.", '나 케이팝 진짜 좋아해.'],
    ['연인', "I think he's into you.", '걔 너 좋아하는 것 같아.']]],
  ["I'm not a big fan of ~", '~ 별로 안 좋아해', "'I hate'보다 훨씬 부드럽게 싫다고 말하는 방법이에요.", [
    ['음식', "I'm not a big fan of spicy food.", '매운 음식 별로 안 좋아해.'],
    ['날씨', "I'm not a big fan of winter.", '겨울은 별로야.'],
    ['취미', "I'm not a big fan of horror movies.", '공포 영화 별로 안 좋아해.']]],
  ["I've been ~ing", '(지금까지 계속) ~하고 있었어', '과거부터 지금까지 이어진 일이에요. 시간 표현과 같이 써요.', [
    ['약속', "I've been waiting for an hour.", '한 시간째 기다리고 있어.'],
    ['공부', "I've been studying English for a year.", '1년째 영어 공부하고 있어.'],
    ['친구', "I've been meaning to call you.", '안 그래도 전화하려고 했어.']]],
  ["How was ~?", '~는 어땠어?', "지나간 일을 물을 때 과거형 'was'를 써요.", [
    ['친구', 'How was your weekend?', '주말 어땠어?'],
    ['여행', 'How was your trip?', '여행 어땠어?'],
    ['회사', 'How was the interview?', '면접 어땠어요?']]],
  ["What's it like ~?", '~는 어때? (경험이나 느낌이)', "'like'는 '좋아하다'가 아니라 '~ 같은'이에요.", [
    ['회사', "What's it like working there?", '거기서 일하는 거 어때?'],
    ['여행', "What's it like living in Seoul?", '서울 사는 거 어때?'],
    ['가족', "What's it like being a dad?", '아빠가 되니까 어때?']]],
  ["Are you ready to ~?", '~할 준비 됐어?', "식당 점원이 'Are you ready to order?'라고 자주 물어요.", [
    ['식당', 'Are you ready to order?', '주문하시겠어요?'],
    ['친구', 'Are you ready to go?', '갈 준비 됐어?'],
    ['회사', 'Are you ready to start?', '시작할 준비 됐어요?']]],
  ["Can you tell me how to ~?", '~하는 법 알려 줄래?', '방법을 물을 때 쓰는 공손한 질문이에요.', [
    ['길에서', 'Can you tell me how to get there?', '거기 가는 법 알려 주실래요?'],
    ['회사', 'Can you tell me how to use this?', '이거 쓰는 법 알려 줄래요?'],
    ['요리', 'Can you tell me how to make this?', '이거 만드는 법 알려 줄래?']]],
  ["Is it possible to ~?", '~하는 게 가능할까요?', "'Can I ~?'보다 격식 있게 요청할 때 써요.", [
    ['호텔', 'Is it possible to check out late?', '늦게 체크아웃하는 게 가능할까요?'],
    ['식당', 'Is it possible to change my order?', '주문을 바꿀 수 있을까요?'],
    ['회사', 'Is it possible to meet tomorrow?', '내일 만나는 게 가능할까요?']]],
  ["I'm calling to ~", '~하려고 전화드렸어요', '전화 첫마디로 용건을 밝힐 때 써요.', [
    ['식당', "I'm calling to make a reservation.", '예약하려고 전화드렸어요.'],
    ['병원', "I'm calling to cancel my appointment.", '예약 취소하려고 전화드렸어요.'],
    ['가게', "I'm calling to ask about my order.", '제 주문 문의하려고 전화드렸어요.']]],
  ["I'm here to ~", '~하러 왔어요', "안내 데스크에서 방문 목적을 말할 때 써요.", [
    ['회사', "I'm here to see Mr. Park.", '박 선생님 뵈러 왔어요.'],
    ['병원', "I'm here for my appointment.", '예약하고 왔어요.'],
    ['가게', "I'm here to pick up my order.", '주문한 거 찾으러 왔어요.']]],
  ["Could I have ~?", '~ 받을 수 있을까요?', "'Can I get'보다 조금 더 공손해요.", [
    ['식당', 'Could I have some water?', '물 좀 주시겠어요?'],
    ['호텔', 'Could I have another towel?', '수건 하나 더 주시겠어요?'],
    ['가게', 'Could I have a bag, please?', '봉투 하나 주시겠어요?']]],
  ["I'll have ~", '~로 할게요 (주문)', "주문을 결정했을 때 가장 자연스러운 한마디예요.", [
    ['식당', "I'll have the steak, please.", '스테이크로 할게요.'],
    ['카페', "I'll have the same.", '저도 같은 걸로 할게요.'],
    ['술집', "I'll have a beer.", '맥주로 할게요.']]],
  ["Does this come with ~?", '이거 ~도 같이 나와요?', '세트 구성이나 포함 여부를 물을 때 써요.', [
    ['식당', 'Does this come with a salad?', '이거 샐러드도 같이 나와요?'],
    ['가게', 'Does this come with a charger?', '이거 충전기도 같이 들어 있어요?'],
    ['호텔', 'Does the room come with breakfast?', '방에 조식 포함이에요?']]],
  ["Do you have this in ~?", '이거 ~로도 있어요?', "색깔이나 사이즈를 물어볼 때 'in'을 써요.", [
    ['옷가게', 'Do you have this in a smaller size?', '이거 더 작은 사이즈 있어요?'],
    ['신발가게', 'Do you have this in black?', '이거 검은색 있어요?'],
    ['가게', 'Do you have this in stock?', '이거 재고 있어요?']]],
  ["I'm just ~ing", '그냥 ~하는 중이에요', "점원이 도와줄지 물을 때 'I'm just looking'으로 거절해요.", [
    ['가게', "I'm just looking, thanks.", '그냥 둘러보는 중이에요, 고마워요.'],
    ['친구', "I'm just kidding.", '그냥 농담이야.'],
    ['전화', "I'm just checking in.", '그냥 잘 지내나 해서 연락했어.']]],
  ["What time does ~?", '~는 몇 시에 해?', "영업시간이나 출발 시간을 물을 때 써요.", [
    ['가게', 'What time does the store close?', '가게 몇 시에 닫아요?'],
    ['여행', 'What time does the train leave?', '기차 몇 시에 출발해요?'],
    ['회사', 'What time does the meeting start?', '회의 몇 시에 시작해요?']]],
  ["Where can I ~?", '어디서 ~할 수 있어요?', '여행 가서 가장 많이 쓰는 질문이에요.', [
    ['여행', 'Where can I buy a ticket?', '표는 어디서 살 수 있어요?'],
    ['공항', 'Where can I find a taxi?', '택시는 어디서 탈 수 있어요?'],
    ['쇼핑', 'Where can I try this on?', '이거 어디서 입어 볼 수 있어요?']]],
  ["How often do you ~?", '얼마나 자주 ~해?', "대답은 'once a week(일주일에 한 번)'처럼 해요.", [
    ['운동', 'How often do you work out?', '운동 얼마나 자주 해?'],
    ['가족', 'How often do you call your mom?', '엄마한테 얼마나 자주 전화해?'],
    ['취미', 'How often do you go hiking?', '등산 얼마나 자주 가?']]],
  ["What kind of ~?", '어떤 종류의 ~?', "대화를 넓히는 질문이에요. 취향을 물을 때 좋아요.", [
    ['음악', 'What kind of music do you like?', '어떤 음악 좋아해?'],
    ['회사', 'What kind of work do you do?', '어떤 일 하세요?'],
    ['음식', 'What kind of food do you want?', '어떤 음식 먹고 싶어?']]],
  ["I'm so ~ that ...", '너무 ~해서 ...해', "'so + 형용사 + that'으로 원인과 결과를 한 번에 말해요.", [
    ['건강', "I'm so tired that I can't think.", '너무 피곤해서 생각이 안 돼.'],
    ['음식', "It was so good that I ate two.", '너무 맛있어서 두 개 먹었어.'],
    ['날씨', "It's so hot that I can't sleep.", '너무 더워서 잠을 못 자겠어.']]],
  ["It's too ~ to ...", '너무 ~해서 ...할 수 없어', "'too ~ to'는 '못 한다'는 부정의 뜻이 들어 있어요.", [
    ['날씨', "It's too cold to go out.", '너무 추워서 못 나가겠어.'],
    ['쇼핑', "It's too expensive to buy.", '너무 비싸서 못 사.'],
    ['시간', "It's too late to call.", '전화하기엔 너무 늦었어.']]],
  ["~ enough to ...", '...할 만큼 충분히 ~해', "'enough'는 형용사 뒤에 와요.", [
    ['음식', "It's big enough for two.", '두 명이 먹기에 충분해.'],
    ['회사', "I'm old enough to decide.", '나도 결정할 만한 나이야.'],
    ['돈', "I don't have enough money.", '돈이 충분하지 않아.']]],
  ["I wish I could ~", '~할 수 있으면 좋을 텐데', '아쉬움을 담아 부드럽게 거절할 때도 써요.', [
    ['친구', 'I wish I could go with you.', '같이 갈 수 있으면 좋을 텐데.'],
    ['여행', 'I wish I could stay longer.', '더 오래 있을 수 있으면 좋을 텐데.'],
    ['회사', 'I wish I could help more.', '더 도와드릴 수 있으면 좋을 텐데요.']]],
  ["If I were you, I'd ~", '내가 너라면 ~할 거야', "조언할 때 써요. 'was'가 아니라 'were'예요.", [
    ['친구', "If I were you, I'd say sorry.", '내가 너라면 사과할 거야.'],
    ['회사', "If I were you, I'd take the job.", '내가 너라면 그 일 할 거야.'],
    ['쇼핑', "If I were you, I'd wait for a sale.", '내가 너라면 세일할 때까지 기다릴 거야.']]],
  ["I should have ~", '~했어야 했는데', "후회할 때 써요. 뒤에 과거분사(p.p.)가 와요.", [
    ['여행', 'I should have brought a jacket.', '재킷 가져왔어야 했는데.'],
    ['회사', 'I should have told you earlier.', '더 일찍 말했어야 했는데.'],
    ['쇼핑', 'I should have bought it.', '그거 샀어야 했는데.']]],
  ["You must be ~", '너 ~하겠다 (분명)', "상대 상황을 짐작해서 공감할 때 써요.", [
    ['친구', 'You must be tired.', '너 피곤하겠다.'],
    ['회사', 'You must be the new manager.', '새로 오신 매니저님이시군요.'],
    ['가족', 'You must be so proud.', '정말 뿌듯하겠다.']]],
  ["I guess ~", '~인 것 같아, ~겠지 뭐', "확신이 없거나 체념할 때 가볍게 붙이는 말이에요.", [
    ['친구', "I guess you're right.", '네 말이 맞는 것 같네.'],
    ['약속', "I guess I'll go alone.", '그냥 혼자 가야겠네.'],
    ['회사', 'I guess we can try.', '해 볼 수는 있겠죠.']]],
  ["I was going to ~, but ...", '~하려고 했는데, ...', '계획이 틀어졌을 때 이유를 말하는 틀이에요.', [
    ['친구', 'I was going to call, but I forgot.', '전화하려고 했는데 까먹었어.'],
    ['운동', 'I was going to run, but it rained.', '달리려고 했는데 비가 왔어.'],
    ['쇼핑', 'I was going to buy it, but it sold out.', '사려고 했는데 다 팔렸어.']]],
  ["It turns out ~", '알고 보니 ~더라고', '예상과 다른 결과를 알게 됐을 때 써요.', [
    ['친구', 'It turns out he was right.', '알고 보니 그가 맞았더라고.'],
    ['쇼핑', 'It turns out it was free.', '알고 보니 공짜였어.'],
    ['회사', 'It turns out we have the same boss.', '알고 보니 우리 상사가 같더라고.']]],
  ["Not only ~ but also ...", '~뿐만 아니라 ...도', '칭찬할 때 둘을 한꺼번에 말할 수 있어요.', [
    ['음식', "It's not only cheap but also tasty.", '싸기만 한 게 아니라 맛도 있어.'],
    ['친구', "She's not only smart but also kind.", '그녀는 똑똑할 뿐 아니라 착하기도 해.'],
    ['여행', "It's not only fun but also relaxing.", '재밌을 뿐 아니라 힐링도 돼.']]],
  ["The more ~, the more ...", '~할수록 더 ...해', "'the + 비교급'을 두 번 쓰는 틀이에요.", [
    ['공부', 'The more you practice, the better you get.', '연습할수록 더 잘하게 돼.'],
    ['음식', 'The more I eat, the hungrier I get.', '먹을수록 더 배고파.'],
    ['쇼핑', 'The sooner, the better.', '빠를수록 좋아.']]],
  ["I'm on my way to ~", '~로 가는 중이야', "'on my way'만 말해도 '가는 중'이라는 답이 돼요.", [
    ['회사', "I'm on my way to work.", '출근하는 중이야.'],
    ['약속', "I'm on my way to the restaurant.", '식당 가는 중이야.'],
    ['가족', "I'm on my way home.", '집에 가는 중이야.']]],
  ["Hang on, let me ~", '잠깐만, ~해 볼게', '대화 중에 잠깐 시간을 벌 때 써요.', [
    ['회사', 'Hang on, let me check.', '잠깐만요, 확인해 볼게요.'],
    ['전화', 'Hang on, let me get a pen.', '잠깐만, 펜 좀 가져올게.'],
    ['친구', 'Hang on, let me think.', '잠깐만, 생각 좀 해 볼게.']]],
  ["Let me ~", '내가 ~할게, ~하게 해 줘', "제안하거나 먼저 나설 때 써요. 'Let's'와 헷갈리지 마세요.", [
    ['식당', 'Let me pay for this.', '이건 내가 낼게.'],
    ['회사', 'Let me explain.', '제가 설명드릴게요.'],
    ['친구', 'Let me help you with that.', '그거 내가 도와줄게.']]],
  ["I have no idea ~", '~인지 전혀 모르겠어', "'I don't know'보다 강한 '전혀 모름'이에요.", [
    ['길에서', 'I have no idea where we are.', '여기가 어딘지 전혀 모르겠어.'],
    ['회사', 'I have no idea what he means.', '그가 무슨 말 하는지 전혀 모르겠어.'],
    ['친구', 'I have no idea what to buy.', '뭘 사야 할지 전혀 모르겠어.']]],
  ["Do you want me to ~?", '내가 ~해 줄까?', "도움을 제안하는 가장 흔한 틀이에요.", [
    ['친구', 'Do you want me to pick you up?', '내가 데리러 갈까?'],
    ['회사', 'Do you want me to send it again?', '다시 보내 드릴까요?'],
    ['가족', 'Do you want me to cook tonight?', '오늘 저녁 내가 할까?']]],
  ["What are you ~ing?", '뭐 ~하고 있어?', "지금 하는 일을 묻는 기본 틀이에요.", [
    ['친구', 'What are you doing this weekend?', '이번 주말에 뭐 해?'],
    ['쇼핑', 'What are you looking for?', '뭐 찾고 계세요?'],
    ['집', 'What are you cooking?', '뭐 요리하고 있어?']]],
  ["I'm glad ~", '~해서 다행이야, 기뻐', '안도하거나 반가운 마음을 표현해요.', [
    ['친구', "I'm glad you came.", '와 줘서 기뻐.'],
    ['건강', "I'm glad you're okay.", '네가 괜찮아서 다행이다.'],
    ['회사', "I'm glad to hear that.", '그 말 들으니 기쁘네요.']]],
  ["I'm worried about ~", '~가 걱정돼', "'about' 뒤에 걱정하는 대상이 와요.", [
    ['회사', "I'm worried about the deadline.", '마감이 걱정돼.'],
    ['가족', "I'm worried about my dad.", '아빠가 걱정돼.'],
    ['돈', "I'm worried about money.", '돈이 걱정이야.']]],
  ["Just in case ~", '혹시 모르니까 ~', "대비할 때 문장 끝에 'just in case'만 붙여도 돼요.", [
    ['여행', 'Take an umbrella, just in case.', '혹시 모르니 우산 챙겨.'],
    ['회사', "I'll save a copy just in case.", '혹시 모르니 사본 저장해 둘게요.'],
    ['친구', 'Here is my number, just in case.', '혹시 모르니 내 번호 줄게.']]],
];

export const PATTERNS = rows.map(([pattern, meaning, tip, examples], i) => ({
  id: `p${i}`,
  pattern,
  meaning,
  tip,
  examples: examples.map(([situation, en, ko], k) => ({ id: `p${i}-${k}`, situation, en, ko })),
}));
