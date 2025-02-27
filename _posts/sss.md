```bash
Your lock file does not contain a compatible set of packages. Please run composer update.
err:   Problem 1
err:     - nette/schema is locked to version v1.3.0 and an update of this package was not requested.
err:     - nette/schema v1.3.0 requires php 8.1 - 8.3 -> your php version (8.4.0RC1) does not satisfy that requirement.
err:   Problem 2
err:     - league/config is locked to version v1.2.0 and an update of this package was not requested.
err:     - league/config v1.2.0 requires nette/schema ^1.2 -> satisfiable by nette/schema[v1.3.0].
err:     - nette/schema v1.3.0 requires php 8.1 - 8.3 -> your php version (8.4.0RC1) does not satisfy that requirement.
out:    Illuminate\Database\QueryException 
out:   could not find driver (Connection: mysql, SQL: select table_name as name, (data_length + index_length) as size, table_comment as comment, engine as engine, table_collation as collation from information_schema.tables where table_schema = '***' and table_type in ('BASE TABLE', 'SYSTEM VERSIONED') order by table_name)
out:   at vendor/laravel/framework/src/Illuminate/Database/Connection.php:825
out:     821▕                     $this->getName(), $query, $this->prepareBindings($bindings), $e
out:     822▕                 );
out:     823▕             }
out:     824▕ 
out:   ➜ 825▕             throw new QueryException(
out:     826▕                 $this->getName(), $query, $this->prepareBindings($bindings), $e
out:     827▕             );
out:     828▕         }
out:     829▕     }
out:       +38 vendor frames 
out:   39  artisan:13
out:       Illuminate\Foundation\Application::handleCommand() 




sudo chown doublecapital:doublecapital .env
```