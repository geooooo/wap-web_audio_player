namespace Equalizer {

    //
    // Singleton - класс эквалайзера
    //
    class Equalizer {

        // =================== private поля =================== //


        // Singleton - экземепляр
        private static _instance: Equalizer = null;


        // Список анимационных функций для полос эквалайзера
        private _animate_funcs: string[] = [
            'equalizer__level_animate-func-ease',
            'equalizer__level_animate-func-ease-out',
            'equalizer__level_animate-func-ease-in',
            'equalizer__level_animate-func-ease-in-out',
            'equalizer__level_animate-func-linear'
        ];

        // Список скоростей анимации для полос эквалайзера
        private _animate_durations: string[] = [
            'equalizer__level_animate-duration-slow',
            'equalizer__level_animate-duration-normal',
            'equalizer__level_animate-duration-fast'
        ];

        // Список объектов-полос экзвалайзера
        private _levels: HTMLCollectionOf<Element>;


        // =================== private методы =================== //


        //
        // Конструктор
        //
        private constructor() {
            // Получение доспута к полосам экзвалайзера
            this._levels = document.getElementsByClassName('equalizer__level');
        }


        // =================== public методы =================== //


        //
        // Получение экземепляра - сиглтона
        //
        public static getInstance(): Equalizer {
            if (Equalizer._instance === null) {
                Equalizer._instance = new Equalizer();
            }

            return Equalizer._instance;
        }


        //
        // Запуск анимации
        //
        public start(): void {
            let random_number: number;
            console.log('start');

            // Для всех полос задаётся случайная функция и скорость анимации
            for (let i:number = 0; i < this._levels.length; i++) {
                // Установка исходных классов
                this._levels[i].setAttribute(
                    'class', 'equalizer__level equalizer__level_animated'
                );
                // Задание анимационной функции
                random_number = Math.floor(Math.random() * this._animate_funcs.length);
                this._levels[i].classList.add(this._animate_funcs[random_number]);
                // Задание скорости анимации
                random_number = Math.floor(Math.random() * this._animate_durations.length);
                this._levels[i].classList.add(this._animate_durations[random_number]);
                // Запуск анимации
                this._levels[i].classList.add('equalizer__level_animate-started');
            }
        }


        //
        // Полная остановка и выключение анимации
        //
        public stop(): void {
            for (let i:number = 0; i < this._levels.length; i++) {
                this._levels[i].classList.remove('equalizer__level_animate_started');
                this._levels[i].classList.add('equalizer__level_animate_stoped');
            }
        }


        //
        // Приостановка анимации на паузу
        //
        public pause(): void {
            for (let i:number = 0; i < this._levels.length; i++) {
                this._levels[i].classList.add('equalizer__level_animate-paused');
            }
        }


        //
        // Снятие анимации с паузы
        //
        public resume(): void {
            for (let i:number = 0; i < this._levels.length; i++) {
                this._levels[i].classList.remove('equalizer__level_animate-paused');
            }
        }

    }


    export const getInstance = Equalizer.getInstance;

}
