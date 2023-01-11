## Comandos

# node src/index.js -p=3000
# node src/index.js -p=8081 -m=cluster
# pm2 start src/index.js -- --puerto=8080 --modo=fork
# pm2 start src/index.js -- --puerto=8081 --modo=cluster
# pm2 start src/index.js -- --puerto=8080 --modo=fork
# pm2 start ecosystem.config.cjs