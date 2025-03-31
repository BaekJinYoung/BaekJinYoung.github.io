```php
$query = Curriculum::with(['schedules' => fn($q) => $q->orderBy('start_date')])
                ->whereNotNull('parent_id')
                ->when($areaId, fn($q) => $q->where('area_id', $areaId))
                ->when($title, fn($q) => $q->where('curriculum', 'like', "%$title%"));
```