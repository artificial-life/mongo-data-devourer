
## GEN

* node .\gen.js --iterations 10 --mongo 192.168.1.49
* node .\group-service.js --nats 192.168.1.36:4222 --mongo 192.168.1.49
* node .\run-worker.js --nats 192.168.1.36:4222 [--mongo 192.168.1.49] [--pg 192.168.1.49] --mode <"pg" || (any other is mongo)>
