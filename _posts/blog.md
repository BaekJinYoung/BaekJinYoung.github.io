```bash
composer require guzzlehttp/guzzle
```
Guzzle은 Laravel에서 HTTP 요청을 쉽게 처리할 수 있도록 도와주는 PHP 라이브러리입니다.



```bash
php artisan make:controller BlogController
```

api.php에 등록


{
"access_token": "",
"user_id": 8906428979373592,
"permissions": [
"instagram_graph_user_profile",
"instagram_graph_user_media"
]
}

instagram
-
https://graph.instagram.com/8906428979373592/media?fields=id,permalink,media_type,media_url,children%7Bmedia_url%7D,thumbnail_url&limit=8&access_token=
https://developers.facebook.com/

https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=b53d0311d35c9df2c4bd3b8c5ee0aae5&access_token=AQBE_l3_DrPp7ue-xZAl5rIbsc0Wqk25STZZ3HuMIodvq6s-kKM4a6EuK1BFmfitV2VnaviGF4tXYZ18oN8XPmHUj9JEScffyGfNNwJgQ5bQba1bJUityFM-rnV0oZfHbNy_aLIOgEcJzja2QTY2Q-fWcJE6Ei8RF3oF_jeKGzxW66AGLAlYwAZmrLI-KYP7i9bjLqgm4LMWGlDnyyxHNsdIX6om52bEYhcXrkv5j05qlw

https://baekjinyoung.github.io/?code=#_
https://api.instagram.com/oauth/authorize?client_id=1416479025705783&redirect_uri=https://baekjinyoung.github.io/&scope=user_profile,user_media&response_type=code


https://baekjinyoung.github.io/?code=

개발자 계정 생성

https://api.instagram.com/oauth/authorize
?client_id={app-id}
&redirect_uri={redirect-uri}
&scope=user_profile,user_media
&response_type=code


https://api.instagram.com/oauth/authorize?client_id=1208165503669961&redirect_uri=https://baekjinyoung.github.io/&scope=user_profile,user_media&response_type=code
https://baekjinyoung.github.io/?code=
AQA4sve48W-5FxbL8ceyKPTCtGvF_xkuFRXhuInjpPuRJRbJD9TT62L9afl6hK8-1RFsb9b0ABQDqWvjpTJNNFwQeqO3d8M_kCRGUE6lzU-8ka8NCcv1hMUZfidINz46bcVhO8HIUSZWc4TCrGsgsEPH-CY7pM9F8zkYp_wo1qlopbEZJJJTFs0dvsf6-9s2_yZUtyzyLi5oaVQUJsO1a7Rgf0xGzpVwcFd8mg-haF9Lgg
#_

{
"access_token": "IGQWROR01VQlBUbHFyUWJhUGFQOHJXTVhPUGdUVmIwc1JnSzd2UDhWNVFsYm9fRFlUTWZAYX3R3T0o0WU5RX0FBTFI0WnhXZADR4SXhnMnRDYUtOTlhoQTFFbXdRcHJFVzM1ZADAxLXNsSEd4b1JkOEFQU20ta19CV1QzM2Jkanl6bFNpZAwZDZD",
"user_id": 7645017895597906,
"permissions": [
"instagram_graph_user_profile",
"instagram_graph_user_media"
]
}

{
"access_token": "IGQWRQcHU1SUJFczBqMlJpWmlUTTNjMlBLdG9TNzFXYXZAjLWVZAZA1lpOHQ0aGYyaEUyckN3VmZANYWV1MGx0dEpNRWNqV01UQlludmF0NUhsZAmlRMG1mTlByaWxTMFdKTUJKekk1eEtoSlZA2QQZDZD",
"token_type": "bearer",
"expires_in": 5184000
}

https://graph.instagram.com/7645017895597906/media?fields=id,permalink,media_url,thumbnail_url,timestamp&limit=$limit&access_token=IGQWRQcHU1SUJFczBqMlJpWmlUTTNjMlBLdG9TNzFXYXZAjLWVZAZA1lpOHQ0aGYyaEUyckN3VmZANYWV1MGx0dEpNRWNqV01UQlludmF0NUhsZAmlRMG1mTlByaWxTMFdKTUJKekk1eEtoSlZA2QQZDZD



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
php artisan make:model Instagram -m


