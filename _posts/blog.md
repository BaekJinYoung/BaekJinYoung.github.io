```bash
composer require guzzlehttp/guzzle
```
Guzzle은 Laravel에서 HTTP 요청을 쉽게 처리할 수 있도록 도와주는 PHP 라이브러리입니다.



```bash
php artisan make:controller BlogController
```

api.php에 등록


instagram
-

https://developers.facebook.com/

개발자 계정 생성

https://api.instagram.com/oauth/authorize
?client_id={app-id}
&redirect_uri={redirect-uri}
&scope=user_profile,user_media
&response_type=code

https://api.instagram.com/oauth/authorize?client_id={Instagram 앱 ID}&redirect_uri={유효한 OAuth 리디렉션 URI에 적었던 주소}&scope=user_profile,user_media&response_type=code 

https://api.instagram.com/oauth/authorize?client_id=1416479025705783&redirect_uri=https://www.baekjinyoung.co.kr/&scope=user_profile,user_media&response_type=code

https://baekjinyoung.github.io/?code=AQB0F-cPpX6lGqIp300P_8OAZ_eCAlUWLRvwc9qF1ZKIpEfaZLIOkajUJI2H10pFipkL13x-74YpiNOCaD0cJUoDVwhDK7WdF8aJUsyQlx6DLn9HSt_U2YjUQ1KSnGaRCVJJ2ollyjY4C-Vq_QLFBO2A6Jbo8W_d98k3N97CHeaXSF4AAcS5eRsAm4kfCwe9NFw_YIy9bWRPI7ebZkX8MSXnOIA5TsP6iba8tDbD6S6trg#_

AQB0F-cPpX6lGqIp300P_8OAZ_eCAlUWLRvwc9qF1ZKIpEfaZLIOkajUJI2H10pFipkL13x-74YpiNOCaD0cJUoDVwhDK7WdF8aJUsyQlx6DLn9HSt_U2YjUQ1KSnGaRCVJJ2ollyjY4C-Vq_QLFBO2A6Jbo8W_d98k3N97CHeaXSF4AAcS5eRsAm4kfCwe9NFw_YIy9bWRPI7ebZkX8MSXnOIA5TsP6iba8tDbD6S6trg


토큰
IGQWRQakFEVGlucEd3Nk1UUG1FZAm5fRWNSdzZAGMVhiSEhTMUF2YVh6RG9SY3VLNVpXeHRUYTVuMy1NZAzNiUFEtZA0lOQWIxQmgtVDJkYW5OUWN4NGJHVlVFcU1EZA1o4MElZAM0dsSVRRZAU9Xd0ZARdFZAabGoxbnpIU1hkMnFYVWtZAMFpfZAwZDZD


```
{
    "access_token": "IGQWRNZAURyRUtQdV8yX3RtRGtna1NEeEFTMzktb182b09HVDR4WXdBRm92OW1xSGo3UEZAQRHd2MTZA6RDJLWEh4RUE1aDItVk03dERsbWppSGZAGNnNMMjFqODNuTjlYbndURnY2VlRwR2tpdwZDZD",
    "token_type": "bearer",
    "expires_in": 5183999
}
```


https://graph.instagram.com/
{user_id}/
media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token={토큰}

https://graph.instagram.com/8906428979373592/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=IGQWRNZAURyRUtQdV8yX3RtRGtna1NEeEFTMzktb182b09HVDR4WXdBRm92OW1xSGo3UEZAQRHd2MTZA6RDJLWEh4RUE1aDItVk03dERsbWppSGZAGNnNMMjFqODNuTjlYbndURnY2VlRwR2tpdwZDZD



.env 편집

guzzle 설치
```bash
composer require guzzlehttp/guzzle
```

컨트롤러 생성
```bash
php artisan make:controller InstagramController
```

api.php에 등록


fields : 가져올 미디어

