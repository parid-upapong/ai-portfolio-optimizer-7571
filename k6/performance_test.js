import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 users
    { duration: '1m', target: 20 },  // Stay at 20 users
    { duration: '30s', target: 0 },  // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests must be under 200ms
  },
};

export default function () {
  // Testing the Edge Renderer (ISR)
  const res = http.get('https://portfolio-platform.io/p/creator-slug');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'load time is fast': (r) => r.timings.duration < 500,
  });
  sleep(1);
}