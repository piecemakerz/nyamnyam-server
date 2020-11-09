# nyamnyam-server

![](https://user-images.githubusercontent.com/22445243/97938666-4d71d280-1dc5-11eb-8c14-b37efe3ae89c.png)

CodeStates Immersive 22기 7조 growing 팀의 Final-Project 입니다.  
Front - end : 이혁원, 임원동 Back - end : 이한슬(팀장), 권수진      
(client 측 레포는 https://github.com/codestates/nyamnyam-client 여기입니다)

# Description

디저트 카페, 빵집 사장님 혹은 직원으로서 재고관리를 효율적으로 하고 싶다는 생각이 드신 적 있으신가요?  
nyamnyam은 그런 고민을 덜어들이기 위해 날씨에 따라 디저트 판매량을 예측하고 알려줍니다.  
필요한 것은 꾸준한 매일의 판매수량을 업데이트 하는 것 뿐입니다. 간편한 어플로 효율적인 재고관리를 해보세요  
(추후 웹 개발을 통해 엑셀 등을 통한 대량 업로드도 계획중 입니다.)

# Getting Start

1. `npm install` 혹은 `yarn start`를 통해 모듈을 설치해주세요.
2. 환경 변수 파일 생성 → package.json 파일이 있는 가장 상위 폴더에 .env 파일을 만든 뒤 아래의 내용을 참고하여 내용을 작성해주세요.

## .env 설정

#### 서버 설정

```
NODE_ENV=development
PASSWORD=1111
DEV_DATABASE_PASSWORD=
USER_HOOK_SECRET=
ACCESS_SECRET=
REFRESH_SECRET=
```

- config 파일의 development.username이 root로 지정되어 있기 때문에 로컬에서 사용하는 mysql의 사용자 명이 다른 이름이라면 config 파일에서 development.username을 알맞게 변경해주세요.
- development.password는 아래의 환경 변수로 작성하게 되어있습니다. mysql 비밀번호를 DEV_DATABASE_PASSWORD 항목으로 입력해주세요.
- TEMP 는 seeder로 들어가게 되는 임시 회원 정보의 비밀번호입니다(해싱 결과값이 들어가는 자리이므로 후에 1111로 로그인이 되지는 않습니다).

#### 소셜 로그인 설정

```
KAKAO_CLIENT_ID=1b9dd24d17b3c873327be768b8e149f6
KAKAO_CLIENT_SECRET=XQiOfi18lYSIaCxWjfq9JZGiRfhj6M4Q
KAKAO_REDIRECT_URI=http://localhost:4000/social/kakao
```

#### openWeather API KEY 연결

```
WEATHER_KEY=
```

openWeather 홈페이지에서(https://openweathermap.org/) 회원가입 후, 왼쪽 상단의 내 계정(유저 이름)→My API Key 에서 API KEY를 복사하여 넣습니다.

#### multer-S3 연결 설정

```
KEYID=
KEY=
REGION=
```

1. AWS 홈페이지에서(https://aws.amazon.com) 로그인 합니다.
2. S3 항목에서 `nyam-nyam`이라는 이름으로 버켓을 생성합니다.
3. 버켓은 퍼블릭으로 권한설정을 합니다. 기능은 `GetObject`, `PutObject`로 설정합니다
4. 내 계정 → 내 보안 자격 증명 → (왼쪽 메뉴의) 사용자 → 사용자 추가 를 선택하여 S3 모든 정책에 접근할 수 있는 사용자를 생성합니다.
5. 생성시 발급되는 KEYID와 KEY를 확인하여 넣습니다. REGION은 버켓이 연결된 지역에 따라 적습니다. 서울의 경우 `ap-northeast-2`입니다.  
   위 내용은 https://tntdrive.com/where-do-i-get-my-access-keys.aspx 를 참고하였습니다.

## Database 설정

nyamnyam-server의 dev 브랜치 에서 아래의 명령어를 하나씩 넣어줍니다.

```
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

이 과정에서 오류가 발생하지 않는지 확인해주세요.  
생성이 완료된 후 mysql에 들어가면 config의 설정에 따라 dev_log_development database가 생성된 걸 확인할 수 있습니다.

만일 회원 또는 포스트 삭제 등을 테스트하는 과정에서 임시 데이터만 들어간 상태로 db를 되돌리고 싶을 경우 nyamnyam-server의 dev 브랜치 에서 아래의 순서대로 명령어를 입력해주세요.

```
npx sequelize db:drop
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

이제 로컬 환경에서 서버 및 데이터베이스를 사용할 수 있습니다.

# Feature

## Basic

1. 로그인, 회원가입, 매장등록 및 삭제
2. 3일 간(오늘, 내일, 모레)의 날씨에 따른 디저트 판매량 예측
3. 메뉴 관리
   - 가게 메뉴 추가 및 수정, 상세페이지 설정
   - 메뉴 이름, 가격, 추가 설명 수정 및 추가
   - 메뉴 이미지 업로드하기
4. 내 정보 수정 ( 닉네임 및 아바타 이미지 변경, 비밀번호 변경, 회원 탈퇴)
5. 매일의 상품 판매량 업로드

## Advance

1. 소셜 로그인
2. 트랜드 메뉴
   - 전체 메뉴
     - 한국에 모든 가게의 메뉴들을 판매량 순으로 볼 수 있는 탭
     - '디저트 종류' 및 '주재료' 별로 필터링 기능
   - 시그니처 메뉴
     - 한국 내 모든 가게의 시그니처 메뉴들을 볼 수 있는 탭
     - '디저트 종류' 및 '주재료' 별로 필터링 기능
     - 각 메뉴의 가격, 판매 가계, 주재료 확인
3. 상품명, 가게 이름을 기준으로 검색

## Nightmare : 웹

- 엑셀 시트의 가이드라인을 제공하여, 사용자가 업로드 한 엑셀을 즉시 후처리하여 DB에 저장할 수 있도록 하는 기능
- 엑셀 시트 데이터를 후처리하여 데이터베이스에 저장할 수 있는 기능

# Stack

- 서버 구축 : Express, JWT
- 데이터베이스 구축 : MySQL, Sequelize-cli, crypto, multer, multer-S3
- AWS : EC2, RDS, S3
- Form : eslint, Prettier

# Runtime

- Node.js : 12.18.4
- NPM : 6.14.6

