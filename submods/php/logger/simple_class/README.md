# simple_class

## LogToAll

(не доработан) Логгер который выводит лог в бд и консоль. Использует LogToDB.

## LogToDB

Логгер который выводит лог в Postrgesql.

Параметры подключения должны находиться в файле $envPath.

Вид файла $envPath:

	POSTGRESQL_HOST = '1.2.3.4'
	POSTGRESQL_PORT = 5432
	POSTGRESQL_DATABASE = ""
	POSTGRESQL_USERNAME = ""
	POSTGRESQL_PASSWORD = ""

## Тестирование

Запуск тестов командой

	vendor\bin\phpunit --testdox tests