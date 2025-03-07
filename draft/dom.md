```bash
ubuntu@ip-172-31-40-242:/home/rond/laravel$ sudo php artisan config:cache

   Error

  Class "DOMDocument" not found

  at vendor/nunomaduro/termwind/src/HtmlRenderer.php:32
     28▕      * Parses the given html.
     29▕      */
     30▕     public function parse(string $html): Components\Element
     31▕     {
  ➜  32▕         $dom = new DOMDocument();
     33▕
     34▕         if (strip_tags($html) === $html) {
     35▕             return Termwind::span($html);
     36▕         }

      +31 vendor frames

  32  artisan:13
      Illuminate\Foundation\Application::handleCommand()

```

```bash
php -v
```
```bash
PHP 8.4.0RC1 (cli) (built: Sep 27 2024 04:53:00) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.4.0RC1, Copyright (c) Zend Technologies
    with Zend OPcache v8.4.0RC1, Copyright (c), by Zend Technologies
````

```bash
sudo apt install php8.4-xml
```

```bash
ubuntu@ip-172-31-40-242:/home/rond/laravel$ sudo php artisan config:cache

   INFO  Configuration cached successfully.
```