caption : 미디어의 캡션 텍스트, 사진첩의 미디어에 대해서는 반환되지 않는다.
id : 미디어의 ID
media_type : 미디어 유형 ( IMAGE, VIDEO 또는 CAROUSEL_ALBUM )
media_url : 미디어의 URL ( 사진첩의 사진URL )
permalink : 미디어의 영구 URL ( 게시물의 URL이라 생각하면 된다.)
미디어에 저작권이 있는 자료가 포함되어 있거나 저작권 위반 플래그가 지정된 경우 생략
thumbnail_url : 미디어의 썸네일 이미지 URL입니다. VIDEO 미디어에만 제공
timestamp : ISO 8601 형식의 미디어 게시 날짜
username : 미디어 소유자의 사용자 이름

```php
<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApiResponse;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class InstagramController extends Controller
{
    private $accessToken;

    public function __construct()
    {
        $this->accessToken = env('INSTAGRAM_ACCESS_TOKEN');
    }

    public function getInstagramPosts()
    {
        $client = new Client();

        $instagramUserId = '8906428979373592';

        $url = "https://graph.instagram.com/$instagramUserId/media?fields=permalink,media_type,media_url,thumbnail_url&access_token=$this->accessToken";

        try {
            $response = $client->request('GET', $url);
            $data = json_decode($response->getBody(), true);

            $posts = $data['data'];

            return ApiResponse::success($posts);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
```


youtube
-

https://console.cloud.google.com/projectselector2/apis/dashboard


https://developers.google.com/youtube/v3/docs/videos/list?hl=ko



id 1021955247962-6sf8ekqvh746m4njvn5sada4k1bpbk13.apps.googleusercontent.com
pw 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


'client_id': Google Cloud Console에서 발급받은 클라이언트 ID
'redirect_uri': 인증 코드가 반환될 리디렉션 URI
'response_type': 'code'로 설정
'access_type'


```
{
  "kind": "youtube#channelListResponse",
  "etag": "RuuXzTIr0OoDqI4S0RU6n4FqKEM",
  "pageInfo": {
    "totalResults": 0,
    "resultsPerPage": 5
  }
}
```


```
{
  "error": {
    "code": 400,
    "message": "Request contains an invalid argument.",
    "errors": [
      {
        "message": "Request contains an invalid argument.",
        "domain": "global",
        "reason": "badRequest"
      }
    ],
    "status": "INVALID_ARGUMENT"
  }
}
```


