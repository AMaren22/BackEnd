curl -X get 'localhost:8080/info'

artillery quick --count 50 -n 20 "http://localhost:8080/info" > result_console_log.txt
