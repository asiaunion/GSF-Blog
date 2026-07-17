# IndexNow 운영 가이드

Bing 웹마스터 및 지원 검색 엔진에 콘텐츠 변경을 즉시 알리기(ping) 위한 수동 발송 가이드입니다.

## 설정 정보

- **Host**: `gsfark.com`
- **Key**: `0dc6bcd07ea480ccad4946b289a714b2`
- **Key Location**: `https://gsfark.com/0dc6bcd07ea480ccad4946b289a714b2.txt`

## Ping 발송 방법 (curl 예시)

새로운 포스트가 발행되거나 기존 글이 수정된 경우 터미널에서 다음 명령어로 변경된 URL을 전송합니다.

```bash
curl -X POST "https://www.bing.com/indexnow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "gsfark.com",
    "key": "0dc6bcd07ea480ccad4946b289a714b2",
    "keyLocation": "https://gsfark.com/0dc6bcd07ea480ccad4946b289a714b2.txt",
    "urlList": [
      "https://gsfark.com/ko/posts/example-slug/",
      "https://gsfark.com/en/posts/example-slug/"
    ]
  }'
```