채널검색
https://www.googleapis.com/youtube/v3/search?part=snippet&q=공간정원 연구소&type=channel&key=AIzaSyAoXc2VlD4CWfP0tIovF549k4JTK7r-w7M
```
{
  "kind": "youtube#searchListResponse",
  "etag": "ub8Jv96ZFCooCzpdRUNTwnFruKQ",
  "nextPageToken": "CAUQAA",
  "regionCode": "KR",
  "pageInfo": {
    "totalResults": 31,
    "resultsPerPage": 5
  },
  "items": [
    {
      "kind": "youtube#searchResult",
      "etag": "-ZnFdZ5VTE5LPtyfKp0GMb4-J9k",
      "id": {
        "kind": "youtube#channel",
        "channelId": "UCrDatcyUDnHTF3TxCZ2-Niw"
      },
      "snippet": {
        "publishedAt": "2021-01-13T07:29:29Z",
        "channelId": "UCrDatcyUDnHTF3TxCZ2-Niw",
        "title": "공간정원 연구소",
        "description": "가족의 \"행복\"과\"가치\"를 컨설팅 합니다. (대표전화 1522-5482) ◇ 공간정원 연구소 소개. 저희 기업은 『생활환경』이 인간과 생활에 ...",
        "thumbnails": {
          "default": {
            "url": "https://yt3.ggpht.com/Sx6dlcDk6fH0qIVgaKy4rj0XS-YpwJ46AWd0zIOdGGtbfaybKaNnpcfOF1sI8o3Fo_hJbx2ZFoQ=s88-c-k-c0xffffffff-no-rj-mo"
          },
          "medium": {
            "url": "https://yt3.ggpht.com/Sx6dlcDk6fH0qIVgaKy4rj0XS-YpwJ46AWd0zIOdGGtbfaybKaNnpcfOF1sI8o3Fo_hJbx2ZFoQ=s240-c-k-c0xffffffff-no-rj-mo"
          },
          "high": {
            "url": "https://yt3.ggpht.com/Sx6dlcDk6fH0qIVgaKy4rj0XS-YpwJ46AWd0zIOdGGtbfaybKaNnpcfOF1sI8o3Fo_hJbx2ZFoQ=s800-c-k-c0xffffffff-no-rj-mo"
          }
        },
        "channelTitle": "공간정원 연구소",
        "liveBroadcastContent": "none",
        "publishTime": "2021-01-13T07:29:29Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "92btHKoPJ2cfRzj58kta8ubv7sk",
      "id": {
        "kind": "youtube#channel",
        "channelId": "UCtiWVT4kdQxZ04LiHEMexwQ"
      },
      "snippet": {
        "publishedAt": "2020-03-10T09:48:48Z",
        "channelId": "UCtiWVT4kdQxZ04LiHEMexwQ",
        "title": "꽃과정원원예연구소",
        "description": "[공간속에 식물을 들이다] [나만의 반려식물] 꽃식물이 주는 편안함과 아름다움을 많은 분들과 공유하고 싶습니다. - 식물 초보자를 위한 ...",
        "thumbnails": {
          "default": {
            "url": "https://yt3.ggpht.com/Hm8Q1pKEi9_bt2W0jKBA38UCXdNaUxOnS3OH7LUhYivq8KxKXLkO5hBUvnsBqAi5q1XX-qkbBvs=s88-c-k-c0xffffffff-no-rj-mo"
          },
          "medium": {
            "url": "https://yt3.ggpht.com/Hm8Q1pKEi9_bt2W0jKBA38UCXdNaUxOnS3OH7LUhYivq8KxKXLkO5hBUvnsBqAi5q1XX-qkbBvs=s240-c-k-c0xffffffff-no-rj-mo"
          },
          "high": {
            "url": "https://yt3.ggpht.com/Hm8Q1pKEi9_bt2W0jKBA38UCXdNaUxOnS3OH7LUhYivq8KxKXLkO5hBUvnsBqAi5q1XX-qkbBvs=s800-c-k-c0xffffffff-no-rj-mo"
          }
        },
        "channelTitle": "꽃과정원원예연구소",
        "liveBroadcastContent": "none",
        "publishTime": "2020-03-10T09:48:48Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "ekF2Uuy_wc8pBCOoLdUqMVwceBQ",
      "id": {
        "kind": "youtube#channel",
        "channelId": "UCzggPMnCbqQ0TepOXb_ls9A"
      },
      "snippet": {
        "publishedAt": "2013-12-06T09:34:54Z",
        "channelId": "UCzggPMnCbqQ0TepOXb_ls9A",
        "title": "[더숲조경연구소]집시가드너 더숲 이상근",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://yt3.ggpht.com/ytc/AIdro_n5bKj0xO0gqhuXxGNr59R0Hb0hgFRzxvru1UYCitOk548=s88-c-k-c0xffffffff-no-rj-mo"
          },
          "medium": {
            "url": "https://yt3.ggpht.com/ytc/AIdro_n5bKj0xO0gqhuXxGNr59R0Hb0hgFRzxvru1UYCitOk548=s240-c-k-c0xffffffff-no-rj-mo"
          },
          "high": {
            "url": "https://yt3.ggpht.com/ytc/AIdro_n5bKj0xO0gqhuXxGNr59R0Hb0hgFRzxvru1UYCitOk548=s800-c-k-c0xffffffff-no-rj-mo"
          }
        },
        "channelTitle": "[더숲조경연구소]집시가드너 더숲 이상근",
        "liveBroadcastContent": "none",
        "publishTime": "2013-12-06T09:34:54Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "8UPACPvMKrbudW8xDjxYgohavQ8",
      "id": {
        "kind": "youtube#channel",
        "channelId": "UCNoU4dDCZRMUyi3Lgb6vf1A"
      },
      "snippet": {
        "publishedAt": "2022-01-01T20:27:37Z",
        "channelId": "UCNoU4dDCZRMUyi3Lgb6vf1A",
        "title": "낭독정원",
        "description": "안녕하세요. 낭독과 함께 마음밭을 일구는 낭독정원입니다. 소리내어 읽으면 마음 깊이 박힙니다. 낭독으로 마음을 보듬고 물을 주는 ...",
        "thumbnails": {
          "default": {
            "url": "https://yt3.ggpht.com/6VvThCuCVXavrwZDseZvOwvg4KaGkANiBaZNVFlzJVDthGcelrAjX5y1Ijldh_SRjPyq3KIbeg=s88-c-k-c0xffffffff-no-rj-mo"
          },
          "medium": {
            "url": "https://yt3.ggpht.com/6VvThCuCVXavrwZDseZvOwvg4KaGkANiBaZNVFlzJVDthGcelrAjX5y1Ijldh_SRjPyq3KIbeg=s240-c-k-c0xffffffff-no-rj-mo"
          },
          "high": {
            "url": "https://yt3.ggpht.com/6VvThCuCVXavrwZDseZvOwvg4KaGkANiBaZNVFlzJVDthGcelrAjX5y1Ijldh_SRjPyq3KIbeg=s800-c-k-c0xffffffff-no-rj-mo"
          }
        },
        "channelTitle": "낭독정원",
        "liveBroadcastContent": "none",
        "publishTime": "2022-01-01T20:27:37Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "wh5acWripuSDVknjgqkVjBl_MAs",
      "id": {
        "kind": "youtube#channel",
        "channelId": "UC-54D9-g5IMAThb5yQAf8xw"
      },
      "snippet": {
        "publishedAt": "2013-03-04T10:29:57Z",
        "channelId": "UC-54D9-g5IMAThb5yQAf8xw",
        "title": "다중지성의 정원",
        "description": "[갈무리](http://galmuri.co.kr)와 [다중지성의 정원] (http://daziwon.com)의 공간입니다.",
        "thumbnails": {
          "default": {
            "url": "https://yt3.ggpht.com/ytc/AIdro_mQMY-1C754Kul2txNNAgqKbR8lyHeZt7j3W8K2EaR66g=s88-c-k-c0xffffffff-no-rj-mo"
          },
          "medium": {
            "url": "https://yt3.ggpht.com/ytc/AIdro_mQMY-1C754Kul2txNNAgqKbR8lyHeZt7j3W8K2EaR66g=s240-c-k-c0xffffffff-no-rj-mo"
          },
          "high": {
            "url": "https://yt3.ggpht.com/ytc/AIdro_mQMY-1C754Kul2txNNAgqKbR8lyHeZt7j3W8K2EaR66g=s800-c-k-c0xffffffff-no-rj-mo"
          }
        },
        "channelTitle": "다중지성의 정원",
        "liveBroadcastContent": "none",
        "publishTime": "2013-03-04T10:29:57Z"
      }
    }
  ]
}
```


