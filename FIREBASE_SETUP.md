# Firebase 설정 가이드

게시판이 온라인 서버에 데이터를 저장하려면 Firebase 프로젝트를 설정해야 합니다.

## 1. Firebase 프로젝트 생성

1. [Firebase 콘솔](https://console.firebase.google.com)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: "my-board-project")
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

## 2. Firestore 데이터베이스 설정

1. Firebase 콘솔에서 생성한 프로젝트 선택
2. 왼쪽 메뉴에서 "Firestore Database" 클릭
3. "데이터베이스 만들기" 클릭
4. **테스트 모드로 시작** 선택 (개발 단계)
5. 위치 선택 (asia-northeast3 - 서울 권장)
6. "사용 설정" 클릭

## 3. Firestore 보안 규칙 설정

Firestore Database > 규칙 탭에서 다음 규칙을 설정하세요:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      // 모든 사용자가 읽기 가능
      allow read: if true;
      // 모든 사용자가 쓰기 가능 (개발용)
      allow create: if true;
      // 모든 사용자가 삭제 가능 (개발용)
      allow delete: if true;
    }
  }
}
```

**주의**: 위 규칙은 모든 사용자가 글을 작성하고 삭제할 수 있습니다. 
프로덕션 환경에서는 인증을 추가하거나 더 엄격한 규칙을 설정하세요.

## 4. 웹 앱 등록 및 설정 정보 가져오기

1. Firebase 콘솔에서 프로젝트 설정(톱니바퀴 아이콘) 클릭
2. "내 앱" 섹션에서 웹 아이콘(</>) 클릭
3. 앱 닉네임 입력 (예: "Board App")
4. "앱 등록" 클릭
5. **firebaseConfig** 객체가 표시됩니다. 이 정보를 복사하세요.

## 5. Board.html에 설정 적용

`Board.html` 파일을 열고 다음 부분을 찾아주세요:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

Firebase 콘솔에서 복사한 실제 값으로 교체하세요:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",  // 실제 API 키
    authDomain: "your-project.firebaseapp.com",  // 실제 도메인
    projectId: "your-project-id",  // 실제 프로젝트 ID
    storageBucket: "your-project.appspot.com",  // 실제 스토리지 버킷
    messagingSenderId: "123456789",  // 실제 메시징 발신자 ID
    appId: "1:123456789:web:abcdef"  // 실제 앱 ID
};
```

## 6. 테스트

1. `Board.html` 파일을 브라우저에서 열기
2. 글 작성 테스트
3. Firebase 콘솔 > Firestore Database에서 데이터 확인

## 문제 해결

### "Firebase 설정이 필요합니다" 메시지가 표시되는 경우
- `Board.html`의 `firebaseConfig`가 올바르게 설정되었는지 확인
- 브라우저 콘솔(F12)에서 오류 메시지 확인

### "권한 거부됨" 오류가 발생하는 경우
- Firestore 보안 규칙이 올바르게 설정되었는지 확인
- 규칙이 저장되고 게시되었는지 확인

### 게시글이 표시되지 않는 경우
- Firestore Database에 데이터가 있는지 확인
- 브라우저 콘솔에서 오류 메시지 확인
- 네트워크 연결 확인

## 보안 고려사항

현재 설정은 개발/테스트용입니다. 프로덕션 환경에서는:

1. **인증 추가**: Firebase Authentication을 사용하여 로그인한 사용자만 글을 작성/삭제할 수 있도록 설정
2. **보안 규칙 강화**: Firestore 보안 규칙을 더 엄격하게 설정
3. **스팸 방지**: reCAPTCHA 또는 rate limiting 추가 고려

## 무료 사용량

Firebase 무료 플랜(Spark Plan)은 다음을 제공합니다:
- Firestore: 읽기 50,000회/일, 쓰기 20,000회/일
- 저장 공간: 1GB

소규모 게시판에는 충분합니다.