https://api.instagram.com/oauth/authorize
?client_id={Instagram 앱 ID}
&redirect_uri={등록한 url}
&scope=user_profile,user_media
&response_type=code



Client error
-
{
"error": "Client error: `GET https://graph.instagram.com/8906428979373592/media?fields=id,permalink,media_type,media_url,children%7Bmedia_url%7D,thumbnail_url&limit=20&access_token=IGQWRNZAURyRUtQdV8yX3RtRGtna1NEeEFTMzktb182b09HVDR4WXdBRm92OW1xSGo3UEZAQRHd2MTZA6RDJLWEh4RUE1aDItVk03dERsbWppSGZAGNnNMMjFqODNuTjlYbndURnY2VlRwR2tpdwZDZD` resulted in a `400 Bad Request` response:\n{\"error\":{\"message\":\"Error validating access token: The session has been invalidated because the user changed their pass (truncated...)\n"
}


IGQWRPT1FjOGFPOXh6QTh6OUhHMTlyUVg2Qlhid2JEX0pFcFh2ckZAQckozZAXZABSk1LNDlBREFhOTZAwbnB0UUhjMGswOGRaaHlNeFhGNy11NzNBUHNSQllxVVNTWVJCMHIzLWVmdnhZAS2h3eGN5Mk5DRFh0cnVyZAEkZD

IGQWRNMnpJLTZA4X1NhQXYwY0NUVk1SX2tIMi01YWd2RWh4eUEzejdjc2otZAUh2U09YWmlNVUxIU1dZAdk9GU0N3RDlSRzJQLUF3VW0xM2xhSWRJUG1VXzJlcm9EVzVqb19IM1dwaGVJcVdTRmRSa3hzSkpwUGtlQWcZD

https://api.instagram.com/oauth/authorize
?client_id={app-id}
&redirect_uri={redirect-uri}
&scope=user_profile,user_media
&response_type=code

https://api.instagram.com/oauth/authorize?client_id=1416479025705783&redirect_uri=https://baekjinyoung.github.io/&scope=user_profile,user_media&response_type=code

https://baekjinyoung.github.io/?code=
진짜토큰
IGQWRQSVVkUlNHU2hfbG5seVV6Szhnck00a0VJMFNvdzNZAWDJrX1Q2XzFmN094N0hFLXdGYlA0SG9zdHZAnUkx3ZAXZAjT1AwWXNadnd1MUNDbUpXTFExZADV5RlJMUHN2TXpGUHB4dzhYS3k2ZAwZDZD

https://baekjinyoung.github.io/?code=
https://baekjinyoung.github.io/?code=


https://graph.instagram.com/8906428979373592?fields=id,username&access_token=IGQWRPd2o5eW9Ub0dJUzVMeG1Wd2N5SVI1TWZAWOG51NWtyMFJ4MWFhWjVMZAXVUNDNsMUpyWmZAHWE1GZAUFIWkE5anQ4RUdqVzZAJa2l0QzJmazZAMRTBqMmNWZAWhnbnFiSEw4eE55bVhlY05KSXUxdFR0U2VjTXNvNm8ZD

{
"id": "8906428979373592",
"username": "junglee_lab"
}


{
"access_token": "IGQWRQVlZAtZA2JTczRMcWVmSDAtc1N0TU13MVlIeHNhRzdoZA2VxUHpoMmxHSWNHdzJUS1BzWS03Mkp2dHZAEeFpKRjZABbG5uNE1nZAlhzazJqZA1gtNHJlSENYazhVc2cwb0dvUmVfODlyTzVMckJHMHlZALUhEOV85cXpnM2N4akJxa1hTQQZDZD",
"user_id": 8906428979373592,
"permissions": [
"instagram_graph_user_profile",
"instagram_graph_user_media"
]
}


https://api.instagram.com/oauth/authorize?client_id=1416479025705783&redirect_uri=https://baekjinyoung.github.io/&scope=user_profile,user_media&response_type=code



