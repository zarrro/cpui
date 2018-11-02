import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const cargoroutes = [
            {
                id: 6734,
                pointA: 'София',
                pointB: 'Силистра',
                price: 100,
                notes: 'Дойна крава'
            },
            {
                id: 1321,
                pointA: 'Варна',
                pointB: 'Атина',
                price: 650,
                notes: 'Далавера'
            },
            {
                id: 3000,
                pointA: 'Бургас',
                pointB: 'Атина',
                price: 500,
                notes: 'Нефтохима'
            },
            {
                id: 2382,
                pointA: 'Пловдив',
                pointB: 'Русе',
                price: 80,
                notes: 'Малка кирия'
            },
            {
                id: 1182,
                pointA: 'Пазарджик',
                pointB: 'Инстамбул',
                price: 280,
                notes: 'Дели урман'
            }];
        return { cargoroutes };
    }
}