search?part=snippet&channelId=UCrDatcyUDnHTF3TxCZ2-Niw&type=video&key=AIzaSyAoXc2VlD4CWfP0tIovF549k4JTK7r-w7M
영상검색
https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=CHANNEL_ID&type=video&key=YOUR_API_KEY


https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCrDatcyUDnHTF3TxCZ2-Niw&type=video&key=AIzaSyAoXc2VlD4CWfP0tIovF549k4JTK7r-w7M

```
{
  "kind": "youtube#searchListResponse",
  "etag": "Cy-XfpyEolZs_Ne7wVoZ2s7gnRk",
  "nextPageToken": "CAUQAA",
  "regionCode": "KR",
  "pageInfo": {
    "totalResults": 245,
    "resultsPerPage": 5
  },
  "items": [
    {
      "kind": "youtube#searchResult",
      "etag": "3ezzHp6sepxHOH_3-cUCR9DgZps",
      "id": {
        "kind": "youtube#video",
        "videoId": "M0zpSGDJ3RQ"
      },
      "snippet": {
        "publishedAt": "2023-10-03T11:03:27Z",
        "channelId": "UCrDatcyUDnHTF3TxCZ2-Niw",
        "title": "좁은 드레스룸 두배 만들기. 신박한 펜트리 개조방법 #정리정돈 #정리수납",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/M0zpSGDJ3RQ/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/M0zpSGDJ3RQ/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/M0zpSGDJ3RQ/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "공간정원 연구소",
        "liveBroadcastContent": "none",
        "publishTime": "2023-10-03T11:03:27Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "dxshQv9Gfn0sH_Vh0q_jtFZ2EBU",
      "id": {
        "kind": "youtube#video",
        "videoId": "6CYiFHkWRN4"
      },
      "snippet": {
        "publishedAt": "2023-09-09T10:52:33Z",
        "channelId": "UCrDatcyUDnHTF3TxCZ2-Niw",
        "title": "방 하나가 더 생기는!! 신박한 가구재배치 방법~! #정리수납 #정리정돈 #정리전문가이정원 #가구재배치 #안방정리 #드레스룸정리",
        "description": "안녕하세요 이정원 공간정리 연구소 입니다 오늘의 의뢰인께서는 안방에대한 고민을 가지고 계셨어요 안방을 아무리 깨끗이 정리해도 ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/6CYiFHkWRN4/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/6CYiFHkWRN4/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/6CYiFHkWRN4/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "공간정원 연구소",
        "liveBroadcastContent": "none",
        "publishTime": "2023-09-09T10:52:33Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "uintzCdwwh90cOCPDep_QMSOMas",
      "id": {
        "kind": "youtube#video",
        "videoId": "fTAcPhU4xUo"
      },
      "snippet": {
        "publishedAt": "2024-07-22T09:47:31Z",
        "channelId": "UCrDatcyUDnHTF3TxCZ2-Niw",
        "title": "10년 묵은짐 정리로 대변신!!#정리수납 #정리정돈 #공간재구성 #변신 #정리전문가이정원 #shorts",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/fTAcPhU4xUo/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/fTAcPhU4xUo/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/fTAcPhU4xUo/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "공간정원 연구소",
        "liveBroadcastContent": "none",
        "publishTime": "2024-07-22T09:47:31Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "y2yVMABC0XaN0hSi6p8DSy-M36o",
      "id": {
        "kind": "youtube#video",
        "videoId": "jy4I5I6jf8M"
      },
      "snippet": {
        "publishedAt": "2023-10-20T11:56:46Z",
        "channelId": "UCrDatcyUDnHTF3TxCZ2-Niw",
        "title": "물건으로 꽉찬 자매방 깔~끔하게 공간재구성!! #정리정돈 #정리수납 #이정원토탈홈케어 #정리전문가이정원",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/jy4I5I6jf8M/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/jy4I5I6jf8M/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/jy4I5I6jf8M/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "공간정원 연구소",
        "liveBroadcastContent": "none",
        "publishTime": "2023-10-20T11:56:46Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "g2gArTuQQj9ATt1doBc20qMKb4I",
      "id": {
        "kind": "youtube#video",
        "videoId": "FmrFLHMWZXc"
      },
      "snippet": {
        "publishedAt": "2023-09-16T11:29:09Z",
        "channelId": "UCrDatcyUDnHTF3TxCZ2-Niw",
        "title": "물건이 많은 부모님댁! 생활이 편리해지는 정리법! #정리정돈  #정리수납 #가구재배치",
        "description": "안녕하세요! 공간정리 연구소 이정원입니다 오늘은! 물건이 매우 많으신 부모님댁을 생활이 편리해지도록 정리한 실제 현장 영상 ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/FmrFLHMWZXc/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/FmrFLHMWZXc/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/FmrFLHMWZXc/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "공간정원 연구소",
        "liveBroadcastContent": "none",
        "publishTime": "2023-09-16T11:29:09Z"
      }
    }
  ]
}
```

.env 편집

```bash
php artisan make:service YoutubeService

php artisan make:controller YoutubeController
```

guzzle 설치

```bash
mkdir app/Services
php artisan make:service YoutubeService
```

```bash
php artisan make:controller YoutubeController
```