AQClwbFBxutVcSM0FXe6DbnMk5rKfS2DTP50RFD6fYOsjFzV9vrnWe1LACfbaY4kaJO_n3nH3lJaIvXAaIcMpGO1NdhAZyVncogmtHRakxi7aj16j-XnNoVoJbV1y2cVXaO2heoLA7Z-ot3Yoy-_6nU8882utTUK_WRqaRYDjhVgkFL990_CKVsMj6g-UAxvMr1wXb9XDd7xRjqqaFTWP_nTX2yUj1fPhckbYugHt6ze_w

https://api.instagram.com/oauth/authorize?client_id=1416479025705783&redirect_uri=https://baekjinyoung.github.io/&scope=user_profile,user_media&response_type=code

https://baekjinyoung.github.io/?code=#_
AQDD5OSh0YMZIXGl9muoJC_wERvyBFFcwMi_YCsE3OV18uuddSMAtWGmOcYBUjZpwBR59QGX0IKeNIhOhpwq-B2TxI-ZRmF8-28h35doMi0wVZbc__v3wSICcjrHn1EajHvidIfBhWUVQKZAfcHaaxqmGOf-wwo17S-QUdTxeQaiwCzN5ZeOoNXSPxBWFOg33bdc0hzMU3jB9ZLQkZCaIijiO58PBsoTc1kFfgU6L6ve9g

AQBWXiB2wYhOaY98nG2kMQDMpCPYbdp7yjczMMr9_HTDdVZQi0iaJLVvb_sNFnbHjFnO21Dw7VkG777Vkpn8gjgvB-snOfV80ULwKLRmmKCa7HhXOgZzFSClQmQSnjdXNr0ElHjuaUdPhGbdfzJshrGY2Dvtq4Hhnt7gIM79Wnxm2W_pS1OZUwod7DnKKnJ9qI8tuunECo2BilENOi_OV8mxwDzOlkY-xHUy0zzPHHU1Aw

https://baekjinyoung.github.io/?code=#_
https://baekjinyoung.github.io/?code=
https://baekjinyoung.github.io/?code=


https://baekjinyoung.github.io/?code=AQB9EzwoUgUN1UlgDUunbzVFFD1o7Dk8Pazak1SsjG9pz_CnlpY8pKmZgDQ6hGrknRWd0dsUlEAStkumLetSdCVCBu-sG19JTReupSnrhdAaljfKdADpW824xnn9Fi3_R5QfV3KejDxweCtbE5w27I6Ps0JBNifb-O8ZZVRvclWjCW0BNHZ_MWFmnKJy7K_vqxTOxXPG5GGnVEK76ipM3-FsKL_EGe3DU4Bd_2EY3y6xqg#_


AQB9EzwoUgUN1UlgDUunbzVFFD1o7Dk8Pazak1SsjG9pz_CnlpY8pKmZgDQ6hGrknRWd0dsUlEAStkumLetSdCVCBu-sG19JTReupSnrhdAaljfKdADpW824xnn9Fi3_R5QfV3KejDxweCtbE5w27I6Ps0JBNifb-O8ZZVRvclWjCW0BNHZ_MWFmnKJy7K_vqxTOxXPG5GGnVEK76ipM3-FsKL_EGe3DU4Bd_2EY3y6xqg

https://api.instagram.com/oauth/authorize?client_id=1416479025705783&redirect_uri=https://baekjinyoung.github.io/&scope=user_profile,user_media&response_type=code

https://www.baekjinyoung.co.kr/?code=AQDLazTBGR6quKNWC__WiIyZoWbsdz2Ol3M4lA0c1896k_4fc-VVMqCWAIuWCn90x2ES5MoWi30N87WhQNZHGs3MKVH00cONhi9kIAPAjdqj9RQHCyfU2T3UA-g1e0hh-R8EosFF_07_OnBYVu7zMYOi3YVRrExPmEUWT2sPLxUM7Q6f3eBGNTPwTcU8ceCGcf-EWbJZgjTI1B6nUHO-QWKs_Kh_8I7n76mpNjSUb5UjlA#_

