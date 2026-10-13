# 아티스트 표기 사전

기획안과 디자인 시안에 쓰는 아티스트 공식 영문 표기를 한곳에서 관리하는 사이트입니다.
GitHub Pages로 배포되고, 데이터는 `data/artists.json` 하나에 들어 있습니다.

> ⚠️ **개인(무료) 플랜의 GitHub Pages는 누구나 볼 수 있는 공개 사이트입니다.**
> 저장소를 private으로 해도 사이트 주소를 아는 사람은 누구나 열 수 있어요.
> "표기 결정 이유"에 미공개 아티스트, 계약, 내부 협의 내용 같은 대외비는 적지 마세요.

## 배포하기 (처음 한 번)

1. GitHub에서 새 저장소를 만듭니다. 예: `artist-naming`. 무료 플랜이라면 **Public**으로 만드세요.
2. 이 폴더의 파일을 전부 올립니다. `.github` 폴더와 `.nojekyll` 파일도 포함해야 해요.
   - 웹에서 올릴 때: 저장소의 **Add file → Upload files**에 폴더째 끌어다 놓기
   - 터미널에서 올릴 때:
     ```bash
     git init && git add . && git commit -m "아티스트 표기 사전 시작"
     git branch -M main
     git remote add origin https://github.com/<사용자명>/artist-naming.git
     git push -u origin main
     ```
3. 저장소의 **Settings → Pages**에서 Source를 **Deploy from a branch**, Branch를 **main / (root)**로 지정하고 저장합니다.
4. 1~2분 뒤 `https://<사용자명>.github.io/artist-naming/` 에서 열립니다.

저장소 주소는 사이트 주소에서 자동으로 알아냅니다. 커스텀 도메인을 쓴다면 `index.html` 맨 아래 스크립트의 `CONFIG`에 `owner`와 `repo`를 직접 적어 주세요.

## 표기 수정하는 법

**방법 1. 사이트에서 수정하기 (추천, 개발자가 아니어도 됨)**

1. 사이트에서 아티스트를 등록·수정·삭제합니다. 수정 사유는 반드시 적어야 해요.
2. 화면 아래에 뜨는 **GitHub에 반영하기**를 누릅니다.
3. 안내대로 따라 합니다.
   - `artists.json`을 내려받습니다.
   - 저장소의 `data` 폴더 업로드 화면에 끌어다 놓습니다.
   - 미리 만들어진 커밋 메시지를 붙여넣고 커밋합니다.

반영 전까지의 변경은 그 브라우저에만 임시 저장됩니다. 다른 사람이 그사이 먼저 반영했다면 사이트가 경고를 띄우니, 그때는 변경을 취소하고 최신 데이터에서 다시 수정하세요.

**방법 2. GitHub에서 직접 고치기**

`data/artists.json`을 열고 연필 아이콘(Edit)으로 수정한 뒤 커밋합니다. 아티스트 상세 화면의 이력 링크를 누르면 해당 항목 위치로 바로 갑니다.

**수정 권한**

저장소 **Settings → Collaborators**에 추가된 사람만 커밋할 수 있습니다. 나머지 사람은 사이트를 보고 검색만 할 수 있어요.

## 수정 이력

- 모든 변경은 Git 커밋으로 남습니다. 커밋 메시지가 수정 사유예요.
- 사이트의 **변경 이력** 탭에 최근 50건이 보입니다. GitHub API를 비로그인으로 쓰기 때문에 같은 IP에서 시간당 60회까지만 조회돼요. 사무실처럼 여러 명이 같은 IP를 쓰면 한도에 걸릴 수 있는데, 그때는 탭에 있는 GitHub 링크로 보면 됩니다.
- 아티스트 상세 화면의 이력 링크는 GitHub **blame**으로 연결됩니다. 그 항목의 각 줄을 누가, 어떤 커밋에서 바꿨는지 보여줘요.

## 자동 검사

`data/artists.json`이 바뀔 때마다 GitHub Actions가 `scripts/validate.mjs`를 실행합니다.

- **실패로 처리하는 경우**: JSON 문법 오류, 필수값 누락, 정식 표기 중복, id 중복
- **경고로만 알려주는 경우**: 멤버 영문명이 비어 있음

결과는 저장소의 **Actions** 탭에서 볼 수 있어요. 로컬에서 실행하려면 `node scripts/validate.mjs`를 쓰면 됩니다.

## 데이터 형식

```json
{
  "id": "seventeen",
  "nameEn": "SEVENTEEN",
  "nameKo": "세븐틴",
  "type": "그룹",
  "labels": ["PLEDIS Entertainment"],
  "aliases": ["Svt", "Seventeen"],
  "note": "표기 결정 이유",
  "members": [{ "nameEn": "S.COUPS", "nameKo": "에스쿱스" }]
}
```

- `id`: 주소용 고유값입니다. 영문 소문자, 숫자, 하이픈만 쓸 수 있고, 예를 들어 `…/#seventeen`이 바로 그 아티스트 화면을 엽니다. 한 번 정하면 바꾸지 마세요.
- `type`: 그룹, 솔로, 유닛, 프로젝트 중 하나입니다.
- `aliases`: 쓰지 않는 표기입니다. 검색과 기획안 표기 검사에 쓰입니다.
- `members`: 배열 순서가 곧 표기 순서입니다.

## 확인이 필요한 데이터

시트에서 가져올 때 아래 항목은 정보가 비어 있거나 임의로 보완했습니다.

- **Weeekly**: 시트에 멤버 6명의 영문명이 없어 비워 두었습니다.
- **그룹 대표 행이 없던 12팀**: 그룹명 열을 영문 표기로 썼고, 한글명은 보완했습니다. 대상은 CORTIS, Hearts2Hearts, THE BOYZ, CLASSy, MOONCHILD, AHOF, MOONBIN&SANHA, MGA, KAWAII LAB., PEAK SPOT, XngHan&Xoul입니다.
- **RUNIDRE**: 시트의 멤버 한글명이 잘못 들어가 있어 비워 두었습니다.
- **aespa**: 시트의 `asepa` 오타를 `aespa`로 고쳤습니다.
