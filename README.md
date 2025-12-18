# howto
소상공인 이익 극대화 전략

## 배포 방법

이 프로젝트는 GitHub Pages를 통해 자동으로 배포됩니다.

### 초기 설정

1. GitHub 저장소에 코드를 푸시합니다:
   ```bash
   git add .
   git commit -m "초기 커밋"
   git push origin main
   ```

2. GitHub 저장소 설정에서 Pages 활성화:
   - 저장소의 **Settings** → **Pages** 메뉴로 이동
   - **Source**에서 **GitHub Actions** 선택
   - 저장하면 자동으로 배포가 시작됩니다

3. 배포 확인:
   - Actions 탭에서 배포 상태 확인
   - 배포 완료 후 `https://[사용자명].github.io/howto` 주소로 접속 가능

### 자동 배포

- `main` 또는 `master` 브랜치에 푸시하면 자동으로 배포됩니다
- 배포는 GitHub Actions를 통해 자동으로 실행됩니다
