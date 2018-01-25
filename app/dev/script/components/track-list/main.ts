namespace TrackList {

    //
    // Singleton - класс трэк-лист
    //
    class TrackList {

        // =================== private поля =================== //


        // Singleton - экземепляр
        private static _instance: TrackList = null;

        // Список треков
        private _track_list: Element;

        // Проигрываемый трэк
        private _played_audio_track: Element = null;

        // Первый трэк
        private _first_audio_track: any = null;

        // Выбранные трэки
        private _selected_audio_tracks: Element[] = [];

        // Панель трэк-листа
        private _panel: Element;

        // Информация о добавленных файлах
        private _files: File[] = [];

        // Случаен ли следующий трэк
        private _is_random_next = false;

        // Зациклить текущий трэк
        private _is_loop_current = false;


        // =================== private методы =================== //


        //
        // Конструктор
        //
        private constructor() {
            this.elementsBind();
            this.eventsBind();
        }


        //
        // Привязка элементов
        //
        private elementsBind(): void {
            // Получение доступа к панели трэк-листа
            this._panel = document.getElementsByClassName('panel')[0];
            // Получение доступа к трэк-листу
            this._track_list = document.getElementsByClassName('track-list')[0];
        }


        //
        // Привязка событий
        //
        private eventsBind(): void {
            // Drag and Drop файлов в трэк-лист
            let self = this;
            this._panel.addEventListener('drop', (e: any) => {
                e.preventDefault();
                self.addDropFiles(e.dataTransfer.files);
            }, false);
            this._panel.addEventListener('drag', (e: Event) => {
                e.preventDefault();
            });
            this._panel.addEventListener('dragover', (e: Event) => {
                e.preventDefault();
            });
            // Выделение и воспроизведение трэков
            this._track_list.addEventListener('click', (e: any) => {
                // Для выделения требуется нажатие ctrl
                // Для любых других кликов - воспроизведение
                if (e.target.className.indexOf('audio-track') != -1) {
                    // Получение элемента с классом audio-track
                    let target: any = e.target;
                    while (!target.classList.contains('audio-track')) {
                        target = target.parentNode;
                    }
                    if (e.ctrlKey) {
                        this.toggleSelected(target);
                    } else {
                        this.setPlayed(target);
                    }
                }
            });
            // Отображение подсказки для прокрутки
            this._track_list.addEventListener('mousemove', (e: Event) => {
                if (this.isCanScrollTop()) {
                    this._track_list.classList.add('track-list_border-top');
                }
                if (this.isCanScrollBottom()) {
                    this._track_list.classList.add('track-list_border-bottom');
                }
            });
            this._track_list.addEventListener('mouseleave', (e: Event) => {
                this._track_list.classList.remove('track-list_border-top');
                this._track_list.classList.remove('track-list_border-bottom');
            });
            // Прокрутка списка трэков
            this._track_list.addEventListener('wheel', (e: any) => {
                // Скорость прокрутки
                const delta: number = 10;
                if (this._first_audio_track == null) {
                    return;
                }
                let marginTop: number = parseInt(this._first_audio_track.style.marginTop);
                if (e.deltaY > 0) {
                    // вниз
                    let diff: number = this._track_list.scrollHeight - this._track_list.clientHeight;
                    if (diff < 0) {
                        // "докрутка" до конца
                        this._first_audio_track.style.marginTop = `${diff}px`;
                    } else if (diff > 0) {
                        this._first_audio_track.style.marginTop = `${marginTop - delta}px`;
                    }
                } else if (marginTop != 0) {
                    // вверх
                    this._first_audio_track.style.marginTop = `${marginTop + delta}px`;
                }
                // Подстветка прокрутки
                if (this.isCanScrollTop()) {
                    this._track_list.classList.add('track-list_border-top');
                } else {
                    this._track_list.classList.remove('track-list_border-top');
                }
                if (this.isCanScrollBottom()) {
                    this._track_list.classList.add('track-list_border-bottom');
                } else {
                    this._track_list.classList.remove('track-list_border-bottom');
                }
            });
            // Нажатие клавиши - удаление по del
            window.addEventListener('keypress', (e: any) => {
                if (e.key == 'Delete') {
                    this.delSelectedAudiotracks();
                }
            });
        }


        //
        // Проверка возможности прокрутки вверх
        //
        private isCanScrollTop(): boolean {
            return (this._first_audio_track != null) &&
                   (parseInt(this._first_audio_track.style.marginTop) != 0);
        }


        //
        // Проверка возможности прокрутки вниз
        //
        private isCanScrollBottom(): boolean {
            return (this._track_list.scrollHeight - this._track_list.clientHeight) > 0;
        }


        //
        // Скрыть компонент
        //
        private hide(): void {
            this._panel.classList.remove('panel_show');
            this._panel.classList.add('panel_hide');
        }


        //
        // Отобразить компонент
        //
        private show(): void {
            this._panel.classList.remove('panel_hide');
            this._panel.classList.add('panel_show');
        }


        //
        // Удалить все выделенные аудиотрэки из списка
        //
        private delSelectedAudiotracks(): void {
            this._selected_audio_tracks.forEach((selected_audio_track) => {
                let id: number = parseInt(selected_audio_track.getAttribute('data-id'));
                delete this._files[id];
                if (selected_audio_track == this._played_audio_track) {
                    this.clearPlayed();
                }
                this._track_list.removeChild(selected_audio_track);
            });
            this.refactIds();
            this._selected_audio_tracks = [];
            this._first_audio_track = this._track_list.getElementsByClassName('audio-track')[0] || null;
            if (this._first_audio_track) {
                this._first_audio_track.style.marginTop = 0;
            }
        }


        //
        // Назначение трекам новых идентификаторов
        //
        private refactIds(): void {
            this._files = this._files.filter(() => true);
            let audiotracks: any = this._track_list.getElementsByClassName('audio-track');
            for (let i = 0; i < audiotracks.length; ++i) {
                audiotracks[i].setAttribute('data-id', String(i));
            }
        }


        //
        // Пометить трэк как проигрываемый
        //
        private setPlayed(audio_track: Element): void {
            this.clearPlayed();
            this._played_audio_track = audio_track;
            audio_track.classList.add('audio-track_played');
        }


        //
        // Убрать выделение с проигрываемого трэка
        //
        private clearPlayed(): void {
            if (this._played_audio_track != null) {
                this._played_audio_track.classList.remove('audio-track_played');
                this._played_audio_track = null;
            }
        }


        //
        // Переключить состояние: выделеный/ не выделеный
        //
        private toggleSelected(audio_track: Element): void {
            if (audio_track.classList.contains('audio-track_selected')) {
                this.clearSelected(audio_track);
            } else {
                this.setSelected(audio_track);
            }
        }


        //
        // Пометить трэк как выбранный
        //
        private setSelected(audio_track: Element): void {
            this._selected_audio_tracks.push(audio_track);
            audio_track.classList.add('audio-track_selected');
        }


        //
        // Убрать пометку, что трэк выбран
        //
        private clearSelected(audio_track: Element): void {
            this._selected_audio_tracks.filter(selected_audio_track =>
                selected_audio_track !== audio_track
            );
            audio_track.classList.remove('audio-track_selected');
        }


        //
        // Убрать пометку, что трэки выбраны
        //
        private clearSelecteds(): void {
            this._selected_audio_tracks.forEach(selected_audio_track =>
                selected_audio_track.classList.remove('audio-track_selected')
            );
            this._selected_audio_tracks = [];
        }


        //
        // Добавление перемещённых файлов в трэк-лист
        //
        private addDropFiles(files: any): void {
            // Добавление файлов в список и исключение повторных
            for (let i = 0; i < files.length; ++i) {
                if (this.isFileExists(files[i].name)) {
                    continue;
                }
                let id: number = this._files.length;
                this._files.push(files[i]);
                this.getAudiotrackTime(files[i]).then((time: string) => {
                    this.addAudiotrack(files[i].name, time, id);
                    this.refactIds();
                    this._first_audio_track = this._track_list.getElementsByClassName('audio-track')[0];
                    this._first_audio_track.style.marginTop = 0;
                });
            }
        }


        //
        // Проверка, добавлен ли уже файл с заданным именем
        //
        private isFileExists(file_name: string): boolean {
            for (let i = 0; i < this._files.length; ++i) {
                if (this._files[i].name == file_name) {
                    return true;
                }
            }
            return false;
        }


        //
        // Добавление трэка в список
        //
        private addAudiotrack(name: string, time: string, id: number): void {
            let audiotrack: Element = document.createElement('div');
            audiotrack.classList.add('audio-track');
            audiotrack.setAttribute('data-id', String(id));
            let __content: Element = document.createElement('div');
            __content.classList.add('audio-track__content');
            let __title: Element = document.createElement('div');
            __title.classList.add('audio-track__title');
            __title.innerHTML = name;
            let __time: Element = document.createElement('div');
            __time.classList.add('audio-track__time');
            __time.innerHTML = time;
            __content.appendChild(__title);
            __content.appendChild(__time);
            audiotrack.appendChild(__content);
            this._track_list.appendChild(audiotrack);
        }


        //
        // Получение временной продолжительности трэка
        //
        private getAudiotrackTime(file: File): any {
            return new Promise((resolve, reject) => {
                let fr = new FileReader();
                fr.onload = (file: any) => {
                    let audio = new Audio(file.target.result);
                    audio.oncanplay = () => {
                        resolve(this.formatTime(audio.duration));
                    };
                };
                fr.readAsDataURL(file);
            });
        }


        //
        // Перевод секунд в формат mm:ss
        //
        private formatTime(seconds: number): string {
            seconds = Math.floor(seconds);
            let mm: string = String(Math.floor(seconds / 60));
            let ss: string = String(Math.floor(seconds % 60));
            if (mm.length == 1) {
                mm = '0' + mm;
            }
            if (ss.length == 1) {
                ss = '0' + ss;
            }
            return `${mm}:${ss}`;
        }


        // =================== public методы =================== //


        //
        // Переключатель случайного воспроизведения
        //
        public toggleRadomNext(): void {
            this._is_random_next = !this._is_random_next;
        }


        //
        // Включение зацикливания трэка
        //
        public toggleLoopCurrent(): void {
            this._is_loop_current = !this._is_loop_current;
        }


        //
        // Переключить на предыдущий трэк
        //
        public prev(): File {
            let id: number = parseInt(this._played_audio_track.getAttribute('data-id'));
            // Если трэк незациклен
            if (!this._is_loop_current) {
                // Если трэки случайные
                if (this._is_random_next) {
                    id = Math.floor(Math.random() * this._files.length);
                } else {
                    if (id == 0) {
                        id = this._files.length - 1;
                    } else {
                        id -= 1;
                    }
                }
                this.setPlayed(this._track_list.getElementsByClassName('audio-track')[id]);
            }
            return this._files[id];
        }


        //
        // Переключить на слудующий трэк
        //
        public next(): File {
            let id: number = parseInt(this._played_audio_track.getAttribute('data-id'));
            // Если трэк незациклен
            if (!this._is_loop_current) {
                // Если трэки случайные
                if (this._is_random_next) {
                    id = Math.floor(Math.random() * this._files.length);
                } else {
                    if (id == this._files.length - 1) {
                        id = 0;
                    } else {
                        id += 1;
                    }
                }
                this.setPlayed(this._track_list.getElementsByClassName('audio-track')[id]);
            }
            return this._files[id];
        }


        //
        // Получить проигрываемый трэк
        //
        public getPlayed(): File {
            let id: number = parseInt(this._played_audio_track.getAttribute('data-id'));
            return this._files[id];
        }


        //
        // Переключение видимости компонента
        //
        public toggleVisibility(): void {
            if (this._panel.classList.contains('panel_hide')) {
                this.show();
            } else {
                this.hide();
            }
        }


        //
        // Получение экземепляра - сиглтона
        //
        public static getInstance(): TrackList {
            if (TrackList._instance === null) {
                TrackList._instance = new TrackList();
            }
            return TrackList._instance;
        }

    }


    export const getInstance = TrackList.getInstance;

}