AQDLazTBGR6quKNWC__WiIyZoWbsdz2Ol3M4lA0c1896k_4fc-VVMqCWAIuWCn90x2ES5MoWi30N87WhQNZHGs3MKVH00cONhi9kIAPAjdqj9RQHCyfU2T3UA-g1e0hh-R8EosFF_07_OnBYVu7zMYOi3YVRrExPmEUWT2sPLxUM7Q6f3eBGNTPwTcU8ceCGcf-EWbJZgjTI1B6nUHO-QWKs_Kh_8I7n76mpNjSUb5UjlA
https://www.baekjinyoung.co.kr/?code=
AQBHPmHVASIZBGI-rtVUr7mLJZDdhnB16q2xcQnPVLokaEHGkBg4o8Dg_k3I33zFvu2bhol5xNa1n4o-nGwvkVrfzVn-Fft01KuCTiqC2HFh0FHpmwKVYiPrasr2z26gkYxQkv7tRF-SCfc_5lYr5LZsPWB7fsaC5qlzDXr9499kB4vjwwANm78Nmw1eAvXs3tg2nEAIUraW4HQK1atiYZNxm-tXZEFYq-iX60YgvyZ-bQ

https://www.baekjinyoung.co.kr/?code=

AQBSZUmNI6LKrSrx1GzHWHKDxc-vdem3uJvm-jrE5gj-iHxqktdXC0cK6Y7GFPa8yN5JU85cLs0E2cGRfrBHRyHEEEu_4zpvxIfbhMR_ydGqpGujNAs_sFB8Wg2Bw0Wj1vfEooqiAk6cEhtAdrUcOut1EfD_v-5lXALyrEuhKwkpdHFjnFBvo4tDHTwoliZbDm3SkE9I7ZLD0CS_kD5vIbLRnrLY0Vxq3wWjBvPaEIPnww#_

https://www.baekjinyoung.co.kr/?code=

AQD_Yc1wX5LDMK-uRMhqqRA_NrGGMbZNFHmIYbFfPSHyaihXAgzlEPxMXa_axR2DqdZdO2QhQ1PoaV8wSwZphAcFc9Lc18_qt7IJZ1SCE-NRgIew1-_PwNEEnge3NNGVRF-VJjbLcGyz5P7XSPUo2HW4oBJfRNmoridAG9Tjk-wMOEEB5TEJUrqXw1oqxxexrLqgBLFOiOf3nKcYrvXPbVXFOaBsPKnoHTEsUB7HqykOOQ

https://www.baekjinyoung.co.kr/?code=AQBw_xDo8WgWOJswrz6gefehp8tRg6fBg4RkVa8yXhd8EtbloI6kkiIsx_QAq3PvJ4Is94f-S3TyZJMBX0nrCw0FkpfJLCHdltbYCR7CPrvFHTg8sHc6mVVDI_DwiwBjEWZFXTg05KfaBchTeZYx2RFFb4fxosBPZoH0oc0Fp_wjG2wWHFxjr3Qly2tnCCDyBa2g9MpQm_GqHjXK7WUPJwok-_NaNeSX2uUSrsS-3ubKqQ#_


AQBw_xDo8WgWOJswrz6gefehp8tRg6fBg4RkVa8yXhd8EtbloI6kkiIsx_QAq3PvJ4Is94f-S3TyZJMBX0nrCw0FkpfJLCHdltbYCR7CPrvFHTg8sHc6mVVDI_DwiwBjEWZFXTg05KfaBchTeZYx2RFFb4fxosBPZoH0oc0Fp_wjG2wWHFxjr3Qly2tnCCDyBa2g9MpQm_GqHjXK7WUPJwok-_NaNeSX2uUSrsS-3ubKqQ


https://www.baekjinyoung.co.kr/?code=AQC7tMIbp6YVqe7ssHBx-eFSaNQkhK3pG68WffRsMNLY_v7eg94gw-hA2Wc1yl0_AOrNFnHNNQTU1XBSHqgTE2DCty1UYFsiSVbbOCu9-n_4u73lY-MjWwrDVC7tbK4GWrOcccb3rKiVlBZj4muTeUODXZvN91M7bULnSnGsQ1SsdoN-zP8as9CqklyqWavldDMSDNyIr0WPTkuLXg-HN25QY6_0zwynepy_1X3UyXVixQ#_

