import { stars } from './game';
import { Star } from './Star';

for (let i = 0; i < 1000; i++) {
    stars.push(Star.rand());
}
