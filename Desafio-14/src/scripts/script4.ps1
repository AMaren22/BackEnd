curl -X get 'localhost:8080/info'

artillery quick --count 50 -n 20 "http://localhost:8080/info" > result_NO_console_log_inspect.txt