AQC7tMIbp6YVqe7ssHBx-eFSaNQkhK3pG68WffRsMNLY_v7eg94gw-hA2Wc1yl0_AOrNFnHNNQTU1XBSHqgTE2DCty1UYFsiSVbbOCu9-n_4u73lY-MjWwrDVC7tbK4GWrOcccb3rKiVlBZj4muTeUODXZvN91M7bULnSnGsQ1SsdoN-zP8as9CqklyqWavldDMSDNyIr0WPTkuLXg-HN25QY6_0zwynepy_1X3UyXVixQ

https://baekjinyoung.github.io/?code=AQDPl74Lc-wVcYfn9ujZ9U2t7fVPU59ibRIqnAtZ1Bv8oxVXodZphkJvyPCNRKZndGfDGLG36KrNOwPDSi51-byUIZ_XIJFhaoVVo12_eYHmZRSxkl1T8jFxMlQfEQmJS2S4mN-oK0Jt1OQGsneVHiY27qhIjWEbXoKvVKyriy3QT3kK02bofeXrL6SiS6oHMRE5pIdp_1Kq3CBtUS9uxFaYX7-EBzOALV0WebKeS3WBHg#_

AQDPl74Lc-wVcYfn9ujZ9U2t7fVPU59ibRIqnAtZ1Bv8oxVXodZphkJvyPCNRKZndGfDGLG36KrNOwPDSi51-byUIZ_XIJFhaoVVo12_eYHmZRSxkl1T8jFxMlQfEQmJS2S4mN-oK0Jt1OQGsneVHiY27qhIjWEbXoKvVKyriy3QT3kK02bofeXrL6SiS6oHMRE5pIdp_1Kq3CBtUS9uxFaYX7-EBzOALV0WebKeS3WBHg


curl -X POST \
https://api.instagram.com/oauth/access_token \
-F client_id={app-id} \    숫자로 된 APP ID
-F client_secret={app-secret} \   앱 시크릿코드
-F grant_type=authorization_code \
-F redirect_uri={redirect-uri} \   redirect uri
-F code={code}   2번 주소창에서 복사한 code string


{
"access_token": "IGQWRNR0tFZAVJBUEpKR3Exc1pjcElmMDRscWtCUm1ncTYxOTZAzZAkhlZAnh3eF9GYWRQV3lYWGNia25zTDA2Vk1wSUZAwRnY0aDNoQnNOcjhlMzFFZAGViQUQtWUpWa0VwMElOY2phM252Vzk2QklOWjR4b2Q3aG0xcl9tUEVxR3cwVzIzUQZDZD",
"user_id": 8906428979373592,
"permissions": [
"instagram_graph_user_profile",
"instagram_graph_user_media"
]
}

curl -i -X GET "https://graph.instagram.com/access_token
?grant_type=ig_exchange_token
&client_secret=d7a50d0272dda621e6b278079d8b75c9
&access_token=IGQWRNR0tFZAVJBUEpKR3Exc1pjcElmMDRscWtCUm1ncTYxOTZAzZAkhlZAnh3eF9GYWRQV3lYWGNia25zTDA2Vk1wSUZAwRnY0aDNoQnNOcjhlMzFFZAGViQUQtWUpWa0VwMElOY2phM252Vzk2QklOWjR4b2Q3aG0xcl9tUEVxR3cwVzIzUQZDZD"


{
"access_token": "IGQWROdzVsSkphMHhmbFZAwQkNISlRiMXBVQU9sVjdONXlPSWEzbDFoa25tV3lfdkhmM2l0NjIwdnJoUG15OFM3dGkxRF9xRDI1QThuSV96SnBJYWpnc0pncm9vdFpUSUpzQWpWU2p5cjhiZAwZDZD",
"token_type": "bearer",
"expires_in": 5182306
}


```bash
cd laravel
sudo nano .env

sudo systemctl restart nginx
```

INSTAGRAM_ACCESS_TOKEN="IGQWROdzVsSkphMHhmbFZAwQkNISlRiMXBVQU9sVjdONXlPSWEzbDFoa25tV3lfdkhmM2l0NjIwdnJoUG15OFM3dGkxRF9xRDI1QThuSV96SnBJYWpnc0pncm9vdFpUSUpzQWpWU2p5cjhiZAwZDZD"

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

chmod 644 /home/ubuntu/laravel/.env

chown www-data:www-data /home/ubuntu/laravel/.env


