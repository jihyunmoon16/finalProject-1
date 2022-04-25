# :email: **초**보개발자에게 **대**답하다, 초대   

배포 : [https://www.chodae.shop](https://www.chodae.shop)

	개발자 커뮤니티 프로젝트
	2022.02.16 ~ 2022.03.28


	체험 아이디 / 비밀번호  
	ID: test  
	PW: Test1234^^

## 목차
- [기획 의도](https://github.com/creatingeveryday/finalProject#기획-의도)
- [개발 환경](https://github.com/creatingeveryday/finalProject#개발-환경)
- [요구사항](https://github.com/creatingeveryday/finalProject#요구사항)
- [시스템 아키텍처](https://github.com/creatingeveryday/finalProject#시스템-아키텍처)
- [DB 설계](https://github.com/creatingeveryday/finalProject#DB-설계)
- [주요 기능](https://github.com/creatingeveryday/finalProject#주요-기능)
	- [JWT 활용](https://github.com/creatingeveryday/finalProject#jwt-활용)
	- [Social Login (Naver Kakao)](https://github.com/creatingeveryday/finalProject#social-login)
	- [내가 쓴 글과 댓글 확인](https://github.com/creatingeveryday/finalProject#내가-쓴-글과-댓글-확인)
	- [좋아요 기능](https://github.com/creatingeveryday/finalProject#좋아요-기능)
	- [이미지 첨부](https://github.com/creatingeveryday/finalProject#이미지-첨부)
	- [게시글 댓글 추천 CRUD](https://github.com/creatingeveryday/finalProject#게시글-댓글-추천-CRUD)

## 기획 의도
초보 개발자들을  위한  스터디,  취업 후기 정보가  더 많으면  좋겠다고 생각하여 개발자를 위한 커뮤니티를  기획하게  되었습니다.

## 개발 환경
Naver Cloud micro   
Ubuntu 18.04    
Nginx 1.14.0
   
React 17.0.2       
Zustand 3.7.1   
   
Java 1.8   
SpringBoot 2.6.3         

MySQL 8.0

STS 3.9.11 
Visual Studio Code 

## 요구사항 
	이미지 클릭시 확대

![needs](./docs/needs.png)

## 시스템 아키텍처
	이미지 클릭시 확대
![system](./docs/system.png)

## DB 설계
	이미지 클릭시 확대 
![db](./docs/db.png)
  
## 주요 기능

### JWT 활용

	권한이 필요한 요청 및 로그인 시 인증과 인가 과정에서 JSON Web Token과 Spring Security를 활용해 관리
	
<details>
<summary> 추가 설명 펼치기</summary>
<div markdown="1">       

	로그인 시 AccessToken(유효 기간: 1시간), RefreshToken(유효 기간: 7일)을 유저에게 발급하고 
	발급한 Refresh토큰을 DB의 회원 정보에 저장합니다.
	유저는 요청시 헤더에 로그인시 발급받은 AccessToken을 첨부하여 요청합니다.
	서버에서는 받은 토큰을 이용해 인증 및 인가 과정을 거쳐 요청을 처리합니다.	

:link:[HeaderCheckFilter.java](https://github.com/creatingeveryday/finalProject/blob/main/springboot/chodae/src/main/java/com/chodae/security/filter/HeaderCheckFilter.java)
:link:[LoginFilter.java](https://github.com/creatingeveryday/finalProject/blob/main/springboot/chodae/src/main/java/com/chodae/security/filter/LoginFilter.java)

:pushpin:유저가 로그인 후 1시간 경과되어 AccessToken이 만료된 경우
:link:[axios.js](https://github.com/creatingeveryday/finalProject/blob/128c325bc7507690fe904c435fcfd47c9c32aad1/react/src/plugins/axios.js#L8-L82)
:link:[store.js](https://github.com/creatingeveryday/finalProject/blob/128c325bc7507690fe904c435fcfd47c9c32aad1/react/src/plugins/store.js#L7-L100)
	
	요청 시 Axios의 인터셉터를 활용하여 프론트단에서 AccessToken 만료 체크 후 만료되었다면 
	DB에 저장된 RefreshToken과 유저가 저장하고 있는 토큰을 비교하고 일치하면 
	새로운 AccessToken을 유저에게 재발급하여 재요청하는 방식으로 구현하였습니다. 


:pushpin:자동 로그인 기능
:link:[Header.js](https://github.com/creatingeveryday/finalProject/blob/128c325bc7507690fe904c435fcfd47c9c32aad1/react/src/component/Header.js#L18-L28)
:link:[FindController.java](https://github.com/creatingeveryday/finalProject/blob/128c325bc7507690fe904c435fcfd47c9c32aad1/springboot/chodae/src/main/java/com/chodae/controller/FindController.java#L33-L49)
	
	홈 화면 접속 시 또는 브라우저 창을 닫았다가 다시 열게되면
	유저가 보유하고 있는 RefreshToken과 마지막 로그인 시 발급하여 DB에 저장된 RefreshToken을 비교하여 유효하면 
	새로운 AccessToken을 발급하고 자동 로그인을 하는 방식으로 구현하였습니다.    

![request_flow](./docs/request_flow.png)

</div>
</details>

--- 

### Social Login

간편 가입 및 로그인 통해 닉네임 정보를 받아오게 구현하였습니다. (Naver, Kakao)
	
<details>
<summary> 추가 설명 펼치기</summary>
<div markdown="1">       
	
	로그인 서비스 제공자(Kakao, Naver)에서 제공하는 API를 이용하여 인증에 성공하면 
	JWT토큰을 유저에게 발급해주고 기존 회원과 동일하게 RefreshToken을 DB에 저장합니다.

:pushpin:유저의 소셜닉네임이 중복되는 경우
:link:[OAuthUserDetailsService.java](https://github.com/creatingeveryday/finalProject/blob/128c325bc7507690fe904c435fcfd47c9c32aad1/springboot/chodae/src/main/java/com/chodae/security/oauth/OAuthUserDetailsService.java#L107-L179)
	
	임의의 숫자를 덧붙여서 가입하게 하고 변경은 마이페이지에서 원하는 닉네임으로 바꿀 수 있게 구현하였습니다.  

</div>
</details>
	


--- 
### 내가 쓴 글과 댓글 확인
	
	로그인 후 마이페이지에서 내가 쓴 글과 댓글을 편하게 모아서 확인할 수 있습니다. 
	
--- 
### 좋아요 기능

	로그인 한 유저는 게시글이나 댓글을 추천할 수 있습니다.


--- 
### 이미지 첨부
	
	게시글 등록시 이미지 첨부 가능하고, 스터디 모집 게시판에서는 첨부한 이미지를 게시글 목록에 같이 표시합니다. 
	

--- 
### 게시글 댓글 추천 CRUD

	게시글과 댓글을 작성하고 추천할 수 있습니다. 
	
:link:[BoardController.java](https://github.com/creatingeveryday/finalProject/blob/main/springboot/chodae/src/main/java/com/chodae/controller/BoardController.java)
:link:[BoardServiceImpl.java](https://github.com/creatingeveryday/finalProject/blob/main/springboot/chodae/src/main/java/com/chodae/service/BoardServiceImpl.java)
:link:[PostRepo.java](https://github.com/creatingeveryday/finalProject/blob/main/springboot/chodae/src/main/java/com/chodae/repository/PostRepo.java)
:link:[Post.java](https://github.com/creatingeveryday/finalProject/blob/main/springboot/chodae/src/main/java/com/chodae/domain/Post.java)
	

--- 
