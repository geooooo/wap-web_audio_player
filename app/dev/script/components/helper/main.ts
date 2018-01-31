namespace Helper {

    //
    // Singleton - класс
    //
    class Helper {

        // =================== private поля =================== //


        // Singleton - экземепляр
        private static _instance: Helper = null;

        // Сам компонент
        private _helper: Element;

        // Текст подсказки
        private _text: Element;


        // =================== private методы =================== //


        //
        // Конструктор
        //
        private constructor() {
            // Получение доступа к компоненту
            this._helper = document.getElementsByClassName('helper')[0];
            // Получение доступа к тексту подсказки
            this._text = document.getElementsByClassName('helper__text')[0];
        }


        //
        // Скрыть компонент
        //
        private hide(): void {
            this._helper.classList.remove('helper_show');
        }


        //
        // Отобразить компонент
        //
        private show(): void {
            this._helper.classList.add('helper_show');
        }


        // =================== public методы =================== //


        //
        // Задать текст подсказки
        //
        public setText(text: string): void {
            this._text.innerHTML = text;
        }


        //
        // Переключение видимости компонента
        //
        public toggleVisibility(): void {
            if (this._helper.classList.contains('helper_show')) {
                this.hide();
            } else {
                this.show();
            }
        }


        //
        // Получение экземепляра - синглтона
        //
        public static getInstance(): Helper {
            if (Helper._instance === null) {
                Helper._instance = new Helper();
            }
            return Helper._instance;
        }

    }


    export const getInstance = Helper.getInstance;

}
