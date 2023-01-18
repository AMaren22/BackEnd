curl -X get 'localhost:8080/info'

autocannon -c 100 -d 20 "http://localhost:8080/info"