search?part=snippet&channelId=UCrDatcyUDnHTF3TxCZ2-Niw&type=video&key=AIzaSyAoXc2VlD4CWfP0tIovF549k4JTK7r-w7M
영상검색
https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=CHANNEL_ID&type=video&key=YOUR_API_KEY

YOUTUBE_API_KEY=AIzaSyAoXc2VlD4CWfP0tIovF549k4JTK7r-w7M
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


Client error: `GET https://www.googleapis.com/youtube/v3/search?channelId=UCrDatcyUDnHTF3TxCZ2-Niw&part=snippet&order=date&type=video&maxResults=20` resulted in a `403 Forbidden` response: { "error": { "code": 403, "message": "Method doesn't allow unregistered callers (callers without established i (truncated...)





인스타그램 토큰 자동 갱신
-

refresh_token.sh


INSTAGRAM_ACCESS_TOKEN="IGQWRQcHU1SUJFczBqMlJpWmlUTTNjMlBLdG9TNzFXYXZAjLWVZAZA1lpOHQ0aGYyaEUyckN3VmZANYWV1MGx0dEpNRWNqV01UQlludmF0NUhsZAmlRMG1mTlByaWxTMFdKTUJKekk1eEtoSlZA2QQZDZD"



```bash
# 인스타그램 토큰 새로고침
#!/bin/bash

# 설정: Instagram API 관련 정보
INSTAGRAM_ACCESS_TOKEN="{INSTAGRAM_ACCESS_TOKEN}"
LOG_FILE="access_token.log"               # 갱신 상태를 저장할 로그 파일

# Access Token 새로고침 요청 URL
REFRESH_URL="https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${INSTAGRAM_ACCESS_TOKEN}"

# 새로고침 API 요청
response=$(curl -s -X GET "$REFRESH_URL")

# 응답에서 새 access token 추출 (API는 갱신된 토큰을 반환함)
extended_access_token=$(echo $response | jq -r '.access_token')

# 새로고침 실패 시 오류 메시지 처리
if [ "$extended_access_token" == "null" ] || [ -z "$extended_access_token" ]; then
  echo "Access token refresh failed. Response: $response"
  exit 1
fi

# 갱신된 access token을 로그 파일에 저장 (기존과 같을 수 있음)
echo "Extended Access Token: $extended_access_token"
echo $extended_access_token > $LOG_FILE

# 완료 메시지 출력
echo "Access token successfully refreshed and extended. Saved to $LOG_FILE"
```

```bash
crontab -e
no crontab for ubuntu - using an empty one

Select an editor.  To change later, run 'select-editor'.
  1. /bin/nano        <---- easiest
  2. /usr/bin/vim.basic
  3. /usr/bin/vim.tiny
  4. /bin/ed

Choose 1-4 [1]:
```

```bash
# 인스타그램 토큰 새로고침
# 매달 1일 0시 0분 refresh_token.sh 실행
0 0 1 * * /home/kayaru/refresh_token.sh
```

```bash
chmod +x /home/kayaru/refresh_token.sh
```

```bash
/home/kayaru/refresh_token.sh
```

```bash
/home/ubuntu/refresh_token.sh: line 3: $'\r': command not found
/home/ubuntu/refresh_token.sh: line 7: $'\r': command not found
/home/ubuntu/refresh_token.sh: line 10: $'\r': command not found
/home/ubuntu/refresh_token.sh: line 13: $'\r': command not found
/home/ubuntu/refresh_token.sh: line 16: $'\r': command not found
/home/ubuntu/refresh_token.sh: line 29: syntax error: unexpected end of file
```

```bash
sed -i 's/\r$//' /home/ubuntu/refresh_token.sh
```

```bash
/home/ubuntu/refresh_token.sh
Extended Access Token: IGQWROd0JpMFBmblhoOW9ISTA4Q1E2SWNHa1k1UTZAvdVI0OEtOYWRCVkhPb0ZARaTdCMkNyaWtLS0lnYkV0TW9zeWtzNmMtVEhSSnZAidUo2ZA2h3M2hhcHhwTWdxRnpSSFpOVkZAoY0E3MEFyQQZDZD
Access token successfully refreshed and extended. Saved to access_token.log
```