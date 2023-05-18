const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  brokers: ['leading-chimp-9814-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'bGVhZGluZy1jaGltcC05ODE0JJU37kj_Dkt7-BEvp-6LPdPCF08VSTpLpCmP9yY',
    password: 'b4c1574dac7747ba9c38f737f4504cc9',
  },
  ssl: true,
})

export { kafka };
