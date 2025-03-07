


Method Illuminate\Database\Eloquent\Collection::getCollection does not exist.
-

오류 메시지에서 말하는 문제는 Illuminate\Database\Eloquent\Collection 클래스에는 getCollection이라는 메서드가 없다는 것입니다. 즉, getCollection()을 호출하려고 했지만 이 메서드는 존재하지 않기 때문에 오류가 발생한 것입니다.

Banner::all()은 Eloquent의 Collection 객체를 반환합니다. 이 컬렉션에서 바로 transform() 메서드를 사용할 수 있으므로, getCollection()을 사용할 필요가 없습니다.


```php
$banners = Banner::all();
        $banners->getCollection()->transform(function ($banner) {
            $banner->is_video = $this->isVideo($banner->image);
            $banner->is_mobile_video = $this->isVideo($banner->mobile_image);
            return $banner;
        });
```

```php
$banners = Banner::all();
$banners->transform(function ($banner) {
$banner->is_video = $this->isVideo($banner->image);
$banner->is_mobile_video = $this->isVideo($banner->mobile_image);
return $banner;
});
```


수정 내용:
**getCollection()**을 제거하고, transform() 메서드를 바로 호출했습니다. Banner::all()은 이미 컬렉션을 반환하므로, 추가로 getCollection()을 호출할 필요가 없습니다.
이제 이 코드는 제대로 작동할 것이며, 각 배너에 대해 is_video와 is_mobile_video 속성을 추가하게 됩니다.